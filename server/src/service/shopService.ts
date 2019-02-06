import * as ServiceSpec from "../spec/service"
import { Locks } from "root-ts/service/memoryLockService"
import * as Leaf from "leaf-ts"
import * as asyncModule from "async"
import * as uuid from "uuid"
import { PaginateService } from "./paginateService";
export const Errors = Leaf.ErrorDoc.build({
    UnknownError: {},
    InvalidParameter: {},
    InvalidState: {},
    InnerError: {},
    NotFound: {},
    Failed: {},
    AlreadyExists: {}
})

export class ShopService extends ServiceSpec.ShopService {
    constructor(settings: ShopService.Settings) {
        super(settings)
    }
    private paymentProviders: {
        [type: string]: PaymentProvider
    } = {}
    initialize() {
        let dbs = this.services.MongodbService
        this.productCollection = dbs.db.collection("product")
        this.productCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
        this.orderCollection = dbs.db.collection("order")
        this.orderCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
        this.sellerCollection = dbs.db.collection("seller")
        this.sellerCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
        this.sellerCollection.createIndex({
            ownerId: 1
        }, {
                unique: true
            })
        this.sellerCollection.createIndex({
            name: 1
        }, {
                unique: true
            })
        this.cartCollection = dbs.db.collection("cart")
        this.cartCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
        this.cartCollection.createIndex({
            buyerId: 1,
            productId: 1,
            skuId: 1
        }, {
                unique: true
            })

        this.paymentCollection = dbs.db.collection("payment")
        this.paymentCollection.createIndex({
            id: 1,
        }, {
                unique: true
            })
        if (this.settings.shop.enableDebugPayment) {
            this.registerPaymentProvider({
                type: "DebugPaymentWillSuccess",
                handleInitiatingPayment: (payment, callback) => {
                    payment.state = "pending"
                    // will auto finishing latter
                    setTimeout(() => {
                        this.updatePaymentStateExplicitly({
                            id: payment.id,
                            stateBefore: "pending",
                            state: "completed"
                        }, () => {
                            console.log("Debug payment set success")
                        })
                    }, 2000)
                },
                handleSyncPayment: (payment, callback) => {
                    callback()
                }
            })
        }
        this.registerPaymentProvider(new WechatPaymentProvider(this))
    }

