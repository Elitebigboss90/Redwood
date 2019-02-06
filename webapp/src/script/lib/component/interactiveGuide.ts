import { PopupBehavior } from "../lib/behavior/popupBehavior"
export class InteractiveGuide {
    public mask = document.createElement("div")
    constructor(public readonly option: {
        node: HTMLElement
    }) {
        this.mask.classList.add("mask")
        this.mask.style.position = "absolute"
        this.mask.style.top = "0"
        this.mask.style.left = "0"
        this.mask.style.width = "100%"
        this.mask.style.height = "100%"
        this.mask.addEventListener
        this.mask.style.zIndex = "99999999"
        this.mask.appendChild(this.option.node)
        this.mask.addEventListener("click", () => {
            this.done()
        })
    }
    _callback: Function
    relativeInteractAt(position: HTMLElement | {
        x: number,
        y: number
    }, callback: Function) {
        if (position instanceof HTMLElement) {
            this.interactAt(position, callback)
            return
        }
        let width = document.body.clientWidth || document.documentElement.clientWidth
        let x = width * position.x
        let y = width * position.y
        position = { x, y }
        this.interactAt(position, callback)
    }
    interactAt(position: HTMLElement | {
        x: number,
        y: number
    }, callback: Function) {
        this._callback = callback
        this.show()
        let pos
        if (position instanceof HTMLElement) {
            let rect = position.getBoundingClientRect()
            let x = rect.left + rect.width / 2
            let y = rect.top + rect.height / 2
            pos = { x, y }
        } else {
            pos = position
        }
        this.pointAt(pos as { x: number, y: number })
    }
    pointAt(position: { x: number, y: number }) {
        let rect = this.option.node.getBoundingClientRect()
        // to make it center
        let offsetX = -rect.width / 2
        let offsetY = - rect.height / 2
        console.log("PA", offsetX, position)
        this.option.node.style.position = "absolute"
        this.option.node.style.left = `${position.x + offsetX}px`
        this.option.node.style.top = `${position.y + offsetY}px`
        this.option.node.style.opacity = "0"
        this.option.node.style.transition = "all 300ms";
        setTimeout(() => {
            this.option.node.style.opacity = "1"
        })
    }
    show() {
        document.body.appendChild(this.mask)
    }
    debounce = 200
    hide() {
        if (this.mask.parentElement) {
            document.body.removeChild(this.mask)
        }

    }
    done() {
        this.hide()
        if (this._callback) {
            let cb = this._callback
            this._callback = null
            cb()
        }
    }
}
