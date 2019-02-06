import { Point, Vector2 } from "./vector"
export interface IDrawable2D {
    draw(context: CanvasRenderingContext2D)
    position: Point
    rotate: number
    opacity: number
    scale: Vector2
}

export interface IIteratable {
    next(delta: number): boolean
    reset()
}
export interface IInlineEffect extends IIteratable {
    decorate(context: CanvasRenderingContext2D)
}
export interface IHitTestable {
    hitTest(position: Point): DrawableObject
}
export abstract class DrawableObject implements IDrawable2D {
    position: Point = {
        x: 0,
        y: 0
    }
    scale: Vector2 = {
        x: 1,
        y: 1
    }
    origin: Point = {
        x: 0,
        y: 0
    }
    rotate: number = 0
    opacity: number = 1
    draw(context: CanvasRenderingContext2D) {
        context.save()
        context.translate(this.origin.x, this.origin.y)
        for (let effect of this.effects) {
            effect.decorate(context)
        }
        this.onDraw(context)
        context.restore()
    }
    next(t: number) {
        for (let effect of this.effects) {
            effect.next(t)
        }
    }
    abstract onDraw(context: CanvasRenderingContext2D)
    effect<T extends IInlineEffect>(e: T): T {
        this.effects.push(e)
        return e
    }
    effects: IInlineEffect[] = []
    willHitAt(position: Point) {
    }
}

export const Drawable = DrawableObject
export class Group extends DrawableObject {
    onDraw(context) {
        let opacity = context.globalAlpha
        for (let child of this.children) {
            context.save()
            context.globalAlpha = child.opacity
            context.translate(child.position.x, child.position.y)
            context.rotate(child.rotate)
            context.scale(child.scale.x, child.scale.y)
            child.draw(context)
            context.restore()
        }
        context.globalAlpha = opacity
    }
    children: IDrawable2D[] = []
    add<T extends IDrawable2D>(...items: T[]) {
        this.children.push(...items)
        return this
    }
    remove<T extends IDrawable2D>(target: T) {
        this.children = this.children.filter(item => item !== target)
        return this
    }
    next(t: number) {
        for (let item of this.children) {
            if (!item) continue
            if (item["next"]) item["next"](t)
        }
    }
    hitTest(position: Point) {
        for (let child of this.children) {
            let test = child as any as IHitTestable
            if (!test.hitTest) continue
            if (child.rotate != 0) {
                let p = { ...position }
                p.x -= child.position.x
                p.y -= child.position.y
                p.x = p.x / (child.scale.x || 1)
                p.y = p.y / (child.scale.y || 1)
                p.x = p.x * Math.cos(-child.rotate || 0) + p.y * Math.sin(-child.rotate || 0)
                p.y = p.x * Math.sin(-child.rotate || 0) + p.y * Math.cos(-child.rotate || 0)
                let result = test.hitTest(p)
                if (result) return result
            }
        }
        return null
    }

}

