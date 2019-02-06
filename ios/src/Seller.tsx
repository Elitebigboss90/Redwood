import * as React from "react"
import {
    View,
    Image,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Alert,
    Dimensions,
    AsyncStorage,
    Linking,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    findNodeHandle,
    NativeModules,
    Platform,
} from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon, TestAvatarCircle, ContactGray, LocationGray, ContactRed, ArrowDownGray } from "./common/Icon"
import { Config, ProductCategory, PostType } from "./Config"
import { Separator } from "./common/Separator"
import { ImagePicker, ImageManipulator } from "expo"
import { CustomTextInput, CustomButton } from "./common/Custom"
import { FooterButton } from "./common/Footer"
import { APIService } from "./service/apiService"
import { UploadService } from "./service/uploadService"
import { TabMenu } from "./common/TabMenu"
import { Navigator } from "./common/Navigator"
import { SearchBar } from "./common/SearchBar"
import * as Transformer from "./util/Transformer"
import { DistrictSelector } from "./DistrictSelector"
import { AlertView } from "./common/Alert"
import { ImageViewer } from "react-native-image-zoom-viewer"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { Permission } from "./Permission"
import { ImageUtil } from "./util/ImageUtil"
import { NavigatorBackButton } from "./common/Navigator"
import { ImageUploader } from "./ImageUploader"
import { builtinModules } from "module";
import { retry, select } from "async";

