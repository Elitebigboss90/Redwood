import { Route, APIRoute, PageRoute, MiddlewareRoute, Method, APIBase as APIBaseRaw, DynamicResourceRoute } from "root-ts/lib/route"
import * as ServiceSpec from "./service"
import { RouteServiceTemplate, APIServiceSpec } from "root-ts/lib/route"
import { parallel } from "async";
import { read } from "fs";

export abstract class RouteService<T extends APIServiceSpec> extends RouteServiceTemplate<T>{
    dependencies = ["ExpressService", "MongodbService", "RouteSessionService"]
    services: ServiceSpec.AllServices
}

export abstract class APIBase extends APIBaseRaw {
    services: ServiceSpec.AllServices
}

export abstract class EchoAPIServiceSpec extends RouteService<typeof EchoAPIService.API>{
    constructor() {
        super(EchoAPIService)
    }
}
namespace EchoAPIService {
    export const prefix = "/api/"
    export const name = "api.echo"
    export const API = {
        echo: new class extends APIBase {
            readonly path = "echo/:name/GET"
            readonly method = "POST"
            return: {
                name: string
                content: string
            }
            params: {
                name: string
            }
            body: {
                content: string
            }
        }
    }
}
// 信息发布
export abstract class PostingAPIServiceSpec extends RouteService<typeof PostingAPIService.API>{
    constructor() {
        super(PostingAPIService)
    }
}

namespace PostingAPIService {
    export const prefix = "/api/"
    export const name = "api.posting"
    export const API = {
        createPost: new class extends APIBase {
            readonly path = "post"
            readonly method = "POST"
            return: PostService.Post
            body: {
                type: string,
                title: string
                content: RichText,
                images?: string[],
                category?: string,
                authorName?: string,
                meta: PostService.Post["meta"]
            }
            info: {
                account: AccountService.Account
            }
        },
        deletePost: new class extends APIBase {
            readonly path = "post/:postId"
            readonly method = "DELETE"
            return: boolean
            params: {
                postId: string
            }
            info: {
                account: AccountService.Account,
                post: PostService.Post
            }
        },
        updatePost: new class extends APIBase {
            readonly path = "post/:postId"
            readonly method = "POST"
            return: PostService.Post
            params: {
                postId: string
            }
            body: Partial<Pick<PostService.Post, "title" | "authorName" | "content" | "images" | "category">>
            info: {
                account: AccountService.Account,
                post: PostService.Post
            }
        },
        queryPosts: new class extends APIBase {
            readonly path = "post/query/GET"
            readonly method = "POST"
            return: PostService.Post[]
            body: EndlessService.EndlessQueryMeta & Partial<Pick<PostService.Post, "type" | "category">> & {
                keyword?: string
                authorId?: string
            }
            info: {
                account: AccountService.Account
            }
        },
        queryPostsAsPaginate: new class extends APIBase {
            readonly path = "post/paginate/GET"
            readonly method = "POST"
            return: PaginateService.PaginateResult<PostService.Post>
            body: PaginateService.PaginateQuery & Partial<Pick<PostService.Post, "type" | "category">> & {
                keyword?: string
                authorId?: string
            }
            info: {
                account: AccountService.Account
            }
        },
        getMyPosts: new class extends APIBase {
            readonly method = "POST"
            readonly path = "post/mine/GET"
            return: PostService.Post[]
            params: {}
            body: {
                type?: string
            } & EndlessService.EndlessQueryMeta
            info: {
                account: AccountService.Account
            }
        },
        getPostById: new class extends APIBase {
            readonly path = "post/:postId/GET"
            readonly method = "POST"
            return: PostService.Post
            params: {
                postId: string
            }
            info: {
                account: AccountService.Account
            }
        },
        stickPost: new class extends APIBase {
            readonly path = "post/:postId/stick"
            readonly method = "POST"
            params: {
                postId: string
            }
        }
    }
}

// 购物
export abstract class ShoppingAPIServiceSpec extends RouteService<typeof ShoppingAPIService.API>{
    constructor() {
        super(ShoppingAPIService)
    }
}


