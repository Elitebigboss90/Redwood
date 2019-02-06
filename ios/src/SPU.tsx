import * as React from "react"
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList,
    Dimensions,
    StyleSheet,
    Alert,
    AlertIOS,
    Platform,
    AsyncStorage,
    Linking,
    Modal,
    Platform，
    Button,
    Image,
    StatusBar
} from "react-native"
import { ImagePicker, Constants } from "expo"
// import FastImage from "react-native-fast-image"
import { AlertView } from "./common/Alert"
import ImageViewer from "react-native-image-zoom-viewer"
import { Config, ProductCategory } from "./Config"
import { APIService } from "./service/apiService"
import { UploadService } from "./service/uploadService"
import { ImageUploader } from "./ImageUploader"
import { Icon, CartLight, ContactRed, ImageAddGray, DeleteGray, ArrowDownGray, TestAvatarCircle, ArrowRightGray, ArrowLeftLight, CloseGray } from "./common/Icon"
import { Separator } from "./common/Separator"
import { Footer, FooterButton } from "./common/Footer"
import { TabMenu } from "./common/TabMenu"
import { CustomButton, CustomTextInput } from "./common/Custom"
import { DropDownList } from "./common/DropDown"
import { QuantityAdder } from "./common/Adder"
import * as Transformer from "./util/Transformer"
import { ImageUtil } from "./util/ImageUtil"
import { Cell, SPUManagerContent } from "./common/Cell"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { NavigatorBackButton } from "./common/Navigator"
import ImageBrowser from './util/ImageBrowser';
import { UploadService } from "./service/uploadService"
import { AlertView } from "./common/Alert"
import { Permission } from "./Permission"

const imageType = "image/jpeg"
const imageName = "upload.jpg"


export class SPU extends React.Component {
    private api = new APIService()
    private propsSelector: SPUPropsSelector
    private selectedPropsIndexes: number[] = []
    private selectedQuantity: number = 0
    private settleType: "cart" | "buy"
    private productId: string = null
    private imageActionSheet: AlertView.Sheet
    props: { navigation: any }
    state: {
        product?: ShopService.Product,
        seller?: ShopService.Seller,
        imageSizes?: ImageUtil.ImageSize[],
        imageModalVisible?: boolean,
        imageIndex?: number,
        imageViewerType?: "product" | "description",
    }

    constructor(props) {
        super(props)
        this.state = {
            product: {
                id: "0",
                sellerId: "0",
                name: "",
                skus: [],
                basePrice: 0,
                transportPrice: 0,
                transportType: "none",
                description: "",
                descriptionImages: [],
                thumbs: [],
                props: [],
                createAt: 0,
                available: false,
                category: "",
                finite: false,
                historicalSales: 0,
                meta: null
            },
            seller: null,
            imageSizes: [],
            imageModalVisible: false,
            imageIndex: 0,
            imageViewerType: "product",
        }
    }
    componentDidMount() {
        const { params } = this.props.navigation.state
        this.productId = params.id || null
        this.getProduct(this.productId)
    }

    private getProduct(productId: string) {
        this.api.Shop.getProduct({ productId: productId }, (err, product) => {
            HUD.hide()
            if (err) return
            //console.log("api-getProduct: " + JSON.stringify(product))
            this.setState({
                product: product,
            })
            this.getSeller(product.sellerId)
            const uris = product.descriptionImages ? product.descriptionImages.map((uri) => Config.root + uri) : []
            let imageSizes: ImageUtil.ImageSize[] = []
            uris.forEach((uri, index) => {
                ImageUtil.getSize(uri, (err, size) => {
                    imageSizes[index] = { width: size.width, height: size.height }
                    this.setState({ imageSizes: imageSizes })
                })
            })
        })
    }

    private getSeller(sellerId: string) {
        HUD.show()
        this.api.Shop.getSellerById({ sellerId: sellerId }, (err, seller) => {
            HUD.hide()
            if (err) return
            this.setState({
                seller: seller,
            })
        })
    }

    private settleProduct(type: "cart" | "buy") {
        const { product, seller } = this.state
        const propsIndexes = this.selectedPropsIndexes
        const quantity = this.selectedQuantity
        let isSkuSelected = product.skus.length > 0
        let skuId: string = null
        propsIndexes.forEach((propsIndex, index) => {
            if (propsIndex < 0) isSkuSelected = false
        })
        if (isSkuSelected) {
            skuId = product.props.map((props, index) => props.values[propsIndexes[index]].value).join("_")
        }
        if (!isSkuSelected && product.skus.length > 0) {
            Toast.show("您还没有选择商品规格哦")
            return
        }
        if (quantity <= 0) {
            Toast.show("您还没有选择商品数量哦")
            return
        }
        switch (type) {
            case "cart": {
                this.api.handleNeedToken(this, (token) => {
                    HUD.show()
                    this.api.Shop.addCartItem(
                        {
                            productId: product.id,
                            skuId: skuId,
                            quantity: quantity
                        },
                        (err, result) => {
                            HUD.hide()
                            // alert(JSON.stringify([err, result]))
                            if (err) {
                                //console.log("addCartItem err: " + err)
                                Toast.show("添加购物车失败")
                                return
                            }
                            Toast.show("添加购物车成功")
                        })
                })
                break
            }
            case "buy": {
                const orderItem: ShopService.Order.Item = {
                    sellerId: seller.id,
                    skuId: skuId,
                    productId: product.id,
                    transportFee: product.transportPrice,
                    basePrice: product.basePrice,
                    totalPrice: product.transportPrice + product.basePrice,
                    name: product.name,
                    quantity: quantity,
                }
                this.props.navigation.navigate("Order", { items: [[orderItem]] })
            }
        }
    }
    private onPressBack() {
        this.props.navigation.goBack()
    }

    private onPressCart() {
        this.props.navigation.navigate("CartModal")
    }

    private onPressHeaderImage(index: number) {
        this.setState({
            imageViewerType: "product",
            imageModalVisible: true,
            imageIndex: index
        })
    }
    private onPressDescriptionImage(index: number) {
        this.setState({
            imageViewerType: "description",
            imageModalVisible: true,
            imageIndex: index
        })
    }

