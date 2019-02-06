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
import { EndlessSearchResult } from "./endlessSearchResult"
import { SellerEntry } from "./sellerEntry"
import { SwipableTab } from './swipableTab';

export class SellerResultDisplayer extends Widget {
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
    applyQuery() {
        this.endless.clear()
        this.endless.setLoader((callback) => {
            let result = []
            setTimeout(() => {
                for (let i = 0; i < this.loadCount; i++) {
                    let seller: Model.Seller = {
                        id: null,
                        name: "木头佬",
                        phone: "13037283712",
                        addressDistrict: null,
                        addressDetail: "测试地址很长很长",
                        avatar: Resource.Image.avatar,
                        desc: "10年专业经营红木家具",
                        spuCount: 261,
                        ownerId: null,
                        createAt: null,
                        available: true,
                        state: "pending"

                    }
                    result.push(new SellerEntry(seller))
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
    }
    more() {
        this.endless.more()
    }
    endless = new EndlessSearchResult()
}
