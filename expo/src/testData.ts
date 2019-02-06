import * as Resource from "./resource"
import { ReceiverEntry } from "./receiverEntry";
export const article = {
    title: "紫檀红木",
    content: "实施创新驱动发展战略，优化创新生态，形成多主体协同、全方位推进的创新局面。扩大科研机构和高校科研自主权，改进科研项目和经费管理，深化科技成果权益管理改革。支持北京、上海建设科技创新中心，新设14个国家自主创新示范区，带动形成一批区域创新高地。以企业为主体加强技术创新体系建设，涌现一批具有国际竞争力的创新型企业和新型研发机构。深入开展大众创业、万众创新，实施普惠性支持政策，完善孵化体系。各类市场主体达到9800多万户，五年增加70%以上。国内有效发明专利拥有量增加两倍，技术交易额翻了一番。我国科技创新由跟跑为主转向更多领域并跑、领跑，成为全球瞩目的创新创业热土",
    image: require("../resource/image/example-large.png")
}

export const seller: Model.Seller = {
    id: null,
    name: "大清之巅红木源头厂家",
    phone: "13037124308",
    addressDistrict: {
        city: null,
        province: null,
        area: null,
    },
    addressDetail: null,
    avatar: require("../resource/image/example-avatar.png"),
    ownerId: null,
    createAt: Date.now(),
    available: false,
    spuCount: 256,
    state: "enabled",
    desc: "专业红木销售旗舰店"
}
export const spu: Model.SPU = {
    id: 0,
    ownerId: null,
    type: "furniture" as any,
    price: 240000,
    name: "紫檀红木桌子",
    thumbs: Resource.Image.exampleProduct,
    tradeCount: 243,
    detail: "我可是非常好的一个商品",
    props: [{
        name: "颜色分类",
        values: [{
            name: "深红色",
            value: "深红色",
        }, {
            name: "褐色",
            value: "褐色",
        }],
        default: "褐色"
    }],
    createAt: Date.now(),
    available: true
}
export const sku: Model.SKU = {
    id: null,
    spu: {
        id: 0,
        ownerId: 0,
        type: "furniture",
        price: 240000,
        name: "鸡翅木福字太师椅子厂家直销",
        thumbs: require("../resource/image/example-large.png") as any,
        tradeCount: 0,
        detail: "没有什么特别的说明",
        props: null,
        createAt: Date.now(),
        available: false
    },
    quantity: 124,
    price: 240000,
    ownerId: null,
    props: {
        "color": "原木色",
        "type": "官方标配"
    },
    available: true,
}

export const wood = spu
export const cartItem = {
    id: null,
    ownerId: null,
    sku: sku,
    props: {
        "color": "原木色",
        "type": "官方标配"
    },
    quantity: 1
}

export const address: AddressDistrict = {
    area: {
        name: "武昌",
        code: "2",
        level: "area"
    },
    city: {
        name: "武汉",
        code: "3",
        level: "city",
    },
    province: {
        name: "湖北",
        level: "province",
        code: "1"
    }
}
export const receiver: Model.Receiver = {
    id: null,
    creatorId: null,
    name: "冯雅薇",
    phone: "13037124308",
    addressDistrict: address,
    addressDetail: "叶麻店 17-01-602"
}

export const order: Model.Order = {
    id: 192291820192837102,
    buyerId: "1234",
    sellerId: 1234,
    paymentId: "1234",
    refundId: null,
    items: [cartItem],
    receiver,
    amount: 240000,
    state: "pending",
    createAt: Date.now()
}
