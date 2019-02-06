import { FormFactory } from "../base/form";
import { Editor } from "../base/editor";


type Post = Pick<PostService.Post, "title" | "authorName" | "content" | "images" | "category">

class PostEd extends Editor<Post> { }
export const PostEditor = FormFactory.create<Post, typeof PostEd>({
    fields: {
        title: "标题",
        authorName: "作者",
        content: "内容",
        images: "图片",
    },
    types: {
        title: "text",
        authorName: "text",
        content: "textarea",
        images: "images",
    }
}, PostEd)

class ArticleEd extends Editor<Post> { }
export const ArticleEditor = FormFactory.create<Post, typeof ArticleEd>({
    fields: {
        title: "标题",
        category: "类型",
        authorName: "作者",
        content: "内容",
        images: "图片",
    },
    types: {
        title: "text",
        authorName: "text",
        content: "textarea",
        images: "images",
        category: "select"
    },
    metas: {
        category: {
            dict: "ArticleCategory",
            placement: "top"
        }
    }
}, ArticleEd)



class SubjectEd extends Editor<Post> { }
export const SubjectEditor = FormFactory.create<Post, typeof SubjectEd>({
    fields: {
        title: "标题",
        category: "类型",
        authorName: "作者",
        content: "内容",
        images: "图片",
    },
    types: {
        title: "text",
        authorName: "text",
        content: "textarea",
        images: "images",
        category: "select"
    },
    metas: {
        category: {
            dict: "SubjectCategory",
            placement: "top"
        }
    }
}, SubjectEd)


type Account = {
    displayName: string,
    avatar: string[],
    phone: string,
    disabled: boolean
}
class AccountEd extends Editor<Account> { }
export const AccountEditor = FormFactory.create<Account, typeof AccountEd>({
    fields: {
        displayName: "用户名",
        avatar: "头像",
        phone: "手机号",
    },
    types: {
        avatar: "images"
    },
    metas: {
        avatar: "images",
    }
}, AccountEd)



type Seller = {
    name: string,
    avatar: string,
    phone: string,
    addressDistrict: string
    addressDetail: string,
    businessLicense: string
}
class SellerEd extends Editor<Seller> { }
export const SellerEditor = FormFactory.create<Seller, typeof SellerEd>({
    fields: {
        name: "名称",
        avatar: "头像",
        phone: "手机号",
        addressDistrict: "地区",
        addressDetail: "详细地址",
        businessLicense: "营业执照"
    },
    types: {
        avatar: "images",
        businessLicense: "images"
    }
}, SellerEd)



type Product = {
    name: string,
    thumbs: string[],
    basePrice: RMBCent,
    description: string,
    descriptionImages: string[]
}
class ProductEd extends Editor<Product> { }
export const ProductEditor = FormFactory.create<Product, typeof ProductEd>({
    fields: {
        name: "名称",
        thumbs: "图片",
        basePrice: "价格",
        description: "介绍文字",
        descriptionImages: "介绍图片"
    },
    types: {
        thumbs: "images",
        basePrice: "number",
        descriptionImages: "images"
    },
    metas: {
        basePrice: {
            unit: "元"
        }
    }
}, ProductEd)


type Order = {
    id: string,
    items: string[],
    totalFee: RMBCent,
    state: string
}
class OrderEd extends Editor<Order> { }
export const OrderEditor = FormFactory.create<Order, typeof OrderEd>({
    fields: {
        id: "单号",
        items: "商品",
        totalFee: "总费用",
        state: "状态"
    },
    types: {
        items: "texts",
        totalFee: "number",
    },
    metas: {
        totalFee: {
            unit: "元"
        }
    }
}, OrderEd)



type Help = Pick<PostService.Post, "content">
class HelpEd extends Editor<Help> { }
export const HelpEditor = FormFactory.create<Help, typeof HelpEd>({
    fields: {
        content: "帮助内容",
    },
    types: {
        content: "textarea"
    }
}, HelpEd)