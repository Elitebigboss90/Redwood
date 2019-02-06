type Callback<T = null> = (err?: Error, result?: T) => void

type GUID = string


type Int = number
type RMBCent = number
type Timestamp = number
type HourMinute = string
type RichText = string


type DictItem<T = any> = {
    value: T
    displayText: string
}

declare namespace PaginateService {
    export type PaginateQuery = {
        // which page
        pageIndex: number
        // how many item perpage
        pageSize?: number
    }

    export type PaginateResult<T = any> = {
        items: T[]
        pageTotal: number
        pageIndex: number
        total: number
    }
}

declare namespace EndlessService {
    export type Settings = {
        endless?: {
            count?: number
        }
    }
    export type EndlessQueryMeta = {
        offset?: number,
        count?: number,
        sort?: any
    }
    export type EndlessQuery<T = any> = {
        offset: number,
        count: number,
        criteria?: {
            [K in keyof T]?: any
        }
        sort?: any
    }
}

declare namespace PlatformService {
    interface Information {
        // 客服电话
        customerServicePhoneNumber?: string,
        // 代购费率 百分比数字
        procurementFeeRate?: number
    }
}

declare namespace PostService {
    type PostId = GUID
    export interface Post<TMeta = any> {
        id: GUID
        authorName: string
        authorId: AccountService.AccountId
        title: string
        content: RichText
        images?: string[]
        // type indicates special use case
        // such as ad/banner/slides/article
        type: string
        category?: string
        createAt: Timestamp
        meta?: TMeta
    }
}

declare namespace AccountPropService {
    type Settings = {}
}

declare namespace ContactService {
    interface AddressDistrict {
        province: District<"province">
        city: District<"city">
        area: District<"area">
    }

    interface District<TLevel extends District.Level = "any", TLevelChildren extends District.Level = "any"> {
        code: string
        name: string
        level: TLevel
        children?: District[]
    }
    interface Contact {
        name: string
        phone: string
        addressDistrict: AddressDistrict
        addressDetail: string
    }
    namespace District {
        type Level = keyof {
            "province"
            "city"
            "area"
            "any"
        }
    }
}

declare namespace AccountService {
    type Role = keyof {
        "user"
        "seller"
        "admin"
    }
    interface Props {
        phone: string
        avatar: string
        defaultReceiverId?: GUID
        disabled?: boolean
    }
    export type AccountId = GUID
    interface Account {
        id: GUID
        name: string
        displayName: string
        role: Role
        props?: Props
    }
}
declare namespace TransportService {
    export type ReceiverId = GUID
    export interface Receiver {
        id: ReceiverId
        ownerId: AccountService.AccountId
        contact: ContactService.Contact
    }
}
declare namespace ShopService {
    export type Settings = {
        shop: {
            defaultTransportPriceRMBCent: number
            enableDebugPayment: boolean
        }
    }
    namespace Product {
        type PropDefinition = EnumProp
        interface EnumProp {
            name: string
            values: {
                name: string
                value: string
            }[]
            default: string
        }
    }
    export type ProductId = GUID
    interface Product<TMeta = null> {
        id: ProductId
        sellerId: SellerId
        name: string
        skus: SKU[]
        basePrice: RMBCent
        // 1. Default transport fee per seller
        // 2. If some has transport price, add to the total default transport fee
        // 3. If all item have transport price, exclude default transport fee per seller
        // 4*. some transport price is calculated per item, in that case, total = tp * quantity

        // default to Zero
        transportPrice?: RMBCent
        // "none" we charge no transport type
        // "order" we don't save transport price in Order.Item, but in order. And all "order" transport type
        //     item shares a same transport, NOTE that we do this because our order is per seller.
        // "product" we charge transport price for all these kind of product, but ignore the quantity.
        // "sku" we charge transport price for all the quantity it buys. These is the default behavior.
        transportType?: "order" | "product" | "sku" | "none"
        description: string
        descriptionImages: string[]
        thumbs?: string[]
        props: Product.PropDefinition[]
        createAt: Timestamp
        available: boolean
        category: string
        finite?: boolean
        disabled?: boolean
        historicalSales?: Int
        meta: TMeta
    }
    type SKUId = GUID
    interface SKU {
        id: SKUId
        price: RMBCent
        stock: Int
        props: {
            displayName: string
            propName: string
            value: any
        }[]
        available: boolean
    }
    export type SellerId = GUID
    interface Seller<TMeta = {
        businessLicense?: string
    }> {
        ownerId: AccountService.AccountId
        id: SellerId
        name: string
        contact: ContactService.Contact
        avatar?: string
        description?: string
        createAt: Timestamp
        productCount: number
        meta: TMeta
        verified: boolean
        disabled?: boolean
    }

    namespace Order {
        export type ItemQuery = {
            skuId: SKUId,
            productId: ProductId,
            quantity: number
        }
        export type ItemDigest = {
            sku: ShopService.SKU
            product: ShopService.Product
            quantity: Int
        }
        type State = keyof {
            "pending"
            "paid"
            "delivering"
            "refunding"
            "refunded"
            "refundRejected"
            "completed"
            "canceled"
        }

