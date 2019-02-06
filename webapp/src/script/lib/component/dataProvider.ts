export type Callback<TData = any> = (err?: Error, data?: TData) => void
export type Partial<T> = {
    [P in keyof T]?: T[P];
};
export class DataProvider<TVM, TData, TRequestOption> {
    widget: Leaf.Widget<any, TVM>
    fetcher: (option: TRequestOption, callback: Callback<TData>) => void
    constructor(option: {
        widget: Leaf.Widget<any, TVM>
        fetcher: (option: TRequestOption, callback: Callback<TData>) => void
    }) {
        this.widget = option.widget
        this.fetcher = option.fetcher
    }
    events = new Leaf.EventEmitter<{
        startLoading
        endLoading
        update
        error: Error
    }>()
    data: TData
    refresh(option: Partial<TRequestOption> = {} as any) {
        this.events.emit("startLoading")
        this.fetcher(option as TRequestOption, (err, result) => {
            this.events.emit("endLoading")
            if (err) {
                this.events.emit("error", err)
                return
            }
            this.data = result
            this.fill(result)
        })
        return this
    }
    map(dataMap: {
        [K in keyof TVM]: keyof TData | ((TData) => any)
    }) {
        this.dataMap = dataMap
        return this
    }
    fill(data: TData) {
        for (let prop in data) {
            if (this.widget.ViewModel.hasKey(prop)) {
                this.widget.VM[prop as string] = data[prop]
            }
        }
        for (let key in this.dataMap) {
            let mapper = this.dataMap[key]
            if (typeof mapper == "string") {
                this.widget.VM[key] = data[mapper]
            } else {
                this.widget.VM[key] = mapper(data)
            }
        }
        this.events.emit("update")
    }
    private dataMap = {}
}
export type Constructor<T> = {
    new(...args: any[]): T
}
export class ListDataProvider<TData, TItem extends Leaf.ListItem, TRequestOption, TVM = TItem["VM"]>{
    list: Leaf.List<TItem>
    fetcher: (option: TRequestOption, callback: Callback<TData[]>) => void
    Item: Constructor<TItem>
    constructor(option: {
        list: Leaf.List<TItem>
        fetcher: (option: TRequestOption, callback: Callback<TData[]>) => void
        Item: Constructor<TItem>
    }) {
        this.list = option.list
        this.fetcher = option.fetcher
        this.Item = option.Item
    }
    events = new Leaf.EventEmitter<{
        startLoading
        endLoading
        update
        error: Error
    }>()
    refresh(option: Partial<TRequestOption> = {} as any) {
        this.events.emit("startLoading")
        this.fetcher(option as TRequestOption, (err, result) => {
            this.events.emit("endLoading")
            if (err) {
                this.events.emit("error", err)
                return
            }
            this.fill(result)
        })
    }
    transform(transformer: (data: TData) => any) {
        this.transformer = transformer
    }
    private transformer: (data: TData) => any = (item) => item
    map(dataMap: {
        [K in keyof TVM]: keyof TData | ((TData) => any)
    }) {
        this.dataMap = dataMap
    }
    datas: TData[]
    fill(datas: TData[]) {
        this.list.length = 0
        this.datas = datas
        for (let data of datas) {
            let item = new this.Item(this.transformer(data))
            for (let prop in data) {
                if (item.ViewModel.hasKey(prop)) {
                    item.VM[prop as string] = data[prop]
                }
            }
            for (let key in this.dataMap) {
                let mapper = this.dataMap[key]
                if (typeof mapper == "string") {
                    item.VM[key] = data[mapper]
                } else {
                    item.VM[key] = mapper(data)
                }
            }
            this.list.push(item)
        }
        this.events.emit("update")
    }
    private dataMap = {}
}


export interface DataProviderLike {
    events: Leaf.EventEmitter<{
        update
        error
        startLoading
        endLoading
    }>
    refresh()
}
export class DataBehavior {
    constructor(...providers: (DataProvider<any, any, any> | ListDataProvider<any, any, any> | any)[]) {
        for (let provider of providers) {
            if (provider instanceof DataProvider || provider instanceof ListDataProvider) {
                this.attach(provider)
            } else if (provider && typeof provider == "object") {
                let hasChild = provider
                for (let key in provider) {
                    let v = provider[key]
                    if (v instanceof DataProvider || v instanceof ListDataProvider) {
                        this.attach(v)
                    }
                }
            }
        }
    }
    providers: DataProviderLike[] = []
    attach(rp: DataProviderLike) {
        this.providers.push(rp)
        rp.events.listenBy(this, "update", () => {
            this.update()
        })
        rp.events.listenBy(this, "error", (error) => {
            this.panic(error)
        })
        rp.events.listenBy(this, "startLoading", () => {
            this.addLoading()
        })
        rp.events.listenBy(this, "endLoading", () => {
            this.removeLoading()
        })
    }
    refresh() {
        for (let provider of this.providers) {
            provider.refresh()
        }
    }
    render(todo?: Function) {
        if (todo) {
            this.renderHandler = todo
        } else {
            this.update()
        }
        return this
    }
    loading(handler: (percentage: number) => void) {
        this.loadingHandler = handler
        return this
    }
    error(todo: (err) => void)
    error(err: Error)
    error(todo: ((err) => void) | Error) {
        if (todo instanceof Error) {
            this.errorHandler(todo)
        } else if (typeof todo == "function") {
            this.errorHandler = todo
        } else {
            console.error("UnknownErrorType")
        }
        return this
    }
    private renderHandler: Function = () => { }
    private loadingHandler = (perc: number) => { }
    private errorHandler = (err) => {
        console.error(err)
    }
    private updateDebounceTimer: any
    private update() {
        clearTimeout(this.updateDebounceTimer)
        setTimeout(() => {
            this.renderHandler()
        }, 0)
    }
    private panic(error: Error) {
        this.errorHandler(error)
    }
    private loadingCounter = 0
    private addLoading() {
        this.loadingCounter += 1
    }
    private removeLoading() {
        this.loadingCounter -= 1
    }

    public loadingDebounce: number = 50
    private loadingDebounceTimer: any
    private withLoading() {
        clearTimeout(this.loadingDebounceTimer)
        setTimeout(() => {
            let perc = this.loadingCounter / this.providers.length
            if (this.providers.length === this.loadingCounter) {
                perc = 1
            }
            this.loadingHandler(perc)
        }, this.loadingDebounce)
    }
}