    private onPressSeller() {
        this.props.navigation.navigate("Seller", { id: this.state.seller.id })
    }

    private onPressContact() {
        const { seller } = this.state
        if (!seller || !seller.contact.phone) return
        const contactURL = "tel:" + this.state.seller.contact.phone
        Linking.canOpenURL(contactURL).then((open) => {
            if (open) {
                Linking.openURL(contactURL)
            } else {
                Toast.show("无效的手机号")
            }
        })
    }
    private onPressSettleProduct(type: "cart" | "buy") {
        const { product } = this.state
        this.settleType = type
        // console.log(product.skus.length)
        this.propsSelector.show({ propsIndexes: this.selectedPropsIndexes, quantity: this.selectedQuantity })
        // if (product.skus && product.skus.length > 0) {
        // } else {
        //     this.settleProduct(type)
        // }
    }

    private renderSPUImage(item, index) {
        const width = Dimensions.get("window").width
        return (
            <TouchableWithoutFeedback
                onPress={() => this.onPressHeaderImage(index)} >
                <Image
                    style={{
                        width: width,
                        flex: 1,
                    }}
                    source={{ uri: Config.root + item }} />
            </TouchableWithoutFeedback>
        )
    }

    private renderHeaderImage() {
        const { product } = this.state
        return (
            <View >
                <FlatList
                    style={{
                        height: 280,
                    }}
                    data={product.thumbs}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item, index }) => this.renderSPUImage(item, index)}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        )
    }

    private renderHeaderBar() {
        return (
            <View
                style={{
                    position: "absolute",
                    top: Constants.statusBarHeight + 6,
                    height: 32,
                    left: 10,
                    right: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} >
                <TouchableOpacity
                    style={
                        styles.imageContainerStyle
                    }
                    onPress={() => this.onPressBack()} >
                    <Icon icon={ArrowLeftLight} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        styles.imageContainerStyle
                    }
                    onPress={() => this.onPressCart()} >
                    <Icon icon={CartLight} />
                </TouchableOpacity>
            </View>
        )
    }
    private renderTitle() {
        const { product } = this.state
        return (
            <View
                style={{
                    paddingHorizontal: Config.horizontal,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                    backgroundColor: "white"
                }}>
                <Text
                    style={{
                        fontSize: 16
                    }}
                    numberOfLines={3}
                    selectable={true} >
                    {product.name}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: Config.styleColor,
                        marginVertical: 10
                    }}
                    numberOfLines={3} >
                    {"¥" + Transformer.centToYuan(product.basePrice)}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }} >
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor
                        }} >
                        {"销量" + product.historicalSales}
                    </Text>
                    {/* <Text style={{ fontSize: 12, color: Config.grayColor }} >{product.}</Text> */}
                </View>
            </View>
        )
    }

    private renderDescription() {
        const { seller, product, imageSizes } = this.state
        let imageNodes: JSX.Element[] = []
        if (product.descriptionImages) {
            product.descriptionImages.forEach((image, index) => {
                const uri = Config.root + image
                const width = Dimensions.get("window").width - Config.horizontal * 2
                const imageSize = imageSizes && imageSizes[index] ? imageSizes[index] : { width: 0, height: 0 }
                const imageNode =
                    <TouchableWithoutFeedback
                        key={index.toString()}
                        onPress={() => this.onPressDescriptionImage(index)} >
                        <Image
                            style={{
                                width: width,
                                height: width / imageSize.width * imageSize.height,
                            }}
                            resizeMode={"stretch"}
                            // onLoad={(event) => {
                            //     const { width, height } = event.nativeEvent
                            //     let sizes = imageSizes
                            //     sizes[index] = { width: width, height: height }
                            //     this.setState({ imageSizes: sizes })
                            //     // console.log("fast image size: ", width, height)
                            // }}
                            source={{ uri: uri }} />
                    </TouchableWithoutFeedback>
                imageNodes.push(imageNode)
            })
        }
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: 10,
                    backgroundColor: "white",
                    padding: Config.horizontal
                }} >
                <TouchableWithoutFeedback
                    onPress={() => this.onPressSeller()} >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }} >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            source={seller && seller.avatar ? { uri: Config.root + seller.avatar } : TestAvatarCircle.source} />
                        <Text
                            style={{
                                marginLeft: 10,
                                color: Config.textColor,
                                fontSize: 16
                            }} >
                            {seller && seller.name ? seller.name : ""}
                        </Text>
                        <Icon icon={ArrowRightGray} />
                    </View>
                </TouchableWithoutFeedback>
                <Separator
                    style={{
                        marginVertical: Config.horizontal
                    }} />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                    }} >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor
                        }}
                        selectable={true}>
                        {product && product.description ? product.description : ""}
                    </Text>
                    <View
                        style={{
                            marginTop: 10
                        }} >
                        {imageNodes}
                    </View>
                </View>
            </View>
        )
    }

    private renderFooter() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingLeft: Config.horizontal,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "space-between",
                }} >
                <Text
                    style={{
                        fontSize: 14,
                        color: Config.textColor
                    }}
                    onPress={() => this.onPressSeller()} >
                    {"店铺"}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        height: 50
                    }} >
                    <CustomButton
                        style={{
                            width: 100,
                            backgroundColor: "#EE9426",
                            height: "100%"
                        }}
                        textStyle={{
                            color: "white"
                        }}
                        text={"加入购物车"}
                        onPress={() => this.onPressSettleProduct("cart")} />
                    <CustomButton
                        style={{
                            width: 100,
                            backgroundColor: Config.styleColor,
                            height: "100%"
                        }}
                        textStyle={{
                            color: "white"
                        }}
                        text={"立即购买"}
                        onPress={() => this.onPressSettleProduct("buy")} />
                </View>
            </View>
        )
    }

    renderImageModal() {
        const { imageViewerType, product } = this.state
        let uris: string[] = []
        switch (imageViewerType) {
            case "product":
                uris = product.thumbs; break
            case "description":
                uris = product.descriptionImages; break
        }
        let images: { url: string }[] = []
        if (uris === null || uris.length === 0) return <View />
        uris.forEach((uri, index) => {
            images.push({ url: Config.root + uri })
        })
        return (
            <Modal
                visible={this.state.imageModalVisible}
                transparent={true}
                animation={"fade"}
                onRequestClose={() => this.setState({ imageModalVisible: false })}>
                  <ImageViewer
                      imageUrls={images}
                      index={this.state.imageIndex}
                      onClick={() => this.setState({ imageModalVisible: false })}
                      onLongPress={(image) => {
                          //console.log(image)
                          if (Platform.OS == "ios") {
                              this.setState({ imageModalVisible: false })
                          }
                          this.imageActionSheet.show()
                      }} />
            </Modal>
        )
    }

    private renderImageActionSheet() {
        const { imageViewerType, product, imageIndex } = this.state
        let selectedImageUrl: string
        switch (imageViewerType) {
            case "product":
                selectedImageUrl = product && product.thumbs && product.thumbs.length && Config.root + product.thumbs[imageIndex]
                break;
            case "description":
                selectedImageUrl = product && product.descriptionImages && product.descriptionImages && Config.root + product.descriptionImages[imageIndex]
                break
        }
        return (
            <AlertView.Sheet
                ref={(ref) => this.imageActionSheet = ref}
                options={["保存到相册", "取消"]}
                cancelButtonIndex={1}
                onPress={(index) => {
                    if (index == 0) {
                        if (!selectedImageUrl) return
                        this.setState({ imageModalVisible: false })
                        ImageUtil.saveToRoll(selectedImageUrl, (err, uri) => {
                            if (err) {
                                Toast.show("保存到相册失败")
                                return
                            } else {
                                Toast.show("成功保存到相册")
                            }
                        })
                    }
                }} />
        )
    }

    private renderPropSelector() {
        return (
            <SPUPropsSelector
                ref={(ref) => this.propsSelector = ref}
                item={this.state.product}
                onSelect={(props) => {
                    const { propsIndexes, quantity } = props
                    console.log("dgwfteg", props)
                    this.selectedPropsIndexes = propsIndexes
                    this.selectedQuantity = quantity
                    if (!propsIndexes || !propsIndexes.length || propsIndexes[0] < 0 || !quantity) {
                        return
                    }
                    if (this.propsSelector) {
                        this.propsSelector.hide()
                    }
                    this.settleProduct(this.settleType)
                }} />
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }} >
                {this.state.imageModalVisible?<View style={{backgroundColor:'#000000',width:500,height:500}}/>:null}
                <StatusBar hidden={true}/>
                <ScrollView >
                    {this.renderHeaderImage()}
                    {this.renderTitle()}
                    {this.renderDescription()}
                </ScrollView>
                {this.renderHeaderBar()}
                {this.renderFooter()}
                {this.renderImageModal()}
                {this.renderPropSelector()}
                {this.renderImageActionSheet()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 32,
        height: "100%",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    }
})


