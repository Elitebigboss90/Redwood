import * as RouteSpec from "../spec/route"
// import * as RouteDecorators from "../routeDecorators"
import { AccountDecorators } from "root-ts/decorator/account"
import { Errors } from "../errors"
import * as Settings from "../settings"
export class AccountPropAPIService extends RouteSpec.AccountPropAPIServiceSpec {
    initialize() {
        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("updateAccount", (context) => {
            this.services.AccountPropService.update({
                id: context.info.account.id,
                displayName: context.body.displayName,
                avatar: context.body.avatar
            }, context.done)
        })
    }
}
