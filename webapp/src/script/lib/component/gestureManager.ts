import * as Vector from "../concept/vector"
const Point = Vector.Point
export class GestureManager {
    constructor() {
        this.states.debug()
        this.states.setState("wait")
    }
    public el: HTMLElement
    config = {
        verticalSwipe: 100,
        horizentalSwipe: 100
    }
    states = new TouchStates(this)
    events = new Leaf.EventEmitter<{
        swipeLeft
        swipeRight
        swipeUp
        swipeDown
        holdStart
        holdMove
        holdFinish
        tap
        trace: Point[]
    }>()
    public attached = false
    attachTo(el: HTMLElement) {
        if (this.attached) return
        this.attached = true
        this.el = el
        this.el.addEventListener("touchstart", this.handler)
        this.el.addEventListener("touchmove", this.handler)
        this.el.addEventListener("touchend", this.handler)
    }
    detach() {
        if (!this.attached) return
        this.attached = false
        this.el.removeEventListener("touchstart", this.handler)
        this.el.removeEventListener("touchmove", this.handler)
        this.el.removeEventListener("touchend", this.handler)
    }
    startPoint: {
        x: number
        y: number
    }
    handler = (e: TouchEvent) => {
        this.states.feed("touch", e)
    }
}
export class TouchStates extends Leaf.States {
    constructor(public manager: GestureManager) {
        super()
    }
    atWait() {
        this.consumeWhenAvailable("touch", (e: TouchEvent) => {
            if (e.type === "touchstart") {
                this.setState("init", e)
            } else {
                console.log("recieve none init event at start")
                this.setState("wait")
            }
        })
    }
    protected data: {
        startPoint?: Point
        trace?: Point[]
    } = {}
    atInit(stale, e: TouchEvent) {
        this.data.startPoint = Point.fromTouchCenter(e)
        this.data.trace = [this.data.startPoint]
        this.setState("handleMove")
    }
    atHandleMove() {
        this.consumeWhenAvailable("touch", (e: TouchEvent) => {
            if (e.type === "touchstart") {
                this.error(new Error("InvalidState"))
                return
            } else if (e.type === "touchend") {
                this.setState("finish", e)
            } else if (e.type === "touchmove") {
                let p = Point.fromTouchCenter(e)
                this.data.trace.push(p)
                this.setState("handleMove")
            } else {
                console.error("UnknownEvent", e)
                this.error(new Error("UnknownEvent"))
            }
        })
    }
    atFinish(stale, e: TouchEvent) {
        let p = this.data.trace[this.data.trace.length - 1]
        let offset = Point.substract(p, this.data.startPoint)
        console.log(offset, p, this.data.startPoint)
        if (offset.y > this.manager.config.verticalSwipe) {
            this.manager.events.emit("swipeDown")
        } else if (offset.y < -this.manager.config.verticalSwipe) {
            this.manager.events.emit("swipeUp")
        } else if (offset.x > this.manager.config.horizentalSwipe) {
            this.manager.events.emit("swipeRight")
        } else if (offset.x < - this.manager.config.horizentalSwipe) {
            this.manager.events.emit("swipeLeft")
        }
        this.manager.events.emit("trace")
        this.data = {}
        this.setState("wait")
    }
    atPanic() {
        this.recover("wait")
    }
}

export interface Point {
    x: number
    y: number
}
