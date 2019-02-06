export type Constructor<T = {}> = new (...args: any[]) => T;

export class FormTemplate<TTypes extends {
    [name: string]: FieldConstructor
}= {}> {
    option: {
        className: string
        container: string
    } = {
            className: "form",
            container: "container"
        }
    config(option: {
        name: string
    }) {
    }
    fieldConstructors: {
        [name: string]: FieldConstructor
    } = {}
    defaultFieldConstructor: FieldConstructor
    events = new Leaf.EventEmitter<{ readonly }>()
    constructor(fields: TTypes) {
        for (let name in fields) {
            this.register(name, fields[name])
        }
    }
    register<K extends keyof TTypes>(name: K, Con: TTypes[K]) {
        // first registered field is the default
        if (!this.defaultFieldConstructor) this.defaultFieldConstructor = Con
        this.fieldConstructors[name] = Con
    }
    create<TModel, TBase extends Constructor<Leaf.Widget>>(
        option: FormDefinition<TModel>,
        Base: TBase
    ) {
        let form = this
        return class extends Base {
            constructor(...args: any[]) {
                let el = document.createElement("div")
                el.className = "form"
                el.setAttribute("data-id", "container")
                super(...args, el)
                this.fields = {}
                this.buildForm()
            }
            buildForm() {
                // almost same as silly form but there are three condition
                // 1. has existing widget somewhere
                // 2. has a placeholder somewhere
                // 3. has a nothing just append
                // So for each field we will
                // for field in this.option.fields search for node with data-id accordingly
                //     1. find a DOM with identical data-id
                //         1.1 check for corresponding widget and match the field interface => use it
                //         1.2 or check if it is a InputElement => wrap it and use it
                //         1.3 considered as a placeholder => generate the field and replace it, also update this.UI,this.fields
                //     2. gerneate the field and append to the "container"
                // save all generated field to this.fields

                // For now we only generate everything
                let metas = option.metas || {}
                let types = option.types || {}
                this.definition = option
                for (let field in option.fields) {
                    let type = types[field] || null
                    let Cons = form.fieldConstructors[type] || form.defaultFieldConstructor
                    const fieldItem = this.fields[field] = new Cons({
                        name: field,
                        displayName: option.fields[field]
                    })
                    fieldItem.node.classList.add("form-item" + type || "input")
                    fieldItem.node.classList.add("form-item")
                    let meta = metas[field]
                    this.UI[form.option.container].appendChild(fieldItem.node)
                    if (meta && fieldItem.setMeta) {
                        fieldItem.setMeta(meta)
                    }
                    fieldItem.events.listenBy(this, "change", () => {
                        console.log(`field changed`, field)
                        for (let k in this.definition.available) {
                            this.performAvailable(k, this.getValue(true))
                        }
                    })
                }
            }
            public setValue(v: TModel) {
                for (let name in v) {
                    const field = this.fields[name]
                    if (!field) continue
                    field.setValue(v[name])
                    this.performAvailable(name, v)
                }
                option.data = v
            }
            public getValue(trial?: boolean): TModel {
                let result = { ...(option.data || {}) } as any
                let optional = this.definition.optional
                for (let name in this.fields) {
                    let field = this.fields[name]
                    result[name] = field.getValue()
                    if (!trial) {
                        this.performOptional(name, result)
                    }
                }
                return result as TModel
            }
            private performOptional(fieldName: keyof TModel, currentValue: TModel) {
                let optional = this.definition.optional
                let name = fieldName
                let value = currentValue
                if (typeof optional == "boolean") {
                    optional = optional
                } else if (typeof optional === "function") {
                    optional = optional(value)
                } else {
                    optional = optional || {}
                    if (optional[name]) {
                        optional = true
                    } else {
                        optional = false
                    }
                }

                if (this.definition.available && this.definition.available[name]) {
                    optional = !this.definition.available[name](value)
                }

                if ((value[name] === null || value[name] === undefined || value[name] as any === "")
                    && !optional
                ) {
                    alert(`请输入${this.definition.fields[name]}`)
                    throw (new Error(`${name} is not optinal`))
                }
            }
            private performAvailable(fieldName: keyof TModel, currentValue: TModel) {
                let name = fieldName
                let value = currentValue
                if (!this.definition.available || !this.definition.available[name]) {
                    return
                }
                let available = this.definition.available[name](value)
                if (!available) {
                    this.fields[name].node.classList.add("unavailable")
                } else {
                    this.fields[name].node.classList.remove("unavailable")
                }

            }
            public readonly(
                readonly?: {
                    [K in keyof TModel]?: boolean
                } | boolean) {
                for (let f in this.fields) {
                    if (typeof readonly == "boolean") {
                        if (readonly) {
                            this.fields[f].readonly()
                        }
                    } else {
                        readonly = readonly || {}
                        console.log(readonly)
                        if (readonly[f]) {
                            this.fields[f].readonly()
                        }
                    }
                }
                this.events.emit("readonly")
            }
            public fields: {
                [K in keyof TModel]?: Field<TModel[K]>
            }
            public definition: FormDefinition<TModel>
        }
    }
}


export interface FieldConstructor<T = any> {
    new(option: {
        name: string
        displayName: string
    }): Field<T>
}
export interface Field<T = any> extends Leaf.Widget {
    name: string
    displayName: string
    // get value dont' validate
    getValue(): T
    setValue(T)
    setMeta?(any)
    validate?(v: T)
    readonly?()
}


export interface FormDefinition<TModel> {
    fields: {
        [K in keyof TModel]?: string
    },
    types?: {
        [K in keyof TModel]?: string
    }
    optional?: {
        [K in keyof TModel]?: boolean | { (currentValue: TModel): boolean }
    } | boolean
    metas?: {
        [K in keyof TModel]?: any
    }
    available?: {
        [K in keyof TModel]?: (currentValue: TModel) => boolean
    }
    validates?: {
        [K in keyof TModel]?: (value: TModel[K], all: TModel) => void
    }
    computes?: {
        [K in keyof TModel]?: (value: TModel) => TModel[K]
    }
    // get some custom values somewhere
    process?: (value: TModel, formWidget: Leaf.Widget) => TModel
    data?: TModel
    readonly?: {
        [K in keyof TModel]?: boolean
    } | boolean
}