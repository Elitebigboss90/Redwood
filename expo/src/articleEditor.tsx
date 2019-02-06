import * as React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image } from 'react-native';
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
import * as TestData from "./testData"
import * as Resource from "./resource"
const CommonMargin = 20
export class ArticleEditor extends Widget {
    constructor(public readonly article: Article = null) {
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
                <TextInput
                    placeholder="标题"
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "#eee"
                    }}
                ></TextInput >
                <TextInput
                    placeholder="我文字内容"
                ></TextInput >
                <View style={{

                    justifyContent: "flex-start"
                }}>
                    <TouchableOpacity style={{

                    }}
                        onPress={() => {
                            alert("暂时不支持图片上传")
                        }}
                    >
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#eee",
                            width: 100,
                            height: 100,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Icon src={Resource.Image.Icon.blackAdd}
                                size={24} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View >)
        })
    }
}

