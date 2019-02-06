import * as wechat from "react-native-wechat"


export namespace Wechat {
    type WechatAuthScope = "snsapi_userinfo"

    type WechatShareType =
        "news" |
        "text" |
        "imageUrl" |
        "imageFile" |
        "imageResource" |
        "video" |
        "audio" |
        "file"

    const wechatAuthState: string = "wechat_sdk_login"

    export const appId = "wx84bd33fbc16c10b7"
    
    export const errorMessage = {
        uninstall: "您尚未安装微信客户端，请前往安装",
        authFailure: "微信授权失败"
    }

    export interface WechatAuthResponse {
        appid: string,
        code: string,
        url: string,
        lang: string,
        country: string,
    }

    export interface WechatShareMeta {
        type: WechatShareType,
        thumbImage: string,
        description: string,
        webpageUrl: string,
        imageUrl: string,
        videoUrl: string,
        musicUrl: string,
        filePath: string,
        fileExtension: string,
    }

    export interface WechatPayload {
        partnerid: string,
        prepayid: string,
        noncestr: string,
        timestamp: string,
        package: string,
        sign: string
    }

    export interface WechatErrResponse {
        errCode: number,
        errStr: string
    }

    export function registerApp(appid: string, callback: Callback<boolean>): void {
        if (!appid) {
            callback(new Error("InvalidParameter"), false)
            return
        }
        wechat.registerApp(appid).then((success) => {
            callback(null, success)
        }).catch(e => {
            callback(e, null)
        })
    }

    export function isWXAppInstalled(callback: Callback<boolean>): void {
        wechat.isWXAppInstalled().then((installed) => {
            callback(null, true)
        }).catch(e => {
            console.log("Wechat isWxAppInstalled: ", JSON.stringify(e))
            callback(e, null)
        })
    }

    export function isWXAppSupportApi(callback: Callback<boolean>): void {
        wechat.isWXAppSupportApi().then((support) => {
            callback(null, support)
        }).catch(e => {
            callback(e, null)
        })
    }

    export function openWXApp(callback: Callback<boolean>): void {
        wechat.openWXApp().then((opened) => {
            callback(null, opened)
        }).catch(e => {
            callback(e, null)
        })
    }

    export function sendAuthRequest(scope: WechatAuthScope, callback: Callback<WechatAuthResponse>): void {
        if (!scope) {
            callback(new Error("InvalidParameter"), null)
            return
        }
        wechat.sendAuthRequest(scope, wechatAuthState).then((authResponse) => {
            console.log("Wechat sendAuthRequest: ", JSON.stringify(authResponse))
            let response: WechatAuthResponse = {
                appid: authResponse["appid"] || null,
                code: authResponse["code"] || null,
                url: authResponse["url"] || null,
                lang: authResponse["lang"] || null,
                country: authResponse["country"] || null
            }
            let errResponse: WechatErrResponse = {
                errCode: authResponse["errCode"] || 0,
                errStr: authResponse["errStr"] || null
            }
            if (errResponse.errCode !== 0) {
                callback(new Error(errResponse.errStr), null)
                return
            }
            callback(null, response)
        }).catch(e => {
            console.log("Wechat sendAuthRequest err: ", JSON.stringify(e))
            callback(e, null)
        })
    }

    export function shareToTimeLine(message: WechatShareMeta, callback: Callback<null>): void {
        if (!message) {
            callback(new Error("InvalidParameter"))
            return
        }
        wechat.shareToTimeline(message).then(() => {
            callback(null)
        }).catch(e => {
            callback(e)
        })
    }

    export function shareToSession(message: WechatShareMeta, callback: Callback<null>): void {
        if (!message) {
            callback(new Error("InvalidParameter"))
            return
        }
        wechat.shareToSession(message).then(() => {
            callback(null)
        }).catch(e => {
            callback(e)
        })
    }

    export function pay(payload: WechatPayload, callback: Callback<null>): void {
        if (!payload) {
            callback(new Error("InvalidParameter"))
            return
        }
        let payData = {
            partnerId: payload.partnerid,
            prepayId: payload.prepayid,
            nonceStr: payload.noncestr,
            timeStamp: payload.timestamp,
            package: payload.package,
            sign: payload.sign
        }
        wechat.pay(payData).then((payResult) => {
            console.log("wechatPay: " + JSON.stringify(payResult))
            if (!payResult || payResult.errCode !== 0) {
                callback(new Error("WechatPay failed"))
                return
            }
            callback(null)
        }).catch(e => {
            callback(e)
        })
    }
}