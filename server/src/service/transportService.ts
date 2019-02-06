import * as ServiceSpec from "../spec/service"
import * as Leaf from "leaf-ts"
import * as uuid from "uuid"
export const Errors = Leaf.ErrorDoc.build({
    UnknownError: {},
    NotFound: {},
})
export class TransportService extends ServiceSpec.TransportService {
    initialize() {
        this.receiverCollection = this.services.MongodbService.db.collection("receiver")
        this.receiverCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
    }
    createReceiver(option: {
        ownerId: AccountService.AccountId
        contact: ContactService.Contact
    }, callback: Callback<TransportService.Receiver>) {
        let rc: TransportService.Receiver = {
            id: uuid.v4(),
            ownerId: option.ownerId,
            contact: option.contact
        }
        this.receiverCollection.insert(rc, () => {
            callback(null, rc)
        })
    }
    updateReceiver(option: {
        id: TransportService.ReceiverId
        contact: ContactService.Contact
    }, callback: Callback<TransportService.Receiver>) {
        this.receiverCollection.findOneAndUpdate({ id: option.id }, {
            $set: {
                contact: option.contact
            }
        }, {
                returnOriginal: false
            }, (err, result) => {
                if (err) {
                    callback(new Errors.UnknownError)
                    return
                }
                callback(null, result.value)
            })
    }
    getReceivers(option: { ownerId: AccountService.AccountId }, callback: Callback<TransportService.Receiver[]>) {
        this.receiverCollection.find(option).toArray((err, rcs = []) => {
            if (err) {
                callback(new Errors.UnknownError("Fail to get receivers"))
                return
            }
            callback(null, rcs)
        })
    }
    deleteReceiver(option: { id: TransportService.ReceiverId, ownerId: AccountService.AccountId }, callback: Callback<null>) {
        this.receiverCollection.findOneAndDelete({ id: option.id, ownerId: option.ownerId }, (err) => {
            callback(err && new Errors.NotFound() || null)
        })
    }
}
