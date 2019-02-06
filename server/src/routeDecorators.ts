import * as ServiceSpec from "./spec/service"
import { Errors } from "./errors"

function GenRouteDec<T>(solver: (origin: Function, services: ServiceSpec.AllServices, option?: T) => void) {
    return function (option?: T) {
        return function (obj: any, name: string, descriptor: TypedPropertyDescriptor<Function>) {
            let fn = descriptor.value
            descriptor.value = function () {
                solver.call(this, fn.bind(this), this.services, option || {} as any)
            }
        }
    }
}

export const WithAccount = GenRouteDec(function (origin, services, option: {
    optional: boolean
}) {
    console.trace("with account", this.req.session.token)
    if ((!this.req || !this.req.headers || !this.req.headers["x-auth-token"]) && !this.req.session["token"]) {
        if (option.optional) {
            origin()
        } else {
            this.error(new Errors.AuthorizationFailed)
        }
        return
    }
    let token = this.req.headers["x-auth-token"] || this.req.session["token"]
    services.AuthenticationService.getTokenInfo({ token }, (err, info) => {
        console.log("get token", info)
        if (err || !info) {
            this.error(new Errors.AuthorizationFailed("Invalid token"))
            return
        }
        this.info.account = info.account
        origin()
    })
})



export const WithPost = GenRouteDec(function (origin, services, option: { optional: boolean }) {
    const id = this.req.params.postId
    services.PostService.getPost({ id: id }, (err, post) => {
        if (err || !post) {
            if (!option.optional) {
                this.error(new Errors.UnknownError("fail to get post"))
                return
            }
        } else {
            this.info.post = post
        }
        origin()
    })
})
