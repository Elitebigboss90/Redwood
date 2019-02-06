import { Vector2, Point } from "./vector"
export class VisualDesignContext2D<TMarks extends {
    [name: string]: {
        x: number
        y: number
        relative?: "begin" | "center" | "end"
        // with a relative provided we suppose we always use keep relative for now
        //keepRelative?: boolean
    }
} = {}, TColors  = {}, TSizes = {}, TConst = any> {
    public readonly design: {
        width: number
        height: number
        offset: {
            top: number
            left: number
            // offset right is calculated by distance from right cut to right edge
            right: number
            bottom: number
        }
        clipWidth: number
        clipHeight: number
    }
    public width: number = 1280
    public height: number = 2560
    public ratio = 1
    public stretch = 1
    public marks: {
        [K in keyof TMarks]: Point
    } = {} as any
    public visualPosition: {
        [K in keyof TMarks]: VisualPosition
    } = {} as any
    colors: TColors
    sizes: TSizes
    sizesStretched: TSizes
    const: TConst
    private _sizes: TSizes
    constructor(option: {
        width: number
        height: number
        offset?: {
            top?: number
            left?: number
            right?: number
            bottom?: number
        },
        marks?: TMarks
        colors?: TColors
        sizes?: TSizes
        const?: TConst
    }) {
        this.design = {
            width: option.width,
            height: option.height,
            offset: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            clipWidth: 0,
            clipHeight: 0,
        }
        if (option.offset) {
            let offset = option.offset
            this.design.offset.top = offset.top || 0
            this.design.offset.bottom = offset.bottom || 0
            this.design.offset.left = offset.left || 0
            this.design.offset.right = offset.right || 0
        }
        this.const = option.const
        this.colors = option.colors || {} as any
        this._sizes = option.sizes || {} as any
        this.const = option.const || {} as any
        if (option.marks) {
            for (let name in option.marks) {
                this.addMark(name, option.marks[name])
            }
        }
        this.design.clipWidth = this.design.width - this.design.offset.left - this.design.offset.right
        this.design.clipHeight = this.design.height - this.design.offset.top - this.design.offset.bottom
        this.resize()
    }
    addMark(name: string, info: {
        x: number
        y: number
        relative?: "begin" | "center" | "end"
        keepRelative?: boolean
    }) {
        let vp = new VisualPosition(this, info)
        if (info.relative) {
            vp.relativeTo(info.relative)
            vp.keepRelative()
        }
        this.visualPosition[name] = vp
        Object.defineProperty(this.marks, name, {
            get: () => {
                return vp.get()
            }
        })
    }
    resize(width?: number, height?: number) {
        this.width = width || window.innerWidth
        this.height = height || window.innerHeight
        this.ratio = this.width / this.design.clipWidth
        this.stretch = this.height / (this.design.clipHeight * this.ratio)
        this.sizes = {} as any
        this.sizesStretched = {} as any
        document.documentElement.style.fontSize = this.ratio + "px"
        for (let name in this._sizes) {
            this.sizes[name] = this.see(this._sizes[name])
            this.sizesStretched[name] = this.see(this._sizes[name], true)
        }
        console.log(`Visual design init: ${JSON.stringify({
            ratio: this.ratio,
            stretch: this.stretch,
            design: this.design
        }, null, 4)}`)
        return this
    }
    see<T>(data: T, stretch?: boolean): T
    see(n: number, stretch?: boolean): number
    see(p: Point, stretch?: boolean): Point
    see(v: any, stretch?: boolean) {
        let fix = 1
        if (stretch) {
            fix = this.stretch
        } else {
            fix = 1
        }
        if (typeof v == "number") {
            return v * this.ratio * fix
        } else {
            if (!v) return v
            if (v instanceof Array) {
                return v.map(c => this.see(c, stretch))
            }
            let result = {}
            for (let name in v) {
                result[name] = this.see(v[name], stretch)
            }
            return result
        }
    }
    retain(v: number) {
        return this.stretch * v
    }
}

export class VisualPosition {
    constructor(private readonly context: VisualDesignContext2D, public point?: Point) {
        if (!this.point) {
            this.point = { x: 0, y: 0 }
        }
    }
    private from: "begin" | "center" | "end"
    private shouldKeepRelative: boolean
    move(option: Point) {
    }
    get(): Point {
        let design = this.context.design
        let ratio = this.context.ratio
        let p: Point = { x: 0, y: 0 }
        let moved: Point = {
            x: (this.point.x - design.offset.left) * ratio
            , y: (this.point.y - design.offset.top) * ratio
        }
        let clip: Vector2 = {
            x: this.context.width,
            y: this.context.height
        }
        let relative: Point = {
            x: 0,
            y: 0
        }
        if (this.from == "center") {
            relative.x = clip.x / 2
            relative.y = clip.y / 2
        } else if (this.from == "end") {
            relative.x = clip.x
            relative.y = clip.y
        }
        // By now we also make width fix
        p.x = this.scalarStretch(moved.x, relative.x, 1)
        p.y = this.scalarStretch(moved.y, relative.y, this.context.stretch, this.shouldKeepRelative)
        return p
    }
    private scalarStretch(scalar: number, stretchRelative: number, stretch: number, keepRelative?: boolean): number {
        if (keepRelative) {
            let move = scalar - stretchRelative
            return stretchRelative * stretch + move
        }
        return scalar * stretch
    }
    getDesign(): Point {
        return this.point
    }
    relativeTo(pos: "begin" | "center" | "end") {
        this.from = pos
    }
    keepRelative() {
        this.shouldKeepRelative = true
    }
}