namespace ShoppingAPIService {
    export const prefix = "/api/"
    export const name = "api.shopping"
    export const API = {
        createOrder: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order"
            return: ShopService.Order
            params: {}
            body: {
                contact: ContactService.Contact,
                items: ShopService.Order.ItemQuery[],
            }
            info: {
                account: AccountService.Account
            }
        },
        createOrderAndPayment: new class extends APIBase {
            readonly path = "payment/byOrder"
            readonly method = "POST"
            return: ShopService.Payment
            params: {}
            body: {
                contact: ContactService.Contact
                items: ShopService.Order.ItemQuery[]
                paymentType: string
                // 是否代购
                procurement?: boolean
            }
            info: {
                account: AccountService.Account
            }
        },
        queryBuyerOrder: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/query/GET"
            return: ShopService.Order[]
            params: {}
            body: {
                state?: ShopService.Order.State
            } & EndlessService.EndlessQueryMeta
            info: {
                account: AccountService.Account
            }
        },
        querySellerOrder: new class extends APIBase {
            readonly method = "POST"
            readonly path = "seller/order/query/GET"
            return: ShopService.Order[]
            params: {}
            body: {
                state?: ShopService.Order.State
            } & EndlessService.EndlessQueryMeta
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }

        },
        queryOrdersAsPaginate: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/paginate/GET"
            return: PaginateService.PaginateResult<ShopService.Order>
            body: PaginateService.PaginateQuery & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        // TODO addressComponent??
        addCartItem: new class extends APIBase {
            readonly path = "cartItem"
            readonly method = "POST"
            return: ShopService.CartItem
            body: {
                productId: ShopService.ProductId,
                skuId: ShopService.SKUId,
                quantity: Int,
            }
            info: {
                account: AccountService.Account
            }
        },
        deleteCartItem: new class extends APIBase {
            readonly path = "cartItem/:cartItemId"
            readonly method = "DELETE"
            return: boolean
            params: {
                cartItemId: ShopService.CartItemId
            }
            info: {
                account: AccountService.Account
            }
        },
        // ownerId = session.account.id
        queryCartItems: new class extends APIBase {
            readonly path = "cartItem/all"
            readonly method = "POST"
            return: ShopService.CartItem[]
            info: {
                account: AccountService.Account
            }
        },
        getCartItem: new class extends APIBase {
            readonly path = "cartItem/:cartItemId/GET"
            readonly method = "POST"
            return: ShopService.CartItem
            params: {
                cartItemId: string
            }
            info: {
                account: AccountService.Account
            }
        },
        applySeller: new class extends APIBase {
            readonly path = "seller/apply"
            readonly method = "POST"
            return: null
            body: Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "meta">
            info: {
                account: AccountService.Account
            }
        },
        getAccountSeller: new class extends APIBase {
            readonly method = "POST"
            readonly path = "seller/mine/GET"
            return: ShopService.Seller
            params: {}
            info: {
                seller: ShopService.Seller
                account: AccountService.Account
            }
        },
        verifySeller: new class extends APIBase {
            readonly path = "seller/:sellerId/verify"
            readonly method = "POST"
            return: null
            params: {
                sellerId: ShopService.SellerId
            }
            info: {
                account: AccountService.Account
            }
        },
        updateAccountSeller: new class extends APIBase {
            readonly path = "seller/mine/updates"
            readonly method = "POST"
            return: ShopService.Seller
            params: {
                sellerId: ShopService.SellerId
            }
            body: Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "meta">
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        disableSeller: new class extends APIBase {
            readonly path = "seller/:sellerId/disable"
            readonly method = "POST"
            params: {
                sellerId: ShopService.SellerId
            }
            info: {
                account: AccountService.Account
            }
        },
        enableSeller: new class extends APIBase {
            readonly path = "seller/:sellerId/enable"
            readonly method = "POST"
            params: {
                sellerId: ShopService.SellerId
            }
            info: {
                account: AccountService.Account
            }
        },
        querySellers: new class extends APIBase {
            readonly path = "seller/query"
            readonly method = "POST"
            return: ShopService.Seller[]
            body: EndlessService.EndlessQueryMeta & {
                keyword: string
            }
            info: {
                account: AccountService.Account
            }
        },
        querySellersAsPaginate: new class extends APIBase {
            readonly path = "seller/paginate/GET"
            readonly method = "POST"
            return: PaginateService.PaginateResult<ShopService.Seller>
            body: PaginateService.PaginateQuery & {
                keyword: string,
            }
            info: {
                account: AccountService.Account
            }
        },
        getSellerById: new class extends APIBase {
            readonly path = "seller/:sellerId/GET"
            readonly method = "POST"
            return: ShopService.Seller
            params: {
                sellerId: string
            }
            info: {
                account: AccountService.Account
            }
        },
        getProduct: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product/:productId/GET"
            return: ShopService.Product
            params: {
                productId: string
            }
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        queryProducts: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product/query/GET"
            return: ShopService.Product[]
            params: {}
            body: {
                category?: string
                keyword?: string
                sellerId?: string
            } & EndlessService.EndlessQueryMeta
            info: {
                account: AccountService.Account
            }
        },
        queryProductsAsPaginate: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product/paginate/GET"
            return: PaginateService.PaginateResult<ShopService.Product>
            body: PaginateService.PaginateQuery & {
                keyword?: string,
                sellerId?: string,
            }
        },
        getMyProducts: new class extends APIBase {
            readonly method = "POST"
            readonly path = "products/mine/GET"
            return: ShopService.Product[]
            params: {}
            body: EndlessService.EndlessQueryMeta & {
                category?: string
            }
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        deleteProduct: new class extends APIBase {
            readonly method = "DELETE"
            readonly path = "product/:productId"
            return: null
            params: {
                productId: string
            }
            body: {}
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        createProduct: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product"
            return: ShopService.Product
            params: {
            }
            body: {
                product: Pick<ShopService.Product, "transportType" | "name" | "basePrice" | "transportPrice" | "thumbs" | "props" | "category" | "finite" | "description" | "descriptionImages">
            }
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        disableProduct: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product/:productId/disable"
            params: {
                productId: string
            }
        },
        enableProduct: new class extends APIBase {
            readonly method = "POST"
            readonly path = "product/:productId/enable"
            params: {
                productId: string
            }
        },
        createPayment: new class extends APIBase {
            readonly method = "POST"
            readonly path = "payment"
            return: ShopService.Payment
            params: {}
            body: {
                orderId: string
                type: ShopService.Payment.Type
            }
            info: {
                account: AccountService.Account
            }
        },
        getPaymentById: new class extends APIBase {
            readonly method = "POST"
            readonly path = "payment/:paymentId/GET"
            return: ShopService.Payment
            params: {
                paymentId: string
            }
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        syncPayment: new class extends APIBase {
            readonly method = "POST"
            readonly path = "payment/:paymentId/sync"
            return: ShopService.Payment
            params: {
                paymentId: string
            }
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        getShopEnv: new class extends APIBase {
            readonly method = "POST"
            readonly path = "shop/env/GET"
            return: {
                seller?: ShopService.Seller
                account?: AccountService.Account
            }
            params: {}
            body: {}
            info: {
                seller?: ShopService.Seller
                account?: AccountService.Account
            }
        },
        setOrderDelivering: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/:orderId/state/delivering"
            return: ShopService.Order
            params: { orderId: string }
            body: { transportName: string, transportNum: string }
            info: {
                seller: ShopService.Seller
            }
        },
        setOrderCompleted: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/:orderId/state/completed"
            return: null
            params: { orderId: string }
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        setOrderCanceled: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/:orderId/state/canceled"
            return: null
            params: { orderId: string }
            body: {}
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
        getOrderById: new class extends APIBase {
            readonly method = "POST"
            readonly path = "order/:orderId/GET"
            return: ShopService.Order
            params: { orderId: string }
            body: {}
            info: {
                account: AccountService.Account
                seller: ShopService.Seller
            }
        },
    }
}

