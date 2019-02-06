import * as React from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    AsyncStorage,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    TextInputProperties
} from "react-native"
import * as wechat from "react-native-wechat"
import { Wechat } from "./Wechat"
import { Icon, Logo, WeixinLogo, ArrowRightGray } from "./common/Icon"
import { CustomText, CustomTextInput } from "./common/Custom"
import { Config } from "./Config"
import { CustomButton } from "./common/Custom"
import { APIService } from "./service/apiService"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { TextIndentProperty } from "csstype";

class TextInput extends React.Component<TextInputProperties> {
    textInput: CustomTextInput
    state: {
        text: string
    }
    constructor(props) {
        super(props)
        this.state = {
            text: null
        }
    }
    get text(): string {
        return this.props.value || this.props.defaultValue || this.state.text
    }
    focus() {
        this.textInput.focus()
    }
    blur() {
        this.textInput.blur()
    }
    render() {
        return (
            <CustomTextInput
                ref={(ref) => this.textInput = ref}
                onChangeText={(text) => this.setState({ text: text })}
                value={this.state.text}
                {...this.props}
            />
        )
    }
}

const MAX_CODE_TIMEOUT = 60

export class Login extends React.Component {
    private phoneTextInput: TextInput
    private passwordTextInput: TextInput
    private codeTextInput: TextInput
    private api = new APIService()
    private loginType: "password" | "code" = "password"
    private timer: NodeJS.Timer
    props: { navigation?: any }
    state: {
        timeout?: number
    }

    constructor(props) {
        super(props)
        this.state = { timeout: 0 }
        const { params } = props.navigation.state
        if (params && params.type) {
            this.loginType = params.type
        }
    }

    completeLogin(token: string) {
        if (!token) {
            Toast.show("登录失败!")
            return
        }
        AsyncStorage.setItem(Config.keys.token, token).then(() => {
            this.props.navigation.navigate("Tab")
        })
    }

    private onPressBlank() {
        let inputBlurHandler: (textInput: TextInput) => void = (textInput) => {
            if (textInput) {
                textInput.blur()
            }
        }
        inputBlurHandler(this.phoneTextInput)
        inputBlurHandler(this.passwordTextInput)
        inputBlurHandler(this.codeTextInput)
    }

    private onPressForgetpwd() {
        this.props.navigation.navigate("Reset")
    }

    private onPressLogin() {
        this.phoneTextInput && this.phoneTextInput.blur()
        this.passwordTextInput && this.passwordTextInput.blur()
        this.codeTextInput && this.codeTextInput.blur()
        const phone = this.phoneTextInput.text
        if (!phone) {
            Toast.show("手机号为空!")
            return
        }
        if (this.loginType === "password" && this.passwordTextInput) {
            const password = this.passwordTextInput.text
            if (!password) {
                Toast.show("密码为空!")
                return
            }
            HUD.show()
            this.api.Authentication.getTokenByPhone({ phone: phone, password: password }, (err, result) => {
                HUD.hide()
                //console.log("getTokenByPhone: ", JSON.stringify([err, result]))
                this.completeLogin(result && result.token)
            })
        } else if (this.loginType === "code" && this.codeTextInput) {
            const code = this.codeTextInput.text
            if (!code) {
                Toast.show("验证码为空!")
                return
            }
            HUD.show()
            this.api.Authentication.getTokenByCode({ phone: phone, code: code }, (err, result) => {
                HUD.hide()
                //console.log("getTokenByCode: ", JSON.stringify([err, result]))
                this.completeLogin(result && result.token)
            })
        }
    }

    private loginByWechat() {
        //console.log("before login by wechat")
        Wechat.isWXAppInstalled((err, installed) => {
            if (err) {
                return
            } else if (!installed) {
                Toast.show("您未安装微信客户端，请前往安装")
                return
            }
            Wechat.sendAuthRequest("snsapi_userinfo", (err, authResponse) => {
                if (err || !authResponse.code) {
                    Toast.show("微信授权失败")
                    return
                }
                this.api.Authentication.getWechatOpenIdByCode({
                    wechatCode: authResponse.code
                }, (err, result) => {
                    if (err || !result || !result.openId) {
                        Toast.show("微信登录失败")
                        return
                    }
                    let { openId } = result
                    this.api.Authentication.getTokenByWechat({ openId: result.openId }, (err, result) => {
                        //console.log("getTokenByWechat", JSON.stringify([err, result]))
                        if (err && err.name === "AuthorizationFailed") {
                            this.props.navigation.navigate("Register", { meta: { wechatOpenId: openId } })
                            return
                        }
                        this.completeLogin(result && result.token)
                    })
                })

            })
        })
    }

