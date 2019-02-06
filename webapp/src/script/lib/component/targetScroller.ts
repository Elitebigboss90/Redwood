
export interface PositionItem {
    name: string
    element: HTMLElement
}

export class TargetScroller {
    private positionItems: PositionItem[] = []
    private lastFireEvent: Event
    private scrollDistanceRate: number = 0.1
    private scrollToElement: HTMLElement

    constructor(public readonly scrollable: HTMLElement) {
        this.scrollable.addEventListener("scroll", (e) => {
            this.check(e)
        })
    }

    events = new Leaf.EventEmitter<{
        // currently scroll into
        at: string
    }>()


    add(name: string, target: HTMLElement) {
        let item = {
            name: name,
            element: target,
        }
        if (this.positionItems.length !== 0) {
            let isNameExisted = false
            let isElementExisted = false
            for (let i = 0; i < this.positionItems.length; i++) {
                let existName = this.positionItems[i].name
                let existElement = this.positionItems[i].element
                if (existName == name) {
                    isNameExisted = true
                    break
                }
                if (existElement == target) {
                    isElementExisted = true
                    break
                }
            }
            if (!isNameExisted && !isElementExisted) {
                this.positionItems.push(item)
            }
            return
        }
        this.positionItems.push(item)
    }

    // animation scroll to target
    goto(name: string) {
        let targetElement = this.get(name)
        if (targetElement) {
            this.scrollToElement = this.get(name)
            this.start()
        } else {
            console.error("the element is not existing")
        }
    }

    private start() {
        this.animation()
    }

    private animation() {
        if (this.next()) {
            requestAnimationFrame(() => {
                this.animation()
            })
        }
    }

    next(): boolean {
        let scrollTo = this.scrollToElement.offsetTop
        let rightNowScrollTop = this.scrollable.scrollTop
        let maxScrollDistance = this.scrollable.scrollHeight - this.scrollable.clientHeight
        if (scrollTo >= maxScrollDistance) {
            scrollTo = maxScrollDistance
        }
        let scrollTotalDistance = rightNowScrollTop - scrollTo
        let scrollDistance = (this.scrollable.scrollTop - scrollTo) * this.scrollDistanceRate
        let remainDistance = this.scrollable.scrollTop - scrollTo
        if (Math.abs(remainDistance) <= 2) {
            this.scrollable.scrollTop = scrollTo
            return false
        } else {
            if (Math.abs(scrollDistance) <= 2) {
                if (scrollDistance <= 0) {
                    scrollDistance = -2
                } else {
                    scrollDistance = 2
                }
            }
            let toPosition = this.scrollable.scrollTop - scrollDistance
            this.scrollable.scrollTop = toPosition
            return true
        }
    }

    // get target by name
    private get(name: string): HTMLElement {
        let element
        this.positionItems.forEach((item) => {
            if (item.name == name) {
                element = item.element
            }
        })
        return element
    }

    private check(e: Event) {
        // do your algorithm and emit "at" event
        if (this.lastFireEvent) {
            if (e.timeStamp - this.lastFireEvent.timeStamp >= 30) {
                this.lastFireEvent = e
                let positionInfoList = this.getPositionInfoList()
                let scrollHeight = this.scrollable.scrollTop
                for (let i = 0; i < positionInfoList.length; i++) {
                    if (scrollHeight >= positionInfoList[i].top && scrollHeight <= positionInfoList[i].end) {
                        this.events.emit("at", positionInfoList[i].name)
                        break
                    }
                }
            }
        } else {
            this.lastFireEvent = e
        }
    }

    private getPositionInfoList() {
        let positionInfoList = this.positionItems.map((item) => {
            let positionInfo = { top: 0, end: 0, name: "" }
            positionInfo.name = item.name
            positionInfo.top = item.element.offsetTop
            positionInfo.end = item.element.offsetTop + item.element.offsetHeight
            return positionInfo
        })
        positionInfoList.sort((a, b) => {
            return a.top - b.top
        })
        return positionInfoList
    }
}

