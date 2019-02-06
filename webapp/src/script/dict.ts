

export function arrayToDict(items: (number | string)[]): DictItem[] {
    return items.map(item => {
        return {
            value: item,
            displayText: `${item}`
        }
    })
}
export function objToDictReverse<T>(map: { [key: string]: T }): DictItem<T>[] {
    let keys = Object.keys(map)
    let value = keys.map(item => {
        return {
            displayText: map[item].toString(),
            value: (item as any) as T
        }
    })
    return value
}
export function objToDict<T>(map: { [key: string]: T }): DictItem<T>[] {
    let keys = Object.keys(map)
    let value = keys.map(item => {
        return {
            displayText: item,
            value: map[item]
        }
    })
    return value
}

export const Disabled: DictItem[] = [
    {
        displayText: "禁用",
        value: true
    },
    {
        displayText: "启用",
        value: false
    }
]

export const ArticleCategory: DictItem[] = arrayToDict([
    "最新",
    "推荐",
    "热门"
])


export const SubjectCategory: DictItem[] = [
    {
        displayText: "运输",
        value: "transport",
    },
    {
        displayText: "修理",
        value: "fix",
    },
    {
        displayText: "大包",
        value: "pack",
    },
    {
        displayText: "搬运",
        value: "carry",
    },
    {
        displayText: "配件",
        value: "accessory",
    },
    {
        displayText: "物流",
        value: "logistics",
    },
    {
        displayText: "油漆",
        value: "paint",
    },
    {
        displayText: "机器",
        value: "machine",
    },
]

export const OrderStateMap = {
    pending: "待付款",
    paid: "待发货",
    delivering: "已发货",
    refunding: "退款中",
    refunded: "已退款",
    refundRejected: "退款失败",
    completed: "已完成",
    canceled: "已取消"
}

export const OrderState = objToDictReverse(OrderStateMap)