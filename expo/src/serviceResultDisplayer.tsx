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
import { SwipableTab } from './swipableTab';

export class ServiceResultDisplayer extends Widget {
    state: {
        keyword?: string
        subType?: string
    } = { subType: "所有" }
    loadCount = 10
    tabs = new SwipableTab(Config.ServiceSubTypes)
    setQuery(keyword: string) {
        this.setState({
            keyword
        })
        this.applyQuery()
    }
    applyQuery() {
        this.endless.clear()
        this.endless.setLoader((callback) => {
            let result = []
            setTimeout(() => {
                for (let i = 0; i < this.loadCount; i++) {
                    let article: Article = {
                        time: "一个小时前",
                        content: "我是很长很长的内容讲道理",
                        title: `[${this.state.subType}]北京至全国活鱼云流AAAA企业免费取货优惠中`,
                        image: Resource.Image.example,
                        author: "红木坊"

                    }
                    result.push(new ArticleEntry(article))
                }
                callback(null, result)
            }, 200)
        })
        this.more()
    }
    constructor() {
        super()
        this.tabs.events.listenBy(this, "trigger", (tab) => {
            this.setState({
                subType: tab.name
            })
            this.applyQuery()
        })
        this.compose(() => {
            return (<View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }} >
                <View></View>
                <this.tabs.Component />
                <ScrollView style={{
                    width: "100%",
                    flex: 1
                }}>
                    <this.endless.Component />
                </ScrollView>
            </View >)
        })
    }
    more() {
        this.endless.more()
    }
    endless = new EndlessSearchResult()
}
