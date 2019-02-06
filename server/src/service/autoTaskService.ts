import * as ServiceSpec from "../spec/service"
import * as Leaf from "leaf-ts"

export class AutoTaskService extends ServiceSpec.AutoTaskService {
    initialize() {
        this.doOrderDeliveringTask()
    }

    private doOrderDeliveringTask() {
        let shop = this.services.ShopService
        setInterval(() => {
            shop.queryOrders({
                state: "delivering"
            }, (err, orders) => {
                if (err) {
                    console.log("order delivering task failed")
                    return
                }
                orders.forEach((order) => {
                    if (order.meta.transportCreatedAt && Date.now() - order.meta.transportCreatedAt >= 1000 * 60 * 60 * 24 * 10) {
                        shop.updateOrderStateExplicitly({
                            id: order.id,
                            stateBefore: "delivering",
                            state: "completed"
                        }, (err) => {
                            console.log("err", err)
                            if (err) {
                                return
                            }
                        })
                    }
                })
            })
        }, 1000 * 60 * 60 * 24)
    }
}
