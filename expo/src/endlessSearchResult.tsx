
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
export class EndlessSearchResult extends List<Widget> {
    constructor() {
        super()
    }
    private loader: Callback<Widget[]>
    private fetcher: (callback: Callback<Widget[]>) => void = null
    setLoader(handler: (callback: Callback<Widget[]>) => void) {
        this.fetcher = handler
    }
    state = {
        isLoading: false
    }
    more() {
        if (this.state.isLoading) return
        this.state.isLoading = true
        this.fetcher((err, items) => {
            this.setState({
                isLoading: false
            })
            if (err || !items) return
            for (let item of items) {
                this.add(item)
            }
        })
    }
}
