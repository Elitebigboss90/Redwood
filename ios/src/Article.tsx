import * as React from "react"
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Alert,
    Linking,
    Modal,
    TouchableWithoutFeedback,
    StatusBar,
    Platform
} from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { Icon, TestAvatarCircle, ArrowDownGray, ImageAddGray, ArrowLeftLight } from "./common/Icon"
import { Footer, FooterButton } from "./common/Footer"
import { DropDownList } from "./common/DropDown"
import { CustomTextInput, CustomButton } from "./common/Custom"
import { Config, PostType, PostCategory } from "./Config"
import { ManagerEditor } from "./Manager"
import { ImageAdder } from "./ImageAdder"
import { ImageUploader } from "./ImageUploader"
import * as Transformer from "./util/Transformer"
import { ImageUtil } from "./util/ImageUtil"
import { APIService } from "./service/apiService"
import { UploadService } from "./service/uploadService"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { NavigatorBackButton } from "./common/Navigator"
import { AlertView } from "./common/Alert"


export class Article extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        const type: string = params && params.type ? params.type : ""
        return {
            title: type + "详情",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private imageActionSheet: AlertView.Sheet
    private selectedImageUrl: string = null
    props: { navigation?: any }
    state: {
        post?: PostService.Post,
        account?: AccountService.Account,
        imageSizes?: ImageUtil.ImageSize[],
        imageModalVisible?: boolean,
        imageIndex?: number,
    }

    constructor(props) {
        super(props)
        this.state = {
            post: null,
            account: null,
            imageSizes: [],
            imageModalVisible: false,
            imageIndex: 0
        }
    }

    componentDidMount() {
        this.getPost()
    }

    private getPost() {
        const { navigation } = this.props
        const { params } = navigation.state
        HUD.show()
        this.api.Post.getPostById({ postId: params.postId }, (err, post) => {
            HUD.hide()
            if (err) return
            this.setState({ post: post })
            this.props.navigation.setParams({ type: Transformer.postTypeToCN(post.type) })
            let sizes: ImageUtil.ImageSize[] = []
            post.images.forEach((uri, index) => {
                const url = Config + uri
                ImageUtil.getSize(Config.root + uri, (err, size) => {
                    sizes[index] = size
                    //console.log("article image" + index + " size: " + JSON.stringify(size))
                    this.setState({ imageSizes: sizes })
                })
            })
        })
        this.api.handleToken((token) => {
            this.api.Authentication.getCurrentAccount(null, (err, result) => {
                if (err) return
                this.setState({ account: result })
            })
        })
    }

    private onPressEdit() {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate("ArticleEditor", { type: this.state.post.type, post: this.state.post })
    }

    private onPressDelete() {
        Alert.alert("是否删除?", null, [{
            text: "否", onPress: () => { }
        }, {
            text: "是", onPress: () => {
                this.api.Post.deletePost({ postId: this.state.post.id }, (err, result) => {
                    // alert(JSON.stringify([err, result]))
                    if (err) result
                    Toast.show("删除成功!")
                    this.props.navigation.goBack()
                })
            }
        }])
    }
    private onPressFooter() {
        const post = this.state.post
        if (post.meta.phone) {
            const contactURL = "tel://" + post.meta.phone
            Linking.canOpenURL(contactURL).then((open) => {
                if (open) {
                    Linking.openURL(contactURL)
                } else {
                    Toast.show("无效的手机号")
                }
            })
        }
    }
    private renderHeader() {
        const { post } = this.state
        if (!post || post.type === PostType.article) return <View />
        const typeText = Transformer.postCategoryToCN(post.category)
        return (
            <View
                style={{
                    flexDirection: "row"
                }} >
                {/* <TouchableWithoutFeedback
                    onPress={() => { }}>
                    <Image
                        style={{
                            width: 44,
                            height: 44
                        }}
                        source={TestAvatarCircle.source} />
                </TouchableWithoutFeedback> */}
                <View
                    style={{
                        marginLeft: 10,
                        justifyContent: "space-between"
                    }} >
                    <Text style={{ fontSize: 16, color: Config.textColor }} >{post ? post.authorName : null}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }} >
                        <Text style={{ fontSize: 12, color: Config.grayColor }} >{post ? Transformer.timestampToString(post.createAt) : null}</Text>
                        {typeText ?
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: Config.styleColor,
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                    borderWidth: 1,
                                    borderColor: Config.styleColor,
                                    borderRadius: 2,
                                    marginLeft: 10,
                                }} >{typeText}</Text> :
                            undefined}
                    </View>
                </View>
            </View>
        )
    }
    private renderFooter() {
        const { post, account } = this.state
        let footer: JSX.Element
        if (account === null || post === null || post.type === PostType.article) {
            footer = null
        } else if (account.id === post.authorId) {
            footer =
                <Footer
                    style={{
                        paddingHorizontal: Config.horizontal,
                        paddingVertical: 5,
                        alignItems: "flex-end",
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.05)"
                    }} >
                    <ManagerEditor
                        onPressEdit={() => this.onPressEdit()}
                        onPressDelete={() => this.onPressDelete()} />
                </Footer>
        } else {
            footer =
                <FooterButton
                    text={"电话联系"}
                    onPress={() => this.onPressFooter()} />
        }
        return (
            <View>
                {footer}
            </View>
        )
    }
    renderImages() {
        const { post, imageSizes } = this.state
        const images = post ? post.images.map((image) => Config.root + image) : []
        let imageNodes: JSX.Element[] = []
        let limitWidth = Dimensions.get("window").width - Config.horizontal * 2
        images.forEach((image, index) => {
            //if (index > 0) return
            const limitSize: ImageUtil.ImageSize = { width: limitWidth, height: limitWidth }
            const imageSize = imageSizes && imageSizes[index] ? imageSizes[index] : limitSize
            const size: ImageUtil.ImageSize = ImageUtil.sizeToLimit(imageSize, limitSize)
            const imageNode =
                <TouchableWithoutFeedback
                    key={index.toString()}
                    onPress={() => this.setState({
                        imageModalVisible: true,
                        imageIndex: index
                    })}>
                    <Image
                        style={{
                            width: size.width,
                            height: size.height,
                            marginBottom: 10
                        }}
                        resizeMode={"contain"}
                        source={{ uri: image }} />
                </TouchableWithoutFeedback>
            imageNodes.push(imageNode)
        })
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    marginVertical: 10,
                }}>
                {imageNodes}
            </View>
        )
    }
    renderImageModal() {
        const { post } = this.state
        const uris = post && post.images || []
        let images: { url: string }[] = []
        uris.forEach((uri, index) => {
            images.push({ url: Config.root + uri })
        })
        return (
            <View>
                <Modal
                    // style={{
                    //     margin: 0
                    // }}
                    visible={this.state.imageModalVisible}
                    transparent={false}
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
                        }}
                    />
                </Modal>
            </View>
        )
    }

    renderImageActionSheet() {
        const { post, imageIndex } = this.state
        let selectedImageUrl = post && post.images && post.images.length && Config.root + post.images[imageIndex]
        //console.log(selectedImageUrl)
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

    render() {
        const { post } = this.state
        // <ArticleHeader
        //     data={{
        //         name: post.authorName,
        //         time: Transformer.timestampToString(post.createAt),
        //         type: Transformer.postCategoryToCN(post.category)
        //     }} />
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                <ScrollView
                    style={{
                        flex: 1,
                        paddingHorizontal: Config.horizontal,
                        paddingTop: Config.horizontal,
                        backgroundColor: "white"
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true} >
                    {this.renderHeader()}
                    <Text
                        style={{
                            fontSize: 18,
                            color: Config.textColor,
                            marginTop: 16
                        }}
                        numberOfLines={3}
                        selectable={true} >
                        {post && post.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: Config.grayColor,
                            marginTop: 8
                        }}
                        selectable={true} >
                        {post && post.content}
                    </Text>
                    {this.renderImages()}
                    {/* <CustomButton
                        type={"image"}
                        imageStyle={{
                            width: Dimensions.get("window").width - Config.horizontal * 2,
                            height: TestArticleDetail.height, marginTop: 16
                        }}
                        image={{ uri: images[0] }}
                        onPress={() => this.props.navigation.navigate("ImageViewer", { images: images })} /> */}
                </ScrollView>
                {this.renderFooter()}
                {this.renderImageModal()}
                {this.renderImageActionSheet()}
            </View>
        )
    }
}

