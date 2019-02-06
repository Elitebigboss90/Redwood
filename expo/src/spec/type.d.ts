type Callback<T> = (err?: Error, result?: T) => void

type GUID = string | number
type LongHexId = string
type LargeNumberId = number
type IncrementalId = number
type HashId = string


type RMBCent = number
type Int = number
type Timestamp = number
type HourMinute = string
type RichText = string

interface AddressDistrict {
    province: District
    city: District
    area: District
}
interface District {
    code: string
    name: string
    level: District.Level
    children?: District[]
}
declare namespace District {
    type Level = keyof {
        "province",
        "city",
        "area"
    }
}

declare namespace Model {
    // account.id = largeNumber.toString()
    // largeNumber for human readable
    // toString to be capable with builtIn.accountSerivce
    type AccountId = string
    type SellerId = LargeNumberId
    type PostId = IncrementalId
    type AuthorId = AccountId | SellerId
    // 账号
    interface Account {
        id: AccountId,
        name: string,
        displayName: string,
        role: Account.Role,
        props?: Account.User
    }
    namespace Account {
        type Role = keyof {
            "user",
            "seller",
            "admin",
        }
        type Props = User
        interface User {
            phone: string,
            avatar: string,
            defaultReceiverId?: LongHexId
        }
    }



    // 发布内容
    interface Post {
        id: PostId,
        type: Post.Type,
        authorId: AuthorId,
        title: string,
        content: RichText,
        thumbs?: string[],
        createAt: Timestamp,
        props?: Post.Props
    }
    namespace Post {
        type Type = keyof {
            // 首页文章
            "article",
            // 分类服务帖
            "subject",
            // 招聘帖
            "job",
        }
        type Props = Subject
        interface Subject {
            topicId: LargeNumberId,
        }
        // 服务信息分类
        interface Topic {
            id: LargeNumberId,
            name: string,
        }
    }

    // 商家（厂家）
    interface Seller {
        id: SellerId,
        name: string,
        phone: string,
        addressDistrict: AddressDistrict,
        addressDetail: string,
        // 头像
        avatar?: string,
        // 描述
        desc?: string,
        ownerId: AccountId,
        createAt: Timestamp,
        available: boolean,
        state: Seller.State,
        spuCount: number
    }
    namespace Seller {
        type State = keyof {
            "pending",
            "rejected",
            "enabled",
            "disabled",
        }
    }

    // 商品
    interface SPU {
        id: IncrementalId,
        ownerId: SellerId,
        type: SPU.Type,
        price: RMBCent,
        name: string,
        thumbs?: string,
        // 销量
        tradeCount?: Int,
        detail: RichText,
        props: SPU.Prop[],
        createAt: Timestamp,
        available: boolean,
    }
    namespace SPU {
        type Type = keyof {
            // 原材
            "wood",
            // 家具
            "furniture",
        }
        // 商品规格
        type Prop = EnumProp
        interface EnumProp {
            name: string,
            values: {
                name: string,
                value: string,
                // If we have an image for that SKU
                thumb?: string,
            }[],
            default: string
        }
    }

    // 库存
    interface SKU {
        // Hash Id created by hash(SPU.id + props.toArray.sortByName(low to high).toJSON)
        id: HashId,
        spu: SPU,
        price: RMBCent,
        quantity: Int,
        // Dismiss sku.quantity when `sku.infinite == true`
        infinite?: boolean,
        ownerId: SellerId,
        // All props save as key-values for dislay
        props: {
            [key: string]: any
        },
        available: boolean,
    }


    // 收件人
    interface Receiver {
        id: LongHexId,
        creatorId: AccountId,
        name: string,
        phone: string,
        addressDistrict: AddressDistrict,
        addressDetail: string,
    }

    // 订单
    interface Order {
        id: LargeNumberId,
        buyerId: AccountId,
        sellerId: SellerId,
        paymentId?: GUID,
        refundId?: GUID,
        items: Order.Item[],
        receiver: Receiver,
        amount: RMBCent,
        state: Order.State,
        createAt: Timestamp,
    }
    namespace Order {
        type Type = keyof {
            // 商家发货
            "shop",
            // 平台代选货／发货
            "furniture",
        }
        type State = keyof {
            "pending",
            "paid",
            "shipping",
            "refunding",
            "refunded",
            "refundRejected",
            "completed",
            "expired",
            "canceled",
        }
        // 订单商品
        interface Item {
            sku: SKU,
            // dislay props save as key-values
            props: {
                [key: string]: any
            },
            quantity: Int,
        }
    }