export class Scene extends Group {
    constructor(public canvas?: HTMLCanvasElement) {
        super()
        if (!this.canvas) {
            this.canvas = document.createElement("canvas")
        }
        this.camera = new Camera()
        this.resize()
    }
    framer: IFrameControl = new RequestAnimationFrameControl(this.onFrame.bind(this))
    onFrame(t: number, drawless?: boolean) {
        this.next(t)
        if (!drawless) {
            this.render()
        }
    }
    backgroundLayers: Group[] = []
    foregroundLayers: Group[] = []
    resize(option: {
        width?: number
        height?: number
        devicePixelRatio?: number
    } = {
        }) {
        let w = option.width || 300
        let h = option.height || 300
        //let cw = option.cssWidth || w
        //let ch = option.cssHeight || h
        this.width = w
        this.height = h
        this.devicePixelRatio = option.devicePixelRatio || window.devicePixelRatio
        this.canvas.width = w * this.devicePixelRatio
        this.canvas.height = h * this.devicePixelRatio
        //this.canvas.style.width = `${cw}px`
        //this.canvas.style.height = `${ch}px`
        this.camera.resize(this.width, this.height)
    }
    width: number
    height: number
    devicePixelRatio = window.devicePixelRatio
    flip: boolean = false
    camera: Camera
    next(t: number) {
        super.next(t)
        this.camera.next(t)
        for (let layer of this.backgroundLayers) {
            layer.next(t)
        }
        for (let layer of this.backgroundLayers) {
            layer.next(t)
        }
    }
    clearCanvas() {
        this.canvas.width = this.canvas.width
    }
    render() {
        let context = this.canvas.getContext("2d")
        this.clearCanvas()
        context.save()
        if (this.flip) {
            context.scale(-1, 1)
            context.rotate(Math.PI)
            context.translate(0, -this.canvas.height)
        }
        context.scale(this.devicePixelRatio, this.devicePixelRatio)

        // context.save()
        for (let layer of this.backgroundLayers) {
            layer.draw(context)
        }
        context.save()
        this.camera.onDraw(context)
        this.draw(this.canvas.getContext("2d"))
        context.restore()
        for (let layer of this.foregroundLayers) {
            layer.draw(context)
        }
        context.restore()
    }
    getVisualBoundary() {
        return this.camera.getVisualBoundary()
    }
}
export class Layer extends Group {
    constructor(public scene: Scene) {
        super()
    }
    // 1 for no scale
    // larger the further
    public visualDistance = 1
    setVisualDistance(distance: number = 1) {
        this.visualDistance = distance
        return
    }
    draw(context: CanvasRenderingContext2D) {
        context.save()
        Camera.apply(context, this.scene.camera, this.visualDistance)
        context.scale(this.scale.x, this.scale.y)
        super.draw(context)
        context.restore()
    }
    getVisualBoundary() {
        let camera = this.scene.camera
        let distance = this.visualDistance || 1
        return {
            left: camera.position.x / distance - camera.width / 2 * distance,
            right: camera.position.x / distance + camera.width / 2 * distance,
            top: camera.position.y / distance - camera.height / 2 * distance,
            bottom: camera.position.y / distance + camera.height / 2 * distance
        }

    }
    computeRelative(p: Point) {
        return { x: p.x / this.visualDistance, y: p.y / this.visualDistance }
    }
}
export class FixedLayer extends Group {
    constructor(public scene: Scene) {
        super()
    }
    draw(context: CanvasRenderingContext2D) {
        context.save()
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotate)
        context.scale(this.scale.x, this.scale.y)
        super.draw(context)
        context.restore()
    }
}
export class Camera extends DrawableObject {
    static apply(context: CanvasRenderingContext2D, camera: Camera, ratio: number = 1) {
        for (let effect of camera.effects) {
            effect.decorate(context)
        }
        context.translate(- camera.origin.x, - camera.origin.y)
        context.rotate(camera.rotate)
        context.translate((-camera.position.x) / ratio, (-camera.position.y) / ratio)
    }
    target: IDrawable2D
    topLeftBoundary: Point
    rightBottomBoundary: Point
    public width: number
    public height: number
    private visualDistance: Point = {
        x: 0,
        y: 0
    }
    constructor() {
        super()
    }
    getVisualBoundary() {
        return {
            left: this.position.x - this.width / 2,
            right: this.position.x + this.width / 2,
            top: this.position.y - this.height / 2,
            bottom: this.position.y + this.height / 2
        }
    }
    resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.origin.x = -this.width / 2
        this.origin.y = -this.height / 2
        this.position.x = -this.origin.x
        this.position.y = -this.origin.y
    }
    setBoundary(rightBottom: Point, topLeft?: Point) {
        this.rightBottomBoundary = rightBottom
        if (topLeft) {
            this.topLeftBoundary = topLeft
        }
    }
    follow(target: IDrawable2D) {
        this.target = target
        this.visualDistance = Point.substract(this.position, this.target.position)
    }
    next(delta: number) {
        let v = 1 / (1 + this.speed)
        if (this.target) {
            this.visualDistance.x *= Math.pow(v, delta / 1000)
            this.visualDistance.y *= Math.pow(v, delta / 1000)
            this.position.x = this.target.position.x + this.visualDistance.x
            this.position.y = this.target.position.y + this.visualDistance.y
        }
        this.checkBoundary()
        return true
    }
    onDraw(context: CanvasRenderingContext2D) {
        Camera.apply(context, this, 1)
    }
    speed = 1
    private checkBoundary() {
        if (this.rightBottomBoundary) {
            if (this.position.x + this.width > this.rightBottomBoundary.x) {
                this.position.x = this.rightBottomBoundary.x - this.width
            }
            if (this.position.y + this.height > this.rightBottomBoundary.y) {
                this.position.y = this.rightBottomBoundary.y - this.height
            }
        }
        if (this.topLeftBoundary) {
            if (this.position.x < this.topLeftBoundary.x) {
                this.position.x = this.topLeftBoundary.x
            }
            if (this.position.y < this.topLeftBoundary.y) {
                this.position.y = this.topLeftBoundary.y
            }
        }
    }
}