    private onPressGetCode() {
        let { timeout } = this.state
        const phone = this.phoneTextInput.text
        if (phone === null) {
            Toast.show("输入为空")
            return
        }
        if (timeout > 0) return
        this.api.Authentication.sendPhoneVerificationCode({ phone: phone }, (err, result) => {
            if (err) {
                Toast.show("验证码获取失败")
                //console.log("sendPhoneVerificationCode failed: ", JSON.stringify(err))
                return
            }
            this.setState({ timer: timeout += 1 })
            this.timer = setInterval(() => {
                if (this.state.timeout < MAX_CODE_TIMEOUT) {
                    this.setState({ timeout: timeout += 1 })
                } else {
                    clearInterval(this.timer)
                    this.setState({ timeout: 0 })
                }
            }, 1000)
        })
    }

    private onPressToLoginByCode() {
        if (this.loginType == "password") {
            this.props.navigation.navigate("Login", { type: "code" })
        } else if (this.loginType == "code") {
            this.props.navigation.goBack()
        }
    }

    private onPressToRegister() {
        this.props.navigation.navigate("Register")
    }

    private renderLogo() {
        return (
            <Icon
                style={{
                    marginTop: 60,
                    alignSelf: "center",
                    width: 150,
                    height: 70
                }}
                icon={Logo} />
        )
    }

    private renderPhoneInput() {
        return (
            <View
                style={[styles.textInputContainerStyle, { marginTop: 48 }]} >
                <TextInput
                    style={{
                        height: 40,
                        flex: 1
                    }}
                    ref={(ref) => this.phoneTextInput = ref}
                    placeholder={"请输入手机号"}
                    keyboardType={"phone-pad"} />
            </View>
        )
    }

    private renderPasswordInput() {
        return (
            <View
                style={[styles.textInputContainerStyle, { marginTop: 48, paddingRight: Config.horizontal }]}>
                <TextInput
                    style={{
                        height: 40,
                        flex: 1
                    }}
                    ref={(ref) => this.passwordTextInput = ref}
                    placeholder={"请输入密码"}
                    secureTextEntry={true}
                    returnKeyType={"done"} />
                <CustomButton
                    style={{
                        height: 40,
                        marginLeft: 10
                    }}
                    textStyle={{
                        fontSize: 12,
                        color: Config.styleColor
                    }}
                    text={"忘记密码？"}
                    onPress={() => this.onPressForgetpwd()} />
            </View>
        )
    }

    private renderCodeInput() {
        const { timeout } = this.state
        return (
            <View
                style={
                    [styles.textInputContainerStyle,
                    { marginTop: 48, paddingLeft: Config.horizontal, height: 40 }]
                }>
                <TextInput
                    style={{ flex: 1 }}
                    ref={(ref) => this.codeTextInput = ref}
                    placeholder="请输入短信验证码"
                    keyboardType={"phone-pad"} />
                <CodeButton
                    timeout={this.state.timeout}
                    maxTimeout={MAX_CODE_TIMEOUT}
                    onPress={() => this.onPressGetCode()} />
            </View>
        )
    }

    private renderAuthenticationInput() {
        let inputNode: JSX.Element
        if (this.loginType === "password") {
            inputNode = this.renderPasswordInput()
        } else if (this.loginType === "code") {
            inputNode = this.renderCodeInput()
        }
        return inputNode
    }

    private renderCodeLogin() {
        return (
            <Text
                style={{
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    marginTop: 30,
                    paddingVertical: 10,
                    color: Config.grayColor,
                    fontSize: 12,
                    textAlign: "right",
                }}
                onPress={() => this.onPressToLoginByCode()}>
                {this.loginType === "password" ? "短信登录" : "密码登录"}
            </Text>
        )
    }

    private renderLogin() {
        return (
            <CustomButton
                style={{
                    backgroundColor: Config.styleColor,
                    marginTop: 10,
                    height: 40
                }}
                textStyle={{
                    color: "white"
                }}
                round={true}
                text={"登 录"}
                onPress={() => this.onPressLogin()} />
        )
    }

