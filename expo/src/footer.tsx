import * as React from 'react'
import { Icon } from "./icon"
import { TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { App } from "./app"
import { Widget } from "./base/widget"
export class Footer extends Widget {
    homeTab = new TabItem("首页"
        , require("../resource/image/icon@3x/icon-mall-pre.png")
        , require("../resource/image/icon@3x/icon-mall.png"))
    cartTab = new TabItem("购物车"
        , require("../resource/image/icon@3x/icon-shopping-cart-pre.png")
        , require("../resource/image/icon@3x/icon-shopping-cart.png"))
    mineTab = new TabItem("我的"
        , require("../resource/image/icon@3x/icon-user-pre.png")
        , require("../resource/image/icon@3x/icon-user.png"),
    )
    tabs = [this.homeTab, this.cartTab, this.mineTab]
    constructor() {
        super()
        this.compose((state) => {
            return (
                <View style={styles.footer}>
                    <this.homeTab.Component />
                    <this.cartTab.Component />
                    <this.mineTab.Component />
                </View >
            );
        })
        this.tabs.forEach((item) => {
            item.events.listenBy(this, "trigger", () => {
                this.goto(item)
            })
        })
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
    footer: {
        shadowOffset: {
            width: 0,
            height: -0.2
        },
        shadowOpacity: 0.1,
        shadowColor: "black",
        width: "100%",
        height: FooterHeight,
        top: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
    }
});


export class TabItem extends Widget {
    constructor(public readonly name: string, public readonly src: any, public readonly srcBlur) {
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
                        }}>
                        <Icon
                            src={this.state.active && this.src || this.srcBlur}
                            size={24}
                        />
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
