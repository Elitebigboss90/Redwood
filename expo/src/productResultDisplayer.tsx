import * as React from 'react';
import { App } from "./app"
import { Widget, List } from "./base/widget"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { GlobalSearchBuilder } from "./globalSearchBuilder"
import { NewsList } from "./newsList"
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { PopupBehavior } from "./popupManager"
import * as Config from "./config"
import * as Resource from "./resource"
import { Article } from "./article"
import { ArticleDisplayer } from "./articleDisplayer"
import { EndlessSearchResult } from "./endlessSearchResult"
import { ArticleEntry } from "./articleEntry"
import { SwipableTab } from './swipableTab'
import { ProductEntry } from "./productEntry"
import * as TestData from "./testData"

export class ProductResultDisplayer extends Widget {
    state: {
        keyword?: string
        subType?: string
    } = { subType: "所有" }
    loadCount = 10
    setQuery(keyword: string) {
        this.setState({
            keyword
        })
        this.applyQuery()
    }
    setSubType(subType: string) {
        this.setState({
            subType
        })
    }
    applyQuery() {
        this.endless.clear()
        this.endless.setLoader((callback) => {
            let result = []
            setTimeout(() => {
                for (let i = 0; i < this.loadCount; i++) {
                    let spu: Model.SPU = TestData.spu
                    result.push(new ProductEntry(spu))
                }
                callback(null, result)
            }, 200)
        })
        this.more()
    }
    constructor() {
        super()
        this.compose(() => {
            return (<View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }} >
                <View></View>
                <ScrollView style={{
                    width: "100%",
                    flex: 1
                }}>
                    <this.endless.Component />
                </ScrollView>
            </View >)
        })
        this.applyQuery()
    }
    more() {
        this.endless.more()
    }
    endless = new EndlessSearchResult()
}