    private renderToRegister() {
        return (
            <TouchableOpacity
                style={styles.bottomTextContainerStyle}
                onPress={() => this.onPressToRegister()} >
                <CustomText
                    style={{
                        textAlign: "right"
                    }}
                    type={"small"} >
                    {"没有账号？"}
                </CustomText>
                <CustomText
                    style={{
                        color: Config.textColor,
                        textAlign: "left"
                    }}
                    type={"small"} >
                    {"立即注册"}
                </CustomText>
            </TouchableOpacity>
        )
    }

    private renderOtherLogin() {
        return (
            <View
                style={{
                    marginTop: 30,
                    justifyContent: "center",
                    alignContent: "center",
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <View
                        style={{
                            flex: 1,
                            height: 0.5,
                            backgroundColor: Config.grayColor
                        }} />
                    <Text
                        style={{
                            marginHorizontal: 10,
                            color: Config.grayColor,
                            fontSize: 14,
                        }}>
                        {"其他登录方式"}
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            height: 0.5,
                            backgroundColor: Config.grayColor
                        }} />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginTop: 20
                    }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.loginByWechat()}>
                        <View>
                            <Icon
                                style={{
                                    width: 35,
                                    height: 35,
                                }}
                                icon={WeixinLogo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    private renderVisitorEntry() {
        return (
            <View
                style={{
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                    alignItems: "flex-end",
                }}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.navigate("Tab")
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text
                            style={{
                                color: Config.textColor,
                                fontSize: 14,
                                marginRight: 5
                            }} >
                            {"我是游客"}
                        </Text>
                        <Icon icon={ArrowRightGray} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={() => this.onPressBlank()} >
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: Config.backgroundColor
                    }}>
                    <View
                        style={{
                            paddingHorizontal: 30
                        }} >
                        {this.renderLogo()}
                        {this.renderPhoneInput()}
                        {this.renderAuthenticationInput()}
                        {this.renderCodeLogin()}
                        {this.renderLogin()}
                        {this.renderToRegister()}
                        {this.renderOtherLogin()}
                        {this.renderVisitorEntry()}
                    </View>
                </ScrollView>

            </TouchableWithoutFeedback>
        )
    }
}

export class Register extends React.Component {
    private phoneTextInput: TextInput
    private codeTextInput: TextInput
    private pwdTextInput: TextInput
    private repwdTextInput: TextInput
    private meta: {
        wechatOpenId?: string
    }
    private api = new APIService()
    private timer?: NodeJS.Timer
    props: { navigation: any }
    state: { timeout?: number }

