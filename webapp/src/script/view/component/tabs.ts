export class Tabs extends R.Component.Tabs {
    tabList: Leaf.List<Tab>
    constructor(public data: {
        tabs: TabDefinition[],
        activeKey?: string,
    }) {
        super()
        this.setData(data)
    }
    setData(data: {
        tabs?: TabDefinition[],
        activeKey?: string,
    }) {
        let { tabs, activeKey } = data
        for (let k in data) {
            if (data[k]) {
                this.data[k] = data[k]
            }
        }

        if (tabs && tabs.length > 0) {
            this.tabList.empty()
            tabs.forEach((t: TabDefinition) => {
                if (!t.name) {
                    console.error("Tab should have a name")
                    return
                }
                if (!t.key) {
                    t.key = t.name
                }
                let { name, key } = t
                let item = new Tab({ name, key })
                item.events.listenBy(this, "click", () => {
                    this.setData({
                        activeKey: item.data.key
                    })
                })
                this.tabList.push(item)
            })
        }
        activeKey = activeKey || this.data.tabs[0].key
        this.tabList.forEach((item) => {
            item.setData({
                active: false
            })
            if (item.data.key === activeKey) {
                item.setData({
                    active: true
                })
            }
        })
        this.data.tabs.forEach((t) => {
            if (t.key === activeKey) {
                this.UI.content.innerHTML = ""
                this.UI.content.appendChild(t.content)
            }
        })


    }
}

export class Tab extends R.Component.Tabs.TabListItem {
    events = new Leaf.EventEmitter<{
        click
    }>()
    constructor(public data: {
        name: string,
        key: string,
        active?: boolean
    }) {
        super()
        this.setData(data)
    }
    setData(data: {
        name?: string,
        key?: string,
        active?: boolean
    }) {
        this.VM = data
        for (let k in data) {
            if (data[k]) {
                this.data[k] = data[k]
            }
        }
    }
    onClickNode() {
        let key = this.data.key
        this.events.emit("click")
    }
}

export type TabDefinition = {
    name: string,
    content: HTMLElement,
    key?: string,
}