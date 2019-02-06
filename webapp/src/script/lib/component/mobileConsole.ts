import { Inspector } from "./inspector"
import { ContinuousCounter } from "./continuousCounter"
export class MobileConsole extends Leaf.Widget {
    constructor() {
        super("<div data-id='container'></div>")
        this.node.style.whiteSpace = "pre-wrap"
        this.node.style.width = "100%"
        this.node.style.height = "50%"
        this.node.style.position = "absolute"
        this.node.style.left = "0"
        this.node.style.bottom = "0"
        this.node.style.overflowY = "auto"
        this.node.style.background = "rgba(0,0,0,.7)"
        this.node.style.color = "white"
        this.node.style["webkitOverflowScrolling"] = "touch"
    }
    inspect = new Inspector()
    log(...args: any[]) {
        this.content(args, "white")
    }
    error(...args: any[]) {
        this.content(args, "red")
    }
    content(args: any[], color: string) {
        let allString = args.every((item) => {
            return typeof item === "string"
        })
        let content: string
        if (allString) {
            content = args.join(" ")
        }
        else {
            content = args.map(item => this.inspect.inspect(item, 8)).join(" ")
        }
        let span = document.createElement("div")
        span.textContent = content
        this.node.appendChild(span)
        this.node.scrollTop = 999999999999
        span.style.color = color
    }
    public isShow
    show(force?: boolean) {
        if (!force && window.location.toString().indexOf("debug") < 0) return
        if (this.isShow) return
        this.isShow = true
        document.body.appendChild(this.node)
        this.node.scrollTop = this.node.clientHeight
    }
    hide() {
        if (!this.isShow) return
        this.isShow = false
        document.body.removeChild(this.node)
    }
    toggle() {
        if (this.isShow) {
            this.hide()
        } else {
            this.show()
        }
    }
    static initialize(): MobileConsole {
        if (this.console) return this.console
        this.console = new MobileConsole()
        let counter = new ContinuousCounter({
            count: 10,
            during: 3000
        })
        counter.events.listenBy(this, "trigger", () => {
            this.console.toggle()
            this.console.log("Log start:")
        })
        window.onerror = (err) => {
            this.console.error(err)
        }
        let attachTouch = () => {
            document.body.addEventListener("touchstart", () => {
                counter.trigger()
            }, true)
        }
        if (document.readyState === "complete") {
            attachTouch()
        } else {
            document.onreadystatechange = () => {
                if (document.readyState === "complete") {
                    attachTouch()
                }
            }
        }
        return this.console
    }
    static console: MobileConsole
}
