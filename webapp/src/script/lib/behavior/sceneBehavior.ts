export class SceneContext {
    public index: number = 0
    constructor(public container?: HTMLElement) {
    }
    private current: SceneBehavior = null
    load(scene: SceneBehavior) {
        if (!this.container) this.container = document.body
        if (!scene) return false
        if (scene === this.current) return false
        if (this.current) {
            if (this.current.widget.node.parentElement) {
                this.current.widget.node.parentElement.removeChild(this.current.widget.node)
                this.current.events.emit("unload")
                this.current.events.emit("hide")
            }
        }
        this.current = scene
        this.container.appendChild(this.current.widget.node)
        return true
    }
}
export class SceneBehavior {
    static globalContext = new SceneContext()
    public zIndex: number
    public isShow: boolean = false
    constructor(public readonly widget: {
        node: HTMLElement
    }, private context = SceneBehavior.globalContext) {
    }
    public show() {
        if (this.isShow) return
        this.isShow = true
        this.context.load(this)
        this.events.emit("load")
        this.events.emit("show")
    }
    public events = new Leaf.EventEmitter<{
        load
        unload
        show
        hide
    }>()
}