        // pending => paid => delivering => completed
        // pending => canceled
        // completed => refunding
        // ## Only completed order can go through rejected phrase
        // refunding => refunded
        // refunding => refundRejected
        // refundRejected => refunding => ....

        interface Item {
            sellerId: SellerId
            skuId: SKUId
            productId: ProductId
            transportFee: RMBCent
            basePrice: RMBCent
            totalPrice: RMBCent
            name: string
            quantity: Int
        }
    }
    type OrderId = GUID
    interface Order<TMeta = {
        contact?: ContactService.Contact,
        transportName?: string,
        transportNum?: string,
        transportCreatedAt?: number,
        // 是否使用代购
        procurement?: boolean
    }> {
        id: OrderId
        buyerId: GUID
        sellerId: GUID
        // only paid order shall have a paymentId att
        paymentId?: GUID
        items: Order.Item[]

        // One item in items is "order" transport type
        // We may charge a seller transport price. According
        sellerTransportFee: number

        extraFee?: { [key: string]: RMBCent }
        totalFee: RMBCent
        state: Order.State
        createAt: Timestamp
        meta: TMeta
    }

    type CartItemId = GUID
    interface CartItem {
        id: GUID
        buyerId: GUID
        sellerId: SellerId
        sellerName: string
        thumbs: string[]
        productId: string
        skuId: SKUId
        displayName: string
        detailName: string
        props: {
            displayName: string
            propName: string
            value: any
        }[]
        unitPrice: RMBCent
        quantity: Int
    }
    namespace Payment {
        type OrderDigest = {
            id: OrderId
            items: {
                // name x count
                [name: string]: number
            }
        }
        type State = keyof {
            "initiating"
            "pending"
            "expired"
            "completed"
            "canceled"
        }
        // initiating => pending  # means we shall talk to the 
        // pending => completed
        // pending => expired
        // pending => canceled
        type Type = string
    }
    type PaymentId = GUID
    interface Payment<TMeta = any> {
        id: PaymentId
        buyerId: GUID
        orderIds: OrderId[]
        digests: Payment.OrderDigest[]
        amount: RMBCent
        // type for payment service provider like
        // wechat/alipay...
        type: string
        // meta includes the provider information
        meta?: TMeta
        state: Payment.State
        createAt: Timestamp
        title?: string
        clientIp: string
    }
}

