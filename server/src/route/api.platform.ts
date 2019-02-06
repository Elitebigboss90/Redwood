import * as Leaf from "leaf-ts"
import * as RouteSpec from "../spec/route"
export class PlatformAPIService extends RouteSpec.PlatformAPIServiceSpec {
    initialize() {
        this.api("setInformation", function (ctx) {
            this.services.PlatformService.setInformation(this.body, ctx.done)
        })
        this.api("getInformation", function (ctx) {
            this.services.PlatformService.getInformation(this.body, ctx.done)
        })
        this.installTo(this.services.ExpressService.server)
    }
}