export class SPUPropsSelector extends React.Component {
    static defaultProps = {
        backgroundStyle: {},
        contentStyle: {},
        minQuantity: 1,
        maxQuantity: 999,
        onSelect: () => { },
    }
    props: {
        backgroundStyle?: any,
        contentStyle?: any,
        item: ShopService.Product,
        minQuantity?: number,
        maxQuantity?: number,
        onSelect?: (props?: { propsIndexes: number[], quantity: number }) => void
    }
    state: {
        visible?: boolean,
        selectedPropsIndexes?: number[],
        quantity?: number,
        propsSelected?: boolean
    }
    // private quantity: number = 0

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selectedPropsIndexes: [],
            quantity: 1,
            propsSelected: true
        }
    }

    show(props?: { propsIndexes: number[], quantity: number }) {
        const { propsIndexes, quantity } = props
        if (propsIndexes === null || propsIndexes.length === 0 || quantity === null) {
            const selectedIndexes: number[] = this.props.item.props.map(props => -1) || []
            this.setState({
                visible: true,
                selectedPropsIndexes: selectedIndexes
            })
        } else {
            this.setState({
                visible: true,
                selectedPropsIndexes: propsIndexes,
                quantity: quantity
            })
        }
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    private allPropsSelected(): boolean {
        const { selectedPropsIndexes } = this.state
        let propsSelected: boolean = true
        selectedPropsIndexes.forEach((propsIndex, index) => {
            if (propsIndex < 0) {
                propsSelected = false
            }
        })
        return propsSelected
    }

    private onPressConfirm() {
        const { selectedPropsIndexes, quantity } = this.state
        // console.log("propsIndexes: " + JSON.stringify(selectedPropsIndexes) + "  " + "quantity: " + this.quantity)
        // this.hide()
        let propsSelected = this.allPropsSelected()
        this.setState({ propsSelected: propsSelected })
        this.props.onSelect({ propsIndexes: selectedPropsIndexes, quantity: quantity })
    }

    private renderHeader() {
        const { item } = this.props
        const { selectedPropsIndexes, propsSelected } = this.state
        const thumb = item && item.thumbs && item.thumbs[0] ? { uri: Config.root + item.thumbs[0] } : { uri: "" }
        let propsName: string = ""
        let selected: boolean = this.allPropsSelected()
        propsName = selected ? "已选" : "请选择"
        selectedPropsIndexes.forEach((propsIndex, index) => {
            if (selected) {
                propsName += " " + item.props[index].values[propsIndex].value
            } else {
                if (propsIndex < 0) {
                    propsName += " " + item.props[index].name
                }
            }
        })
        return (
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "row",
                }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={thumb}>
                </Image>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 10,
                        justifyContent: "space-between",
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: Config.textColor,
                            marginTop: 5,
                        }}
                        numberOfLines={2} >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            color: propsSelected ? Config.grayColor : Config.styleColor,
                            fontSize: 14,
                            marginBottom: 5,
                        }}
                        numberOfLines={2} >
                        {propsName}
                    </Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => this.hide()} >
                    <View
                        style={{
                            width: 30,
                            height: 30,
                        }}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                            }}
                            source={CloseGray.source} />
                    </View>
                </TouchableWithoutFeedback>
            </View >
        )
    }

    private renderSpecificationSelector() {
        const { item } = this.props
        const { selectedPropsIndexes } = this.state
        let specificationNodes: JSX.Element[] = []
        item.props.forEach((props, i) => {
            let propsValueNodes: JSX.Element[] = []
            props.values.forEach((propsValue, j) => {
                const selected = selectedPropsIndexes[i] === j
                const selectedColor = selected ? Config.styleColor : Config.grayColor
                propsValueNodes.push(
                    <CustomButton
                        key={j.toString()}
                        style={{
                            borderWidth: 1,
                            borderColor: selectedColor,
                            borderRadius: 3,
                            marginTop: 10,
                            marginRight: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            height: 30,
                        }}
                        textStyle={{
                            color: selectedColor,
                            fontSize: 14,
                        }}
                        text={propsValue.value}
                        onPress={() => {
                            let selectedIndexes = selectedPropsIndexes
                            if (selected) {
                                selectedIndexes[i] = -1
                            } else {
                                selectedIndexes[i] = j
                            }
                            let allPropsSelected = this.allPropsSelected()
                            this.setState({
                                selectedPropsIndexes: selectedIndexes,
                                propsSelected: allPropsSelected
                            })
                        }} />
                )
            })
            specificationNodes.push(
                <View
                    style={{
                        marginTop: 15,
                    }}>
                    <Text
                        style={{
                            color: Config.textColor,
                            fontSize: 16,
                        }}>
                        {props.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                        }}>
                        {propsValueNodes}
                    </View>
                </View>
            )
        })
        return (
            <View>
                {specificationNodes}
            </View>
        )
    }

    private renderQuantity() {
        const { minQuantity, maxQuantity } = this.props
        return (
            <View style={{
                marginTop: 15,
                marginBottom: 30,
            }} >
                <Separator
                    style={{
                        paddingHorizontal: 0,
                        marginBottom: 15,
                    }} />
                <Text
                    style={{
                        color: Config.textColor,
                        fontSize: 16,
                    }}>
                    {"购买数量"}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                    }}>
                    <QuantityAdder
                        style={{
                            marginTop: 10,
                        }}
                        defaultQuantity={this.state.quantity}
                        minQuantity={minQuantity}
                        maxQuantity={maxQuantity}
                        onCount={(quantity) => this.setState({ quantity: quantity })}
                    />
                </View>
            </View>
        )
    }

    private renderFooter() {
        return (
            <Footer
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    borderTopWidth: 0.5,
                    borderColor: "#BBBBBB",
                    paddingHorizontal: Config.horizontal
                }}>
                <CustomButton
                    style={{
                        width: 60,
                        borderWidth: 1,
                        borderColor: "#BBBBBB",
                        paddingVertical: 5,
                        borderRadius: 100,
                        marginRight: 10,
                    }}
                    textStyle={{
                        color: Config.textColor,
                        fontSize: 14,
                    }}
                    text={"取消"}
                    onPress={() => this.hide()} />
                <CustomButton
                    style={{
                        width: 60,
                        borderWidth: 1,
                        borderColor: Config.styleColor,
                        paddingVertical: 5,
                        borderRadius: 100,
                    }}
                    textStyle={{
                        color: Config.styleColor,
                        fontSize: 14,
                    }}
                    text={"确定"}
                    onPress={() => this.onPressConfirm()} />
            </Footer>
        )
    }
    private renderPropSelector() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    ...this.props.backgroundStyle
                }}>
                <Text
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                    onPress={() => this.hide()}>
                </Text>
                <View
                    style={{
                        backgroundColor: "white",
                        height: "66%",
                        width: "100%",
                        ...this.props.contentStyle
                    }}>
                    <ScrollView
                        style={{
                            flex: 1,
                            padding: Config.horizontal,
                        }}>
                        {this.renderHeader()}
                        {this.renderSpecificationSelector()}
                        {this.renderQuantity()}
                    </ScrollView>
                    {this.renderFooter()}
                </View>
            </View>

        )
    }

    render() {
        const { visible } = this.state
        return (
            <Modal
                visible={visible}
                onRequestClose={() => this.setState({ visible: false })}
                transparent={true} >
                {this.renderPropSelector()}
            </Modal>
        )
    }
}


