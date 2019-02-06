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

export class JobResultDisplayer extends Widget {
    state: {
        keyword?: string
        subType?: string
        sellerId?: string
    } = {}
    loadCount = 10
    applyQuery() {
        this.endless.clear()
        this.endless.setLoader((callback) => {
            let result = []
            setTimeout(() => {
                for (let i = 0; i < this.loadCount; i++) {
                    let article: Article = {
                        time: "一个小时前",
                        content: "招聘刷漆工人3000～5000",
                        title: "招聘刷漆工人3000～5000",
                        author: "红木坊"

                    }
                    result.push(new ArticleEntry(article))
                }
                callback(null, result)
            }, 200)
        })
        this.more()
    }
    setQuery(keyword: string) {
        this.setState({
            keyword
        })
        this.applyQuery()
    }
    setSeller(sellerId: string) {
        this.setState({ sellerId })
        this.applyQuery()
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