    createProduct(option: { product: Pick<ShopService.Product, "sellerId" | "transportType" | "name" | "basePrice" | "transportPrice" | "thumbs" | "props" | "category" | "finite" | "description" | "descriptionImages"> }, callback: Callback<ShopService.Product>) {
        let product: ShopService.Product = {
            id: uuid.v4(),
            createAt: Date.now(),
            available: true,
            historicalSales: 0,
            meta: null,
            skus: [],
            ...option.product
        }
        // TODO validate Product
        let skus: ShopService.SKU[] = [{
            stock: 0,
            price: product.basePrice,
            props: [],
            available: true,
            id: null
        }]
        // exponentially increase sku by props
        for (let prop of product.props || []) {
            let nextSkus = []
            for (let sku of skus) {
                for (let value of prop.values) {
                    let _sku = Leaf.Util.clone(sku)
                    _sku.props.push({
                        displayName: value.name,
                        value: value.value,
                        propName: prop.name
                    })
                    nextSkus.push(_sku)
                }
            }
            skus = nextSkus
        }
        for (let sku of skus) {
            sku.id = sku.props.map(prop => prop.value).join("_") || "default"
        }
        product.skus = skus
        this.productCollection.insert(product, (err, result) => {
            this.sellerCollection.findOneAndUpdate({
                id: option.product.sellerId
            }, {
                    $inc: {
                        productCount: 1
                    }
                }, () => {
                    callback(err, product)
                })
        })
    }
    updateProduct(option: {
        id: ShopService.ProductId
        updates: Partial<Pick<ShopService.Product,
        "name" | "basePrice" | "thumbs" | "available" | "category" | "description" | "transportType" | "transportPrice" | "disabled"
        >>
    }, callback: Callback<null>) {
        // TODO validate updates
        this.productCollection.findOneAndUpdate({ id: option.id }, { $set: option.updates }, (err, result) => {
            callback(err)
        })
    }
    increaseHistoricalSales(option: {
        id: ShopService.ProductId,
        increase: number
    }, callback: Callback<null>) {
        this.productCollection.findOneAndUpdate({ id: option.id }, {
            $inc: {
                historicalSales: option.increase
            }
        }, (err) => {
            callback(err)
        })
    }
    deleteProduct(option: { productId: string, sellerId: string }, callback: Callback<null>) {
        this.productCollection.findOneAndDelete({
            id: option.productId,
            sellerId: option.sellerId
        }, () => {
            this.sellerCollection.findOneAndUpdate({
                id: option.sellerId
            }, {
                    $inc: {
                        productCount: -1
                    }
                }, () => {
                    callback(null)
                })
        })
    }
    getProduct(option: { id: ShopService.ProductId }, callback: Callback<ShopService.Product>) {
        this.productCollection.findOne(option, (err, item) => {
            if (!item) {
                callback(new Errors.NotFound)
                return
            }
            callback(null, item)
        })
    }
    queryProducts(option: { keyword?: string, sellerId?: string } & EndlessService.EndlessQueryMeta & Partial<Pick<ShopService.Product, "category">>, callback: Callback<ShopService.Product[]>) {
        let kw = (option.keyword || "").trim()
        let query = {}
        if (kw) {
            let reg = new RegExp(escapeRegExp(option.keyword))
            query = {
                $or: [{
                    description: reg
                }, {
                    name: reg
                }]
            }
        }
        if (option.sellerId) {
            query["sellerId"] = option.sellerId
        }
        if (option.category) {
            query["category"] = option.category
        }
        query["disabled"] = {
            $ne: true
        }
        console.error(query)
        this.productCollection.find(query).skip(option.offset || 0).limit(option.count || 10).sort({ "createAt": -1 }).toArray(callback)
    }
    queryProductsAsPaginate(option: PaginateService.PaginateQuery & {
        keyword?: string,
        sellerId?: string
    }, callback: Callback<PaginateService.PaginateResult<ShopService.Product>>) {
        let kw = (option.keyword || "").trim()
        let query = {}
        if (kw) {
            let reg = new RegExp(escapeRegExp(option.keyword))
            query = {
                $or: [{
                    description: reg
                }, {
                    name: reg
                }]
            }
        }
        if (option.sellerId) {
            query["sellerId"] = option.sellerId
        }
        this.services.PaginateService.query({
            collection: this.productCollection,
            pageIndex: option.pageIndex,
            pageSize: option.pageSize,
            sort: {
                createAt: -1
            }
        }, callback)
    }
    createOrder(option:
        Pick<ShopService.Order, "buyerId" | "meta">
        & {
            items: ShopService.Order.ItemQuery[]
        }
        , callback: Callback<ShopService.Order>) {
        // detect if complex means, item belongs to multiple order, refuse to create
        // complex
        this.buildItemsInfo(option.items, (err, infos) => {
            if (err) {
                callback(err)
                return
            }
            this.createOrderByItemDigests({
                buyerId: option.buyerId,
                meta: option.meta,
                items: infos
            }, callback)
        })
    }
    updateOrder(option: Pick<ShopService.Order, "id" | "meta">, callback: Callback<ShopService.Order>) {
        let updatesMeta = {}
        for (const key in option.meta) {
            if (option.meta.hasOwnProperty(key)) {
                updatesMeta["meta." + key] = option.meta[key]
            }
        }
        console.log("updatesMeta: " + JSON.stringify(updatesMeta))
        this.orderCollection.findOneAndUpdate({
            id: option.id,
        }, {
                $set: updatesMeta
            }, {
                returnOriginal: false
            }, (err, result) => {
                if (result.value) {
                    callback(null, result.value)
                    return
                }
                callback(new Errors.Failed("Fail to update order"))
            })
    }
    getSellerDefaultTransportPrice(option: { sellerId: string }, callback: Callback<RMBCent>) {
        callback(null, this.settings.shop.defaultTransportPriceRMBCent || 0)
    }
    queryOrders(option: EndlessService.EndlessQueryMeta & { sort?: any } & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>, callback: Callback<ShopService.Order[]>) {
        let criteria = {
            sellerId: option.sellerId,
            buyerId: option.buyerId,
            state: option.state
        }
        for (let name in criteria) {
            if (!criteria[name]) delete criteria[name]
        }
        console.log(option, "???")
        this.services.EndlessService.query<ShopService.Order>({
            collection: this.orderCollection, criteria, count: option.count, offset: option.offset,
            sort: option.sort || {
                createAt: -1
            }
        }, callback)
    }
    queryOrdersAsPaginate(option: PaginateService.PaginateQuery & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>, callback: Callback<PaginateService.PaginateResult<ShopService.Order>>) {
        this.services.PaginateService.query<ShopService.Order>({
            collection: this.orderCollection,
            pageIndex: option.pageIndex,
            pageSize: option.pageSize,
            sort: {
                createAt: -1
            }
        }, callback)
    }
    createSplitOrderAndCreateComplexPayment(
        option: Pick<ShopService.Order, "buyerId" | "meta"> & {
            items: ShopService.Order.ItemQuery[]
            paymentType: string
            clientIp: string
            extraFee?: { [key: string]: boolean }
        }, callback: Callback<ShopService.Payment>) {
        if (!this.paymentProviders[option.paymentType]) {
            console.error("Invalid payment", option.paymentType)
            callback(new Errors.InvalidParameter("Unknown payment"))
            return
        }
        this.buildItemsInfo(option.items, (err, infos) => {
            if (err) {
                callback(err)
                return
            }
            let sellerGroups: {
                [sellerId: string]: ShopService.Order.ItemDigest[]
            } = {}
            for (let item of infos) {
                let sellerId = item.product.sellerId
                if (!sellerGroups[sellerId]) sellerGroups[sellerId] = []
                sellerGroups[sellerId].push(item)
            }
            asyncModule.map(Object.keys(sellerGroups), (sellerId, done) => {
                let items = sellerGroups[sellerId]
                this.createOrderByItemDigests({
                    buyerId: option.buyerId,
                    meta: option.meta,
                    items
                }, done)
            }, (err, orders: ShopService.Order[]) => {
                asyncModule.each(orders, (order, done) => {
                    asyncModule.each(order.items, (item, done2) => {
                        this.increaseHistoricalSales({
                            id: item.productId,
                            increase: 1
                        }, () => {
                            done2()
                        })
                    }, () => {
                        done()
                    })
                }, () => {
                })
                if (err) {
                    callback(new Errors.InnerError("Fail to create split orders"))
                    return
                }
                this.createPaymentByValidOrderObjects({
                    orders,
                    type: option.paymentType,
                    clientIp: option.clientIp
                }, callback)
            })
        })

    }
    private buildItemsInfo(items: ShopService.Order.ItemQuery[], callback: Callback<ShopService.Order.ItemDigest[]>) {
        for (let item of items) {
            if (!item) {
                console.error("Empty item of", items)
                callback(new Errors.InvalidParameter("InvalidItem"))
                return
            }
        }
        if (items.length === 0) {
            console.error("Empty orders")
            callback(new Errors.InvalidParameter("Empty order"))
            return
        }
        let productIds = items.map(item => item.productId)
        this.productCollection.find({
            id: {
                $in: productIds
            }
        }).toArray((err, products) => {
            if (err || !products) {
                console.error("item not found", productIds)
                callback(new Errors.InvalidParameter("Invalid items"))
                return
            }
            let infos = items.map(item => {
                let product: ShopService.Product
                let sku: ShopService.SKU
                for (let _product of products) {
                    if (_product.id === item.productId) {
                        product = _product
                        for (let _sku of product.skus) {
                            if (_sku.id == item.skuId) {
                                sku = _sku
                                break
                            }
                        }
                        if (!sku) {
                            console.error("Missing sku", product.skus, item)
                        }
                        break
                    }
                }
                if (!product || !sku) {
                    console.error("Not found", product, sku, products)
                    return null
                }
                return {
                    sku, product, quantity: Math.round(item.quantity)
                }
            })
            for (let info of infos) {
                if (!info) {
                    console.error("Invalid sku", infos, products, items)
                    callback(new Errors.InvalidParameter("Invalid Product/SKU"))
                    return
                }
                if (!info.quantity || info.quantity <= 0) {
                    console.error("Invalid quantity", infos)
                    callback(new Errors.InvalidParameter("Invalid quantity item"))
                    return
                }
            }
            callback(null, infos)
        })
    }
    private createOrderByItemDigests(option:
        Pick<ShopService.Order, "buyerId" | "meta"> & {
            items: ShopService.Order.ItemDigest[]
        }, callback: Callback<ShopService.Order>
    ) {
        let infos = option.items
        let items: ShopService.Order.Item[] = []
        let sellerId = null
        let hasDefaultTranportPrice = false
        for (let info of infos) {
            if (sellerId && sellerId !== info.product.sellerId) {
                console.error("Invalid seller")
                callback(new Errors.InvalidParameter("Create order from multiple seller"))
                return
            }
            sellerId = info.product.sellerId
            // three kind of transport price
            // 1. default fee for seller
            // 2. per product transport price based on product
            // 3. per sku transport price based on product
            let tp = 0
            switch (info.product.transportType) {
                case "none":
                    break
                case "order":
                    hasDefaultTranportPrice = true
                    break
                case "product":
                    tp = info.product.transportPrice
                    break
                case "sku":
                default:
                    tp = info.product.transportPrice * info.quantity
                    break

            }
            items.push({
                sellerId,
                skuId: info.sku.id,
                productId: info.product.id,
                transportFee: tp,
                basePrice: info.sku.price,
                totalPrice: info.sku.price * info.quantity + tp,
                name: ProductUtil.getSKUName(info.product, info.sku),
                quantity: info.quantity
            })
        }
        this.getSellerDefaultTransportPrice({
            sellerId
        }, (err, price) => {
            if (err) {
                callback(new Errors.InnerError("Invalid Price"))
                return
            }
            let transportFee = 0
            if (hasDefaultTranportPrice) {
                transportFee = price
            }
            let totalFee = 0
            for (let item of items) {
                totalFee += item.basePrice * item.quantity + item.transportFee
            }
            totalFee += transportFee
            let order: ShopService.Order = {
                id: uuid.v4(),
                buyerId: option.buyerId,
                sellerId: sellerId,
                paymentId: null,
                items,
                sellerTransportFee: transportFee,
                totalFee: totalFee,
                state: "pending",
                createAt: Date.now(),
                meta: option.meta
            }
            this.events.emit("shouldCalculateOrderExtraFee", {
                order
            })
            if (order.extraFee) {
                totalFee = order.totalFee
                for (let key in order.extraFee) {
                    totalFee += order.extraFee[key]
                }
                order.totalFee = totalFee
            }

            this.orderCollection.insert(order, (err) => {
                this.events.emit("orderStateChanged", {
                    order,
                    stateBefore: null
                })
                callback(err, order)
            })
        })
    }
    getOrderById(option: { id: GUID }, callback: Callback<ShopService.Order>) {
        this.orderCollection.findOne({ id: option.id }, (err, item) => {
            if (!item) {
                callback(new Errors.NotFound)
                return
            }
            callback(null, item)
        })
    }
    updateOrderStateExplicitly(option: {
        id: GUID
        stateBefore: ShopService.Order.State
        state: ShopService.Order.State
    }, callback: Callback<ShopService.Order>) {
        this.orderCollection.findOneAndUpdate({
            id: option.id,
            state: option.stateBefore
        }, {
                $set: {
                    state: option.state
                }
            }, {
                returnOriginal: false
            }, (err, result) => {
                if (result.value) {
                    callback(null, result.value)
                    return
                }
                callback(new Errors.Failed("Fail to update state"))
            })
    }

