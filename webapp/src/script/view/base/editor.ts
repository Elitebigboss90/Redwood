import { PopupBehavior } from "../../lib/behavior/popupBehavior";

export class Editor<T> extends R.Base.Editor {
    getValue: () => T
    setValue: (T) => void
    private callback: Callback<T>
    asPopup = new PopupBehavior(this)
    constructor(option: {
        title?: string
    } = {}) {
        super()
        let { title } = option
        this.events.on("readonly", () => {
            this.VM.readonly = true
            this.VM.title = "查看"
        })
        if (title) {
            this.VM.title = title
        }
    }
    setTitle(title: string) {
        this.VM.title = title
    }
    edit(value: Partial<T>, callback: Callback<T>) {
        this.callback = callback
        this.setValue(value || {})
        this.asPopup.show()
        this.asPopup.center()
    }
    onClickCancel() {
        this.asPopup.hide()
        this.callback(new Error("Abort"))
    }
    onClickConfirm() {
        let value = this.getValue()
        this.asPopup.hide()
        this.callback(null, value)
    }
    onClickClose() {
        this.onClickCancel()
    }
}