import { History } from "../component/history"
export class PopupStack {
    public index: number = 0
    public popups: PopupBehavior[] = []
    public readonly step = 5
    private cancelBehavior: BackButtonPopupCancelBehavior
    public bindHistory(history: History) {
        this.cancelBehavior = new BackButtonPopupCancelBehavior(history, this)
    }
    constructor(public readonly base: number = 10000) {
    }
    public events = new Leaf.EventEmitter<{
        push: PopupBehavior
        remove: PopupBehavior
    }>()
    public add(p: PopupBehavior): boolean {
        if (this.popups.indexOf(p) >= 0) {
            return false
        }
        this.popups.push(p)
        this.index += this.step
        p.zIndex = this.index + this.base
        this.events.emit("push", p)
        return true
    }
    public remove(p: PopupBehavior): boolean {
        let change = false
        this.popups = this.popups.filter((old) => {
            if (old === p) {
                change = true
                return false
            }
            return true
        })
        let last = this.popups[this.popups.length - 1]
        if (last) {
            this.index = last.zIndex - this.base
        } else {
            this.index = 0
        }
        this.events.emit("remove", p)
        return change
    }
}
export class PopupBehavior {
    static globalManager = new PopupStack()
    public zIndex: number
    public isShow: boolean = false
    constructor(public widget: {
        node: HTMLElement
    }, private manager: PopupStack = PopupBehavior.globalManager) {
        this.withMask()
    }
    public readonly events = new Leaf.EventEmitter<{
        hide
        show
    }>()
    private mask: Mask
    public withoutMask() {
        this.mask = null
        return this
    }
    public withMask(option: {
        color?: string
        opacity?: number
    } = {}) {
        if (!this.mask) {
            this.mask = new Mask()
            this.mask.events.listenBy(this, "interact", () => {
                if (this.isBlocked) return
                this.hide()
            })
        }
        if (option.color) this.mask.color(option.color)
        if (option.opacity) this.mask.opacity(option.opacity)
        return this
    }
    public isBlocked = false
    // will not auto hide when click mask
    public shouldBlock() {
        if (!this.mask) {
            console.error("Blockmode only makesense when withMask is invokded")
        }
        this.isBlocked = true
        return this
    }
    public whenShow(fn: Function) {
        this.events.listenByOnce(this, "show", fn as any)
        return this
    }
    public whenHide(fn: Function) {
        this.events.listenByOnce(this, "hide", fn as any)
        return this
    }
    public show() {
        if (this.isShow) return this
        this.isShow = true
        this.manager.add(this)
        if (this.mask) {
            this.mask.el.style.zIndex = `${this.zIndex - 1}`
            document.body.appendChild(this.mask.el)
        }
        let node = this.widget.node as HTMLElement
        node.style.position = "absolute"
        node.style.zIndex = this.zIndex.toString()
        //node.style.left = "0"
        //node.style.top = "0"
        document.body.appendChild(this.widget.node)
        if (this.shouldCenter) {
            setTimeout(() => {
                this.applyCenter()
            })
        }
        this.events.emit("show")
        return this
    }
    public hide() {
        this.manager.remove(this)
        if (!this.isShow) return this
        this.isShow = false
        this.manager.remove(this)
        if (this.mask) {
            if (this.mask.el.parentElement) {
                this.mask.el.parentElement.removeChild(this.mask.el)
            }
        }
        document.body.removeChild(this.widget.node)
        this.events.emit("hide")
        return this
    }
    private shouldCenter = false
    public center() {
        if (!this.shouldCenter) {
            this.shouldCenter = true
        }
        if (!this.isShow) return this
        this.applyCenter()
        return this
    }
    public applyCenter() {
        let rect = this.widget.node.getBoundingClientRect()
        let winWidth = window.document.body.offsetWidth
        let winHeight = window.document.body.offsetHeight
        let left = (winWidth - rect.width) / 2
        let top = (winHeight - rect.height) / 2
        this.widget.node.style.top = top + "px"
        this.widget.node.style.left = left + "px"
        return {
            x: left
            , y: top
        }

    }
}

export class Mask {
    public el = document.createElement("div")
    constructor() {
        this.el.classList.add("mask")
        this.el.style.position = "absolute"
        this.el.style.left = "0"
        this.el.style.right = "0"
        this.el.style.top = "0"
        this.el.style.bottom = "0"
        this.el.addEventListener("click", (e) => {
            e.stopImmediatePropagation()
            e.preventDefault()
            this.events.emit("interact")
        })
        this.color("rgba(0,0,0,0)")
        this.opacity(0)
    }
    events = new Leaf.EventEmitter<{
        interact
    }>()
    color(color: string) {
        this.el.style.backgroundColor = color
    }
    opacity(o: number) {
        this.el.style.opacity = o.toString()
    }
}

export class BackButtonPopupCancelBehavior {
    constructor(public readonly history: History, public readonly popups: PopupStack) {
        this.popups.events.listenBy(this, "push", (popup) => {
            if (popup.isBlocked) return
            this.history.registerBackButton(popup, () => {
                popup.hide()
            })
        })
        this.popups.events.listenBy(this, "remove", (popup) => {
            this.history.removeBackButton(popup)
        })
    }
    private stack = []
}