    constructor(props) {
        super(props)
        this.state = { timeout: 0 }
        const { params } = props.navigation.state
        if (params) {
            this.meta = params.meta
        }
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer)
    }

    private onPressBlank() {
        if (this.phoneTextInput !== null && this.codeTextInput !== null && this.pwdTextInput !== null && this.repwdTextInput !== null) {
            this.phoneTextInput.blur()
            this.codeTextInput.blur()
            this.pwdTextInput.blur()
            this.repwdTextInput.blur()
        }
    }

    private onPressGetCode() {
        const phone = this.phoneTextInput.text
        if (phone === null) {
            Toast.show("输入为空")
            return
        }
        if (this.state.timeout > 0) return
        this.api.Authentication.sendPhoneVerificationCode({ phone: phone }, (err, result) => {
            if (err) {
                Toast.show("验证码获取失败")
                return
            }
            this.setState({ timer: this.state.timeout += 1 })
            this.timer = setInterval(() => {
                if (this.state.timeout < MAX_CODE_TIMEOUT) {
                    this.setState({ timeout: this.state.timeout += 1 })
                } else {
                    clearInterval(this.timer)
                    this.setState({ timeout: 0 })
                }
            }, 1000)
        })
    }

    onPressRegister() {
        const phone = this.phoneTextInput.text
        const code = this.codeTextInput.text
        const password = this.pwdTextInput.text
        const repassword = this.repwdTextInput.text
        if (phone === null || code === null || password === null || repassword === null) {
            Toast.show("输入为空")
            return
        }
        if (password !== repassword) {
            Toast.show("密码错误!")
            return
        }
        HUD.show()
        this.api.Authentication.registerWithPhone(
            {
                phone: phone,
                password: repassword,
                code: code
            }, (err, result) => {
                HUD.hide()
                if (err) {
                    //console.log("registerWithPhone: ", JSON.stringify(err))
                    if (err.name === "UnknownError") {
                        Toast.show("您已注册，前往登录")
                        this.props.navigation.goBack()
                        return
                    }
                    Toast.show("注册失败!")
                    // alert(JSON.stringify(err))
                    return
                }
                this.api.Authentication.getTokenByPhone(
                    {
                        phone,
                        password: repassword
                    }, (err, result) => {
                        if (err) {
                            Toast.show("登录失败")
                            return
                        }
                        const token = result.token
                        this.api.setToken(token)
                        AsyncStorage.setItem(Config.keys.token, token).then(() => {
                            if (this.meta) {
                                if (this.meta.wechatOpenId) {
                                    this.api.Authentication.getCurrentAccount(null, (err, account) => {
                                        if (err) {
                                            Toast.show("微信登录失败")
                                            return
                                        }
                                        this.api.Authentication.bindWechat({ accountId: account.id, openId: this.meta.wechatOpenId }, (err) => {
                                            if (err) {
                                                Toast.show("绑定微信失败")
                                                return
                                            }
                                            this.props.navigation.navigate("Tab")
                                        })
                                    })
                                }
                                return
                            }
                            this.props.navigation.navigate("Tab")
                        })
                    })
            })
    }
    onPressToLogin() {
        this.props.navigation.goBack()
    }
    render() {
        const { timeout } = this.state
        const marginTop = 32
        const commonHeight = 40

        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                <TouchableWithoutFeedback
                    onPress={() => this.onPressBlank()} >
                    <View
                        style={styles.container} >
                        <Icon
                            style={{
                                marginTop: 60,
                                alignSelf: "center",
                                width: 150,
                                height: 70
                            }}
                            icon={Logo} />
                        <View
                            style={
                                [styles.textInputContainerStyle,
                                { marginTop: 50, height: commonHeight }]
                            }>
                            <TextInput
                                ref={(ref) => this.phoneTextInput = ref}
                                style={{
                                    flex: 1
                                }}
                                placeholder={"请输入手机号"}
                                keyboardType={"phone-pad"} />
                        </View>
                        <View
                            style={
                                [styles.textInputContainerStyle,
                                { marginTop: marginTop, paddingLeft: Config.horizontal, height: commonHeight }]
                            }>
                            <TextInput
                                style={{ flex: 1 }}
                                ref={(ref) => this.codeTextInput = ref}
                                placeholder="请输入短信验证码"
                                keyboardType={"phone-pad"} />
                            <CodeButton
                                timeout={this.state.timeout}
                                maxTimeout={MAX_CODE_TIMEOUT}
                                onPress={() => this.onPressGetCode()} />
                            {/* <CustomButton
                                style={{
                                backgroundColor: timeout <= 0 ? Config.styleColor : Config.grayColor,
                                paddingHorizontal: Config.horizontal,
                                marginLeft: 8,
                                height: commonHeight,
                                width: 100
                                }}
                                textStyle={{
                                fontSize: timeout <= 0 ? 12 : 14,
                                color: "white"
                                }}
                                round={true}
                                text={timeout <= 0 ? "获取验证码" : maxTimeout - this.state.timeout + " s"}
                                onPress={() => this.onPressGetCode()} /> */}
                        </View>
                        <View
                            style={
                                [styles.textInputContainerStyle,
                                { marginTop: marginTop, height: commonHeight }]
                            } >
                            <TextInput
                                style={{
                                    flex: 1
                                }}
                                ref={(ref) => this.pwdTextInput = ref}
                                secureTextEntry={true}
                                placeholder="输入新密码"
                                returnKeyType={"next"} />
                        </View>
                        <View
                            style={
                                [styles.textInputContainerStyle,
                                { marginTop: marginTop, height: commonHeight }]
                            } >
                            <TextInput
                                style={{
                                    flex: 1
                                }}
                                ref={(ref) => this.repwdTextInput = ref}
                                placeholder="确认新密码"
                                secureTextEntry={true}
                                returnKeyType={"done"} />
                        </View>
                        <CustomButton
                            style={{
                                marginTop: marginTop,
                                backgroundColor: Config.styleColor,
                                height: commonHeight
                            }}
                            textStyle={{
                                color: "white"
                            }}
                            round={true}
                            text={"注 册"}
                            onPress={() => this.onPressRegister()} />
                        <TouchableOpacity
                            style={styles.bottomTextContainerStyle}
                            onPress={() => this.onPressToLogin()} >
                            <CustomText
                                style={{
                                    textAlign: "right"
                                }}
                                type={"small"} >
                                {"已有账号？"}
                            </CustomText>
                            <CustomText
                                style={{
                                    color: Config.textColor,
                                    textAlign: "left"
                                }}
                                type={"small"} >
                                {"点击登录"}
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView >

        )
    }
}

