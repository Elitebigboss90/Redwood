import * as React from "react"
import * as Leaf from "leaf-ts"
export interface Constructor<T> {
    new(...params: any[]): T
}
export class Widget {
    state = {}
    instance: React.Component
    setState(v) {
        this.state = { ...this.state, ...v }
        if (this.instance) {
            this.instance.setState(v)
        }
    }
    compose<T = this["state"]>(fn: (state?: T) => (JSX.Element | JSX.Element[])) {
        let self = this
        this.Component = class Base extends React.Component {
            constructor(props) {
                super(props)
                this.state = self.state
                self.instance = this
            }
            render() {
                return fn(this.state as T)
            }
        }
    }
    events = new Leaf.EventEmitter()
    Component: Constructor<React.Component> = class extends React.Component {
        render() {
            return null
        }
    }
    render() {
        let rv = this.state["$rv"] || 0
        this.setState({
            $rv: rv + 1
        })
    }
}

export class List<TItem extends Widget> extends Widget {
    constructor() {
        super()
        this.compose(() => {
            return this.items.map((item, index) => React.createElement(item.Component, { key: this.keyFn(item, index) }))
        })
    }
    keyFn = (item: TItem, index: number) => index
    items: TItem[] = []
    add(item: TItem) {
        this.items.push(item)
        this.setState({
            items: this.items
        })
    }
    clear() {
        for (let item of this.items) {
            item.events.stopListenBy(this)
        }
        this.items.length = 0
        this.setState({
            items: this.items
        })
    }
}
export class Scene extends Widget {
    constructor(public readonly name: string) {
        super()
    }
}
