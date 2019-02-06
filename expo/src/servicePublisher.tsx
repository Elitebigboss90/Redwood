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
import { ArticleEditor } from './articleEditor';
import { BigButton } from "./bigButton"
const CommonMargin = 20
export class ServicePublisher extends Widget {
    asPopup = new PopupBehavior(this)
    header = new PopupHeader("发布服务")
    articleEditor = new ArticleEditor()
    constructor() {
        super()
        this.compose(() => {
            return (<View
                style={{
                    backgroundColor: "red",
                    width: "100%",
                    height: "100%",
                    zIndex: 300,
                }
                }>
                <this.header.Component />
                <this.articleEditor.Component />
                <View style={{
                    position: "absolute",
                    bottom: 10,
                    width: "100%"
                }}>
                    <BigButton
                        color="white"
                        text="确认发布"
                        bgColor="#CA2D30 "
                        callback={() => {
                            alert("发布成功")
                            this.asPopup.hide()
                        }}
                    />
                </View>
            </View >)
        })
    }
}

