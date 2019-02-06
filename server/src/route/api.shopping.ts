import * as RouteSpec from "../spec/route"
import { Errors } from "../errors";
import * as RouteDecorators from "../routeDecorators"
import { AccountDecorators } from "root-ts/decorator/account"
import { ShopDecorators } from "../decorator/shop"
export class ShoppingAPIService extends RouteSpec.ShoppingAPIServiceSpec {
    initialize() {
        let shop = this.services.ShopService
        // this.decorateAll(AccountDecorators.decorate("WithAccount"))
        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("createOrder", (c) => {
            shop.createOrder({
                buyerId: c.info.account.id,
                meta: {
                    contact: c.body.contact
                },
                items: c.body.items
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("createOrderAndPayment", (c) => {
            let req = c.req
            let ip = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress;
            shop.createSplitOrderAndCreateComplexPayment({
                clientIp: ip,
                paymentType: c.body.paymentType,
                buyerId: c.info.account.id,
                meta: {
                    contact: c.body.contact,
                    procurement: c.body.procurement
                },
                items: c.body.items,
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("queryBuyerOrder", (c) => {
            shop.queryOrders({
                buyerId: c.info.account.id,
                state: c.body.state,
                count: c.body.count,
                offset: c.body.offset,
                sort: {
                    createAt: -1
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("querySellerOrder", (c) => {
            shop.queryOrders({
                sellerId: c.info.seller.id,
                state: c.body.state,
                count: c.body.count,
                offset: c.body.offset,
                sort: {
                    createAt: -1
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("queryOrdersAsPaginate", (c) => {
            let { pageIndex, pageSize, buyerId, sellerId } = c.body
            shop.queryOrdersAsPaginate({
                pageIndex,
                pageSize,
                buyerId,
                sellerId
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("addCartItem", (c) => {
            shop.addCartItem({
                buyerId: c.info.account.id,
                productId: c.body.productId,
                skuId: c.body.skuId,
                quantity: c.body.quantity || 1,
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("deleteCartItem", (c) => {
            shop.deleteCartItem({
                id: c.params.cartItemId
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("queryCartItems", (c) => {
            shop.getOwnerCartItems({
                buyerId: c.info.account.id
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("getCartItem", (c) => {
            shop.getCartItem({
                id: c.params.cartItemId,
                ownerId: c.info.account.id,
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("applySeller", (c) => {
            shop.createSeller({
                name: c.body.name,
                ownerId: c.info.account.id,
                contact: c.body.contact,
                avatar: c.body.avatar,
                description: c.body.description,
                meta: c.body.meta
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("getAccountSeller", (c) => {
            c.success(c.info.seller)
        })

        // Only should admin is allowed to verify seller
        // But for now we don't have admin system
        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("verifySeller", (c) => {
            shop.verifySeller({
                id: c.params.sellerId,
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("updateAccountSeller", (c) => {
            shop.updateSeller({
                id: c.info.seller.id
                , updates: {
                    name: c.body.name,
                    contact: c.body.contact,
                    avatar: c.body.avatar,
                    description: c.body.description,
                    meta: c.body.meta
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("disableSeller", (c) => {
            if (c.info.account.role !== "admin") {
                c.error(new Errors.AuthorizationFailed("permission denied"))
            }
            shop.updateSeller({
                id: c.params.sellerId,
                updates: {
                    disabled: true
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("enableSeller", (c) => {
            if (c.info.account.role !== "admin") {
                c.error(new Errors.AuthorizationFailed("permission denied"))
            }
            shop.updateSeller({
                id: c.params.sellerId,
                updates: {
                    disabled: false
                }
            }, c.done)
        })

        this.api("querySellers", (c) => {
            shop.querySellers({
                keyword: c.body.keyword || "",
                offset: c.body.offset,
                count: c.body.count,
            }, c.done)
        })

        this.api("querySellersAsPaginate", (c) => {
            shop.querySellersAsPaginate({
                pageIndex: c.body.pageIndex,
                pageSize: c.body.pageSize,
                keyword: c.body.keyword || ""
            }, c.done)
        })

        this.api("getSellerById", (c) => {
            shop.getSeller({
                id: c.params.sellerId
            }, c.done)
        })

        this.api("queryProducts", (c) => {
            console.error(c.body)
            shop.queryProducts({
                keyword: c.body.keyword || "",
                offset: c.body.offset,
                count: c.body.count,
                category: c.body.category,
                sellerId: c.body.sellerId
            }, c.done)
        })

        this.api("queryProductsAsPaginate", (c) => {
            let { pageIndex, pageSize, keyword, sellerId } = c.body
            shop.queryProductsAsPaginate({
                pageIndex,
                pageSize,
                keyword,
                sellerId
            }, c.done)
        })

        this.api("getProduct", (c) => {
            shop.getProduct({
                id: c.params.productId
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("createProduct", (c) => {
            if (!c.body.product) {
                c.error(new Errors.InvalidParameter)
                return
            }
            shop.createProduct({
                product: {
                    ...c.body.product,
                    sellerId: c.info.seller.id
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("deleteProduct", (c) => {
            shop.deleteProduct({
                sellerId: c.info.seller.id,
                productId: c.params.productId
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("getMyProducts", (c) => {
            shop.queryProducts({
                sellerId: c.info.seller.id,
                ...c.body
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("createProduct", (c) => {
            if (!c.body.product) {
                c.error(new Errors.InvalidParameter())
                return
            }
            shop.createProduct({
                product: {
                    ...c.body.product,
                    sellerId: c.info.seller.id
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("disableProduct", (c) => {
            shop.updateProduct({
                id: c.params.productId,
                updates: {
                    disabled: true
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("enableProduct", (c) => {
            shop.updateProduct({
                id: c.params.productId,
                updates: {
                    disabled: false
                }
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("createPayment", (c) => {
            let req = c.req
            let ip = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress;
            shop.createPaymentByOrder({
                clientIp: ip,
                orderId: c.body.orderId,
                type: c.body.type
            }, c.done)
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller", { optional: true }))
        this.api("getShopEnv", (c) => {
            console.log("getShopEnv c.info: ", c.info)
            let account: AccountService.Account = null
            let seller: ShopService.Seller = null
            console.log("getShopEnv: ", account, "\n", seller)
            try {
                account = c.info.account
                seller = c.info.seller
            } catch (e) {
                console.log("getShopEnv err: ", e)
                c.error(new Errors.UnknownError(null, { via: e }))
            }
            c.done(null, {
                account: account,
                seller: seller
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("syncPayment", (c) => {
            shop.getPaymentById({
                id: c.params.paymentId
            }, (err, payment) => {
                if (!payment) {
                    c.error(new Errors.NotFound)
                    return
                }
                if (payment.buyerId !== c.info.account.id) {
                    c.error(new Errors.Forbidden)
                    return
                }
                shop.syncPayment({
                    id: c.params.paymentId
                }, c.done)
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller"))
        this.api("setOrderDelivering", (c) => {
            shop.getOrderById({
                id: c.params.orderId
            }, (err, order) => {
                if (order.sellerId !== c.info.seller.id) {
                    c.error(new Errors.Forbidden)
                    return
                }
                if (order.state !== "paid") {
                    console.error("Order not at paid", order.id)
                    c.error(new Errors.Forbidden())
                    return
                }
                shop.updateOrder({
                    id: c.params.orderId,
                    meta: {
                        transportName: c.body.transportName,
                        transportNum: c.body.transportNum,
                        transportCreatedAt: Date.now()
                    }
                }, (err, updatedOrder) => {
                    if (err) {
                        c.error(new Errors.Forbidden)
                        return
                    }
                    shop.updateOrderStateExplicitly({
                        id: order.id,
                        stateBefore: "paid",
                        state: "delivering"
                    }, (err) => {
                        if (err) {
                            console.error("Invalid state set")
                            c.error(new Errors.Forbidden)
                            return
                        }
                        c.success(updatedOrder)
                    })
                })
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("setOrderCompleted", (c) => {
            shop.getOrderById({
                id: c.params.orderId
            }, (err, order) => {
                if (order.buyerId != c.info.account.id) {
                    c.error(new Errors.Forbidden)
                    return
                }
                if (order.state !== "delivering") {
                    console.error("Order not at delivering")
                    c.error(new Errors.Forbidden)
                    return
                }
                shop.updateOrderStateExplicitly({
                    id: order.id,
                    stateBefore: "delivering",
                    state: "completed"
                }, (err) => {
                    if (err) {
                        console.error("Invalid order state")
                        c.error(new Errors.Forbidden())
                        return
                    }
                    c.success(null)
                })
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("setOrderCanceled", (ctx) => {
            shop.getOrderById({
                id: ctx.params.orderId
            }, (err, order) => {
                // if (order.buyerId != ctx.info.account.id || order.sellerId != ctx.info.seller.id) {
                //     ctx.error(new Errors.Forbidden)
                //     return
                // }
                if (order.state !== "pending") {
                    console.error("Order not at pending")
                    ctx.error(new Errors.Forbidden)
                    return
                }
                shop.updateOrderStateExplicitly({
                    id: order.id,
                    stateBefore: "pending",
                    state: "canceled"
                }, (err) => {
                    if (err) {
                        console.error("Invalid order state")
                        ctx.error(new Errors.Forbidden())
                        return
                    }
                    ctx.success(null)
                })
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.decorate(ShopDecorators.decorate("WithAccountSeller", { optional: true }))
        this.api("getOrderById", (c) => {
            shop.getOrderById({ id: c.params.orderId }, (err, order) => {
                if (!order) {
                    c.error(new Errors.NotFound)
                    return
                }
                if (order.buyerId == c.info.account.id) {
                    c.success(order)
                    return
                }
                if (c.info.seller && c.info.seller.id == order.sellerId) {
                    c.success(order)
                    return
                }
                c.error(new Errors.Forbidden)
            })
        })
        this.installTo(this.services.ExpressService.server)
    }
}
