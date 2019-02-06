export class Number extends R.Base.Form.Number {
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
        hint?: string,
        unit?: string,
    }) {
        if (meta.hint) {
            this.VM.hint = meta.hint
        }
        if (meta.unit) {
            this.VM.unit = meta.unit
        }
    }
    getValue(): string {
        return this.UI.input.value
    }
    setValue(value: string) {
        this.UI.input.value = value
    }
    readonly() {
        this.UI.input.readOnly = true
    }
}