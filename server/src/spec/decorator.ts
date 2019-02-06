import { RouteDecoratorSpec, RouteDecorators } from "root-ts/lib/decorator"
import { AllServices } from "./service"

abstract class Inf extends RouteDecoratorSpec {
    services: AllServices
}

export const ShopDecoratorsSpec = {
    WithAccountSeller: new class extends Inf {
        info: {
            seller: ShopService.Seller
            account: AccountService.Account
        }
    },
}

export abstract class ShopDecorators extends RouteDecorators<typeof ShopDecoratorsSpec>{
    constructor() {
        super(ShopDecoratorsSpec)
    }
}



export const PostDecoratorsSpec = {
    WithPost: new class extends Inf {
        info: {
            post: PostService.Post
        }
        params: {
            postId: string
        }
    },
}

export abstract class PostDecorators extends RouteDecorators<typeof PostDecoratorsSpec>{
    constructor() {
        super(PostDecoratorsSpec)
    }
}
