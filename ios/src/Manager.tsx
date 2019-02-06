import * as React from "react"
import { View, Image, Text, Alert, FlatList, AsyncStorage, ScrollView, TouchableOpacity, Modal, ImageEditor, PermissionsAndroid, Platform, CameraRoll } from "react-native"
import { AlertView } from "./common/Alert"
import { ImagePicker, ImageManipulator } from "expo"
import { Wechat } from "./Wechat"
import { Config, PostType } from "./Config"
import { Cell, IOSContent, SubjectManagerContent, JobManagerContent } from "./common/Cell"
import { FooterButton } from "./common/Footer"
import { CustomButton } from "./common/Custom"
import { Icon, TestAvatarCircle, ArrowDownGray, ArrowRightGray, TabBarAccountSelected } from "./common/Icon"
import { Separator } from "./common/Separator"
import { APIService } from "./service/apiService"
import { UploadService } from "./service/uploadService"
import * as Transformer from "./util/Transformer"
import { ImageViewer } from "react-native-image-zoom-viewer"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { Permission } from "./Permission"
import { ImageUtil } from "./util/ImageUtil"
import { NavigatorBackButton } from "./common/Navigator"

export class AccountManager extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props;
        return {
            title: "设置",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private uploader = new UploadService()
    private actionSheet: AlertView.Sheet
    private displayNamePrompt: AlertView.Input
    props: { navigation?: any }
    state: {
        avatarURI?: string,
        account?: AccountService.Account,
        imageModalVisible?: boolean,
        accountAuthentications?: any[]
    }

    constructor(props) {
        super(props)
        const account = this.props.navigation.state.params.account || null
        this.state = {
            avatarURI: account ? account.props.avatar : null,
            account: account,
            imageModalVisible: false,
            accountAuthentications: []
        }
        this.api.handleNeedToken(this)
    }

    componentDidMount() {
        const { account } = this.state
        if (!account || !account.id) {
            return
        }
        this.getAccountAuthentications(account.id)
    }

    private getAccountAuthentications(accountId: string) {
        if (!accountId) {
            return
        }
        this.api.Authentication.getAccountAuthentications({ accountId: accountId }, (err, authentications) => {
            if (err) {
                //console.log("getAccountAuthentications failed ", JSON.stringify(err))
                return
            }
            //console.log("getAccountAuthentications ", JSON.stringify(authentications))
            this.setState({ accountAuthentications: authentications })
        })
    }

    private isAuthenticationByType(type: "phone" | "openId", authentications: any[]) {
        if (!type || !authentications) {
            return
        }
        let isAuthentication = false
        authentications.forEach(authentication => {
            if (authentication.type === type.toString()) {
                isAuthentication = true
                return
            }
        })
        return isAuthentication
    }

    private updateDisplayName(name?: string) {
        //console.log("displayName", name)
        if (!name) return
        HUD.show()
        this.api.Account.updateAccount({ displayName: name }, (err, result) => {
            HUD.hide()
            // alert(JSON.stringify([err, result]))
            if (err) {
                Toast.show("用户名修改失败")
                return
            }
            let account = this.state.account
            account.displayName = name
            this.setState({ account: account })
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
            ImageUtil.manipulate(result.uri, { action: { resize: { width: 400, height: 400 } } }, (err, manipulateResult) => {
                const uri = manipulateResult.uri
                const file = { uri: uri, type: "image/jpeg", name: "upload.jpg" }
                if (uri === null) return
                else {
                    this.uploader.upload(file, (err, blob) => {
                        if (err) {
                            Toast.show("上传失败")
                            HUD.hide()
                            return
                        }
                        const uploadedUri = blob.urls[0].value
                        this.setState({ avatarURI: uploadedUri })
                        this.api.Account.updateAccount({ avatar: uploadedUri }, (err, result) => {
                            HUD.hide()
                            if (err) {
                                Toast.show("头像上传失败")
                                return
                            }
                        })
                    })
                }
            })
        }
    }

    private bindWechat() {
        const { account, accountAuthentications } = this.state
        if (!account || !account.id || !accountAuthentications) return
        if (this.isAuthenticationByType("openId", accountAuthentications)) {
            Toast.show("您已绑定微信")
            return
        }
        Wechat.isWXAppInstalled((err, installed) => {
            if (err) {
                return
            }
            if (!installed) {
                Toast.show(Wechat.errorMessage.uninstall)
                return
            }
            Wechat.sendAuthRequest("snsapi_userinfo", (err, authResponse) => {
                if (err || !authResponse.code) {
                    Toast.show(Wechat.errorMessage.authFailure)
                    return
                }
                const { code } = authResponse
                this.api.Authentication.getWechatOpenIdByCode({
                    wechatCode: code
                }, (err, result) => {
                    console.log("sfgwse", err, result)
                    if (err || !result || !result.openId) {
                        Toast.show("微信绑定失败")
                        return
                    }
                    let { openId } = result
                    this.api.Authentication.bindWechat({ accountId: account.id, openId }, (err) => {
                        if (err) {
                            Toast.show("微信绑定失败")
                            //console.log("bind wechat faild: ", JSON.stringify(err))
                            return
                        }
                        Toast.show("微信绑定成功")
                        this.getAccountAuthentications(account.id)
                    })
                })

            })
        })
    }
    private onPressRow(item, index) {
        if (index === 3) {
            this.props.navigation.navigate("ReceiverManager")
        }
    }
    private onPressAvatar() {
        this.actionSheet.show()
    }
    private onPressDisplayName() {
        this.displayNamePrompt.show()
    }
    private onPressFooter() {
        Alert.alert("是否退出登录?", null, [{ text: "否", onPress: () => { } }, {
            text: "是", onPress: () => {
                AsyncStorage.removeItem(Config.keys.token).then(() => {
                    this.props.navigation.navigate("Auth")
                })
            }
        }])
    }
    private renderDisplayNamePrompt() {
        let onSubmit: (text?: string) => void = (text) => this.updateDisplayName(text)
        return (
            <AlertView.Input
                ref={(ref) => this.displayNamePrompt = ref}
                title={"修改用户名"}
                placeholder={"请输入用户名"}
                inputStyle={{ marginHorizontal: Config.horizontal }}
                cancelText={"取消"}
                submitText={"确定"}
                onSubmit={(text) => onSubmit(text)}
            />
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

    private renderFooter() {
        return <FooterButton text={"退出登录"} onPress={() => this.onPressFooter()} />
    }

    render() {
        const { avatarURI, account, accountAuthentications } = this.state
        return (
            <View
                style={{
                    backgroundColor: Config.backgroundColor,
                    flex: 1
                }} >
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: Config.horizontal
                    }} >
                    <TouchableOpacity
                        onPress={() => this.onPressAvatar()}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: 50,
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Config.textColor,
                                        width: 60
                                    }} >
                                    {"头像"}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Config.grayColor,
                                        marginLeft: 10
                                    }} >
                                    {"点击上传"}
                                </Text>
                            </View>
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
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() => this.onPressDisplayName()}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 50,
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Config.textColor,
                                        width: 60
                                    }} >
                                    {"用户名"}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: Config.grayColor,
                                        marginLeft: 10
                                    }} >
                                    {"点击修改"}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.textColor,
                                    marginLeft: 10
                                }} >
                                {account && account.props ? account.displayName : ""}
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("ReceiverManager")}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 50,
                            }} >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.textColor,
                                    width: 60
                                }} >
                                {"收货地址"}
                            </Text>
                            <Icon icon={ArrowRightGray} />
                        </View>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Browser", { title: "帮助中心", source: { uri: "http://mutoumulao.com/help" } })}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 50,
                            }} >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.textColor,
                                    width: 60
                                }} >
                                {"帮助中心"}
                            </Text>
                            <Icon icon={ArrowRightGray} />
                        </View>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() => this.bindWechat()}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 50,
                            }} >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.textColor,
                                    width: 60
                                }} >
                                {"绑定微信"}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.textColor,
                                    width: 60
                                }} >
                                {this.isAuthenticationByType("openId", accountAuthentications) ? "已绑定" : "点击绑定"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this.renderDisplayNamePrompt()}
                </ScrollView>
                {this.renderAvatarActionSheet()}
                {this.renderAvarModal()}
                {this.renderFooter()}
            </View>
        )
    }
}


