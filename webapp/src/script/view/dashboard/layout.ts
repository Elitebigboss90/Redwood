import { App } from "../../app";
import { Authenticator } from "./authenticator";
import { SetupCenter } from "./setupCenter";
import { ArticleCollectionManager } from "./articleCollectionManager";
import { SellerCollectionManager } from "./sellerCollectionManager";
import { OrderCollectionManager } from "./orderCollectionManager";
import { SubjectCollectionManager } from "./subjectCollectionManager";
import { ProductCollectionManager } from "./productCollectionManager";
import { AccountCollectionManager } from "./accountCollectionManager";
import { PositionCollectionManager } from "./positionCollectionManager";
import { JobCollectionManager } from "./jobCollectionManager";

export class Layout extends R.Dashboard.Layout {
    entryList: Leaf.List<EntryListItem>
    constructor() {
        super()
        App.api.Account.getCurrentAccount({}, (err, account) => {
            if (err || !account || account.role !== "admin") {
                let authenticator = new Authenticator()
                authenticator.asPopup.show()
                return
            }
            entries.forEach((entry) => {
                let item = new EntryListItem(entry)
                item.events.listenBy(this, "click", () => {
                    this.goto(item.data)
                })
                this.entryList.push(item)
            })
            this.goto({
                name: "文章管理",
                view: ArticleCollectionManager
            })
        })
    }
    goto(entry: Entry) {
        let view = new entry.view
        let content = view.node
        let currentContent = this.UI.content.firstChild
        if (currentContent) this.UI.content.removeChild(currentContent)

        this.entryList.forEach((item) => {
            item.unselect()
            if (item.data.name == entry.name) {
                item.select()
            }
        })
        this.UI.content.appendChild(content)
    }
}

class EntryListItem extends R.Dashboard.Layout.EntryListItem {
    constructor(public data: Entry) {
        super()
        this.VM = data
    }
    select() {
        this.VM.selected = true
    }
    unselect() {
        this.VM.selected = false
    }
    onClickNode() {
        this.events.emit("click")
    }
}

type Constructor<T={}> = new (...args: any[]) => T


type Entry = {
    name: string,
    view: Constructor<Leaf.Widget>
}
const entries: Entry[] = [
    {
        name: "系统设置",
        view: SetupCenter
    },
    {
        name: "文章管理",
        view: ArticleCollectionManager
    },
    {
        name: "服务管理",
        view: SubjectCollectionManager
    },
    {
        name: "职位管理",
        view: PositionCollectionManager
    },
    {
        name: "求职管理",
        view: JobCollectionManager
    },
    {
        name: "用户管理",
        view: AccountCollectionManager
    },
    {
        name: "商家管理",
        view: SellerCollectionManager
    },
    {
        name: "商品管理",
        view: ProductCollectionManager
    },
    {
        name: "订单管理",
        view: OrderCollectionManager
    }
]