    createSeller(option: Pick<ShopService.Seller, "name" | "ownerId" | "contact" | "avatar" | "description" | "meta">, callback: Callback<ShopService.Seller>) {
        let seller: ShopService.Seller = {
            ownerId: option.ownerId,
            id: uuid.v4(),
            name: option.name,
            contact: option.contact,
            avatar: option.avatar,
            description: option.description,
            createAt: Date.now(),
            productCount: 0,
            meta: option.meta,
            verified: false,
        }
        this.sellerCollection.insert(seller, (err) => {
            if (err) {
                callback(new Errors.AlreadyExists("Exists"))
                return
            }
            callback(null, seller)
        })
    }
    updateSeller(option: {
        id: string
        updates: Partial<Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "disabled" | "meta">>
    }, callback: Callback<ShopService.Seller>) {
        for (let prop in option.updates) {
            if (typeof option.updates[prop] !== "boolean" && !option.updates[prop]) {
                delete (option.updates[prop])
            }
        }
        this.sellerCollection.findOneAndUpdate({
            id: option.id
        }, {
                $set: option.updates
            }, { returnOriginal: false }, (err, result) => {
                console.error(err, result)
                if (err && err.code == 11000) {
                    callback(new Errors.AlreadyExists)
                    return
                }
                callback(err, result && result.value)
            })
    }
    increaseSellerProductCount(option: {
        id: string,
        inc: number
    }, callback: Callback<null>) {
        this.sellerCollection.findOneAndUpdate({ id: option.id }, {
            $inc: {
                productCount: option.inc
            }
        }, (err) => {
            callback(err)
        })
    }
    querySellers(option: { keyword: string } & EndlessService.EndlessQueryMeta, callback: Callback<ShopService.Seller[]>) {
        console.log("querySellers option", option)
        let kw = option.keyword.trim()
        let query = {}
        if (!kw) {
            query = {
                disabled: {
                    $ne: true
                },
                verified: true
            }
        } else {
            let reg = new RegExp(escapeRegExp(option.keyword))
            query = {
                $or: [{
                    name: reg
                }],
                disabled: {
                    $ne: true
                },
                verified: true
            }
        }
        //query["verified"] = {
        //$ne: true
        //}
        this.sellerCollection.find(query).skip(option.offset || 0).limit(option.count || 10).sort({ "createAt": -1 }).toArray(callback)
    }
    querySellersAsPaginate(option: PaginateService.PaginateQuery & {
        keyword: string,
    }, callback: Callback<PaginateService.PaginateResult<ShopService.Seller>>) {
        this.services.PaginateService.query<ShopService.Seller>({
            collection: this.sellerCollection,
            pageIndex: option.pageIndex,
            pageSize: option.pageSize,
            sort: {
                createAt: -1
            }
        }, (err, res: PaginateService.PaginateResult<ShopService.Seller>) => {
            callback(err, res)
        })
    }
    verifySeller(option: { id: ShopService.SellerId }, callback: Callback<ShopService.Seller>) {
        this.sellerCollection.findOneAndUpdate({
            id: option.id
        }, {
                $set: {
                    verified: true
                }
            }, { returnOriginal: false }, (err, result) => {
                callback(err, result.value)
            })
    }
    getSeller(option: { id: ShopService.SellerId }, callback: Callback<ShopService.Seller>) {
        this.sellerCollection.findOne({ id: option.id }, (err, seller) => {
            if (!seller) {
                callback(new Errors.NotFound)
                return
            }
            callback(null, seller)
        })
    }
    getSellerByOwnerId(option: { ownerId: AccountService.AccountId }, callback: Callback<ShopService.Seller>) {
        this.sellerCollection.findOne({
            ownerId: option.ownerId
        }, (err, seller) => {
            if (!seller) {
                callback(new Errors.NotFound)
                return
            }
            callback(null, seller)
        })
    }
    getCartItem(option: {
        id: ShopService.CartItemId, ownerId: AccountService.AccountId
    }, callback: Callback<ShopService.CartItem>) {
        this.cartCollection.findOne(option, (err, item) => {
            callback(err && new Errors.NotFound() || null, item)
        })
    }
    addCartItem(option: Pick<ShopService.CartItem, "buyerId" | "productId" | "skuId" | "quantity">, callback: Callback<ShopService.CartItem>) {
        this.getProduct({ id: option.productId }, (err, product) => {
            if (err) {
                callback(err)
                return
            }
            let sku: ShopService.SKU
            for (let _sku of product.skus) {
                if (_sku.id === option.skuId) {
                    sku = _sku
                    break
                }
            }
            if (!sku) {
                callback(new Errors.InvalidParameter("Invalid SKUId"))
                return
            }
            if (option.quantity <= 0) {
                callback(new Errors.InvalidParameter("CartItem.quantity should be more then 0"))
                return
            }
            this.getSeller({
                id: product.sellerId
            }, (err, seller) => {
                if (!seller) {
                    callback(new Errors.UnknownError())
                    return
                }
                let item: ShopService.CartItem = {
                    id: uuid.v4(),
                    buyerId: option.buyerId,
                    productId: product.id,
                    skuId: sku.id,
                    displayName: product.name,
                    detailName: ProductUtil.getSKUName(product, sku),
                    props: sku.props,
                    unitPrice: sku.price,
                    quantity: option.quantity,
                    sellerId: product.sellerId,
                    sellerName: seller.name,
                    thumbs: product.thumbs
                }
                this.cartCollection.insert(item, (err) => {
                    if (err && err.code == 11000) {
                        this.cartCollection.findOneAndUpdate({
                            buyerId: option.buyerId,
                            productId: product.id,
                            skuId: option.skuId
                        }, {
                                $inc: {
                                    quantity: item.quantity
                                }
                            }, { returnOriginal: false }, (err, result) => {
                                if (err || !result.value) {
                                    callback(new Errors.InnerError("Fail to add itme to cart, when already exists and update"))
                                    return
                                }
                                callback(null, result.value)
                            })
                        return
                    }
                    callback(err, item)
                })
            })
        })
    }
    deleteCartItem(option: { id: ShopService.CartItemId }, callback: Callback<null>) {
        this.cartCollection.remove({ id: option.id }, (err) => {
            callback()
        })
    }
    getOwnerCartItems(option: EndlessService.EndlessQueryMeta & {
        buyerId: AccountService.AccountId
    }, callback: Callback<ShopService.CartItem[]>) {
        this.cartCollection.find({
            buyerId: option.buyerId
        }).toArray((err, result = []) => {
            callback(err, result)
        })
    }
    createPaymentByOrder(option: { type: string, orderId: ShopService.OrderId, clientIp: string }, callback: Callback<ShopService.Payment>) {
        if (!this.paymentProviders[option.type]) {
            console.error("Invalid payment type", option.type)
            callback(new Errors.InvalidParameter("Unknown payment type"))
            return
        }
        this.createPaymentByOrders({ type: option.type, orderIds: [option.orderId], clientIp: option.clientIp }, callback)
    }
    createPaymentByOrders(option: { type: string, orderIds: ShopService.OrderId[], clientIp: string }, callback: Callback<ShopService.Payment>) {
        if (!this.paymentProviders[option.type]) {
            console.error("Invalid payment type", option.type)
            callback(new Errors.InvalidParameter("Unknown payment type"))
            return
        }
        this.orderCollection.find({
            id: { $in: option.orderIds }
        }).toArray((err, orders) => {
            if (err || !orders) {
                callback(new Errors.NotFound)
                return
            }
            this.createPaymentByValidOrderObjects({ type: option.type, orders, clientIp: option.clientIp }, callback)
        })
    }
    private createPaymentByValidOrderObjects(option: {
        type: string
        orders: ShopService.Order[]
        clientIp: string
    }, callback: Callback<ShopService.Payment>) {
        if (!this.paymentProviders[option.type]) {
            console.error("Invalid payment type", option.type)
            callback(new Errors.InvalidParameter("Unknown payment type"))
            return
        }
        let orders = option.orders
        let buyerId
        for (let order of orders) {
            if (order.state !== "pending") {
                callback(new Errors.InvalidState("Only order in pending state can have payment created for"))
                return
            }
            if (buyerId && order.buyerId !== buyerId) {
                console.error("Invalid buyers", option.type)
                callback(new Errors.InvalidParameter("Can't create payment of multiple buyer"))
                return
            }
            if (!buyerId) buyerId = order.buyerId
        }
        let fee = orders.map(item => item.totalFee).reduce((a, b) => {
            return a + b
        }, 0)
        let payment: ShopService.Payment = {
            id: uuid.v4(),
            type: option.type,
            buyerId: buyerId,
            clientIp: option.clientIp,
            orderIds: orders.map(order => order.id),
            digests: orders.map(order => {
                let obj = {}
                for (let item of order.items) {
                    obj[item.name] = item.quantity
                }
                return {
                    id: order.id,
                    items: obj

                }
            }),
            amount: fee,
            meta: null,
            state: "initiating",
            createAt: Date.now()
        }
        this.paymentCollection.insert(payment, (err) => {
            this.events.emit("paymentStateChanged", {
                payment,
                stateBefore: null
            })
            this.paymentProviders[option.type].handleInitiatingPayment(payment, (err, payment) => {
                if (err || !payment) {
                    callback(new Errors.InnerError("Fail to handle initiating payment"))
                    return
                }
                if (payment.state == "initiating") {
                    callback(new Errors.InnerError("Fail to initiating payment"))
                    return
                }
                this.paymentCollection.findOneAndUpdate({
                    id: payment.id
                }, {
                        $set: {
                            state: payment.state,
                            meta: payment.meta
                        }
                    }, {
                        returnOriginal: false
                    }, (err, result) => {
                        if (err) {
                            callback(new Errors.InnerError("Fail to update payment"))
                            return
                        }
                        callback(null, result.value)
                    })
            })
        })
    }
    updatePaymentStateExplicitly(option: {
        stateBefore: ShopService.Payment.State
        state: ShopService.Payment.State
        id: ShopService.PaymentId
    }, callback: Callback<ShopService.Payment>) {
        this.paymentCollection.findOneAndUpdate({
            id: option.id,
            state: option.stateBefore
        }, {
                $set: {
                    state: option.state
                }
            }, {
                returnOriginal: false
            }, (err, result) => {
                if (result.value) {
                    callback(null, result.value)
                    return
                }
                callback(new Errors.Failed("Fail to update state"))
            })
    }
    syncPayment(option: {
        id: string
    }, callback: Callback<ShopService.Payment>) {
        this.paymentCollection.findOne({
            id: option.id
        }, (err, payment) => {
            if (err || !payment) {
                callback(new Errors.NotFound)
                return
            }
            let origState = payment.state
            this.paymentProviders[payment.type].handleSyncPayment(payment, (err, payment) => {
                if (err) {
                    callback(err)
                    return
                }
                this.paymentCollection.findOneAndUpdate({
                    id: payment.id
                }, {
                        $set: {
                            state: payment.state,
                            meta: payment.meta
                        }
                    }, {
                        returnOriginal: false
                    }, (err, result) => {
                        if (err) {
                            callback(new Errors.InnerError("Fail to update payment"))
                            return
                        }
                        if (payment.state == "completed" && origState !== "completed") {
                            this.events.emit("paymentStateChanged", {
                                payment,
                                stateBefore: origState
                            })
                            asyncModule.forEach(payment.orderIds, (id, done) => {
                                console.log("sync id", id)
                                this.updateOrderStateExplicitly({
                                    id,
                                    stateBefore: "pending",
                                    state: "paid"
                                }, () => {
                                    done()
                                })
                            }, () => {
                                console.error("Finished", payment)
                                callback(null, result.value)
                            })
                            return
                        } else {
                            console.error("Not finished", payment)
                            callback(null, result.value)
                        }
                    })
            })
        })
    }
    registerPaymentProvider(provider: PaymentProvider) {
        if (this.paymentProviders[provider.type]) {
            console.error("WARNING: register a payment provider that is already exists! >>> " + provider.type)
        }
        this.paymentProviders[provider.type] = provider

    }
    getPaymentById(option: {
        id: string
    }, callback: Callback<ShopService.Payment>) {
        this.paymentCollection.findOne({
            id: option.id
        }, (err, payment = null) => {
            if (!payment) {
                callback(new Errors.NotFound)
                return
            }
            callback(null, payment)
        })
    }
}




