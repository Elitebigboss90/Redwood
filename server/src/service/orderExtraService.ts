import * as ServiceSpec from "../spec/service"
import * as Leaf from "leaf-ts"

export class OrderExtraService extends ServiceSpec.OrderExtraService {
    initialize() {
        this.services.ShopService.events.listenBy(this, "shouldCalculateOrderExtraFee", (e) => {
            let { order } = e
            order.extraFee = order.extraFee || {}
            if (order.meta["procurement"]) {
                let { procurementFeeRate } = this.services.PlatformService.infomation
                let procurementFee = 0
                order.items.forEach((item) => {
                    procurementFee += item.totalPrice * procurementFeeRate
                })
                order.extraFee["procurementFee"] = procurementFee
            }
        })
    }
}