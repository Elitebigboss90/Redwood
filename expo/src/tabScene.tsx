import * as React from 'react';
import { App } from "./app"
import { Widget } from "./base/widget"
import { Header } from "./header"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { NewsList } from "./newsList"
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { Home } from "./home"
import { Cart } from "./cart"
import { Footer } from "./footer"
import { Settings } from './settings';
export class TabScene extends Widget {
    home = new Home()
    cart = new Cart()
    settings = new Settings()
    footer = new Footer()
    constructor() {
        super()
        this.setState({
            view: this.settings
        })
        this.footer.goto(this.footer.mineTab)
        this.compose((state) => {
            return (<View
                style={styles.container}
            >
                <state.view.Component />
                <this.footer.Component />
            </View>)
        })
        this.footer.events.listenBy(this, "trigger", (tab) => {
            if (tab === this.footer.homeTab) {
                this.goto("home")
            }
            if (tab === this.footer.cartTab) {
                this.goto("cart")
            }
            if (tab === this.footer.mineTab) {
                this.goto("mine")
            }
        })
    }
    goto(name: "home" | "cart" | "mine") {
        if (name === "home") {
            this.setState({ view: this.home })
        } else if (name === "cart") {
            this.setState({ view: this.cart })
        } else if (name === "mine") {
            this.setState({ view: this.settings })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: "hidden"
    },
})
