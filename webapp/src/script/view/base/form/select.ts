import { SillyDropdown } from "../../dashboard/sillyDropdown";

export class Select extends R.Base.Form.Select {
    name: string
    displayName: string
    dropdown: SillyDropdown
    constructor(option: {
        name: string,
        displayName: string,
    }) {
        super()
        this.name = option.name
        this.displayName = option.displayName
        this.VM.displayName = option.displayName
        this.dropdown = new SillyDropdown(this.displayName)
    }
    setMeta(meta: {
        dict?: string,
        placement?: "top" | "bottom"
    } = {}) {
        this.dropdown.setOptionDict(meta.dict)
        this.dropdown.setPlacement(meta.placement || "bottom")
    }
    getValue(): string {
        return this.dropdown.getValue()
    }
    setValue(value: string) {
        this.dropdown.setValue(value)
    }
    readonly() {
        this.dropdown.readonly()
    }
}