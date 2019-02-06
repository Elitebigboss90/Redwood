try {
    var Leaf = window["Leaf"]
    var _d = Leaf.Util
} catch (e) {
    var Leaf = require("leaf-ts")
}
export function GenerateEchoAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        echo = factory.createAPIFunction<{
            name: string
        } & {
            content: string
        }, {
                name: string
                content: string
            }>({
                method: "POST",
                path: "echo/:name/GET"
            })
    }
}
export function GeneratePostingAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        createPost = factory.createAPIFunction<{
            type: string
            title: string
            content: RichText
            images?: string[]
            category?: string
            authorName?: string
            meta: PostService.Post["meta"]
        }, PostService.Post>({
            method: "POST",
            path: "post"
        })
        deletePost = factory.createAPIFunction<{
            postId: string
        }, boolean>({
            method: "DELETE",
            path: "post/:postId"
        })
        updatePost = factory.createAPIFunction<{
            postId: string
        } & Partial<Pick<PostService.Post, "title" | "authorName" | "content" | "images" | "category">>, PostService.Post>({
            method: "POST",
            path: "post/:postId"
        })
        queryPosts = factory.createAPIFunction<EndlessService.EndlessQueryMeta & Partial<Pick<PostService.Post, "type" | "category">> & {
            keyword?: string
            authorId?: string
        }, PostService.Post[]>({
            method: "POST",
            path: "post/query/GET"
        })
        queryPostsAsPaginate = factory.createAPIFunction<PaginateService.PaginateQuery & Partial<Pick<PostService.Post, "type" | "category">> & {
            keyword?: string
            authorId?: string
        }, PaginateService.PaginateResult<PostService.Post>>({
            method: "POST",
            path: "post/paginate/GET"
        })
        getMyPosts = factory.createAPIFunction<{
        } & {
            type?: string
        } & EndlessService.EndlessQueryMeta, PostService.Post[]>({
            method: "POST",
            path: "post/mine/GET"
        })
        getPostById = factory.createAPIFunction<{
            postId: string
        }, PostService.Post>({
            method: "POST",
            path: "post/:postId/GET"
        })
        stickPost = factory.createAPIFunction<{
            postId: string
        }, {
            }>({
                method: "POST",
                path: "post/:postId/stick"
            })
    }
}
export function GenerateShoppingAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        createOrder = factory.createAPIFunction<{
        } & {
            contact: ContactService.Contact
            items: ShopService.Order.ItemQuery[]
        }, ShopService.Order>({
            method: "POST",
            path: "order"
        })
        createOrderAndPayment = factory.createAPIFunction<{
        } & {
            contact: ContactService.Contact
            items: ShopService.Order.ItemQuery[]
            paymentType: string
            procurement?: boolean
        }, ShopService.Payment>({
            method: "POST",
            path: "payment/byOrder"
        })
        queryBuyerOrder = factory.createAPIFunction<{
        } & {
            state?: ShopService.Order.State
        } & EndlessService.EndlessQueryMeta, ShopService.Order[]>({
            method: "POST",
            path: "order/query/GET"
        })
        querySellerOrder = factory.createAPIFunction<{
        } & {
            state?: ShopService.Order.State
        } & EndlessService.EndlessQueryMeta, ShopService.Order[]>({
            method: "POST",
            path: "seller/order/query/GET"
        })
        queryOrdersAsPaginate = factory.createAPIFunction<PaginateService.PaginateQuery & Partial<Pick<ShopService.Order, "sellerId" | "buyerId" | "state">>, PaginateService.PaginateResult<ShopService.Order>>({
            method: "POST",
            path: "order/paginate/GET"
        })
        addCartItem = factory.createAPIFunction<{
            productId: ShopService.ProductId
            skuId: ShopService.SKUId
            quantity: Int
        }, ShopService.CartItem>({
            method: "POST",
            path: "cartItem"
        })
        deleteCartItem = factory.createAPIFunction<{
            cartItemId: ShopService.CartItemId
        }, boolean>({
            method: "DELETE",
            path: "cartItem/:cartItemId"
        })
        queryCartItems = factory.createAPIFunction<{}, ShopService.CartItem[]>({
            method: "POST",
            path: "cartItem/all"
        })
        getCartItem = factory.createAPIFunction<{
            cartItemId: string
        }, ShopService.CartItem>({
            method: "POST",
            path: "cartItem/:cartItemId/GET"
        })
        applySeller = factory.createAPIFunction<Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "meta">, null>({
            method: "POST",
            path: "seller/apply"
        })
        getAccountSeller = factory.createAPIFunction<{
        }, ShopService.Seller>({
            method: "POST",
            path: "seller/mine/GET"
        })
        verifySeller = factory.createAPIFunction<{
            sellerId: ShopService.SellerId
        }, null>({
            method: "POST",
            path: "seller/:sellerId/verify"
        })
        updateAccountSeller = factory.createAPIFunction<{
            sellerId: ShopService.SellerId
        } & Pick<ShopService.Seller, "name" | "contact" | "avatar" | "description" | "meta">, ShopService.Seller>({
            method: "POST",
            path: "seller/mine/updates"
        })
        disableSeller = factory.createAPIFunction<{
            sellerId: ShopService.SellerId
        }, {
            }>({
                method: "POST",
                path: "seller/:sellerId/disable"
            })
        enableSeller = factory.createAPIFunction<{
            sellerId: ShopService.SellerId
        }, {
            }>({
                method: "POST",
                path: "seller/:sellerId/enable"
            })
        querySellers = factory.createAPIFunction<EndlessService.EndlessQueryMeta & {
            keyword: string
        }, ShopService.Seller[]>({
            method: "POST",
            path: "seller/query"
        })
        querySellersAsPaginate = factory.createAPIFunction<PaginateService.PaginateQuery & {
            keyword: string,
        }, PaginateService.PaginateResult<ShopService.Seller>>({
            method: "POST",
            path: "seller/paginate/GET"
        })
        getSellerById = factory.createAPIFunction<{
            sellerId: string
        }, ShopService.Seller>({
            method: "POST",
            path: "seller/:sellerId/GET"
        })
        getProduct = factory.createAPIFunction<{
            productId: string
        } & {
        }, ShopService.Product>({
            method: "POST",
            path: "product/:productId/GET"
        })
        queryProducts = factory.createAPIFunction<{
        } & {
            category?: string
            keyword?: string
            sellerId?: string
        } & EndlessService.EndlessQueryMeta, ShopService.Product[]>({
            method: "POST",
            path: "product/query/GET"
        })
        queryProductsAsPaginate = factory.createAPIFunction<PaginateService.PaginateQuery & {
            keyword?: string,
            sellerId?: string,
        }, PaginateService.PaginateResult<ShopService.Product>>({
            method: "POST",
            path: "product/paginate/GET"
        })
        getMyProducts = factory.createAPIFunction<{
        } & EndlessService.EndlessQueryMeta & {
            category?: string
        }, ShopService.Product[]>({
            method: "POST",
            path: "products/mine/GET"
        })
        deleteProduct = factory.createAPIFunction<{
            productId: string
        } & {
        }, null>({
            method: "DELETE",
            path: "product/:productId"
        })
        createProduct = factory.createAPIFunction<{
        } & {
            product: Pick<ShopService.Product, "transportType" | "name" | "basePrice" | "transportPrice" | "thumbs" | "props" | "category" | "finite" | "description" | "descriptionImages">
        }, ShopService.Product>({
            method: "POST",
            path: "product"
        })
        disableProduct = factory.createAPIFunction<{
            productId: string
        }, {
            }>({
                method: "POST",
                path: "product/:productId/disable"
            })
        enableProduct = factory.createAPIFunction<{
            productId: string
        }, {
            }>({
                method: "POST",
                path: "product/:productId/enable"
            })
        createPayment = factory.createAPIFunction<{
        } & {
            orderId: string
            type: ShopService.Payment.Type
        }, ShopService.Payment>({
            method: "POST",
            path: "payment"
        })
        getPaymentById = factory.createAPIFunction<{
            paymentId: string
        } & {
        }, ShopService.Payment>({
            method: "POST",
            path: "payment/:paymentId/GET"
        })
        syncPayment = factory.createAPIFunction<{
            paymentId: string
        } & {
        }, ShopService.Payment>({
            method: "POST",
            path: "payment/:paymentId/sync"
        })
        getShopEnv = factory.createAPIFunction<{
        } & {
        }, {
                seller?: ShopService.Seller
                account?: AccountService.Account
            }>({
                method: "POST",
                path: "shop/env/GET"
            })
        setOrderDelivering = factory.createAPIFunction<{
            orderId: string
        } & {
            transportName: string
            transportNum: string
        }, ShopService.Order>({
            method: "POST",
            path: "order/:orderId/state/delivering"
        })
        setOrderCompleted = factory.createAPIFunction<{
            orderId: string
        } & {
        }, null>({
            method: "POST",
            path: "order/:orderId/state/completed"
        })
        setOrderCanceled = factory.createAPIFunction<{
            orderId: string
        } & {
        }, null>({
            method: "POST",
            path: "order/:orderId/state/canceled"
        })
        getOrderById = factory.createAPIFunction<{
            orderId: string
        } & {
        }, ShopService.Order>({
            method: "POST",
            path: "order/:orderId/GET"
        })
    }
}
export function GenerateSellingAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
    }
}
export function GenerateAccountPropAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        updateAccount = factory.createAPIFunction<{
            avatar?: string
            displayName?: string
        }, null>({
            method: "POST",
            path: "account/prop/updates"
        })
    }
}
export function GenerateAccountQueryAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        queryAccountsAsPaginate = factory.createAPIFunction<PaginateService.PaginateQuery, PaginateService.PaginateResult<AccountService.Account>>({
            method: "POST",
            path: "account/paginate/GET"
        })
    }
}
export function GenerateAuthenticatingAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        registerWithPhone = factory.createAPIFunction<{
            phone: string
            password: string
            code: string
        }, {
                account: AccountService.Account
            }>({
                method: "POST",
                path: "register/phone"
            })
        sendPhoneVerificationCode = factory.createAPIFunction<{
            phone: string
            debug?: boolean
        }, null>({
            method: "POST",
            path: "register/phone/code"
        })
        getTokenByPhone = factory.createAPIFunction<{
            phone: string
            password: string
        }, {
                token: string
            }>({
                method: "POST",
                path: "register/phone/token/GET"
            })
        getTokenByCode = factory.createAPIFunction<{
            phone: string
            code: string
        }, {
                token: string
            }>({
                method: "POST",
                path: "register/code/token/GET"
            })
        getWechatOpenIdByCode = factory.createAPIFunction<{
            wechatCode: string
        }, {
                openId: string
            }>({
                method: "POST",
                path: "account/wechat/openId/GET"
            })
        getTokenByWechat = factory.createAPIFunction<{
            openId: string
        }, {
                token: string
            }>({
                method: "POST",
                path: "register/wechat/token/GET"
            })
        bindWechat = factory.createAPIFunction<{
            accountId: string
            openId: string
        }, null>({
            method: "POST",
            path: "account/bind/wechat"
        })
        getCurrentAccount = factory.createAPIFunction<{}, AccountService.Account>({
            method: "POST",
            path: "account/current"
        })
        getAccountAuthentications = factory.createAPIFunction<{
            accountId: string
        }, any[]>({
            method: "POST",
            path: "account/authentications/GET"
        })
        updatePassword = factory.createAPIFunction<{
            phone: string
            password: string
            code: string
        }, null>({
            method: "POST",
            path: "account/update/password"
        })
    }
}
export function GenerateTransportAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        createReceiver = factory.createAPIFunction<{
            contact: ContactService.Contact
        }, TransportService.Receiver>({
            method: "POST",
            path: "receiver"
        })
        getMyReceivers = factory.createAPIFunction<{
        } & {
        }, TransportService.Receiver[]>({
            method: "POST",
            path: "receivers/GET"
        })
        deleteReceiver = factory.createAPIFunction<{
            receiverId: string
        } & {
        }, null>({
            method: "POST",
            path: "receiver/:receiverId"
        })
        updateReceiver = factory.createAPIFunction<{
            receiverId: string
        } & {
            contact: ContactService.Contact
        }, TransportService.Receiver>({
            method: "PUT",
            path: "receiver/:receiverId"
        })
    }
}
export function GeneratePlatformAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        setInformation = factory.createAPIFunction<Partial<Pick<PlatformService.Information, "customerServicePhoneNumber">>, PlatformService.Information>({
            method: "POST",
            path: "platform/information"
        })
        getInformation = factory.createAPIFunction<{}, PlatformService.Information>({
            method: "POST",
            path: "platform/information/GET"
        })
    }
}
