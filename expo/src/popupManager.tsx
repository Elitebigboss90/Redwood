import * as Leaf from "leaf-ts"
import * as React from "react"
import { Widget } from "./base/widget"
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, BackHandler } from 'react-native';
export class PopupManager extends Widget {
    static Instance: PopupManager
    constructor() {
        super()
        this.compose(() => {
            if (this.stack.length === 0) return null
            return (<View style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }}>
                {this.stack.map(item => {
                    item.zIndex = 100 + this.stack.length
                    return <item.Component key={item.id} />
                }
                )}
            </View>)
        })
        if (PopupManager.Instance) return PopupManager.Instance
        PopupManager.Instance = this
        BackHandler.addEventListener('hardwareBackPress', () => {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.

            if (this.stack.length > 0) {
                this.pop();
                return true;
            }
            return false;
        });
        return this
    }
    stack: PopupBehavior[] = []
    private update() {
        this.events.emit("refresh")
        this.setState({
            stack: this.stack
        })
    }
    pop() {
        let item = this.stack.pop()
        this.update()
    }
    push(b: PopupBehavior) {
        this.stack.push(b)
        this.update()
    }
    remove(id) {
        this.stack = this.stack.filter(item => id !== item)
        this.update()
    }
    events = new Leaf.EventEmitter<{
        refresh
    }>()
}

export class PopupBehavior extends Widget {
    manager = new PopupManager()
    public readonly id = Math.random()
    public zIndex = 100
    constructor(public readonly widget: Widget) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    zIndex: this.zIndex,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                }}>
                    <this.widget.Component />
                </View>

            )
        })
    }
    show() {
        this.manager.push(this)
    }
    hide() {
        this.widget.events.emit("hide")
        this.manager.remove(this)
    }
}