//declare namespace WechatModel {
//    type URL = string
//    type OpenId = string
//    type preOrderRequest = {
//        openId: string
//        userIp: string
//        price: number
//    }
//    interface PreOrder {
//        appid: string  // 微信公众号 appid
//        mch_id: string      // 微信商户号，微信支付要用到的
//        device_info?: string      //终端设备号
//        nonce_str: string     //随机字符串
//        sign: string      //签名
//        sign_type?: "MD5" | "HMACSHA256"      //签名类型
//        body: string      //商品描述
//        detail?: string       //商品详情
//        attach?: string      //附加信息
//        out_trade_no: string       //商品订单号
//        fee_type?: string      //货币币种
//        total_fee: number      //标价金额
//        spbill_create_ip: string      //终端ip
//        time_start?: string      //订单生成时间
//        time_expire?: string      //订单结束时间
//        goods_tag?: string      //订单优惠tag
//        notify_url: string      // 微信支付回调通知支付结果
//        trade_type: "JSAPI" | "NATIVE" | "APP"
//        product_id?: string     //trade_type 为NATIVE 及扫码支付 必填
//        limit_pay?: "no_credit"      // 微信支付是否支持信用卡支付
//        openid: string      //用户标识 trade_type=JSAPI时（即公众号支付），此参数必传，
//        scene_info?: JSON     //该字段用于上报场景信息，目前支持上报实际门店信息。
//        coupon_fee?: number   //总代金券金额
//        coupon_count?: number   //代金券使用数量
//        settlement_total_fee?: number
//        [coupe: string]: any
//    }
//    interface PaymentSignature {
//        package: string
//        timeStamp: string
//        nonceStr: string
//        signType: string
//        appId: string
//        paySign: string
//    }
//    interface UserProfile {
//        openid: string
//        nickname: string
//        sex: string,
//        province: string,
//        city: string,
//        country: string,
//        headimgurl: string,
//        privilege: Object[],
//        unionid?: string
//    }
//    interface CachedUserProfile {
//        profile: UserProfile
//        code: string
//        access_token: string
//        refresh_token: string
//        openId: OpenId
//        lastUpdate: Date
//    }
//
//
//    interface CloseOrder {
//        return_code: "SUCCESS" | "FAIL"
//        return_msg?: string
//        appid: string
//        mch_id: string
//        nonce_str: string
//        sign: string
//        result_code: "SUCCESS" | "FAIL"
//        result_msg: string
//        err_code?: string
//        err_code_des?: string
//    }
//
//    interface QueryOrderProfile {
//        return_code: "SUCCESS" | "FAIL"
//        return_msg?: string
//        appid: string
//        mch_id: string
//        nonce_str: string
//        sign: string
//        result_code: "SUCCESS" | "FAIL"
//        err_code?: string
//        err_code_des?: string
//        device_info?: string
//        openid: string
//        is_subscribe?: "Y" | "N"
//        trade_type: "JSAPI" | "NATIVE" | "APP"
//        trade_state: "SUCCESS" | "REFUND" | "NOTPAY" | "CLOSED" | "REVOKED" | "USERPAYING" | "PAYERROR"
//        bank_type: string
//        total_fee: number
//        settlement_total_fee?: number
//        fee_type?: string
//        cash_fee: string
//        cash_fee_type?: string
//        coupon_fee?: number
//        coupon_count?: number
//        transaction_id: string
//        out_trade_no: string
//        attach?: string
//        time_end: string
//        trade_state_desc: string
//        [coupe: string]: any
//    }
//
//    interface JSSDKConfig {
//        debug: boolean
//        appid: string
//        timestamp: string
//        nonceStr: string
//        signature: string
//        jsApiList: string[]
//    }
//
//
//    interface RefundRequest {
//        reason: string
//        refundFee: number
//        meta: WechatModel.PreOrder
//    }
//
//    interface Refund {
//        appid: string  // 微信公众号 appid
//        mch_id: string      // 微信商户号，微信支付要用到的
//        nonce_str: string     //随机字符串
//        sign: string      //签名
//        sign_type?: "MD5" | "HMACSHA256"      //签名类型
//        transaction_id?: string //微信订单号
//        out_trade_no?: string       //商品订单号
//        out_refund_no: string //商户退款单号
//        total_fee: number      //标价金额
//        refund_fee: number
//        refund_fee_type?: string
//        refund_desc?: string //退款原因	
//    }
//
//    interface RefundResult {
//        return_code: "SUCCESS" | "FAIL"
//        return_msg?: string
//        result_code: "SUCCESS" | "FAIL"
//        err_code?: string
//        err_code_des?: string
//        appid: string
//        mch_id: string
//        nonce_str: string
//        sign: string
//        transaction_id: string
//        out_trade_no: string
//        out_refund_no: string
//        refund_id: string
//        refund_fee: number
//        settlement_refund_fee?: number
//        total_fee: number
//        fee_type?: string
//        cash_fee: number
//        cash_fee_type?: string
//        cash_refund_fee?: number
//        coupon_refund_fee?: number
//        coupon_refund_count?: number
//        [coupe: string]: any
//    }
//
//    interface QueryRefundResult {
//        return_code: "SUCCESS" | "FAIL"
//        return_msg?: string
//        result_code: "SUCCESS" | "FAIL"
//        err_code?: string
//        err_code_des?: string
//        appid: string
//        mch_id: string
//        nonce_str: string
//        sign: string
//        transaction_id: string
//        out_trade_no: string
//        out_refund_no: string
//        refund_id: string
//        refund_fee: number
//        settlement_refund_fee?: number
//        total_fee: number
//        fee_type?: string
//        cash_fee: number
//        cash_fee_type?: string
//        cash_refund_fee?: number
//        coupon_refund_fee?: number
//        coupon_refund_count?: number
//        [coupe: string]: any
//        refund_count: number
//        refund_state_0: "SUCCESS" | "REFUNDCLOSE" | "PROCESSING" | "CHANGE"
//    }
//}
//
//declare namespace WechatConfig {
//    interface ShareParam {
//        title: string
//        link: string
//        imgUrl: string
//        desc: string
//        content: string
//    }
//
//    interface PayParam {
//        timeStamp: string, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//        nonceStr: string, // 支付签名随机串，不长于 32 位
//        package: string, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//        signType: string, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//        paySign: string, // 支付签名
//    }
//
//    interface UserAddress {
//        errMsg?: string
//        openAddress?: string
//        userName: string
//        postalCode: string
//        provinceName: string//国标收货地址第一级地址（省）。
//        cityName: string//国标收货地址第二级地址（市）。
//        countryName: string//国标收货地址第三级地址（国家）。
//        detailInfo: string//详细收货地址信息。
//        nationalCode: string //收货地址国家码。
//        telNumber: string
//    }
//
//    interface UserLocation {
//        latitude: number
//        longitude: number
//        speed: string
//        accuracy: string
//    }
//
//    interface OpenLocation {
//        latitude: number, // 纬度，浮点数，范围为90 ~ -90
//        longitude: number, // 经度，浮点数，范围为180 ~ -180。
//        name: string, // 位置名
//        address: string, // 地址详情说明
//        scale: number, // 地图缩放级别,整形值,范围从1~28。默认为最大
//        infoUrl: string // 在查看位置界面底部显示的超链接,可点击跳转
//    }
//}
