export class Text extends R.Base.Form.Text {
    name: string
    displayName: string
    constructor(option: {
        name: string,
        displayName: string,
    }) {
        super()
        this.name = option.name
        this.displayName = option.displayName
        this.VM.displayName = option.displayName
    }
    setMeta(meta: {
        hint: string
    }) {
        this.VM.hint = meta.hint
    }
    getValue(): string {
        return this.UI.input.value
    }
    setValue(value: string) {
        this.UI.input.value = value
    }
    readonly() {
        this.UI.input.readOnly = true
        this.VM.readonly = true
        let value = this.getValue()
        if (!value || value == "") {
            this.UI.input.placeholder = "没有内容"
        }
    }
}