/**
 * Edit and delete button container
 */
export class ManagerEditor extends React.Component {
    static defaultProps = {
        style: {},
        buttonStyle: {},
        textStyle: {},
        border: true,
        edit: true,
        onPressEdit: () => { },
        onPressDelete: () => { }
    }
    props: {
        style?: any,
        buttonStyle?: any,
        textStyle?: any,
        border?: boolean,
        edit?: boolean,
        onPressEdit?: () => void,
        onPressDelete?: () => void
    }

    render() {
        const { border } = this.props
        return (
            <View
                style={{
                    flexDirection: "row",
                    ...this.props.style
                }} >
                {this.props.edit ?
                    <CustomButton
                        style={{
                            width: 60,
                            borderWidth: border ? 1 : 0,
                            borderColor: "#BBBBBB",
                            paddingVertical: border ? 5 : 0,
                            borderRadius: 100,
                            marginRight: 10,
                            ...this.props.buttonStyle
                        }}
                        round={true}
                        text={"编辑"}
                        textStyle={{
                            color: Config.textColor,
                            fontSize: 14,
                            ...this.props.textStyle
                        }}
                        onPress={() => this.props.onPressEdit()} /> : undefined}
                <CustomButton
                    style={{
                        width: 60,
                        borderWidth: border ? 1 : 0,
                        borderColor: Config.styleColor,
                        paddingVertical: border ? 5 : 0,
                        borderRadius: 100,
                        ...this.props.buttonStyle
                    }}
                    textStyle={{
                        color: Config.styleColor,
                        fontSize: 14,
                        ...this.props.textStyle
                    }}
                    round={true}
                    text={"删除"}
                    onPress={() => this.props.onPressDelete()} />
            </View>
        )
    }
}
export class PostManager extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            title: Transformer.postTypeToCN(params.type) + "管理",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private didFocus
    props: { navigation?: any }
    state: { posts?: PostService.Post[] }

    constructor(props) {
        super(props)
        this.state = { posts: [] }
        const { params } = this.props.navigation.state
        this.api.handleNeedToken(this)
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getPosts(params.type)
            }
        )
    }

    componentWillUnmount() {
        this.didFocus.remove()
    }

    private getPosts(type: string) {
        if (!type) return
        HUD.show()
        this.api.Post.getMyPosts({ type: type }, (err, result) => {
            HUD.hide()
            if (err) return
            this.setState({ posts: result })
        })
    }

    private onPressRow(item, index) {
        this.props.navigation.navigate("Article", { postId: this.state.posts[index].id })
    }

    private onPressEdit(index) {
        this.props.navigation.navigate("ArticleEditor", { type: this.props.navigation.state.params.type, post: this.state.posts[index] })
    }

    private onPressDelete(index) {
        Alert.alert("确定删除？", null, [{ text: "否", onPress: () => { } }, {
            text: "是", onPress: () => {
                HUD.show()
                this.api.Post.deletePost({ postId: this.state.posts[index].id }, (err, result) => {
                    HUD.hide()
                    // alert(JSON.stringify([err, result]))
                    if (err && !result) { alert("删除失败"); return }
                    let posts = this.state.posts
                    posts.splice(index, 1)
                    this.setState({ posts: posts })
                    Toast.show("删除成功")
                })
            }
        }])
    }
    onPressFooter() {
        const { params } = this.props.navigation.state
        this.props.navigation.navigate("ArticleEditor", { type: params.type })
    }
    renderRow(item, index) {
        const type = this.props.navigation.state.params.type
        if (type === PostType.article) {

        } else if (type === PostType.subject) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexPath) => <SubjectManagerContent
                        data={item}
                        onPressEdit={() => this.onPressEdit(indexPath.row)}
                        onPressDelete={() => this.onPressDelete(indexPath.row)} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        } else if (type === PostType.job || type === PostType.position) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexPath) => <JobManagerContent
                        data={item}
                        onPressEdit={() => this.onPressEdit(indexPath.row)}
                        onPressDelete={() => this.onPressDelete(indexPath.row)} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        }
    }
    private renderFooter() {
        return (
            <FooterButton
                text={"发布内容"}
                onPress={() => this.onPressFooter()} />
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1
                }} >
                <FlatList
                    data={this.state.posts}
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
                {this.renderFooter()}
            </View>
        )
    }
}
