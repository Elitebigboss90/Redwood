// type: subject seller job SPU(furniture wood)  category(subject)-

import { PostType, PostCategory, ProductCategory } from "../Config"

export function postTypeToCN(type: PostType | string) {
    let text: string = null
    if (type === PostType.article) text = "文章"
    else if (type === PostType.job) text = "求职"
    else if (type === PostType.position) text = "职位"
    else if (type === PostType.subject) text = "服务"
    return text
}

export function postCategoryToCN(category: PostCategory | string) {
    let text: string = null
    if (category === PostCategory.transport) text = "运输"
    else if (category === PostCategory.fix) text = "修理"
    else if (category === PostCategory.pack) text = "打包"
    else if (category === PostCategory.carry) text = "搬运"
    else if (category === PostCategory.accessory) text = "配件"
    else if (category === PostCategory.logistics) text = "物流"
    else if (category === PostCategory.paint) text = "油漆"
    else if (category === PostCategory.machine) text = "机器"
    return text
}

export function productCategoryToCN(category: ProductCategory | string) {
    let text: string = null
    if (category === ProductCategory.wood) text = "木材"
    else if (category === ProductCategory.furniture) text = "家具"
    return text
}

export function orderStateToCN(state: ShopService.Order.State | string) {
    // "pending"
    // "paid"
    // "delivering"
    // "refunding"
    // "refunded"
    // "refundRejected"
    // "completed"
    // "canceled"
    let text: string = null
    if (state === null) text = "全部"
    else if (state === "pending") text = "待付款"
    else if (state === "paid") text = "待发货"
    else if (state === "delivering") text = "已发货"
    else if (state === "refunding") text = "退款中"
    else if (state === "refunded") text = "已退款"
    else if (state === "refundRejected") text = "退款失败"
    else if (state === "completed") text = "已完成"
    else if (state === "canceled") text = "已取消"
    return text
}

export function timestampToString(timestamp: Timestamp) {
    const now = Date.now()
    const second = (now - timestamp) / 1000
    if (second <= 60) return "刚刚"
    else if (second / 60 < 60) return Math.round(second / 60) + "分钟前"
    else if (second / 3600 < 24) return Math.round(second / 3600) + "小时前"
    else if (second / 3600 / 24 < 30) return Math.round(second / 3600 / 24) + "天前"
    else if (second / 3600 / 24 / 30 < 365) return Math.round(second / 3600 / 24 / 30) + "个月前"
    else return Math.round(second / 3600 / 24 / 30 / 365) + "年前"
}

export function centToYuan(cent: number) {
    return cent / 100
}