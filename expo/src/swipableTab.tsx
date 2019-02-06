import * as React from 'react'
import { Icon } from "./icon"
import { TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { App } from "./app"
import { Widget, List } from "./base/widget"

export class SwipableTab extends List<TabItem> {
    constructor(public readonly names: string[]) {
        super()
        this.compose((state) => {
            return (
                <View style={styles.tabs}>
                    {this.items.map(item => <item.Component key={item.name} />)}
                </View >
            );
        })
        for (let name of this.names) {
            this.add(new TabItem(name))
        }
        this.items.forEach((item) => {
            item.events.listenBy(this, "trigger", () => {
                this.goto(item)
            })
        })
        this.items[0].activate()
        this.currentTab = this.items[0]
    }
    currentTab: TabItem
    goto(tab: TabItem) {
        if (tab === this.currentTab) return
        if (this.currentTab) {
            this.currentTab.deactivate()
        }
        this.currentTab = tab
        tab.activate()
        this.events.emit("trigger", tab)
    }
}
const CommonWidth = "80%"
const CommonMargin = 50
const FooterHeight = 49
const styles = StyleSheet.create({
    tabs: {
        shadowOffset: {
            width: 0,
            height: 0.2
        },
        backgroundColor: "white",
        shadowOpacity: 0.1,
        shadowColor: "black",
        width: "100%",
        height: 40,
        top: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
    }
});


export class TabItem extends Widget {
    state: {
        active?: boolean
    } = {}
    constructor(public readonly name: string) {
        super()
        this.setState({
            active: false
        })
        this.compose(() => {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    this.events.emit("trigger", this)
                }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottomWidth: this.state.active && 2 || 0,
                            borderBottomColor: "#CA2D30",
                            height: "100%"
                        }}>
                        <Text style={{
                            color: "#999999",
                            fontSize: 12
                        }}>{this.name}</Text>
                    </View>
                </TouchableWithoutFeedback>)
        })
    }
    activate() {
        this.setState({
            active: true
        })
    }
    deactivate() {
        this.setState({
            active: false
        })

    }
}