export class SPUManager extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "商品管理",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private willFocus
    private readonly pageWidth = Dimensions.get("window").width
    private readonly tabTitles = Config.productCategories
    private listScrollView: ScrollView
    props: { navigation?: any }
    state: {
        products?: ShopService.Product[],
        currentTabIndex?: number
    }
    constructor(props) {
        super(props)
        this.state = { products: [], currentTabIndex: 0 }
        this.api.handleNeedToken(this)
        this.willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.getMyProducts()
            }
        )
    }
    componentWillUnmount() {
        this.willFocus.remove()
    }
    private getMyProducts(page = 0, index: number = this.state.currentTabIndex) {
        HUD.show()
        this.api.Shop.getMyProducts(
            {
                offset: Config.countPerPage * page,
                count: Config.countPerPage,
                category: this.tabTitles[index]
            }, (err, result) => {
                HUD.hide()
                if (err) return
                this.setState({ products: result })
            })
    }
    onPressEdit(index: number) {

    }
    private onPressDelete(index: number) {
        Alert.alert("确定删除？", null, [{ text: "否", onPress: () => { } }, {
            text: "是", onPress: () => {
                HUD.show()
                this.api.Shop.deleteProduct(
                    {
                        productId: this.state.products[index].id
                    },
                    (err, result) => {
                        HUD.hide()
                        if (err) { Toast.show("删除失败"); return }
                        let products = this.state.products
                        products.splice(index, 1)
                        this.setState({ products: products })
                        Toast.show("删除成功")
                    })
            }
        }])
    }
    private onPressRow(item: ShopService.Product, index: number) {
        if (!item) return
        if (item.disabled) {
            Toast.show(Config.productDisabledPrompt)
        }
    }

    private onPressTabMenu(index) {
        this.setState({ currentTabIndex: index })
        this.listScrollView.scrollTo({ x: this.pageWidth * index, animated: true })
        this.getMyProducts(0, index)
    }
    private onPressFooter() {
        this.props.navigation.navigate("SPUEditor")
    }
    private renderRow(item, index) {
        return (
            <Cell
                indexPath={{ section: 0, row: index }}
                renderContent={(indexPath) =>
                    <SPUManagerContent
                        data={item}
                        onPressEdit={() => this.onPressEdit(indexPath.row)}
                        onPressDelete={() => this.onPressDelete(indexPath.row)} />}
                onPressCell={(indexPath) => this.onPressRow(item, index)} />
        )
    }
    private renderHeader() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 44
                }} >
                <TabMenu
                    itemStyle={{
                        marginLeft: 80,
                        justifyContent: "center",
                    }}
                    itemTextStyle={{
                        fontSize: 16
                    }}
                    // textContainerStyle={{
                    //     height: 44
                    // }}
                    scrollEnabled={false}
                    tabs={this.tabTitles.map((value) => Transformer.productCategoryToCN(value))}
                    currentSelectedIndex={this.state.currentTabIndex}
                    onPressItem={(index) => this.onPressTabMenu(index)} ></TabMenu>
            </View>
        )
    }
    private renderLists() {
        let lists: JSX.Element[] = []
        this.tabTitles.forEach((title, index) => {
            const list = (
                <FlatList
                    key={index.toString()}
                    data={this.state.products}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    // ListFooterComponent={() => <CustomIndicator animating={this.state.indicatorAnimating} />}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    // onRefresh={() => { this.queryPosts(0) }}
                    // refreshing={this.state.refreshing}
                    // onEndReached={() => this.queryPosts(++this.currentPage)}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} >
                </FlatList>
            )
            lists.push(list)
        })
        return lists
    }
    renderFooter() {
        return <FooterButton text={"创建商品"} onPress={() => this.onPressFooter()} />
    }
    render() {
        const pageWidth = this.pageWidth
        const page = this.tabTitles.length
        return (
            <View
                style={{
                    flex: 1
                }} >
                {this.renderHeader()}
                <ScrollView
                    ref={(ref) => this.listScrollView = ref}
                    style={{
                        marginTop: 10
                    }}
                    contentContainerStyle={{
                        width: pageWidth * page,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(event) => {
                        const offsetX = event.nativeEvent.contentOffset.x
                        const offsetPage = Math.floor(offsetX / pageWidth)
                        if (offsetPage === this.state.currentTabIndex || offsetPage > page || offsetPage < 0) {
                            return
                        } else {
                            this.setState({ currentTabIndex: offsetPage })
                            this.getMyProducts(0, offsetPage)
                        }
                    }} >
                    {this.renderLists()}
                </ScrollView>
                {this.renderFooter()}
            </View>
        )
    }
}


