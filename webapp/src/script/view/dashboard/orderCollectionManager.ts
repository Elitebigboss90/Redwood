import { SillyTable } from "../base/sillyTable";
import { App } from "../../app";
import { OrderEditor } from "./editors";
import { SillyPagination } from "../base/sillyPagination";
import * as Dict from "../../dict"

export class OrderCollectionManager extends R.Dashboard.OrderCollectionManager {
    data = {
        pagination: {
            pageIndex: 0,
            pageLimit: 4,
            pageSize: 30
        }
    }
    table = new SillyTable<ShopService.Order, { view }>({
        fields: {
            id: "订单号",
            state: "状态"
        },
        actions: {
            view: "查看"
        },
        transform: {
            state: (state) => Dict.OrderStateMap[state]
        }
    })
    pagination = new SillyPagination(this.data.pagination)
    constructor() {
        super()
        this.refresh()
        this.table.events.listenBy(this, "view", (data) => {
            let { id, items, totalFee, state } = data
            let ed = new OrderEditor()
            ed.readonly(true)
            ed.edit({
                id,
                items: items.map((i) => `${i.name}; x${i.quantity}; 共${i.totalPrice / 100}元`),
                totalFee: totalFee / 100,
                state: Dict.OrderStateMap[state]
            }, () => { })
        })
        this.pagination.events.listenBy(this, "goto", (pageIndex) => {
            this.refresh({ pageIndex: pageIndex })
        })
    }
    refresh(option: {
        pageIndex?: number
    } = {}) {
        App.api.Shopping.queryOrdersAsPaginate({
            pageIndex: option.pageIndex || 0,
            pageSize: this.data.pagination.pageSize,
        }, (err, res: PaginateService.PaginateResult<ShopService.Order>) => {
            this.table.from(res.items)
            this.pagination.setData({
                pageIndex: res.pageIndex,
                pageTotal: res.pageTotal,
                total: res.total
            })
        })
    }
}

