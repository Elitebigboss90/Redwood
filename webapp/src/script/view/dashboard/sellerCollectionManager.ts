import { App } from "../../app";
import { SellerEditor } from "./editors";
import { SillyTable } from "../base/sillyTable";
import { SillyPagination } from "../base/sillyPagination";

export class SellerCollectionManager extends R.Dashboard.SellerCollectionManager {
    data = {
        pagination: {
            pageIndex: 0,
            pageLimit: 4,
            pageSize: 20
        }
    }
    table = new SillyTable<ShopService.Seller, {
        view,
        enable,
        disable,
        verify,
    }>({
        fields: {
            name: "名称",
            verified: "审核状态"
        },
        transform: {
            verified: (v) => v ? "已通过" : "未审核"
        },
        actions: {
            enable: (data) => data.disabled ? "启用" : false,
            disable: (data) => data.disabled ? false : "停用",
            view: "查看",
            verify: (data) => (data.verified) ? false : "审核通过",
        }
    })
    pagination = new SillyPagination(this.data.pagination)
    constructor() {
        super()
        this.refresh()

        this.table.events.listenBy(this, "verify", (data) => {
            App.api.Shopping.verifySeller({ sellerId: data.id }, (err, res) => {
                if (err) {
                    console.error(err)
                    alert("操作失败，请重试")
                } else {
                    alert("操作成功")
                }
                this.refresh()
            })
        })
        this.table.events.listenBy(this, "enable", (data) => {
            App.api.Shopping.enableSeller({ sellerId: data.id }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert("启用失败，请重试")
                } else {
                    alert("启用成功")
                }
                this.refresh()
            })
        })
        this.table.events.listenBy(this, "disable", (data) => {
            App.api.Shopping.disableSeller({ sellerId: data.id }, (err, res) => {
                if (err) {
                    console.log(err)
                    alert("停用失败，请重试")
                }
                alert("已停用")
                this.refresh()
            })
        })
        this.table.events.listenBy(this, "view", (data) => {
            let { name, avatar, contact, meta } = data
            let { addressDistrict, addressDetail, phone } = contact
            let { province, city, area } = addressDistrict
            meta = meta || {}
            let { businessLicense } = meta
            businessLicense = businessLicense || ""
            let ed = new SellerEditor()
            ed.readonly(true)
            ed.edit({
                name,
                avatar,
                phone,
                addressDistrict: `${province.name}${city.name}${area.name}`,
                addressDetail,
                businessLicense,
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
        App.api.Shopping.querySellersAsPaginate({
            pageIndex: option.pageIndex || 0,
            pageSize: this.data.pagination.pageSize,
            keyword: "",
        }, (err, res: PaginateService.PaginateResult<ShopService.Seller>) => {
            console.log(res.items)
            this.table.from(res.items)
            this.pagination.setData({
                pageIndex: res.pageIndex,
                pageTotal: res.pageTotal,
                total: res.total
            })
        })
    }
}