export class DrawableImage extends DrawableObject {
    private el: HTMLImageElement
    constructor(public readonly src: string, public option: {
        width?: number
        height?: number
    } = {}) {
        super()
        this.el = new Image()
        this.el.src = this.src
        if (option.width) this.width = option.width
        if (option.height) this.height = option.height
    }
    public width = 100
    public height = 100
    onDraw(context: CanvasRenderingContext2D) {
        if (!this.el.complete) return
        let w = this.el.naturalWidth
        let h = this.el.naturalHeight
    }
}
export abstract class FrameSprite extends DrawableObject implements IIteratable {
    // fps = 20
    frameInterval = 50
    abstract generateFrames(): ImageSlice[]
    frames: ImageSlice[]
    frameIndex = 0
    private time = 0
    next(delta) {
        if (!this.frames) {
            this.frames = this.generateFrames()
        }
        this.time += delta
        let offset = Math.floor(this.time / this.frameInterval) % this.frames.length
        let currentFrame = this.frames[offset]
        //...
        return true
    }
    reset() {
        this.frameIndex = 0
        this.time = 0
    }
}
export class ImageClip extends DrawableObject {
    image = document.createElement("img") as HTMLImageElement
    constructor(public readonly src, public option: {
        ratio?: number
        width?: number
        height?: number
        origin?: "center" | Vector2
    } = {}) {
        super()
        this.image.src = src
    }
    onDraw(context: CanvasRenderingContext2D) {
        if (!this.image.complete) return
        let ratio = this.option.ratio || 1
        let w = this.option.width || this.image.naturalWidth * ratio
        let h = this.option.height || w / this.image.naturalWidth * this.image.naturalHeight
        let p = { x: 0, y: 0 }
        if (this.option.origin === "browser") {
            // do nothing
        } else if (this.option.origin && typeof this.option.origin["x"] == "number") {
            let f = this.option.origin as Vector2
            p.x = -w / 2
            p.y = -h / 2
            p.x += w * f.x
            p.y += h * f.y
        } else {
            p.x = -w / 2
            p.y = -h / 2
        }
        context.save()
        context.scale(1, -1)
        context.drawImage(this.image, p.x, p.y, w, h)
        context.restore()
    }
}
export interface IFrameControl {
    start()
    stop()
    events: Leaf.EventEmitter<{ next: number }>
}
export class RequestAnimationFrameControl implements IFrameControl {
    private tpf = 1000 / this.fps
    constructor(public onFrame: (time: number, drawless?: boolean) => void, public fps: number = 60, ) {
    }
    time = new TimeControl()
    timer: any
    start() {
        this.time.next()
        this.frame()
    }
    private frame() {
        this.timer = requestAnimationFrame(() => {
            if (!this.timer) return
            this.frame()
        })
        let time = this.time.next()
        this.events.emit("next", time)
        this.onFrame(time)
    }
    stop() {
        cancelAnimationFrame(this.timer)
        this.timer = null
    }
    events = new Leaf.EventEmitter<{
        downgrade: number
        next
    }>()
}
export class FixedFrameControl implements IFrameControl {
    constructor(public onFrame: (time: number, drawless?: boolean) => void, public fps: number = 60, ) {
    }
    time = new TimeControl()
    timer: any
    frameIndex = 0
    start() {
        this.time.next()
        this.frame()
    }
    timeLeft = 0
    timePerFrame = 1000 / this.fps
    events = new Leaf.EventEmitter<{
        downgrade: number
        next
    }>()
    private frame() {
        this.timer = requestAnimationFrame(() => {
            if (!this.timer) return
            this.frame()
        })
        let interval = this.time.next()
        //if (interval > this.timePerFrame * 20) {
        //    this.timePerFrame *= 1.2
        //    this.events.emit("downgrade", this.timePerFrame)
        //}
        let t = interval + this.timeLeft
        let continious = false
        let count = 0
        while (t - this.timePerFrame > 0) {
            t -= this.timePerFrame
            count += 1
        }
        let drawless = true
        for (let i = 0; i < count; i++) {
            if (i === count - 1) {
                drawless = false
            }
            this.events.emit("next", this.timePerFrame)
            this.onFrame(this.timePerFrame, drawless)
            this.frameIndex += 1
        }
        this.timeLeft = t
    }
    stop() {
        cancelAnimationFrame(this.timer)
        this.timer = null
    }
}
export class TimeControl {
    base = Date.now()
    prev = -1
    next(): number {
        if (this.prev < 0) {
            this.prev = Date.now()
            this.base = this.prev
        }
        let delta = Date.now() - this.prev
        this.prev = Date.now()
        return delta
    }
}
export interface ImageSlice {
    image: HTMLImageElement
    offsetX: number
    offsetY: number
    width: number
    height: number
}
export class Background extends DrawableObject {
    constructor(public boundaryProvider: {
        getVisualBoundary(): {
            top: number
            left: number
            right: number
            bottom: number
        }
    }) {
        super()
    }
    setImage(src: string) {
        this.src = src
        this.image = new Image()
        this.image.src = this.src
    }
    image: HTMLImageElement
    public src: string
    onDraw(context: CanvasRenderingContext2D) {
        if (this.image && this.image.complete) {
            this.ensurePattern(context)
            let width = this.image.naturalWidth
            let height = this.image.naturalHeight
            let b = this.boundaryProvider.getVisualBoundary()
            let ox = Math.floor(b.left / width)
            let oy = Math.floor(b.top / height)
            let nx = Math.ceil(b.right / width) - ox
            let ny = Math.ceil(b.bottom / height) - oy
            context.fillStyle = this.pattern
            context.fillRect(ox * width, oy * height, nx * width, ny * height)
        }
    }
    pattern: CanvasPattern
    ensurePattern(context: CanvasRenderingContext2D) {
        if (this.pattern) return
        this.pattern = context.createPattern(this.image, "repeat")
    }
}

