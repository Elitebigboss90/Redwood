export class WechatService extends Leaf.Service {
    states
    readonly name = "WechatService"
    readonly wechatScriptPath = "//res.wx.qq.com/open/js/jweixin-1.2.0.js"
    readonly apiBase = "/wechat/"
    constructor(public readonly option: {
        //// May should important information using alert in debug mode
        debug?: boolean
        // don't try to sign wx, leave it to others
        delegated?: boolean
        // Will not request signature on mock mode
        mock?: boolean
    } = {}) {
        super()
    }
    events = new Leaf.EventEmitter<{
        ready
    }>()
    initialize(done) {
        if (this.option.delegated && !this.option.mock) {
            wx.ready(() => {
                this.events.emit("ready")
                done()
            })
            return
        }
        if (!this.isWechat()) {
            done()
            return
        }
        let script = document.createElement("script")
        let scriptReady = false
        let signatureReady = false
        let config = null
        script.type = "text/javascript"
        script.src = this.wechatScriptPath
        script.onload = () => {
            if (this.option.mock) {
                done()
                return
            }
            scriptReady = true
            tryAuth()
        }
        script.onerror = () => {
            console.error("Fail to load wechat service")
        }
        document.body.appendChild(script)

        if (this.option.mock) return
        this.getJSSignature({
            url: window.location.toString()
        }, (err, result) => {
            if (err) {
                console.error("Fail to load signature")
                return
            }
            signatureReady = true
            config = result
            tryAuth()
        })
        let tryAuth = () => {
            if (!scriptReady || !signatureReady) return
            wx.config(config)
            wx.ready(() => {
                this.events.emit("ready")
                done()
            })
        }
    }
    public isWechat() {
        let ua = navigator.userAgent.toLowerCase();
        return (/micromessenger/.test(ua)) ? true : false || !!window["WeixinJSBridge"]

    }
    private apiFactory = new Leaf.APIFactory({
        root: this.apiBase
    })
    private getJSSignature = this.apiFactory.createAPIFunction<{
        url?: string
    }, WechatJSSDKConfig>({
        path: "jssdk/signature/GET",
        method: "POST"
    })
    public share(option: {
        title: string
        link: string
        image: string
        description: string
        type?: "music" | "video" | "link"
        mediaUrl?: string
    }, callback: Function) {
        if (!this.isWechat()) {
            return
        }
        wx.onMenuShareTimeline({
            title: option.title,
            link: option.link,
            imgUrl: option.image,
            success: function () {
                callback()
            },
            cancel: function () {
                callback(new Error("Abort"))
            }

        });
        wx.onMenuShareAppMessage({
            title: option.title,
            desc: option.description,
            link: option.link,
            imgUrl: option.image,
            type: option.type || "link",
            dataUrl: option.mediaUrl || null,
            success: function () {
                callback()
            },
            cancel: function () {
                callback(new Error("Abort"))
            }

        });
    }
}

export interface WechatJSSDKConfig {
    debug: boolean
    appId: string
    timestamp: number
    nonceStr: string
    signature: string
    jsApiList: string[]
}
declare const wx: {
    config(conf: WechatJSSDKConfig)
    ready(callback: () => void)
    error(callback: (res: any) => void)
    onMenuShareTimeline: any
    onMenuShareAppMessage: any
}
