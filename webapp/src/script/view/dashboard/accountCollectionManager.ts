import { App } from "../../app";
import { PostEditor, AccountEditor } from "./editors";
import { SillyTable } from "../base/sillyTable";
import { SillyPagination } from "../base/sillyPagination";

export class AccountCollectionManager extends R.Dashboard.AccountCollectionManager {
    data = {
        pagination: {
            pageIndex: 0,
            pageLimit: 4,
            pageSize: 20
        }
    }
    table = new SillyTable<AccountService.Account, { view }>({
        fields: {
            displayName: "名称",
        },
        actions: {
            view: "查看",
            // disable: "禁用"
        }
    })
    pagination = new SillyPagination(this.data.pagination)
    constructor() {
        super()
        this.refresh()

        this.table.events.listenBy(this, "view", (data) => {
            let ed = new AccountEditor()
            let { displayName } = data
            let { phone, avatar } = data.props
            ed.readonly(true)
            ed.edit({
                displayName,
                avatar: [avatar],
                phone,
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
        App.api.AccountQuery.queryAccountsAsPaginate({
            pageIndex: option.pageIndex || 0,
            pageSize: this.data.pagination.pageSize,
        }, (err, res: PaginateService.PaginateResult<AccountService.Account>) => {
            this.table.from(res.items)
            this.pagination.setData({
                pageIndex: res.pageIndex,
                pageTotal: res.pageTotal,
                total: res.total
            })
        })
    }
}

