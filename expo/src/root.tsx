///<reference path="./spec/type.d.ts"/>

import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image } from 'react-native';
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from "./authenticator"
import { PopupManager } from "./popupManager"

import { App } from "./app"
import { Widget } from "./base/widget"
import { TabScene } from "./tabScene"
import { Searcher } from "./searcher"
import { OrderCreator } from "./orderCreator"
import * as TestData from "./testData"
import { APIService } from "./service/apiService"
import { UploadService } from "./service/uploadService"
import { ImagePicker } from "expo"
export class Root extends Widget {
    api = new APIService()
    uploader = new UploadService({
        upload: {
            root: "http://192.168.0.122:25109"
        }
    })
    constructor() {
        super()
        this.currentView = this.tabScene
        this.compose((state) => {
            let Scene = this.currentView.Component
            let PM = this.popupManager.Component
            return (<View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}>
                <Scene />
                <PM />
            </View>);
        })
        setTimeout(() => {
            let p = ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            })
            p.then((result) => {
                if (result.canceld) return
                let file = {
                    uri: result.uri,
                    type: 'image/jpeg',
                    name: 'upload.jpg'
                }
                this.uploader.upload(file, (err, result) => {
                    alert(JSON.stringify([err, result]))
                })

            })
        })
        //let oc = new OrderCreator([TestData.cartItem])
        //oc.asPopup.show()
        //let searcher = new Searcher()
        //let query = {
        //    keyword: "测试看看",
        //    type: "furniture"
        //}
        //searcher.searchBuilder.setQuery(query)
        //searcher.asPopup.show()

        return this
    }
    currentView: Widget
    tabScene = new TabScene()
    popupManager = new PopupManager()
    authenticator = new Authenticator()
    goto(name: string) {
        name = name.toLowerCase()
        if (name === "home") {
            this.currentView = this.tabScene
            this.tabScene.goto("home")
        }
        if (name === "cart") {
            this.currentView = this.tabScene
            this.tabScene.goto("cart")
        }
        if (name === "mine") {
            this.currentView = this.tabScene
            this.tabScene.goto("mine")
        }
    }
}
