import * as ServiceSpec from "../spec/service"
import { Errors } from "../errors"

export class AccountPropService extends ServiceSpec.AccountPropService {
    update(option: {
        id: string
        displayName?: string
        avatar?: string
    }, callback: Callback<null>) {
        let updates = {}
        if (option.displayName) {
            updates["displayName"] = option.displayName
        }
        if (option.avatar) {
            updates["props.avatar"] = option.avatar
        }
        this.services.AccountService.accountCollection.findOneAndUpdate({
            id: option.id
        }, {
                $set: updates
            }, (err, data) => {
                if (err || !data.ok) {
                    callback(new Errors.NotFound)
                    return
                }
                callback(null)
            })
    }
}
