import * as RouteSpec from "../spec/route"
import { Errors } from "../errors"
import { AccountDecorators } from "root-ts/decorator/account"
export class TransportAPIService extends RouteSpec.TransportAPIServiceSpec {
    initialize() {
        this.decorateAll(AccountDecorators.decorate("WithAccount"))
        let tp = this.services.TransportService
        this.api("createReceiver", (c) => {
            tp.createReceiver({
                ownerId: c.info.account.id,
                contact: c.body.contact
            }, c.done)
        })
        this.api("deleteReceiver", (c) => {
            tp.deleteReceiver({
                id: c.params.receiverId,
                ownerId: c.info.account.id
            }, c.done)
        })

        this.api("getMyReceivers", (c) => {
            tp.getReceivers({
                ownerId: c.info.account.id
            }, c.done)
        })
        this.api("updateReceiver", (c) => {
            tp.updateReceiver({
                id: c.params.receiverId,
                contact: c.body.contact
            }, c.done)
        })
    }
}