function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export namespace ProductUtil {
    export function getSKUName(product: ShopService.Product, sku: ShopService.SKU) {
        return [product.name, sku.props.map(item => item.displayName)].join(" ")
    }
}


export type PaymentProvider = {
    type: string
    // Payment provider usually should update state to "pending", and negotiate with the third party payment gateway
    // to create a real payment at third party location, and update the Meta in payment accordingly
    handleInitiatingPayment: (payment: ShopService.Payment, callback: Callback<ShopService.Payment>) => void
    handleSyncPayment: (payment: ShopService.Payment, callback: Callback<ShopService.Payment>) => void
}

export class WechatPaymentProvider {
    constructor(public shop: ShopService) {

    }
    client = this.shop.services.WechatPaymentService.payment
    type: string = "wechat"
    // Payment provider usually should update state to "pending", and negotiate with the third party payment gateway
    // to create a real payment at third party location, and update the Meta in payment accordingly
    handleInitiatingPayment(payment: ShopService.Payment<WechatPaymentMeta>, callback: Callback<ShopService.Payment<WechatPaymentMeta>>) {
        this.client.createPreorder({
            title: payment.title || "商城购物",
            fee: payment.amount,
            clientIp: payment.clientIp,
            tradeType: "APP",
        }, (err, result) => {
            if (err) {
                console.error("Initial payment error", err, result)
                callback(err)
                return
            }
            payment.state = "pending"
            payment.meta = {
                prepayId: result.prepayId,
                internalOrderId: result.internalOrderId,
                initialRaw: result.raw,
                payData: this.client.createClientPayload({ prepayId: result.prepayId })
            }
            console.log("Initial payment", payment)
            callback(null, payment)
        })
    }
    handleSyncPayment(payment: ShopService.Payment<WechatPaymentMeta>, callback: Callback<ShopService.Payment<WechatPaymentMeta>>) {
        this.client.queryOrder({
            internalOrderId: payment.meta.internalOrderId
        }, (err, info) => {
            if (err) {
                callback(err)
                return
            }
            if (info.tradeState == "SUCCESS") {
                payment.state = "completed"
            }
            payment.meta.syncRaw = info
            payment.meta.syncTime = Date.now()
            callback(null, payment)
        })
    }
}

type WechatPaymentMeta = {
    prepayId: string
    payData: any
    internalOrderId: string
    initialRaw: any
    syncRaw?: any
    syncTime?: number
}