// 商家
export abstract class SellingAPIServiceSpec extends RouteService<typeof SellingAPIService.API>{
    constructor() {
        super(SellingAPIService)
    }
}


namespace SellingAPIService {
    export const prefix = "/api/"
    export const name = "api.selling"
    export const API = {
        // 申请成为厂家
        // service.createSeller
        // available: false,
        // state: "pending"
    }
}

// 商家
export abstract class AccountPropAPIServiceSpec extends RouteService<typeof AccountPropAPIService.API>{
    constructor() {
        super(AccountPropAPIService)
    }
}


namespace AccountPropAPIService {
    export const prefix = "/api/"
    export const name = "api.accountProp"
    export const API = {
        updateAccount: new class extends APIBase {
            readonly method = "POST"
            readonly path = "account/prop/updates"
            return: null
            body: {
                avatar?: string
                displayName?: string
            }
            info: {
                account: AccountService.Account
            }
        },
        // 申请成为厂家
        // service.createSeller
        // available: false,
        // state: "pending"
    }
}

export abstract class AccountQueryAPIServiceSpec extends RouteService<typeof AccountQueryAPIService.API> {
    constructor() {
        super(AccountQueryAPIService)
    }
}

namespace AccountQueryAPIService {
    export const prefix = "/api/"
    export const name = "api.accountQuery"
    export const API = {
        queryAccountsAsPaginate: new class extends APIBase {
            readonly method = "POST"
            readonly path = "account/paginate/GET"
            body: PaginateService.PaginateQuery
            return: PaginateService.PaginateResult<AccountService.Account>
        }
    }
}