class ArticleHeader extends React.Component {
    props: {
        data: { name: string, time: string, type?: string }
    }
    render() {
        const { data } = this.props
        return (
            <View
                style={{
                    flexDirection: "row"
                }} >
                <Icon icon={TestAvatarCircle} />
                <View
                    style={{
                        marginLeft: 10,
                        justifyContent: "space-between"
                    }} >
                    <Text style={{ fontSize: 16, color: Config.textColor }} >{this.props.data.name}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }} >
                        <Text style={{ fontSize: 12, color: Config.grayColor }} >{this.props.data.time}</Text>
                        {data.type ?
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: Config.styleColor,
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                    borderWidth: 1,
                                    borderColor: Config.styleColor,
                                    borderRadius: 2,
                                    marginLeft: 10,
                                }} >{this.props.data.type}</Text> :
                            undefined}
                    </View>
                </View>
            </View>
        )
    }
}



const IMAGE_NUM_COLUMN = 3
const MAX_IMAGE_COUNT = 3

export class ArticleEditor extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            title: "发布" + Transformer.postTypeToCN(params.type),
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private dropDown: DropDownList
    private typeDown: React.Component
    private titleTextInput: CustomTextInput
    private bodyTextInput: CustomTextInput
    private api = new APIService()
    private imageUploader: ImageUploader
    private uris: string[]
    private post: PostService.Post
    props: { navigation?: any }
    state: {
        currentCategory?: number,
        imageContainerWidth?: number
    }

    constructor(props) {
        super(props)
        this.state = {
            imagecontainerwidth: 0,
            currentCategory: -1
        }
        this.api.handleNeedToken(this)
        this.post = this.props.navigation.state.params.post || null
        this.uris = this.post ? this.post.images.map((value) => Config.root + value) : []
    }
    private onPressTypeDown() {
        this.dropDown.showInTarget(this.typeDown)
    }
    onPressFloatItem(index: number) {
        this.setState({ currentCategory: index })
    }
    onPressRelease() {
        let title = this.titleTextInput.text
        let body = this.bodyTextInput.text
        if (title === null || body === null) {
            Toast.show("输入为空!")
            return
        }
        const category = Config.categories[this.state.currentCategory] || null
        if (!category && this.typeDown) {
            Toast.show("请选择服务分类")
            return
        }
        HUD.show()
        this.imageUploader.uploads((err, images) => {
            if (err) {
                // alert(err)
                return
            }
            const { params } = this.props.navigation.state
            if (this.post) {
                // alert(JSON.stringify(this.post))
                // alert(JSON.stringify(this.api.Post.factory.option))
                this.api.Post.updatePost({ postId: this.post.id, title: title, content: body, images: images }, (err, result) => {
                    HUD.hide()
                    Toast.show("更新成功")
                    // alert(JSON.stringify([err, result]))
                    if (err) return
                    const post: PostService.Post = result
                    this.props.navigation.goBack()
                })
                return;
            }
            this.api.Authentication.getCurrentAccount(null, (err, result) => {
                let meta = { phone: null }
                if (result) meta.phone = result.props.phone
                this.api.Post.createPost({ type: params.type, title: title, content: body, images: images, category: category, meta: meta }, (err, result) => {
                    HUD.hide()
                    // alert(JSON.stringify([err, result]))
                    if (err) return
                    const post: PostService.Post = result
                    this.props.navigation.goBack()
                    const didBlur = this.props.navigation.addListener(
                        'didBlur',
                        payload => {
                            // alert(JSON.stringify([payload]))
                            this.props.navigation.navigate("Article", { postId: post.id })
                        })
                    didBlur.remove()
                })
            })
        })
    }
    renderImages() {
        const imageMargin = Config.horizontal
        const imageSquare = (this.state.imageContainerWidth - imageMargin * (IMAGE_NUM_COLUMN - 1)) / IMAGE_NUM_COLUMN
        return (
            <ImageUploader
                ref={(ref) => this.imageUploader = ref}
                style={{ marginTop: 20 }}
                itemStyle={{ width: imageSquare, height: imageSquare }}
                numColumns={IMAGE_NUM_COLUMN}
                maxCount={IMAGE_NUM_COLUMN}
                uris={this.uris}
            />
        )
    }
    private renderDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.dropDown = ref}
                options={Config.categories.map((value) => Transformer.postCategoryToCN(value))}
                backgroundStyle={{
                    backgroundColor: "transparent"
                }}
                containerStyle={{
                    borderWidth: 1,
                    borderColor: "#DDDDDD",
                    borderRadius: 5,
                    paddingLeft: Config.horizontal,
                    height: 120,
                }}
                itemStyle={{
                    height: 25,
                }}
                onPressItem={(index) => this.onPressFloatItem(index)} >
            </DropDownList>
        )
    }
    render() {
        let typeText = undefined
        let typeSelector = undefined
        const { params } = this.props.navigation.state
        const { currentCategory } = this.state
        if (this.post) { }
        else if (params.type === PostType.subject) {
            typeText = currentCategory < 0 ? "服务分类" : Transformer.postCategoryToCN(Config.categories[currentCategory])
            typeSelector =
                <View
                    style={{
                        marginTop: 10,
                        padding: Config.horizontal,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                    }} >
                    <TouchableOpacity
                        style={{
                            width: "100%"
                        }}
                        onPress={() => this.onPressTypeDown()} >
                        <View
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                height: 44,
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderColor: "#DDDDDD",
                                borderWidth: 1,
                                borderRadius: 4,
                            }}
                            ref={(ref) => this.typeDown = ref} >
                            <Text
                                style={{
                                    fontSize: 14
                                }} >
                                {typeText}
                            </Text>
                            <Icon
                                style={{
                                    marginVertical: 10
                                }}
                                icon={ArrowDownGray} />
                        </View>
                    </TouchableOpacity>
                </View>
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }}>
                <ScrollView>
                    <View
                        style={{
                            padding: Config.horizontal,
                            backgroundColor: "white",
                            flex: 1,
                        }} >
                        <CustomTextInput
                            ref={(ref) => this.titleTextInput = ref}
                            multiline={true}
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.bodyTextInput.focus()}
                            placeholder={"标题"}
                            defaultValue={this.post ? this.post.title : null} />
                        <View
                            style={{
                                top: 10,
                                width: "100%",
                                height: 1,
                                backgroundColor: Config.backgroundColor
                            }} />
                        <View
                            style={{ justifyContent: "space-between" }}
                            onLayout={(e) => {
                                const { x, y, width, height } = e.nativeEvent.layout
                                this.setState({ imageContainerWidth: width })
                            }} >
                            <CustomTextInput
                                ref={(ref) => this.bodyTextInput = ref}
                                style={{ marginTop: 15 }}
                                multiline={true}
                                placeholder={"文字内容"}
                                defaultValue={this.post ? this.post.content : null} />
                            {this.renderImages()}
                        </View>
                    </View>
                    {typeSelector}
                </ScrollView>
                <CustomButton
                    style={{
                        marginBottom: 15,
                        marginHorizontal: Config.horizontal,
                        justifyContent: "center",
                        backgroundColor: Config.styleColor,
                        height: Config.viewHeight
                    }}
                    textStyle={{
                        color: "white"
                    }}
                    text={this.post ? "重新发布" : "确认发布"}
                    onPress={() => this.onPressRelease()} />
                {this.renderDropDown()}
            </View>
        )
    }
}