export abstract class FunctionalAnimation implements IIteratable {
    constructor(public duration: number, public tf: (t: number) => number = (t) => t) {
    }
    public t = 0
    public isRepeat = false
    repeat() {
        this.isRepeat = true
    }
    forward(delta: number) {
        this.t += delta
        if (this.t - this.timeDebounce > this.duration) {
            if (this.isRepeat) {
                this.t = 0
            } else {
                this.t = this.duration + this.timeDebounce
            }
        }
        let t = this.t - this.timeDebounce
        if (t < 0) t = 0
        return this.tf(t / this.duration)
    }
    events = new Leaf.EventEmitter<{
        finish
    }>()
    abstract render(v?: number, delta?: number)
    public lastValue = 0
    next(delta: number) {
        let v = this.forward(delta)
        this.render(v, v - this.lastValue)
        this.lastValue = v
        if (this.isFinish()) {
            this.events.emit("finish")
            return false
        }
        return true
    }
    timeDebounce: number = 0
    debounce(t: number) {
        this.timeDebounce = t
        return this
    }
    current() {
        return this.tf(this.t - this.timeDebounce)
    }
    isFinish() {
        if (this.isRepeat) return false
        return this.t - this.timeDebounce >= this.duration
    }
    reset() {
        this.t = 0
    }
    finish(cb: Function) {
        this.events.once("finish", cb as any)
    }
}

export class AnimationController {

    constructor(public framer: IFrameControl) {
        framer.events.listenBy(this, "next", (t) => {
            this.next(t)
        })
    }
    next(delta: number) {
        this.animations = this.animations.filter((a) => a.next(delta))
        return this.animations.length > 0
    }
    animations: IIteratable[] = []
    play(animation: IIteratable) {
        this.animations.push(animation)
        return this
    }
    after(t: number, animation: IIteratable) {
        setTimeout(() => {
            this.play(animation)
        }, t)
        return this
    }
    stop(animation) {
        this.animations = this.animations.filter(item => item !== animation)
        return this
    }
}
