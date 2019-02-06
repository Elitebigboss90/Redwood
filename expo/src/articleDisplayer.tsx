import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from './authenticator';
import { Widget, List } from "./base/widget"
import { PopupBehavior } from "./popupManager"
import { Article, ArticleView } from "./article"
import { PopupHeader } from "./popupHeader"
const CommonMargin = 20
export class ArticleDisplayer extends Widget {
    asPopup = new PopupBehavior(this)
    articleView = new ArticleView(this.article)
    header = new PopupHeader(this.article.title.slice(0, 16))
    constructor(public readonly article: Article) {
        super()
        this.compose(() => {
            return (<View
                style={{
                    padding: 0,
                    position: "absolute",
                    backgroundColor: "white",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}>
                <this.header.Component />
                <this.articleView.Component />
            </View >)
        })
    }
}