enum ResetType { "tel", "get", "code", "pwd" }

export class ResetPwd extends React.Component {
    private phoneTextInput: TextInput
    private codeTextInput: TextInput
    private passwordTextInput: TextInput
    private confirmPasswordTextInput: TextInput
    private api = new APIService()
    private timer: NodeJS.Timer
    private authentication = { phone: null, code: null, password: null }

    props: {
        navigation: any
    }
    state: {
        currentState: ResetType,
        codeText: string,
        timeout?: number
    }

    constructor(props) {
        super(props)
        this.state = {
            currentState: 0,
            codeText: "获取验证码",
            timeout: 0
        }
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer)
    }

    private updatePassword(firstPassword: string) {
        const { phone, code, password } = this.authentication
        if (phone && code && firstPassword && password) {
            if (firstPassword !== password) {
                Toast.show("两次密码不一致")
                return
            }
            this.api.Authentication.updatePassword(this.authentication, (err) => {
                if (err) {
                    Toast.show("密码修改失败")
                    //console.log("updatePassword err: ", JSON.stringify(err))
                    return
                }
                this.props.navigation.goBack()
            })
        }
    }

    private onPressCode() {
        const phone = this.authentication.phone
        if (phone === null) {
            Toast.show("手机号为空")
            return
        }
        if (this.state.timeout > 0) return
        this.api.Authentication.sendPhoneVerificationCode({ phone: phone }, (err, result) => {
            if (err) {
                Toast.show("验证码获取失败")
                //console.log("sendPhoneVerificationCode err: ", err)
                return
            }
            this.setState({ timer: this.state.timeout += 1, currentState: 2 })
            this.timer = setInterval(() => {
                if (this.state.timeout < MAX_CODE_TIMEOUT) {
                    this.setState({ timeout: this.state.timeout += 1 })
                } else {
                    clearInterval(this.timer)
                    this.setState({ timeout: 0 })
                }
            }, 1000)
        })
    }

    private onPressBottom() {
        const { currentState } = this.state
        if (currentState === 0) {
            this.authentication.phone = this.phoneTextInput.text
            if (!this.authentication.phone) {
                Toast.show("请输入手机号")
                return
            }
            this.setState({ currentState: 1 })
        } else if (currentState === 1) {
            this.authentication.code = this.codeTextInput.text
            if (!this.authentication.code) {
                Toast.show("请输入手机验证码")
                return
            }
            this.setState({ currentState: 2 })
        } else if (currentState === 2) {
            this.authentication.code = this.codeTextInput.text
            if (!this.authentication.code) {
                Toast.show("请输入手机验证码")
                return
            }
            this.setState({ currentState: 3 })
        } else if (currentState === 3) {
            this.passwordTextInput && this.passwordTextInput.blur()
            this.confirmPasswordTextInput && this.confirmPasswordTextInput.blur()
            const firstPassword = this.passwordTextInput.text
            this.authentication.password = this.confirmPasswordTextInput.text
            this.updatePassword(firstPassword)
        }
    }

    render() {
        const { currentState, codeText, timeout } = this.state
        let buttonText = "下一步"
        let headerView = undefined
        let messageText = undefined
        const commonHeight = 50
        if (currentState === 0) {
            headerView =
                <View
                    style={{
                        justifyContent: "center",
                        backgroundColor: "white",
                        paddingHorizontal: Config.horizontal,
                        paddingVertical: 8,
                        height: commonHeight
                    }}>
                    <TextInput
                        ref={(ref) => this.phoneTextInput = ref}
                        key={currentState.toString()}
                        style={{
                            flex: 1
                        }}
                        placeholder={"请输入手机号"}
                        keyboardType={"phone-pad"} />
                </View>
        } else if (currentState === 1 || currentState === 2) {
            headerView =
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        paddingHorizontal: Config.horizontal,
                        paddingVertical: 8,
                        height: commonHeight
                    }}>
                    <TextInput
                        ref={(ref) => this.codeTextInput = ref}
                        key={currentState.toString()}
                        style={{
                            flex: 1
                        }}
                        placeholder={"请输入验证码"}
                        keyboardType={"phone-pad"} />
                    <CustomButton
                        style={{
                            backgroundColor: timeout <= 0 ? Config.styleColor : Config.grayColor,
                            height: commonHeight * 0.8,
                            paddingHorizontal: Config.horizontal
                        }}
                        textStyle={{
                            fontSize: timeout <= 0 ? 12 : 14,
                            color: "white"
                        }}
                        round={true}
                        text={timeout <= 0 ? "获取验证码" : MAX_CODE_TIMEOUT - this.state.timeout + " s"}
                        onPress={() => this.onPressCode()} />
                </View>
            if (currentState === 2) {
                messageText =
                    <View
                        style={{
                            marginTop: 10,
                            paddingHorizontal: Config.horizontal
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.grayColor
                            }}>
                            {"验证码已发送至您的手机，请注意查收"}
                        </Text>
                    </View>
            }
        } else if (currentState === 3) {
            buttonText = "完成"
            headerView =
                <View
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: Config.horizontal
                    }} >
                    <View
                        style={{
                            justifyContent: "center",
                            height: commonHeight
                        }}>
                        <TextInput
                            ref={(ref) => this.passwordTextInput = ref}
                            placeholder={"输入新密码"}
                            returnKeyType={"next"}
                            secureTextEntry={true} />
                    </View>
                    <View
                        style={{
                            height: 1,
                            backgroundColor: Config.backgroundColor
                        }} />
                    <View
                        style={{
                            justifyContent: "center",
                            height: commonHeight
                        }}>
                        <TextInput
                            ref={(ref) => this.confirmPasswordTextInput = ref}
                            placeholder={"确认新密码"}
                            defaultValue={null}
                            returnKeyType={"done"}
                            secureTextEntry={true} />
                    </View>
                </View>
        }
        let bottomButton = currentState !== 1 ?
            <CustomButton
                key={currentState.toString()}
                style={{
                    backgroundColor: Config.styleColor,
                    marginTop: currentState === 2 ? 40 : 20,
                    marginHorizontal: Config.horizontal,
                    height: Config.viewHeight,
                }}
                textStyle={{
                    color: "white"
                }}
                text={buttonText} onPress={() => this.onPressBottom()} /> :
            null
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                {headerView}
                {messageText}
                {bottomButton}
            </View>
        )
    }
}

