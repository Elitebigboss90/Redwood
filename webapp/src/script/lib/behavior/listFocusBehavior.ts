export class ListFocusBehavior<TItem extends Leaf.Widget & {
    onFocus?: Function
    onBlur?: Function
    onRefocus?: Function
    onAttach?: Function
    onDetach?: Function
}, TFocusBy = TItem> {
    constructor(option: {
        list: Leaf.List<TItem> | (Leaf.List<TItem>[]),
        focus?: (item: TItem) => void
        blur?: (item: TItem) => void
        refocus?: (item: TItem) => void
        match?: (item: TItem, target: TFocusBy) => boolean
        attach?: (item: TItem) => void
        detach?: (item: TItem) => void
    }) {
        if (option.list instanceof Array) {
            this.lists = option.list
        } else {
            this.lists = option.list && [option.list] || []
        }
        this.focus = option.focus || function (item) {
        }
        this.blur = option.blur || function (item) {
        }
        this.refocus = option.refocus || function (item) {
        }
        this.attach = option.attach || function (item) {
        }
        this.detach = option.detach || function (item) {
        }
        this.lists.forEach((list) => {
            list.events.listenBy(this, "child/change", () => {
                this.refocusCheck()
            })
            list.events.listenBy(this, "child/add", (item: TItem) => {
                this.attach(item)
                if (item.onAttach) item.onAttach()
            })
            list.events.listenBy(this, "child/remove", (item: TItem) => {
                this.detach(item)
                if (item.onDetach) item.onDetach()
                if (item === this.current) this.current = null
            })
        })
        if (option.match) this.match = option.match
    }
    events = new Leaf.EventEmitter<{
        focus: TItem
        blur: TItem
        refocus: TItem
        missing: TFocusBy | TItem
    }>()
    private focus: (TItem) => void
    private blur: (TItem) => void
    private refocus: (TItem) => void
    private attach: (TItem) => void
    private detach: (TItem) => void
    private match = (item: TItem, todo: TFocusBy) => {
        return item as any === todo
    }
    private lists: Leaf.List<TItem>[]
    private isFocusing = false
    private focusingCondition: TFocusBy | TItem
    // If target no provided focus at first element
    focusAt(target?: TFocusBy | TItem) {
        let items: TItem[] = []
        this.lists.forEach(list => items.push(...list.toArray()))
        if (!target) {
            target = this.current || items[0]
        }
        if (!target) return false
        let result: TItem
        this.focusingCondition = target
        for (let item of items) {
            if (target === item || this.match(item, target as TFocusBy)) {
                result = item
                break
            }
        }
        if (!result) {
            this.events.emit("missing", target)
            return false
        }
        if (result && this.current === result) {
            this.refocus(result)
            if (result.onRefocus) result.onRefocus()
            this.events.emit("refocus", this.current)
            return true
        }
        if (this.current) {
            this.blur(this.current)
            if (this.current.onBlur) this.current.onBlur()
            this.events.emit("blur", this.current)
        }
        this.current = result
        this.focus(result)
        if (result.onFocus) result.onFocus()
        this.events.emit("focus", this.current)
    }
    private recheckTimer: any
    private refocusCheck() {
        clearTimeout(this.recheckTimer)
        this.recheckTimer = setTimeout(() => {
            if (this.focusingCondition) {
                let target = this.focusingCondition
                let items: TItem[] = []
                this.lists.forEach(list => items.push(...list.toArray()))
                let result: TItem
                for (let item of items) {
                    if (target === item || this.match(item, target as TFocusBy)) {
                        result = item
                        break
                    }
                }
                if (result) {
                    this.refocus(result)
                    if (result.onRefocus) result.onRefocus()
                    this.current = result
                    this.events.emit("refocus", result)
                }
            }
        }, 0)
    }
    next(relativeOffset: number = 1, item: TItem = this.current) {
        let items = this.lists.map(list => list.toArray()).reduce((arr, next) => {
            return arr.concat(next)
        }, [])
        let index = items.indexOf(item)
        if (index < -1) return false
        // make sure its positive
        index = ((index + relativeOffset) % items.length + items.length) % items.length
        this.focusAt(items[index])
        return true
    }
    current: TItem
    solve(todo: (events: this["events"]) => void) {
        todo(this.events)
        return this
    }
}