export class Seller extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props
        return {
            title: "商家详情",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private tabTitles = ["全部商品", "职位信息"]
    private listScrollView: ScrollView
    private readonly pageWidth = Dimensions.get("window").width
    private readonly productNumColumn = 2
    private readonly productListPadding = Config.horizontal
    private sellerId: string = null
    props: { navigation?: any }
    state: {
        seller?: ShopService.Seller,
        currentTabIndex: number,
        // datas?: Array<ShopService.Product | PostService.Post>
        products?: ShopService.Product[],
        jobs?: PostService.Post[],
    }
    constructor(props) {
        super(props)
        this.state = {
            currentTabIndex: 0,
            seller: {
                ownerId: null,
                id: null,
                name: "",
                contact: {
                    name: "",
                    phone: "",
                    addressDetail: "",
                    addressDistrict: {
                        province: { code: "", name: "", level: "province" },
                        city: { code: "", name: "", level: "city" },
                        area: { code: "", name: "", level: "area" },
                    }
                },
                avatar: "",
                description: "",
                createAt: 0,
                productCount: 0,
                meta: null,
                verified: false,
            },
            products: [],
            jobs: [],
        }
        const { params } = props.navigation.state
        if (params) {
            this.sellerId = params.id ? params.id : null
        }
    }

    componentDidMount() {
        this.getSellerById(this.sellerId)
    }

    private getSellerById(sellerId: string) {
        if (!sellerId) return
        this.api.Shop.getSellerById({ sellerId: sellerId }, (err, result) => {
            if (err) return
            this.setState({ seller: result })
            this.queryDatas()
        })
    }

    private queryDatas(page: number = 0, type: number = this.state.currentTabIndex) {
        const { seller } = this.state
        let id: string = type === 0 ? seller.id : seller.ownerId
        HUD.show()
        if (type === 0) {
            this.api.Shop.queryProducts({ sellerId: id }, (err, result) => {
                HUD.hide()
                // alert(JSON.stringify([err, result]))
                if (err) return
                this.setState({ products: result })
            })
        } else if (type === 1) {
            this.api.Post.queryPosts({ authorId: id, type: PostType.position }, (err, result) => {
                HUD.hide()
                // alert(JSON.stringify([err, result]))
                if (err) return
                this.setState({ jobs: result })
            })
        }
    }
    private onPressContact() {
        const contactURL = "tel://" + this.state.seller.contact.phone
        Linking.canOpenURL(contactURL).then((open) => {
            if (open) {
                Linking.openURL(contactURL)
            } else {
                Toast.show("无效的手机号")
            }
        })
    }
    private onPressRow(item, index) {
        const { currentTabIndex } = this.state
        if (currentTabIndex === 0) {
            const product = this.state.products[index]
            if (product && product.disabled) {
                Toast.show(Config.productDisabledPrompt)
            } else {
                this.props.navigation.navigate("SPU", { id: product.id })
            }
        } else if (currentTabIndex === 1) {
            const job = this.state.jobs[index]
            this.props.navigation.navigate("Article", { type: PostType.job, postId: job.id })
        }
    }
    private onPressTabMenu(index) {
        this.setState({ currentTabIndex: index })
        this.listScrollView.scrollTo({ x: this.pageWidth * index, animated: true })
        this.queryDatas(0, index)
    }
    private renderRowProduct(item, index) {
        const data: ShopService.Product = item
        const margin = Config.horizontal
        const horizontalMargin = 20
        const verticalMargin = 20
        const width = (this.pageWidth - this.productListPadding * 2 - horizontalMargin * (this.productNumColumn - 1)) / this.productNumColumn
        return (
            <TouchableOpacity
                onPress={() => this.onPressRow(item, index)} >
                <View
                    style={{
                        alignItems: "center",
                        width: width,
                        height: 220,
                        marginLeft: index % 2 === 0 ? 0 : horizontalMargin,
                        marginTop: index < this.productNumColumn ? 0 : verticalMargin,
                    }}>
                    <Image
                        style={{
                            flex: 1,
                            width: "100%"
                        }}
                        source={data && data.thumbs ? { uri: Config.root + data.thumbs[0] } : TestSKUItem.source} />
                    <Text
                        style={{
                            marginTop: 8,
                            fontSize: 14
                        }}
                        numberOfLines={2} >
                        {data.name}
                    </Text>
                    <Text
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            fontSize: 14
                        }}>
                        {"¥" + Transformer.centToYuan(data.basePrice)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    private renderRowJob(item, index) {
        const data: PostService.Post = item
        return (
            <TouchableOpacity
                onPress={() => this.onPressRow(item, index)}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 15,
                        paddingVertical: 20,

                    }} >
                    <Text
                        style={{
                            fontSize: 16
                        }}>
                        {data.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor
                        }}>
                        {Transformer.timestampToString(data.createAt)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    private renderHeader() {
        const { seller } = this.state
        const addressDistrict = seller.contact.addressDistrict
        const province = addressDistrict.province ? addressDistrict.province.name : ""
        const city = addressDistrict.city ? addressDistrict.city.name : ""
        const area = addressDistrict.area ? addressDistrict.area.name : ""
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "white",
                }} >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }}
                    source={seller.avatar ? { uri: Config.root + seller.avatar } : TestAvatarCircle.source} />
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                    }} >
                    <Text
                        style={{
                            color: Config.textColor,
                            fontSize: 14,
                            marginLeft: 3
                        }}
                        selectable={true} >
                        {seller.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 8
                        }} >
                        <Icon icon={ContactGray} />
                        <Text
                            style={{
                                color: Config.grayColor,
                                fontSize: 10,
                            }}
                            selectable={true}>
                            {seller.contact.phone}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }} >
                        <Icon icon={LocationGray} />
                        <Text
                            style={{
                                flex: 1,
                                color: Config.grayColor,
                                fontSize: 10,
                            }}
                            selectable={true}
                            numberOfLines={3}>
                            {province + city + area + seller.contact.addressDetail}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.onPressContact()} >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeftWidth: 1,
                            borderLeftColor: "#D8D8D8",
                            paddingLeft: 15,
                        }}>
                        <Icon icon={ContactRed} />
                        <Text
                            style={{
                                color: Config.grayColor,
                                fontSize: 10,
                                marginTop: 4
                            }}>
                            {"联系卖家"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    private renderTab() {
        return (
            <TabMenu
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: Config.horizontal,
                    marginTop: 8
                }}
                textContainerStyle={{
                    height: 44
                }}
                itemStyle={{
                    marginLeft: 20
                }}
                itemTextStyle={{
                    fontSize: 16
                }}
                scrollEnabled={false}
                currentSelectedIndex={this.state.currentTabIndex}
                tabs={this.tabTitles}
                onPressItem={(index) => this.onPressTabMenu(index)} />
        )
    }
    private renderLists() {
        let lists: JSX.Element[] = []
        this.tabTitles.forEach((title, index) => {
            let list: JSX.Element
            if (index === 0) {
                list = <FlatList
                    contentContainerStyle={{
                        width: this.pageWidth,
                        padding: Config.horizontal
                    }}
                    data={this.state.products}
                    numColumns={this.productNumColumn}
                    key={title}
                    renderItem={({ item, index }) => this.renderRowProduct(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            } else if (index === 1) {
                list = <FlatList
                    contentContainerStyle={{
                        width: this.pageWidth,
                    }}
                    data={this.state.jobs}
                    key={title}
                    renderItem={({ item, index }) => this.renderRowJob(item, index)}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
            lists.push(list)
        })
        return lists
    }
    render() {
        const pageWidth = this.pageWidth
        const page = this.tabTitles.length
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                {this.renderHeader()}
                {this.renderTab()}
                <ScrollView
                    ref={(ref) => this.listScrollView = ref}
                    style={{
                        marginTop: 8,
                        backgroundColor: "white"
                    }}
                    // contentContainerStyle={{
                    //     width: pageWidth * page,
                    // }}
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
                            this.queryDatas(0, offsetPage)
                        }
                    }} >
                    {this.renderLists()}
                </ScrollView>
            </View>
        )
    }
}

