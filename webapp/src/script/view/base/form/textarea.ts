export class Textarea extends R.Base.Form.Textarea {
    name: string
    displayName: string
    constructor(option: {
        name: string,
        displayName: string
    }) {
        super()
        this.name = option.name
        this.displayName = option.displayName
        this.VM.displayName = option.displayName
    }
    getValue(): string {
        return this.UI.textarea.value
    }
    setValue(value: string) {
        if (value) {
            this.UI.textarea.value = value
        }
    }
    readonly() {
        this.UI.textarea.readOnly = true
    }
}