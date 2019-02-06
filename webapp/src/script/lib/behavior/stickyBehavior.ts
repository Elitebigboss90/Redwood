import { PopupBehavior } from "./popupBehavior";

export type Direction = "left" | "top" | "bottom" | "right"

export interface Fix {
    x?: number
    y?: number
}

export class StickyBehavior {
    sticky: HTMLElement
    stickToNode: HTMLElement
    private fix: Fix = { x: 0, y: 0 }
    private direction: Direction = "bottom"


    constructor(public readonly asPopup: PopupBehavior) {
        this.sticky = asPopup.widget.node
        let resizer = () => {
            this.apply()
        }
        this.asPopup.events.listenBy(this, "show", () => {
            window.addEventListener("resize", resizer)
        })
        this.asPopup.events.listenBy(this, "hide", () => {
            window.removeEventListener("resize", resizer)
        })
    }

    stickTo(stickyToNode: HTMLElement, option?: { direction?: Direction, fix?: Fix }) {
        if (!this.asPopup.isShow) {
            this.asPopup.show()
        }
        this.stickToNode = stickyToNode
        if (option && option.direction) {
            this.direction = option.direction
        }
        if (option && option.fix) {
            this.toFix(option.fix)
        } else {
            this.apply()
        }
    }

    private toLeft(rectObject): { x: number, y: number } {
        let y = rectObject.top
        let x = rectObject.left - this.sticky.offsetWidth
        return { x: x, y: y }
    }

    private toRight(rectObject): { x: number, y: number } {
        let y = rectObject.top
        let x = rectObject.left + rectObject.width
        return { x: x, y: y }
    }

    private toBottom(rectObject): { x: number, y: number } {
        let x = rectObject.left
        let y = rectObject.top + rectObject.height
        return { x: x, y: y }
    }

    private toTop(rectObject): { x: number, y: number } {
        let y = rectObject.top - this.sticky.offsetHeight
        let x = rectObject.left
        return { x: x, y: y }
    }

    private apply() {
        let fn = this["to" + Leaf.Util.capitalize(this.direction)]
        let rectObject = this.stickToNode.getBoundingClientRect()
        let position: { x: number, y: number }
        if (fn) {
            position = fn.call(this, rectObject)
        }
        this.sticky.style.top = position.y + this.fix.y + "px"
        this.sticky.style.left = position.x + this.fix.x + "px"
    }

    toFix(fix: Fix) {
        if (fix.x) {
            this.fix.x = fix.x
        }
        if (fix.y) {
            this.fix.y = fix.y
        }
        this.apply()
    }
}
