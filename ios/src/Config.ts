import { postCategoryToCN } from "./util/Transformer"
import { Constants } from "expo"
import { Header } from "react-navigation"

export enum PostType {
    article = "article",
    job = "job",
    position = "position",
    subject = "subject",
    seller = "seller",
    wood = "wood",
    furniture = "furniture"
}

export enum PostCategory {
    transport = "transport",
    fix = "fix",
    pack = "pack",
    carry = "carry",
    accessory = "accessory",
    logistics = "logistics",
    paint = "paint",
    machine = "machine",
}

export enum ProductCategory {
    wood = "wood",
    furniture = "furniture",
}

export const Config = {
    styleColor: "#CA2D30",

    horizontal: 16,

    viewHeight: 44,

    grayColor: "#999999",

    backgroundColor: "#F5F7F9",

    headerTintColor: "#333333",

    textColor: "#333333",

    //root: "http://192.168.0.145:25109",  // test

    // root: "http://192.168.0.107:25109/",  // local

    //root: "http://120.55.44.120:25109",  // release

    root: "https://mutoumulao.com",  // release domain

    wechatAppId: "wx84bd33fbc16c10b7",

    paymentType: {
        wechat: "wechat",
    },

    keys: {
        token: "token",
        defaultReceiverId: "defaultReceiverId"
    },

    types: [
        PostType.article,
        PostType.seller,
        PostType.wood,
        PostType.furniture,
        PostType.job,
        PostType.position
    ],

    categories: [
        PostCategory.transport,
        PostCategory.fix,
        PostCategory.pack,
        PostCategory.carry,
        PostCategory.accessory,
        PostCategory.logistics,
        PostCategory.paint,
        PostCategory.machine
    ],

    productCategories: [
        ProductCategory.furniture,
        ProductCategory.wood,
    ],

    countPerPage: 10,

    testAlertMessage: "支付功能待开通。敬请期待",

    productDisabledPrompt: "该商品已下架，请联系客服",

    sellerDisabledPrompt: "该商家已下架，请联系客服",

    statusBarHeight: Constants.statusBarHeight || 20,

    navigationHeaderHeight: Header.HEIGHT || 44
}