    // 购物车商品
    interface CartItem {
        id: LongHexId,
        ownerId: GUID,
        sku: SKU,
        // dislay props save as key-values
        props: {
            [key: string]: any
        },
        quantity: Int,
    }

    interface Payment {
        id: LongHexId,
        orderId: GUID,
        buyerId: AccountId,
        type: Payment.Type,
        amount: RMBCent,
        meta: WechatModel.PreOrder,
        state: Payment.State,
        createAt: Timestamp,
    }
    namespace Payment {
        type State = keyof {
            "pending",
            "expired",
            "completed",
            "canceled",
        }
        type Type = keyof {
            "wechat"
        }
    }

    interface Refund {
        id: LongHexId,
        orderId: LargeNumberId,
        customerId: LargeNumberId,
        paymentAmount: RMBCent,
        refundAmount: RMBCent,
        state: Refund.State,
        meta: WechatModel.RefundResult,
        createAt: Timestamp,
    }

    namespace Refund {
        type State = keyof {
            "pending",
            "expired",
            "completed",
            "canceled",
        }
    }

    // 广告
    interface Ad {
        id: LongHexId,
        content: RichText,
        creatorId: AccountId,
        createAt: Timestamp,
    }

    // 短信验证码
    interface SMSVerificationData {
        phoneNumber: string,
        verificationCode: string,
        expire: number,
        createAt: Timestamp,
    }
}




declare namespace WechatModel {
    type URL = string
    type OpenId = string
    type preOrderRequest = {
        openId: string
        userIp: string
        price: number
    }
    interface PreOrder {
        appid: string  // 微信公众号 appid
        mch_id: string      // 微信商户号，微信支付要用到的
        device_info?: string      //终端设备号
        nonce_str: string     //随机字符串
        sign: string      //签名
        sign_type?: "MD5" | "HMACSHA256"      //签名类型
        body: string      //商品描述
        detail?: string       //商品详情
        attach?: string      //附加信息
        out_trade_no: string       //商品订单号
        fee_type?: string      //货币币种
        total_fee: number      //标价金额
        spbill_create_ip: string      //终端ip
        time_start?: string      //订单生成时间
        time_expire?: string      //订单结束时间
        goods_tag?: string      //订单优惠tag
        notify_url: string      // 微信支付回调通知支付结果
        trade_type: "JSAPI" | "NATIVE" | "APP"
        product_id?: string     //trade_type 为NATIVE 及扫码支付 必填
        limit_pay?: "no_credit"      // 微信支付是否支持信用卡支付
        openid: string      //用户标识 trade_type=JSAPI时（即公众号支付），此参数必传，
        scene_info?: JSON     //该字段用于上报场景信息，目前支持上报实际门店信息。
        coupon_fee?: number   //总代金券金额
        coupon_count?: number   //代金券使用数量
        settlement_total_fee?: number
        [coupe: string]: any
    }
    interface PaymentSignature {
        package: string
        timeStamp: string
        nonceStr: string
        signType: string
        appId: string
        paySign: string
    }
    interface UserProfile {
        openid: string
        nickname: string
        sex: string,
        province: string,
        city: string,
        country: string,
        headimgurl: string,
        privilege: Object[],
        unionid?: string
    }
    interface CachedUserProfile {
        profile: UserProfile
        code: string
        access_token: string
        refresh_token: string
        openId: OpenId
        lastUpdate: Date
    }


    interface CloseOrder {
        return_code: "SUCCESS" | "FAIL"
        return_msg?: string
        appid: string
        mch_id: string
        nonce_str: string
        sign: string
        result_code: "SUCCESS" | "FAIL"
        result_msg: string
        err_code?: string
        err_code_des?: string
    }

