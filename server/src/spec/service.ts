///<reference path="type.d.ts"/>
import { Service as RawService } from "root-ts/lib/service"
import { WechatPaymentService } from "root-ts/service/wechatPaymentService"
import { Locks } from "root-ts/service/memoryLockService"

import * as BuiltIn from "root-ts/lib/builtInService"
import * as mongodb from "mongodb"
import * as Leaf from "leaf-ts"
import { Builder } from "xml2js";
import * as wxkit from "wxkit"

export abstract class Service<T = any> extends RawService<T> {
    public services: AllServices
}

export interface AllServices {
    ExpressService: BuiltIn.ExpressService
    MongodbService: BuiltIn.MongodbService
    IncrementalIdService: BuiltIn.IncrementalIdService
    PostService: PostService
    ContactService: ContactService
    ShopService: ShopService
    TTLSessionStorage: BuiltIn.TTLSessionStorage
    AuthenticationService: AuthenticationService
    AccountService: BuiltIn.AccountService
    AccountPropService: AccountPropService
    AccountQueryService: AccountQueryService
    PhoneValidationService: PhoneValidationService
    EndlessService: EndlessService
    PaginateService: PaginateService
    MemoryLockService: BuiltIn.MemoryLockService
    TransportService: TransportService
    WechatPaymentService: WechatPaymentService
    KeyValueStorage: BuiltIn.KeyValueStorage
    PlatformService: PlatformService
    OrderExtraService: OrderExtraService
    PostExtraService: PostExtraService
    AutoTaskService: AutoTaskService
}
export abstract class AccountPropService extends Service<AccountPropService.Settings> {
    readonly name = "AccountPropService"
    readonly dependencies = ["AccountService"]
    constructor(settings: AccountPropService.Settings) {
        super({
        }, settings)
    }
    abstract update(option: {
        id: string
        displayName?: string
        avatar?: string
    }, callback: Callback<null>)

}

export abstract class AccountQueryService extends Service {
    readonly name = "AccountQueryService"
    readonly dependencies = ["AccountService", "PaginateService"]
    abstract queryAccountsAsPaginate(option: PaginateService.PaginateQuery, callback: Callback<PaginateService.PaginateResult<AccountService.Account>>)
}

export abstract class MongodbService extends BuiltIn.MongodbService {
    userCollection: mongodb.Collection
    services: AllServices
}

export abstract class ContactService extends Service {
    readonly name = "ContactService"
    abstract getDistrictByCode(code: string, callback: Callback<ContactService.District[]>)
}

export abstract class EndlessService extends Service<EndlessService.Settings> {
    readonly name = "EndlessService"
    dependencies = []
    constructor(settings: EndlessService.Settings) {
        super({
            endless: {
                count: 10
            },
        }, settings)
    }
    abstract query<K, T = any>(option: EndlessService.EndlessQuery<T> & {
        collection: mongodb.Collection
    }, callback: Callback<K[]>)
}
export abstract class PostService extends Service {
    readonly name = "PostService"
    dependencies = ["MongodbService", "AccountService", "EndlessService", "PaginateService"]
    postCollection: mongodb.Collection<PostService.Post>
    abstract createPost(option: {
        body: any,
        accoundId: AccountService.AccountId
    }, callback: Callback<PostService.Post>)
    abstract deletePost(option: { id: PostService.PostId }, callback: Callback<boolean>)
    abstract updatePost(option: { id: PostService.PostId, updates: Partial<Pick<PostService.Post, "title" | "content" | "images" | "category">> }, callback: Callback<PostService.Post>)
    abstract getPost(option: {
        id: PostService.PostId
    }, callback: Callback<PostService.Post>)
    abstract queryPost(option: EndlessService.EndlessQueryMeta & Partial<Pick<PostService.Post, "authorId" | "type" | "category">> & {
        keyword: string,
    }, callback: Callback<PostService.Post[]>)

    abstract queryPostsAsPaginate(option: PaginateService.PaginateQuery & Partial<Pick<PostService.Post, "authorId" | "type" | "category">> & {
        keyword: string,
    }, callback: Callback<PaginateService.PaginateResult<PostService.Post>>)
    abstract getPostsByOwner(option: EndlessService.EndlessQueryMeta & {
        ownerId: string
        type?: string
    }, callback: Callback<PostService.Post[]>)
}

export abstract class TransportService extends Service {
    readonly name = "TransportService"
    dependencies = ["MongodbService", "IncrementalIdService", "AccountService", "ContactService"]
    receiverCollection: mongodb.Collection<TransportService.Receiver>
    abstract createReceiver(option: {
        ownerId: AccountService.AccountId
        contact: ContactService.Contact
    }, callback: Callback<TransportService.Receiver>)
    abstract updateReceiver(option: {
        id: TransportService.ReceiverId
        contact: ContactService.Contact
    }, callback: Callback<TransportService.Receiver>)
    abstract getReceivers(option: { ownerId: AccountService.AccountId }, callback: Callback<TransportService.Receiver[]>)
    abstract deleteReceiver(option: { id: TransportService.ReceiverId, ownerId: AccountService.AccountId }, callback: Callback<null>)
}

