import * as React from "react"
interface Constructor<T> {
    new(...params: any[]): T
}
export abstract class Widget {
    abstract component(bc: Constructor<React.Component>): Constructor<React.Component>
    setState() {
    }
}

