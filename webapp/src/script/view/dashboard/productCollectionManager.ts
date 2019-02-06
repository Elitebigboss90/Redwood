import { App } from "../../app";
import { ProductEditor } from "./editors";
import { SillyTable } from "../base/sillyTable";
import { SillyPagination } from "../base/sillyPagination";

export class ProductCollectionManager extends R.Dashboard.ProductCollectionManager {
    data = {
        pagination: {
            pageIndex: 0,
            pageLimit: 4,
            pageSize: 20
        }
    }
    table = new SillyTable<ShopService.Product, { view, enable, disable }>({
        fields: {
            name: "名称",
        },
        actions: {
            enable: (data) => data.disabled ? "上架" : false,
            disable: (data) => data.disabled ? false : "下架",
            view: "查看"
        }
    })
    pagination = new SillyPagination(this.data.pagination)
    constructor() {
        super()
        this.refresh()
        this.table.events.listenBy(this, "enable", (data) => {
            App.api.Shopping.enableProduct({ productId: data.id }, (err, res) => {
                this.refresh()
                if (err) {
                    alert("上架失败，请重试")
                } else {
                    alert("上架成功")
                }
            })
        })
        this.table.events.listenBy(this, "disable", (data) => {
            App.api.Shopping.disableProduct({ productId: data.id }, (err, res) => {
                this.refresh()
                if (err) {
                    alert("下架失败，请重试")
                } else {
                    alert("下架成功")
                }
            })
        })

        this.table.events.listenBy(this, "view", (data) => {
            let { name, thumbs, basePrice, description, descriptionImages } = data
            let ed = new ProductEditor()
            ed.readonly(true)
            ed.edit({
                name,
                thumbs,
                basePrice: basePrice / 100,
                description,
                descriptionImages
            }, () => { })
        })

        this.pagination.events.listenBy(this, "goto", (pageIndex) => {
            console.log(pageIndex)
            this.refresh({ pageIndex: pageIndex })
        })
    }
    refresh(option: {
        pageIndex?: number
    } = {}) {
        console.log(option.pageIndex)
        App.api.Shopping.queryProductsAsPaginate({
            pageIndex: option.pageIndex || 0,
            pageSize: this.data.pagination.pageSize,
            keyword: "",
        }, (err, res: PaginateService.PaginateResult<ShopService.Product>) => {
            this.table.from(res.items)
            this.pagination.setData({
                pageIndex: res.pageIndex,
                pageTotal: res.pageTotal,
                total: res.total
            })
        })
    }
}

