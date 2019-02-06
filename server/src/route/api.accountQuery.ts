import * as RouteSpec from "../spec/route"
export class AccountQueryAPIService extends RouteSpec.AccountQueryAPIServiceSpec {
    initialize() {
        this.api("queryAccountsAsPaginate", (c) => {
            console.log("queryAccountsAsPaginate")
            let { pageIndex, pageSize } = c.body
            this.services.AccountQueryService.queryAccountsAsPaginate({
                pageIndex,
                pageSize
            }, c.done)
        })
        this.installTo(this.services.ExpressService.server)
    }
}