    interface QueryOrderProfile {
        return_code: "SUCCESS" | "FAIL"
        return_msg?: string
        appid: string
        mch_id: string
        nonce_str: string
        sign: string
        result_code: "SUCCESS" | "FAIL"
        err_code?: string
        err_code_des?: string
        device_info?: string
        openid: string
        is_subscribe?: "Y" | "N"
        trade_type: "JSAPI" | "NATIVE" | "APP"
        trade_state: "SUCCESS" | "REFUND" | "NOTPAY" | "CLOSED" | "REVOKED" | "USERPAYING" | "PAYERROR"
        bank_type: string
        total_fee: number
        settlement_total_fee?: number
        fee_type?: string
        cash_fee: string
        cash_fee_type?: string
        coupon_fee?: number
        coupon_count?: number
        transaction_id: string
        out_trade_no: string
        attach?: string
        time_end: string
        trade_state_desc: string
        [coupe: string]: any
    }

    interface JSSDKConfig {
        debug: boolean
        appid: string
        timestamp: string
        nonceStr: string
        signature: string
        jsApiList: string[]
    }


    interface RefundRequest {
        reason: string
        refundFee: number
        meta: WechatModel.PreOrder
    }

    interface Refund {
        appid: string  // 微信公众号 appid
        mch_id: string      // 微信商户号，微信支付要用到的
        nonce_str: string     //随机字符串
        sign: string      //签名
        sign_type?: "MD5" | "HMACSHA256"      //签名类型
        transaction_id?: string //微信订单号
        out_trade_no?: string       //商品订单号
        out_refund_no: string //商户退款单号
        total_fee: number      //标价金额
        refund_fee: number
        refund_fee_type?: string
        refund_desc?: string //退款原因	
    }

    interface RefundResult {
        return_code: "SUCCESS" | "FAIL"
        return_msg?: string
        result_code: "SUCCESS" | "FAIL"
        err_code?: string
        err_code_des?: string
        appid: string
        mch_id: string
        nonce_str: string
        sign: string
        transaction_id: string
        out_trade_no: string
        out_refund_no: string
        refund_id: string
        refund_fee: number
        settlement_refund_fee?: number
        total_fee: number
        fee_type?: string
        cash_fee: number
        cash_fee_type?: string
        cash_refund_fee?: number
        coupon_refund_fee?: number
        coupon_refund_count?: number
        [coupe: string]: any
    }

    interface QueryRefundResult {
        return_code: "SUCCESS" | "FAIL"
        return_msg?: string
        result_code: "SUCCESS" | "FAIL"
        err_code?: string
        err_code_des?: string
        appid: string
        mch_id: string
        nonce_str: string
        sign: string
        transaction_id: string
        out_trade_no: string
        out_refund_no: string
        refund_id: string
        refund_fee: number
        settlement_refund_fee?: number
        total_fee: number
        fee_type?: string
        cash_fee: number
        cash_fee_type?: string
        cash_refund_fee?: number
        coupon_refund_fee?: number
        coupon_refund_count?: number
        [coupe: string]: any
        refund_count: number
        refund_state_0: "SUCCESS" | "REFUNDCLOSE" | "PROCESSING" | "CHANGE"
    }
}

declare namespace WechatConfig {
    interface ShareParam {
        title: string
        link: string
        imgUrl: string
        desc: string
        content: string
    }

    interface PayParam {
        timeStamp: string, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: string, // 支付签名随机串，不长于 32 位
        package: string, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: string, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: string, // 支付签名
    }

    interface UserAddress {
        errMsg?: string
        openAddress?: string
        userName: string
        postalCode: string
        provinceName: string//国标收货地址第一级地址（省）。
        cityName: string//国标收货地址第二级地址（市）。
        countryName: string//国标收货地址第三级地址（国家）。
        detailInfo: string//详细收货地址信息。
        nationalCode: string //收货地址国家码。
        telNumber: string
    }

    interface UserLocation {
        latitude: number
        longitude: number
        speed: string
        accuracy: string
    }

    interface OpenLocation {
        latitude: number, // 纬度，浮点数，范围为90 ~ -90
        longitude: number, // 经度，浮点数，范围为180 ~ -180。
        name: string, // 位置名
        address: string, // 地址详情说明
        scale: number, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: string // 在查看位置界面底部显示的超链接,可点击跳转
    }
}
