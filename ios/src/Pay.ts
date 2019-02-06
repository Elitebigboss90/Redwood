import { APIService } from "./service/apiService"
import { Wechat } from "./Wechat"

export type PayType = "wechat"

export function payInitialize() {
    console.log("pay initialize")
    Wechat.registerApp(Wechat.appId, (err, success) => {
        if (err || !success) return
    })
}

export class Pay {

    api = new APIService()

    constructor(type?: PayType) {
        if (type === "wechat") {
            return new WechatPay()
        }
    }

    pay(payData: any, callBack: Callback<null>) {
        console.log("pay")
    }

    syncPayment(paymentId: string, callBack: Callback<ShopService.Payment>) {
        if (!paymentId) {
            callBack(Error("InvalidParameter"), null)
            return
        }
        this.api.Shop.syncPayment({ paymentId: paymentId }, (err, payment) => {
            console.log("syncPayment: " + JSON.stringify(payment))
            callBack(err, payment)
        })
    }
}

class WechatPay extends Pay {

    constructor() {
        super()
    }

    pay(payData: any, callBack: Callback<null>) {
        if (!payData) {
            callBack(Error("InvalidParameter"))
            return
        }
        Wechat.pay(payData, callBack)
    }
}