class CodeButton extends React.Component {
    static defaultProps = {
        style: {},
        textStyle: {},
        onPress: () => { },
        timeout: 0,
        maxTimeout: 60,
    }
    props: {
        style?: any,
        textStyle?: any,
        onPress?: () => void,
        timeout?: number,
        maxTimeout?: number
    }

    constructor(props) {
        super(props)
        this.state = { timeout: 0 }
    }

    render() {
        const {
            style,
            textStyle,
            onPress,
            timeout,
            maxTimeout
        } = this.props
        return (
            <CustomButton
                style={{
                    backgroundColor: timeout <= 0 ? Config.styleColor : Config.grayColor,
                    paddingHorizontal: Config.horizontal,
                    marginLeft: 8,
                    width: 100,
                    height: "100%",
                    borderRadius: 100,
                    ...style
                }}
                textStyle={{
                    fontSize: timeout <= 0 ? 12 : 14,
                    color: "white",
                    ...textStyle
                }}
                text={timeout <= 0 ? "获取验证码" : maxTimeout - timeout + " s"}
                onPress={() => onPress()} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.backgroundColor,
        paddingHorizontal: 30,
    },
    textInputContainerStyle: {
        borderRadius: 22,
        backgroundColor: "#F2F3F5",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: Config.horizontal,
    },
    bottomTextContainerStyle: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
    }
})
