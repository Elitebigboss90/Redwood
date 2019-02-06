import * as DecoratorSpec from "../spec/decorator"
import { Errors } from "../errors"

export const ShopDecorators = new class extends DecoratorSpec.ShopDecorators {
    constructor() {
        super()
        this.implement("WithAccountSeller", (c, option: {
            optional?: boolean
        } = {}, origin) => {
            if (!c.info.account) {
                if (option.optional) {
                    origin()
                    return
                }
                c.error(new Errors.AuthorizationFailed("Seller not login"))
                return
            }
            c.services.ShopService.getSellerByOwnerId({
                ownerId: c.info.account.id
            }, (err, seller) => {
                if (!seller) {
                    if (option.optional) {
                        origin()
                        return
                    }
                    c.error(new Errors.AuthorizationFailed("Not seller"))
                    return
                }
                c.info.seller = seller
                origin()
            })
        })
    }
}