export abstract class ShopService extends Service<ShopService.Settings> {
    constructor(settings: ShopService.Settings) {
        super({
            shop: {
                defaultTransportPriceRMBCent: 5 * 100,
                enableDebugPayment: false
            }
        }, settings)
    }
    readonly name = "ShopService"
    dependencies = ["MongodbService", "IncrementalIdService", "MemoryLockService", "ContactService", "WechatPaymentService", "PaginateService"]
    productCollection: mongodb.Collection<ShopService.Product>
    orderCollection: mongodb.Collection<ShopService.Order>
    sellerCollection: mongodb.Collection<ShopService.Seller>
    cartCollection: mongodb.Collection<ShopService.CartItem>
    paymentCollection: mongodb.Collection<ShopService.Payment>
    events = new Leaf.EventEmitter<{
        orderStateChanged: {
            order: ShopService.Order
            stateBefore?: ShopService.Order.State
        },
        paymentStateChanged: {
            payment: ShopService.Payment
            stateBefore?: ShopService.Payment.State
        },
        shouldCalculateOrderExtraFee: {
            order: ShopService.Order
            extraFee?: { [key: string]: boolean }
        }
    }>()
    abstract createProduct(option: {
        product: Pick<ShopService.Product, "sellerId" | "transportType" | "name" | "basePrice" | "transportPrice" | "thumbs" | "props" | "category" | "finite" | "description" | "descriptionImages">
    }, callback: Callback<ShopService.Product>)
    abstract updateProduct(option: {
        id: ShopService.ProductId
        updates: Partial<Pick<ShopService.Product,
        "name" | "basePrice" | "thumbs" | "available" | "category" | "description" | "disabled"
        >>
    }, callback: Callback<boolean>)
    abstract getSellerDefaultTransportPrice(option: { sellerId: string }, callback: Callback<RMBCent>)
    abstract increaseHistoricalSales(option: {
        id: ShopService.ProductId,
        increase: number
    }, callback: Callback<null>)
    abstract deleteProduct(option: {
        productId: string
        sellerId: string
    }, callback: Callback<null>)
    abstract queryProducts(option: { keyword?: string, sellerId?: string } & EndlessService.EndlessQueryMeta & Partial<Pick<ShopService.Product, "category">>, callback: Callback<ShopService.Product[]>)
    abstract queryProductsAsPaginate(option: PaginateService.PaginateQuery & {
        keyword?: string,
        sellerId?: string
    }, callback: Callback<PaginateService.PaginateResult<ShopService.Product>>)
    abstract getProduct(option: { id: ShopService.ProductId }, callback: Callback<ShopService.Product>)
    abstract createOrder(option:
        Pick<ShopService.Order, "buyerId" | "meta">
        & {
            items: ShopService.Order.ItemQuery[]
        }
        , callback: Callback<ShopService.Order>)
    abstract queryOrders(option: EndlessService.EndlessQueryMeta & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>, callback: Callback<ShopService.Order[]>)
    abstract updateOrder(option: Pick<ShopService.Order, "id" | "meta">, callback: Callback<ShopService.Order>)

    abstract queryOrdersAsPaginate(option: PaginateService.PaginateQuery & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>, callback: Callback<PaginateService.PaginateResult<ShopService.Order>>)
    abstract createSplitOrderAndCreateComplexPayment(
        option: Pick<ShopService.Order, "buyerId" | "meta"> & {
            items: ShopService.Order.ItemQuery[]
            paymentType: string
            clientIp: string
        }, callback: Callback<ShopService.Payment>)
    abstract getOrderById(option: { id: GUID }, callback: Callback<ShopService.Order>)
    abstract updateOrderStateExplicitly(option: {
        id: GUID
        stateBefore: ShopService.Order.State
        state: ShopService.Order.State
    }, callback: Callback<ShopService.Order>)


    abstract createSeller(option: Pick<ShopService.Seller, "name" | "ownerId" | "contact" | "avatar" | "description" | "meta">, callback: Callback<ShopService.Seller>)
    abstract updateSeller(option: {
        id: string
        updates: Partial<Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "disabled" | "meta">>
    }, callback: Callback<ShopService.Seller>)
    abstract increaseSellerProductCount({
        id: string,
        inc: number
    }, callback: Callback<null>)
    abstract querySellers(option: { keyword: string } & EndlessService.EndlessQueryMeta, callback: Callback<ShopService.Seller[]>)

