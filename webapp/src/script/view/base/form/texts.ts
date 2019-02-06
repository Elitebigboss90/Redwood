export class Texts extends R.Base.Form.Texts {
    name: string
    displayName: string
    textList: Leaf.List<ListItem>
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
    getValue(): string[] {
        return this.textList.map((item) => item.getValue())
    }
    setValue(value: string[]) {
        value.forEach((v) => {
            let item = new ListItem()
            item.setValue(v)
            this.textList.push(item)
        })
    }
    readonly() {
        this.textList.map((item) => item.getValue())
    }
}

class ListItem extends R.Base.Form.Texts.TextListItem {
    setValue(value: string) {
        this.UI.input.value = value
    }
    getValue() {
        return this.UI.input.value
    }
    readonly() {
        this.UI.input.readOnly = true
    }
}