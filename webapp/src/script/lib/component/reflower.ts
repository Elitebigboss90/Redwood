import { ArrayDiff } from "../component/arrayDiff"

export abstract class ListReflower {
    static reflow(list: Leaf.List, itemHeight: number) {
        list.forEach((item, index) => {
            this.transform(item, index * itemHeight)
        })
    }
    static transform(item: Leaf.WidgetAny, top) {
        item.node.style.top = top + "px"
    }
}


export interface GridReflowable extends Leaf.Widget {
    width?: number
    height?: number
    isPadding?: boolean
    position?: {
        x: number
        y: number
    }
}
export class GridReflower<TItem extends GridReflowable>{
    // margin never collpase here
    public config = {
        margin: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        },
        size: {
            width: 100,
            height: 100,
            margin: {
                vertical: 20,
                horizontal: 20
            }
        }
    }
    constructor(public readonly list: Leaf.List<TItem>) {
    }
    events = new Leaf.EventEmitter<{
        reflow
    }>()
    reflow() {
        let items = this.list.toArray()
        let rect = this.list.node.getBoundingClientRect()
        let arrangingWidth = (rect.width - this.config.margin.left - this.config.margin.right - this.config.size.margin.horizontal)
        let arrangingItemWidth = this.config.size.width + this.config.size.margin.horizontal
        let count = Math.floor(arrangingWidth / arrangingItemWidth)
        let stepX = arrangingWidth / count
        let stepY = this.config.size.height + this.config.size.margin.vertical
        let itemMarginHorizontal = stepX - this.config.size.width
        let offsetLeft = this.config.margin.left + itemMarginHorizontal
        let index = 0
        for (let item of items) {
            item.node.style.width = `${this.config.size.width}px`
            item.node.style.height = `${this.config.size.height}px`
            item.node.style.position = "absolute"
            item.node.style.left = "0"
            item.node.style.right = "0"
            let xIndex = index % count
            let yIndex = Math.floor(index / count)
            this.move(
                item,
                offsetLeft + stepX * xIndex,
                this.config.margin.top + stepY * yIndex
            )
            index += 1
        }
        let height = this.config.margin.top + this.config.margin.bottom + Math.ceil(index / count) * stepY
        this.list.node.style.height = `${height}px`
        this.list.node.style.position = "relative"
        this.events.emit("reflow")
    }
    public move = (item: TItem, x: number, y: number) => {
        item.node.style.transform = `translateX(${x}px) translateY(${y}px)`
    }
}

export class DynamicGridReflower<TItem extends GridReflowable> {
    public items: TItem[] = []
    public config = {
        margin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        size: {
            width: 100,
            height: 100,
        },
        bufferZone: 900,
    }
    constructor(public readonly list: Leaf.List<TItem>, public readonly viewport?: HTMLElement) {
        if (!this.viewport) {
            this.viewport = this.list.node.parentElement
        }
        this.viewport.addEventListener("scroll", () => {
            this.sync()
        })
        this.list.node.style.position = "relative"
    }
    reflow() {
        let anchor = this.list[0]
        let scrollTop = this.viewport.scrollTop
        let offset = scrollTop - (anchor && anchor.position && anchor.position.y || 0)
        let rect = this.viewport.getBoundingClientRect()
        if (!rect) return
        this.runtime.viewport.height = rect.height
        this.runtime.viewport.width = rect.width
        let y = this.config.margin.top
        let x = this.config.margin.left
        let maxHeightOfRow = 0
        for (let item of this.items) {
            if (!item.position) {
                item.position = {
                    x: 0, y: 0
                }
            }
            if (item.isPadding) {
                item.position.x = 0
                item.position.y = y
                y += item.height
                x = this.config.margin.left
                maxHeightOfRow = 0
            } else {
                if (x + item.width + this.config.margin.right > this.runtime.viewport.width
                    && maxHeightOfRow > 0 // has item in this row
                ) {
                    x = this.config.margin.left
                    y += maxHeightOfRow
                    maxHeightOfRow = 0
                }
                item.position.x = x
                item.position.y = y
                x += item.width
                if (item.height > maxHeightOfRow) {
                    maxHeightOfRow = item.height
                }
            }
        }
        let height = y + maxHeightOfRow + this.config.margin.bottom
        this.runtime.height = height
        if (anchor && anchor.position) {
            // equasion : offset == scrollTop - position.y
            // offset should kept fixed
            this.viewport.scrollTop = offset + anchor.position.y
        }
        this.sync()
    }
    private runtime = {
        height: 0,
        viewport: {
            height: 0,
            width: 0
        }
    }
    private sync() {
        let scrollTop = this.viewport.scrollTop
        let olds = this.list.toArray()
        let nows: TItem[] = []
        let zoneTop = scrollTop - this.config.bufferZone
        let zoneBottom = scrollTop + this.runtime.viewport.height + this.config.bufferZone
        let inZone = (item: TItem) => {
            return item.position.y > zoneTop && item.position.y + item.height < zoneBottom
        }
        for (let item of this.items) {
            if (inZone(item)) {
                if (olds.indexOf(item) < 0) {
                    this.list.push(item)
                }
                nows.push(item)
            }
        }
        let diff = ArrayDiff.diff(nows, olds)
        for (let item of diff.right) {
            this.list.removeItem(item)
        }
        for (let item of nows) {
            let x = item.position.x
            let y = item.position.y
            console.log("transform X")
            item.node.style.transform = `translateX(${x}px) translateY(${y}px)`
            item.node.style.position = "absolute"
            item.node.style.left = "0"
            item.node.style.top = "0"
        }
        this.list.node.style.height = this.runtime.height + "px"
    }
}