    abstract querySellersAsPaginate(option: PaginateService.PaginateQuery & {
        keyword: string,
    }, callback: Callback<PaginateService.PaginateResult<ShopService.Seller>>)
    abstract verifySeller(option: { id: ShopService.SellerId }, callback: Callback<ShopService.Seller>)
    abstract getSeller(option: { id: ShopService.SellerId }, callback: Callback<ShopService.Seller>)
    abstract getSellerByOwnerId(option: { ownerId: AccountService.AccountId }, callback: Callback<ShopService.Seller>)

    abstract addCartItem(option: Pick<ShopService.CartItem, "buyerId" | "productId" | "skuId" | "quantity">, callback: Callback<ShopService.CartItem>)
    abstract deleteCartItem(option: { id: ShopService.CartItemId }, callback: Callback<null>)
    abstract getOwnerCartItems(option: EndlessService.EndlessQueryMeta & {
        buyerId: AccountService.AccountId
    }, callback: Callback<ShopService.CartItem[]>)
    abstract getCartItem(option: {
        id: ShopService.CartItemId, ownerId: AccountService.AccountId
    }, callback: Callback<ShopService.CartItem>)

    abstract createPaymentByOrder(option: { type: string, orderId: ShopService.OrderId, clientIp: string }, callback: Callback<ShopService.Payment>)
    abstract createPaymentByOrders(option: { type: string, orderIds: ShopService.OrderId[], clientIp: string }, callback: Callback<ShopService.Payment>)
    abstract updatePaymentStateExplicitly(option: {
        stateBefore: ShopService.Payment.State
        state: ShopService.Payment.State
        id: ShopService.PaymentId
    }, callback: Callback<ShopService.Payment>)
    abstract syncPayment(option: {
        id: string
    }, callback: Callback<ShopService.Payment>)
    abstract registerPaymentProvider(option: {
        type: string
        // Payment provider usually should update state to "pending", and negotiate with the third party payment gateway
        // to create a real payment at third party location, and update the Meta in payment accordingly
        handleInitiatingPayment: (payment: ShopService.Payment, callback: Callback<ShopService.Payment>) => void
    })
    abstract getPaymentById(option: {
        id: string
    }, callback: Callback<ShopService.Payment>)

}


export abstract class AuthenticationService extends BuiltIn.AuthenticationService {
    readonly services: AllServices
    abstract getWechatOpenIdByCode(option: {
        code: string;
    }, callback: Callback<string>): void
}


export namespace PhoneValidationService {
    export type Settings = {
        phoneValidation: {
            // Always bypass if match this code
            magicCode: string
            // verification code expire by millisecs
            expires: number
            type: "aliyun"
            aliSMS: {
                accessKeyId: string
                secretAccessKey: string
                SignName: string
                // Template should using ${code} to represent to the code.
                TemplateCode: string
            }
        }
    }
}

export abstract class PhoneValidationService extends RawService<PhoneValidationService.Settings> {
    readonly dependencies = this.dependencies.concat(["AccountService", "TTLSessionStorage"])
    readonly name = "PhoneValidationService"
    readonly services: {
        TTLSessionStorage: BuiltIn.TTLSessionStorage
    }
    constructor(settings: PhoneValidationService.Settings) {
        super({
            phoneValidation: {
                magicCode: null,
                expires: 1000 * 60 * 15,
                aliSMS: null,
                type: null
            },
        }, settings)
    }
    abstract sendValidationCode(option: {
        phone: string
        expire?: number
    }, callback: Callback)
    abstract isPhoneValid(option: {
        phone: string
        code: string
    }, callback: Callback<boolean>)
}


export abstract class PaginateService extends Service {
    readonly name = "PaginateService"
    dependencies = []
    abstract query<T = any>(option: PaginateService.PaginateQuery & {
        collection: mongodb.Collection
        query?: any,
        sort?: {
            [K in keyof T]?: number
        }
    }, callback: Callback<PaginateService.PaginateResult<T>>)
}


export abstract class PlatformService extends Service {
    readonly name = "PlatformService"
    dependencies = ["KeyValueStorage"]
    infomation: PlatformService.Information
    abstract setInformation(option: Partial<Pick<PlatformService.Information, "customerServicePhoneNumber">>, callback: Callback<PlatformService.Information>)
    abstract getInformation(option: {}, callback: Callback<PlatformService.Information>)
}


export abstract class OrderExtraService extends Service {
    readonly name = "OrderExtraService"
    dependencies = ["ShopService", "PlatformService"]
}

export abstract class PostExtraService extends Service {
    readonly name = "PostExtraService"
    dependencies = ["PostService"]
    // 置顶文章
    abstract stickPost(option: { id: string }, callback: Callback<null>)
}

export abstract class AutoTaskService extends Service {
    readonly name = "AutoTaskService"
    dependencies = ["ShopService"]
}
