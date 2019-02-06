export type HTMLInputLikeElement = HTMLInputElement

export class InputGroupBehavior {
    elements: HTMLInputLikeElement[] = []
    constructor(...elements: HTMLInputLikeElement[]) {
        this.elements = elements
        elements.forEach((el, i) => {
            el.addEventListener("keydown", this.handleKeypress, true)
        })
    }
    private handleKeypress = (e: KeyboardEvent) => {
        if (e.defaultPrevented) {
            return
        }
        let elements = this.elements
        if (e.key.toLowerCase() == "tab") {
            e.preventDefault()
            e.stopImmediatePropagation()
            let forward = 1
            if (e.shiftKey) {
                forward = -1
            }
            this.next(forward)
        } else if (e.key.toLowerCase() == "enter") {
            e.preventDefault()
            e.stopImmediatePropagation()
            let i = this.getFocusedElementIndex()
            if (i == elements.length - 1) {
                this.events.emit("submit")
            } else {
                this.next()
            }
        }
    }
    private next(forward = 1) {
        let length = this.elements.length
        let i = this.getFocusedElementIndex() + length + forward
        this.elements[i % length].focus()
    }
    private getFocusedElementIndex() {
        for (let i = 0; i < this.elements.length; i++) {
            let el = this.elements[i]
            if (el.contains(document.activeElement)) {
                return i
            }
        }
        return -1
    }
    focus() {
        let i = this.getFocusedElementIndex()
        if (i < 0) {
            this.elements[0].focus()
        }
    }
    blur() {
        let i = this.getFocusedElementIndex()
        if (i < 0) {
            return
        }
        this.elements[i].blur()
    }
    public events = new Leaf.EventEmitter<{
        submit
    }>()
}