// 帐号
export abstract class AuthenticatingAPIServiceSpec extends RouteService<typeof AuthenticatingAPIService.API>{
    constructor() {
        super(AuthenticatingAPIService)
    }
}

namespace AuthenticatingAPIService {
    export const prefix = "/api/"
    export const name = "api.authenticating"
    export const API = {
        registerWithPhone: new class extends APIBase {
            readonly path = "register/phone"
            readonly method = "POST"
            body: {
                phone: string,
                password: string,
                // 短信验证码
                code: string,
            }
            return: {
                account: AccountService.Account
            }
        },
        sendPhoneVerificationCode: new class extends APIBase {
            readonly path = "register/phone/code"
            readonly method = "POST"
            body: {
                phone: string
                debug?: boolean
            }
            return: null
        },
        getTokenByPhone: new class extends APIBase {
            readonly path = "register/phone/token/GET"
            readonly method = "POST"
            body: {
                phone: string
                password: string
            }
            return: {
                token: string
            }
        },
        getTokenByCode: new class extends APIBase {
            readonly path = "register/code/token/GET"
            readonly method = "POST"
            body: {
                phone: string
                code: string
            }
            return: {
                token: string
            }
        },
        getWechatOpenIdByCode: new class extends APIBase {
            readonly path = "account/wechat/openId/GET"
            readonly method = "POST"
            body: {
                wechatCode: string
            }
            return: {
                openId: string
            }
        },
        getTokenByWechat: new class extends APIBase {
            readonly path = "register/wechat/token/GET"
            readonly method = "POST"
            body: {
                openId: string
            }
            return: {
                token: string
            }
        },
        bindWechat: new class extends APIBase {
            readonly path = "account/bind/wechat"
            readonly method = "POST"
            body: {
                accountId: string,
                openId: string
            }
            return: null
        },
        getCurrentAccount: new class extends APIBase {
            readonly path = "account/current"
            readonly method = "POST"
            info: {
                account: AccountService.Account
            }
            return: AccountService.Account
        },
        getAccountAuthentications: new class extends APIBase {
            readonly path = "account/authentications/GET"
            readonly method = "POST"
            body: {
                accountId: string
            }
            return: any[]
        },
        updatePassword: new class extends APIBase {
            readonly path = "account/update/password"
            readonly method = "POST"
            body: {
                phone: string,
                password: string,
                code: string
            }
            return: null
        }
    }
}

export abstract class TransportAPIServiceSpec extends RouteService<typeof TransportAPIService.API>{
    constructor() {
        super(TransportAPIService)
    }
}
export namespace TransportAPIService {

    export const prefix = "/api/"
    export const name = "api.transport"
    export const API = {
        createReceiver: new class extends APIBase {
            readonly path = "receiver"
            readonly method = "POST"
            return: TransportService.Receiver
            body: {
                contact: ContactService.Contact
            }
            info: {
                account: AccountService.Account
            }
        },
        getMyReceivers: new class extends APIBase {
            readonly method = "POST"
            readonly path = "receivers/GET"
            return: TransportService.Receiver[]
            params: {}
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        deleteReceiver: new class extends APIBase {
            readonly method = "POST"
            readonly path = "receiver/:receiverId"
            return: null
            params: {
                receiverId: string
            }
            body: {}
            info: {
                account: AccountService.Account
            }
        },
        updateReceiver: new class extends APIBase {
            readonly method = "PUT"
            readonly path = "receiver/:receiverId"
            return: TransportService.Receiver
            params: {
                receiverId: string
            }
            body: {
                contact: ContactService.Contact
            }
            info: {
                account: AccountService.Account
            }
        },
    }
}


export abstract class PlatformAPIServiceSpec extends RouteService<typeof PlatformAPIService.API>{
    constructor() {
        super(PlatformAPIService)
    }
}
export namespace PlatformAPIService {
    export const prefix = "/api/"
    export const name = "api.platform"
    export const API = {
        setInformation: new class extends APIBase {
            readonly method = "POST"
            readonly path = "platform/information"
            body: Partial<Pick<PlatformService.Information, "customerServicePhoneNumber">>
            return: PlatformService.Information
        },
        getInformation: new class extends APIBase {
            readonly method = "POST"
            readonly path = "platform/information/GET"
            return: PlatformService.Information
        }
    }
}