export class SellerApply extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props;
        const id = navigation.state.params.id
        return {
            title: id ? "厂家信息" : "厂家入驻",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private uploader = new UploadService()
    private scrollView?: KeyboardAwareScrollView
    private nameTI?: CustomTextInput
    private avatarTI?: CustomTextInput
    private phoneTI?: CustomTextInput
    private districtTI?: CustomTextInput
    private addressTI?: CustomTextInput
    private descriptionTI?: CustomTextInput
    private actionSheet: AlertView.Sheet
    private licenseUploader: ImageUploader
    props: { navigation?: any }
    state: {
        seller?: ShopService.Seller,
        ModalVisible?: boolean,
        district?: ContactService.AddressDistrict,
        avatarURI?: string,
        imageModalVisible?: boolean,
    }

    constructor(props) {
        super(props)
        this.state = {
            seller: null,
            ModalVisible: false,
            district: null,
            avatarURI: null,
            imageModalVisible: false,
        }
        this.api.handleNeedToken(this)
    }

    componentDidMount() {
        this.getAccountSeller()

    }

    componentWillUnmount() {
    }

    private getAccountSeller() {
        HUD.show()
        this.api.Shop.getAccountSeller(null, (err, result) => {
            HUD.hide()
            // alert(JSON.stringify([err, result]))
            if (err) return
            this.setState({
                seller: result,
                district: result.contact.addressDistrict,
                avatarURI: result.avatar
            })
        })
    }

    private async askPermission(type: "library" | "camera" = "library") {
        switch (type) {
            case "library": {
                Permission.cameraRollPermissionHandler((response) => {
                    this.launchImagePicker(type)
                })
                break
            }
            case "camera": {
                Permission.askPermission("camera", (response) => {
                    Permission.permissionResponseHandler(response, (response) => {
                        this.launchImagePicker(type)
                    })
                })
                break
            }
        }
    }

    private async launchImagePicker(type: "library" | "camera" = "library") {
        let result
        switch (type) {
            case "library": {
                result = await ImagePicker.launchImageLibraryAsync({})
                break
            }
            case "camera": {
                result = await ImagePicker.launchCameraAsync({})
                break
            }
        }
        if (result.cancelled) { return }
        else {
            HUD.show()
            ImageUtil.manipulate(result.uri, { action: { resize: { width: 200, height: 200 } } }, (err, manipulateResult) => {
                const uri = manipulateResult.uri
                const file = { uri: uri, type: "image/jpeg", name: "upload.jpg" }
                if (uri === null) return
                else {
                    this.uploader.upload(file, (err, blob) => {
                        HUD.hide()
                        // alert(JSON.stringify([err, blob]))
                        if (err) {
                            Toast.show("上传失败")
                            return
                        }
                        this.setState({ avatarURI: blob.urls[0].value })
                    })
                }
            })
        }
    }

    private applyOrUpdateSeller(type: "apply" | "update",
        option: {
            id?: string,
            name: string,
            phone: string,
            district: ContactService.AddressDistrict,
            detailAddress: string,
            avatar: string,
            description: string,
            meta: any
        },
        callback: Callback<null>): void {
        console.log("apply seller", option)
        let { id, name, phone, district, detailAddress, avatar, description, meta } = option
        let handler = (err: Error) => {
            if (err) {
                if (err.name === "AlreadyExists") {
                    Toast.show("该厂家名称已存在，请填写其他名称")
                    return
                }
                callback && callback(err)
                return
            }
            callback && callback(null)
        }
        if (type == "apply") {
            this.api.Shop.applySeller({
                name: name,
                contact: {
                    name: name,
                    phone: phone,
                    addressDistrict: district,
                    addressDetail: detailAddress,
                },
                avatar: avatar,
                description: description,
                meta
            },
                (err) => {
                    handler(err)
                }
            )
        } else if (type == "update") {
            this.api.Shop.updateAccountSeller({
                sellerId: id,
                name: name,
                contact: {
                    name: name,
                    phone: phone,
                    addressDistrict: district,
                    addressDetail: detailAddress,
                },
                avatar: avatar,
                description: description,
                meta
            }, (err) => {
                handler(err)
            })
        }
    }

    private onPressAvatar() {
        this.actionSheet.show()
    }

    private onPressSelectArea() {
        this.setState({ ModalVisible: true })
    }

    private onPressConfirmDistrict(district: ContactService.AddressDistrict) {
        this.setState({ ModalVisible: false, district: district })
        // alert(JSON.stringify(district))
    }

    private onPressFooter() {
        const { seller, district } = this.state
        let name = this.nameTI.text
        let avatarURI = this.state.avatarURI
        let phone = this.phoneTI.text
        let addressDetail = this.addressTI.text
        let description = this.descriptionTI.text
        if (seller) {
            name = name || seller.name
            avatarURI = avatarURI || seller.avatar
            phone = phone || seller.contact.phone
            addressDetail = addressDetail || seller.contact.addressDetail
            description = description || seller.description
            if (!(name && phone && district && addressDetail && description)) {
                Toast.show("输入为空")
                return
            }
            if (seller.verified) {
                this.applyOrUpdateSeller("update", {
                    id: seller.id,
                    name,
                    phone,
                    district,
                    detailAddress: addressDetail,
                    avatar: avatarURI,
                    description,
                    meta: seller.meta
                }, (err) => {
                    if (err) {
                        Toast.show("更新失败")
                        return
                    }
                    Toast.show("更新成功")
                    this.props.navigation.goBack()
                    return
                })
                return
            }
            this.licenseUploader.uploads((err, images) => {
                if (err) {
                    Toast.show("图片上传失败，请稍后重试")
                    return
                }
                console.log("uploader", images)
                this.applyOrUpdateSeller("update", {
                    id: seller.id,
                    name,
                    phone,
                    district,
                    detailAddress: addressDetail,
                    avatar: avatarURI,
                    description,
                    meta: {
                        businessLicense: images && images[0] || seller.meta.businessLicense
                    }
                }, (err) => {
                    if (err) {
                        Toast.show("更新失败")
                        return
                    }
                    Toast.show("更新成功")
                    this.props.navigation.goBack()
                })
            })
        } else {
            if (name === null || phone === null || district === null || addressDetail === null || description === null) {
                Toast.show("输入为空")
                return
            }
            HUD.show()
            if (!this.licenseUploader) {
                Toast.show("未选择图片")
                return
            }
            this.licenseUploader.uploads((err, images) => {
                if (err) {
                    Toast.show("图片上传失败，请稍后重试")
                    HUD.hide()
                    return
                }
                let businessLicense: string
                if (!images || !images.length) {
                    Toast.show("未选择图片")
                    return
                } else {
                    businessLicense = images[0]
                }
                let meta = { businessLicense }
                this.applyOrUpdateSeller("apply", {
                    name,
                    phone,
                    district: district,
                    detailAddress: addressDetail,
                    avatar: avatarURI,
                    description,
                    meta
                }, (err) => {
                    HUD.hide()
                    if (err) {
                        Toast.show("申请失败")
                        return
                    }
                    Toast.show("申请成功")
                    this.props.navigation.goBack()
                })
            })
        }
    }

    private onFocusSellerDescription() {

    }
    private renderInputContent() {
        const { seller, district, avatarURI } = this.state
        return (
            <KeyboardAwareScrollView
                ref={(ref) => this.scrollView = ref}
                style={{
                    flex: 1,
                    //height: this.state.keyboardScrollOffsetY || null
                }}
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: Config.horizontal,
                }}
                enableOnAndroid={true}
            >
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
                        {"厂家名称"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.nameTI = ref}
                        style={{
                            marginLeft: 10,
                            flex: 1
                        }}
                        placeholder={"请输入厂家名称"}
                        multiline={true}
                        defaultValue={seller ? seller.name : null} />
                </View>
                <Separator />
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"厂家头像"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.avatarTI = ref}
                        style={{
                            marginLeft: 10,
                            flex: 1
                        }}
                        placeholder={"点击上传"}
                        editable={false} />
                    <CustomButton
                        imageStyle={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                        }}
                        onPress={() => this.onPressAvatar()}
                        type={"image"}
                        image={avatarURI ? { uri: Config.root + avatarURI } : TestAvatarCircle.source} />
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
                        {"联系电话"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.phoneTI = ref}
                        style={{
                            marginLeft: 10,
                            flex: 1
                        }}
                        placeholder={"请输入联系电话"}
                        keyboardType={"numeric"}
                        defaultValue={seller ? seller.contact.phone : null} />
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
                        {"所在地区"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.districtTI = ref}
                        style={{
                            marginLeft: 10,
                            flex: 1,
                            flexDirection: "row"
                        }}
                        placeholder={"请选择地区"}
                        multiline={true}
                        editable={false}
                        defaultValue={district ? district.province.name + " " + district.city.name + " " + district.area.name : ""}
                    />
                    <TouchableOpacity
                        onPress={() => this.onPressSelectArea()} >
                        <Icon icon={ArrowDownGray} />
                    </TouchableOpacity>
                </View>
                <Separator />
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
                        {"详细地址"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => this.addressTI = ref}
                        style={{
                            marginLeft: 10,
                            flex: 1
                        }}
                        placeholder={"请输入详细地址"}
                        multiline={true}
                        defaultValue={seller ? seller.contact.addressDetail : null} />
                </View>
                <Separator />
                <View
                    style={{
                        paddingVertical: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            width: 60
                        }} >
                        {"介绍详情"}
                    </Text>
                    <CustomTextInput
                        ref={(ref) => {
                            this.descriptionTI = ref
                        }}
                        style={{
                            marginTop: 10,
                            flex: 1
                        }}
                        multiline={true}
                        placeholder={"请输入商家介绍"}
                        onFocus={() => {
                            let node = findNodeHandle(this.descriptionTI)
                            this.scrollView.scrollToFocusedInput(node, 100, 0)

                        }}
                        collapsable={false}
                        defaultValue={seller ? seller.description : null} />
                </View>
                {seller && seller.verified ? null : <Separator />}
                {seller && seller.verified ? null : this.renderLicenseUploader()}
            </KeyboardAwareScrollView>
        )
    }

    private renderDistrictModal() {
        return (
            <Modal
                visible={this.state.ModalVisible}
                animationType={"none"}
                transparent={true} >
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ ModalVisible: false })} >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.3)"
                        }} >
                        <DistrictSelector
                            style={{
                                backgroundColor: "white",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: Dimensions.get("window").height * 0.6
                            }}
                            onPressConfirm={(district) => this.onPressConfirmDistrict(district)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    private renderFooter() {
        const { seller } = this.state
        return (
            <FooterButton
                text={this.state.seller ? "更新信息" : "确认入驻"}
                onPress={() => this.onPressFooter()} />
        )
    }

    private renderAvarModal() {
        return (
            <Modal
                visible={this.state.imageModalVisible}
                transparent={true}
                onRequestClose={() => this.setState({ imageModalVisible: false })}>
                <ImageViewer
                    imageUrls={[{ url: Config.root + this.state.avatarURI }]}
                    index={0}
                    onClick={() => this.setState({ imageModalVisible: false })} />
            </Modal>
        )
    }
    private renderAvatarActionSheet() {
        const { avatarURI } = this.state
        let options = ["拍照", "从手机相册选择", "查看大图", "取消"]
        if (avatarURI === null) options.splice(2, 1)
        return (
            <AlertView.Sheet
                ref={(ref) => this.actionSheet = ref}
                options={options}
                cancelButtonIndex={options.length - 1}
                onPress={(index) => {
                    if (index === 0) { this.askPermission("camera") }
                    else if (index === 1) { this.askPermission("library") }
                    else if (avatarURI && index === 2) {
                        this.setState({ imageModalVisible: true })
                    }
                }} />
        )
    }

    private renderLicenseUploader() {
        const { seller } = this.state
        const businessLicense = seller && seller.meta && seller.meta.businessLicense
        const imageSize = 100
        return (
            <View
                style={{
                    marginTop: 10,
                }} >
                <Text
                    style={{
                        color: Config.textColor,
                        fontSize: 14
                    }} >
                    {"上传营业执照或手持个人身份证正面"}
                </Text>
                <ImageUploader
                    ref={(ref) => this.licenseUploader = ref}
                    style={{
                        marginTop: 10,
                    }}
                    itemStyle={{ width: imageSize, height: imageSize }}
                    numColumns={1}
                    maxCount={1}
                    uris={businessLicense ? [(Config.root + businessLicense)] : []}
                />
            </View >

        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }}>
                {this.renderInputContent()}
                {this.renderFooter()}
                {this.renderAvatarActionSheet()}
                {this.renderAvarModal()}
                {this.renderDistrictModal()}
            </View>
        )
    }
}
