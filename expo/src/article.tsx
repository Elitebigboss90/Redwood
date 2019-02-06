import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from './authenticator';
import { Widget, List } from "./base/widget"
import { PopupBehavior } from "./popupManager"
const CommonMargin = 20
export class ArticleView extends Widget {
    constructor(article: Article) {
        super()
        this.compose(() => {
            return (<ScrollView
                style={{
                    padding: 0
                }}
            >
                <View>
                    <Text
                        style={{
                            color: "#333333",
                            margin: CommonMargin,
                            fontSize: 18
                        }}
                    >{article.title}</Text>
                </View>
                {article.image && <Image
                    source={article.image}
                    style={{
                        height: 260,
                        width: "100%",
                        padding: CommonMargin
                    }}
                    resizeMode="contain"
                />}
                <View>
                    <Text style={{
                        color: "#666",
                        margin: CommonMargin
                    }}>
                        {article.content}
                    </Text>
                </View>
            </ScrollView >)
        })
    }
}
export interface Article {
    title: string
    content: string
    image?: any
    time?: string
    author?: string
}