const IMAGE_NUM_COLUMN = 3
const MAX_IMAGE_COUNT = 6

export class SPUEditor extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "编辑商品",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private nameTI: CustomTextInput
    private uploader = new UploadService()
    private priceTI: CustomTextInput
    private typeTI: CustomTextInput
    private descriptionTI: CustomTextInput
    private dropDown: DropDownList
    private typeSelectNode: React.Component
    private api = new APIService()
    private descriptionImageUploader: ImageUploader
    private sellerUris: string[] = []
    private spuImageUploader: ImageUploader
    private spuUris: string[] = []
    private product: ShopService.Product = null
    private typePrompt: AlertView.Input
    private imageActionSheet: AlertView.Sheet
    private actionSheet: AlertView.Sheet
    private specificationPrompt: AlertView.Input
    props: { navigation?: any }
    state: {
        imageCount?: number,
        specifications?: ShopService.Product.EnumProp[],
        addTypeIndex?: number,
        currentTypeIndex?: number,
        imageContainerWidth?: number,
        currentPromptType?: "type" | "specification",
        imageBrowserOpen?: boolean,
        photos?: [],
        photos1?: [],
        currentField?: number,

    }

    constructor(props) {
        super(props)
        this.state = {
            imageCount: 0,
            specifications: [{
                name: "默认类型",
                values: [{
                    name: "默认规格",
                    value: "默认规格"
                }],
                default: "默认规格"
            }],
            addTypeIndex: 0,
            currentTypeIndex: null,
            imageContainerWidth: 0,
            currentPromptType: "type",
            imageBrowserOpen: false,
            photos: [],
            photos1: [],
            currentField: 1,
        }
        this.api.handleNeedToken(this)
        //{ (this: any).imageBrowserCallback = this.imageBrowserCallback.bind(this) }
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillMount",nextProps)
    }

    addSpecificationType(text: string) {
        if (text) {
            let specifications = this.state.specifications
            specifications.push({ name: text, values: [], default: null })
            this.setState({
                specifications: specifications

            })
        }
    }
    addSpecification(index: number, text: string) {
        if (text) {
            const specification = this.state.specifications[index]
            specification.values.push({ name: text, value: text })
            specification.default = specification.values[0].name
            let specifications = this.state.specifications
            specifications[index] = specification
            this.setState({ specifications: specifications })
        }
    }
    onPressSelectType() {
        this.dropDown.showInTarget(this.typeSelectNode)
    }
    onPressFloatItem(index) {
        this.setState({ currentTypeIndex: index })
        this.dropDown.hide()
    }
    onPressDeleteSpecification(i: number, j: number) {
        const specification = this.state.specifications[i]
        specification.values.splice(j, 1)
        if (j === 0) specification.default = null
        let specifications = this.state.specifications
        specifications[i] = specification
        this.setState({ specifications: specifications })
    }
    onPressAddSpecification(index: number) {
        this.setState({ currentPromptType: "specification", addTypeIndex: index })
        this.specificationPrompt.show()
    }
    onPressDeleteSpecificationeType(index: number) {
        let specifications = this.state.specifications
        specifications.splice(index, 1)
        this.setState({ specifications: specifications })
    }

    onPressAddSpecificationType() {
        this.setState({ currentPromptType: "type" })
        this.specificationPrompt.show()
    }

    onPressFooter() {
        if (this.nameTI.text === null || this.priceTI.text === null) {
            Toast.show("输入为空")
            return
        }
        const { specifications, currentTypeIndex } = this.state
        const basePrice = Number(this.priceTI.text)
        if (isNaN(basePrice)) {
            Toast.show("价格输入错误")
            return
        }
        const priceYuan = basePrice * 100
        // console.log(priceYuan)
        if (this.state.currentTypeIndex === null) {
            Toast.show("请选择商品类型")
            return
        }
        if (specifications.length === 0) {
            Toast.show("请至少输入一个规格类型")
            return
        }
        if (specifications.reduce((a, b) => a + b.values.length, 0) === 0) {
            Toast.show("请输入规格名称")
            return
        }

        HUD.show()
        this.descriptionImageUploader.uploads((err, descriptionImages) => {
            if (err) {
                Toast.show("商品详情图片上传失败")
                HUD.hide()
                return
            }
            if (descriptionImages === null || descriptionImages.length === 0) {
                Toast.show("未选择商品详情图片")
                HUD.hide()
                return
            }
            this.spuImageUploader.uploads((err, spuImages) => {
                if (err) {
                    Toast.show("商品图片上传失败")
                    HUD.hide()
                    return
                }
                if (spuImages === null || spuImages.length === 0) {
                    Toast.show("未选择商品图片")
                    HUD.hide()
                    return
                }
                this.api.Shop.createProduct(
                    {
                        product: {
                            name: this.nameTI.text,
                            basePrice: priceYuan,
                            transportPrice: 0,
                            descriptionImages: descriptionImages,
                            thumbs: spuImages,
                            props: specifications,
                            category: Config.productCategories[currentTypeIndex],
                            finite: true,
                            description: this.descriptionTI.text
                        }
                    }, (err, result) => {
                        HUD.hide()
                        // alert(JSON.stringify([err, result]))
                        if (err) return
                        this.props.navigation.goBack()
                    })
            })

        })
    }

    onPressFooterAndroid() {
        if (this.nameTI.text === null || this.priceTI.text === null) {
            Toast.show("输入为空")
            return
        }
        const { specifications, currentTypeIndex } = this.state
        const basePrice = Number(this.priceTI.text)
        if (isNaN(basePrice)) {
            Toast.show("价格输入错误")
            return
        }
        const priceYuan = basePrice * 100
        // console.log(priceYuan)
        if (this.state.currentTypeIndex === null) {
            Toast.show("请选择商品类型")
            return
        }
        if (specifications.length === 0) {
            Toast.show("请至少输入一个规格类型")
            return
        }
        if (specifications.reduce((a, b) => a + b.values.length, 0) === 0) {
            Toast.show("请输入规格名称")
            return
        }

        HUD.show()
        //this.imageUploads()
        this.imageUploads(this.state.photos,(err, descriptionImages) => {
            if (err) {
                Toast.show("商品详情图片上传失败")
                HUD.hide()
                return
            }
            if (descriptionImages === null || descriptionImages.length === 0) {
                Toast.show("未选择商品详情图片")
                HUD.hide()
                return
            }
            this.imageUploads(this.state.photos1,(err, spuImages) => {
                if (err) {
                    Toast.show("商品图片上传失败")
                    HUD.hide()
                    return
                }
                if (spuImages === null || spuImages.length === 0) {
                    Toast.show("未选择商品图片")
                    HUD.hide()
                    return
                }
                this.api.Shop.createProduct(
                    {
                        product: {
                            name: this.nameTI.text,
                            basePrice: priceYuan,
                            transportPrice: 0,
                            descriptionImages: descriptionImages,
                            thumbs: spuImages,
                            props: specifications,
                            category: Config.productCategories[currentTypeIndex],
                            finite: true,
                            description: this.descriptionTI.text
                        }
                    }, (err, result) => {
                        HUD.hide()
                        // alert(JSON.stringify([err, result]))
                        if (err) return
                        this.props.navigation.goBack()
                    })
            })

        })
    }

    private handleImage(imageInfo: ImageInfo, callback: Callback<ImageInfo>) {
        if (!imageInfo) return
        let targetSize: ImageUtil.ImageSize
        if (imageInfo.width * imageInfo.height <= 800 * 1600) {
            targetSize = { width: imageInfo.width, height: imageInfo.height }
        } else {
            targetSize = ImageUtil.sizeToLimit({ width: imageInfo.width, height: imageInfo.height }, { width: 800, height: 800 * (imageInfo.width / imageInfo.height) })
        }
        console.log("targetSize",targetSize);
        ImageUtil.manipulate(imageInfo.uri, { action: { resize: { width: targetSize.width, height: targetSize.height } } }, (err, result) => {
            callback(null, { uri: result.uri, width: result.width, height: result.height })
        })
    }

    async imageUploads(photos,callback: Callback<string[]>) {
        console.log("this.images",this.images,this.state.photos,this.state.photos1)
        var images = [];

        for(let i=0;i<photos.length;i++){
          let width1 = 1;
          let height1 = 1;
          await Image.getSize(photos[i].uri,(width, height)=>{width1=width,height1=height})
          images.push({uri:photos[i].uri,width:width1,height:height1})
        }
        //const images = this.images
        if (images.length === 0) {
            callback(null, null)
            return
        }
        let imageResults: string[] = []
        images.forEach((image, index) => {
            this.handleImage(image, (err, imageResult) => {
                if (err) return
                const uri = imageResult.uri
                const file: ImageFile = { uri: uri, type: imageType, name: imageName }
                this.uploader.upload(file, (err, result) => {
                    if (err) {
                        let _cb = callback
                        _cb(err)
                        callback = () => { }
                        return
                    }
                    imageResults.push(result.urls[0].value)
                    if (imageResults.length == images.length) {
                        callback(null, imageResults)
                        return
                    }
                })
            })
        })
    }

    private renderDescription() {
        const imageMargin = Config.horizontal
        const imageSquare = (this.state.imageContainerWidth - Config.horizontal * 2 - imageMargin * (IMAGE_NUM_COLUMN - 1)) / IMAGE_NUM_COLUMN
        return (
            <View
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: Config.horizontal,
                    paddingVertical: 5
                }} >
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        alignItems: "center"
                    }} >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"商品名称"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.nameTI = ref}
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder={"请输入名称"}
                        multiline={true} />
                </View>
                <Separator />
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"商品价格"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.priceTI = ref}
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder={"请输入价格"}
                        keyboardType={"numeric"} />
                </View>
                <Separator />
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"商品类型"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.typeTI = ref}
                        style={{ marginLeft: 10, flex: 1, flexDirection: "row" }}
                        placeholder={"请选择商品类型"}
                        editable={false}
                        defaultValue={Transformer.productCategoryToCN(Config.productCategories[this.state.currentTypeIndex])} />
                    <TouchableOpacity
                        ref={(ref) => this.typeSelectNode = ref}
                        onPress={() => this.onPressSelectType()} >
                        <Icon icon={ArrowDownGray} />
                    </TouchableOpacity>
                </View>
                <Separator />
                <View
                    style={{
                        paddingVertical: 10
                    }} >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"介绍详情"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.descriptionTI = ref}
                        style={{ marginTop: 10, flex: 1 }}
                        multiline={true}
                        placeholder={"请输入商品详情"} />
                    {Platform.OS =='ios'?<ImageUploader
                        ref={(ref) => this.descriptionImageUploader = ref}
                        style={{ marginTop: 20 }}
                        itemStyle={{ width: imageSquare, height: imageSquare }}
                        numColumns={IMAGE_NUM_COLUMN}
                        maxCount={Number.MAX_SAFE_INTEGER}
                        uris={this.sellerUris} />:<View><TouchableOpacity onPress={()=>this.onPressImagePicker(1)}><Text>上传</Text></TouchableOpacity><ScrollView horizontal style={{flex:1}}>
                          {this.state.photos.map((item,i) => this.renderImage(item,i))}
                        </ScrollView></View>}
                </View>
            </View>
        )
    }

    async askPermission(type: "library" | "camera" = "library") {
        switch (type) {
            case "library": {
                Permission.askPermission("cameraRoll", (response) => {
                    Permission.permissionResponseHandler(response, (response) => {
                      console.log(this.state.currentField)
                        if(this.state.currentField==1)
                          this.props.navigation.push("ImageBrowser",{imageBrowserCallback:this.imageBrowserCallback.bind(this)})
                        else
                          this.props.navigation.push("ImageBrowser",{imageBrowserCallback:this.imageBrowserCallbackTitle.bind(this)})

                    })
                })
                break;
            }
            case "camera": {
                Permission.askPermission("camera", (response) => {
                    Permission.permissionResponseHandler(response, (response) => {
                        this.launchImagePicker('camera');
                    })
                })
                break;
            }
        }
    }

   renderActionsheet() {
        return (
            <AlertView.Sheet
                ref={(ref) => this._actionSheet = ref}
                options={["拍照", "从手机相册选择", "取消"]}
                cancelButtonIndex={2}
                onPress={(index) => {
                    if (index === 0) { this.askPermission("camera") }
                    else if (index === 1) { this.askPermission("library") }
                }} />
        )
    }

    async launchImagePicker(type: "library" | "camera" = "library") {
        console.log("here imagepicker")
        let result
        switch (type) {
            case "library": result = await ImagePicker.launchImageLibraryAsync({}); break
            case "camera": result = await ImagePicker.launchCameraAsync({}); break
        }
        if (result.cancelled) return
        //console.log("picker image: " + JSON.stringify(result))
        const { uri } = result
        const imageInfo = { uri: uri, width: result.width, height: result.height }
        console.log("",imageInfo)
        let photo = [];
        photo = this.state.photos;
        photo.push(imageInfo)
        console.log("",imageInfo,photo)
        this.setState({photos:photo})
        /*this.handleImage(imageInfo, (err, handledImage) => {
        })
        if (uri === null) return
        const { uris } = this.props
        const { currentIndex } = this.state
        if (currentIndex === uris.length) {
            uris.push(uri)
            this.images.push(imageInfo)
        } else {
            uris[currentIndex] = uri
            this.images[currentIndex] = imageInfo
        }
        this.setState({})*/
    }

   onPressImagePicker(index: number) {
        this.setState({
            currentField:index
        })
        this._actionSheet.show()
        //return()
    }

    imageBrowserCallback=(callback)=>{
      callback.then((photos) => {
        console.log(photos)
        this.setState({
          imageBrowserOpen: false,
          photos:[...this.state.photos,...photos]
        })
      }).catch((e) => console.log(e))
    }

    renderImage(item, i) {
      return(
        <Image
          style={{height: 100, width: 100,margin:10}}
          source={{uri: item.uri}}
          key={i}
        />
      )
    }

    renderImageUploader(){
        return(
          <View style={{flex:1,marginTop:10,backgroundColor:'#ffffff'}}>
            <Button
              title="选择图片"
              onPress={() => this.props.navigation.push("ImageBrowser",{imageBrowserCallback:this.imageBrowserCallback.bind(this)})}
            />

          </View>
        )
    }

    imageBrowserCallbackTitle=(callback)=>{
      callback.then((photos) => {
        console.log(photos)
        this.setState({
          imageBrowserOpen: false,
          photos1:[...this.state.photos1,...photos]
        })
      }).catch((e) => console.log(e))
    }

    renderImageUploaderTitle(){
        return(
          <View style={{flex:1,marginTop:10,backgroundColor:'#ffffff'}}>
            <Button
              title="选择图片"
              onPress={() => this.props.navigation.push("ImageBrowser",{imageBrowserCallback:this.imageBrowserCallbackTitle.bind(this)})}
            />
            <ScrollView horizontal style={{flex:1}}>
              {this.state.photos1.map((item,i) => this.renderImage(item,i))}
            </ScrollView>
          </View>
        )
    }

    private renderImages() {
        const imageMargin = Config.horizontal
        const imageSquare = (this.state.imageContainerWidth - Config.horizontal * 2 - imageMargin * (IMAGE_NUM_COLUMN - 1)) / IMAGE_NUM_COLUMN
        return (
            <View
                style={{
                    marginTop: 10,
                    backgroundColor: "white",
                    padding: Config.horizontal
                }}
                onLayout={(e) => {
                    const { x, y, width, height } = e.nativeEvent.layout
                    this.setState({ imageContainerWidth: width })
                }} >
                <Text
                    style={{
                        color: Config.textColor,
                        fontSize: 14
                    }} >
                    {"商品图片"}
                </Text>
                <Separator
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 0
                    }} />
                {Platform.OS =='ios'?<ImageUploader
                    ref={(ref) => this.spuImageUploader = ref}
                    style={{ marginTop: 20 }}
                    itemStyle={{ width: imageSquare, height: imageSquare }}
                    numColumns={IMAGE_NUM_COLUMN}
                    maxCount={MAX_IMAGE_COUNT}
                    uris={this.spuUris} />:<View><TouchableOpacity onPress={()=>this.onPressImagePicker(2)}><Text>上传</Text></TouchableOpacity><ScrollView horizontal style={{flex:1}}>
                      {this.state.photos1.map((item,i) => this.renderImage(item,i))}
                    </ScrollView></View>}
            </View>
        )
    }
    renderSpecification() {
        const { specifications } = this.state
        let speciticationTypes = []
        specifications.forEach((specification, i) => {
            let specificationValues = []
            specification.values.forEach((value, j) => {
                specificationValues.push(
                    <View
                        key={j.toString()}
                        style={{
                            borderWidth: 1,
                            borderColor: Config.backgroundColor,
                            borderRadius: 4,
                            height: Config.viewHeight,
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: Config.horizontal
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.textColor
                            }} >
                            {value.value}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.onPressDeleteSpecification(i, j)} >
                            <Icon
                                style={{
                                    width: 24,
                                    height: 24
                                }}
                                icon={DeleteGray} />
                        </TouchableOpacity>
                    </View>
                )
            })
            speciticationTypes.push(
                <View
                    key={i.toString()}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10
                        }} >
                        <Text
                            style={{
                                color: Config.textColor,
                                fontSize: 14
                            }} >
                            {specification.name}
                        </Text>
                        {/* <ManagerEditor buttonStyle={{ width: "100%" }} textStyle={{ fontSize: 14 }} border={false} /> */}
                        {i === 0 ?
                            undefined :
                            <CustomButton
                                textStyle={{ fontSize: 14, color: Config.textColor }}
                                text={"删除"}
                                onPress={() => this.onPressDeleteSpecificationeType(i)} />
                        }
                    </View>
                    {specificationValues}
                    <CustomButton
                        style={{
                            borderWidth: 1,
                            borderColor: Config.backgroundColor,
                            borderRadius: 4,
                            height: Config.viewHeight
                        }}
                        text={"添加"}
                        onPress={() => this.onPressAddSpecification(i)} />
                    <Separator
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 0
                        }} />
                </View>
            )
        })
        return (
            <View
                style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    padding: Config.horizontal
                }} >
                <Text
                    style={{
                        color: Config.textColor,
                        fontSize: 14
                    }} >
                    {"商品规格"}
                </Text>
                <Separator
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 0
                    }} />
                {speciticationTypes}
                <CustomButton
                    style={{
                        borderWidth: 1,
                        borderColor: Config.styleColor,
                        borderRadius: 4,
                        height: Config.viewHeight,
                        marginBottom: 10
                    }}
                    textStyle={{
                        color: Config.styleColor
                    }}
                    text={"添加规格类型"}
                    onPress={() => this.onPressAddSpecificationType()} />
                {/* {this.renderTypePrompt()} */}
                {this.renderSpecificationPrompt()}
            </View>
        )
    }
    renderFooter() {
        return (
            <CustomButton
                style={{
                    alignItems: "center",
                    marginBottom: 10,
                    marginHorizontal: Config.horizontal,
                    height: 36,
                    backgroundColor: Config.styleColor,
                    borderWidth: 1,
                    borderColor: Config.styleColor,
                    borderRadius: 4,
                }}
                textStyle={{
                    fontSize: 16,
                    color: "white"
                }}
                text={"发布商品"}
                onPress={() => Platform.OS==='ios'?this.onPressFooter():this.onPressFooterAndroid()} />
        )
    }

    private renderSpecificationPrompt() {
        const { currentPromptType, addTypeIndex } = this.state
        let title: string = null
        let placeholder: string = null
        let onSubmit: (text?: string) => void
        switch (currentPromptType) {
            case "type": {
                title = "请输入规格类型名称"
                placeholder = "规格类型名称"
                onSubmit = (text) => this.addSpecificationType(text)
                break
            }
            case "specification": {
                title = "请输入规格名称"
                placeholder = "规格名称"
                onSubmit = (text) => this.addSpecification(addTypeIndex, text)
                break
            }
        }
        return (
            <AlertView.Input
                ref={(ref) => this.specificationPrompt = ref}
                title={title}
                placeholder={placeholder}
                inputStyle={{ marginHorizontal: Config.horizontal }}
                cancelText={"取消"}
                submitText={"确定"}
                onSubmit={(value) => onSubmit(value)} />
        )
    }

    private renderDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.dropDown = ref}
                containerStyle={{
                    marginTop: 10,
                    width: 50,
                }}
                itemStyle={{
                    alignItems: "center",
                    height: 25,
                }}
                options={Config.productCategories.map((value) => Transformer.productCategoryToCN(value))}
                onPressItem={(index) => this.onPressFloatItem(index)} >
            </DropDownList>
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                {this.renderActionsheet()}
                <ScrollView
                    style={{
                        flex: 1
                    }} >
                    {this.renderDescription()}
                    {this.renderImages()}
                    {this.renderSpecification()}
                </ScrollView>
                {this.renderFooter()}
                {this.renderDropDown()}
            </View>
        )
    }
}
