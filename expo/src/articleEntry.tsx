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
export class ArticleEntry extends Widget {
    constructor(public readonly article: Article) {
        super()
        this.compose(() => {
            return <TouchableWithoutFeedback
                onPress={() => {
                    let ad = new ArticleDisplayer(this.article)
                    ad.asPopup.show()
                }}
            >
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}>
                    {
                        this.article.image && <Image
                            source={this.article.image}
                            style={{
                                width: 80,
                                height: 80,
                            }}
                            resizeMode="cover"
                        />
                    }
                    <View style={{
                        flex: 1
                    }}>
                        <View
                            style={{
                                marginLeft: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingRight: 20
                                }}
                            >{this.article.title.slice(0, 32)}</Text>
                        </View>
                        <View
                            style={{
                                margin: 10,
                                marginTop: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: "#aaa",
                                    fontSize: 12,
                                }}
                            >{this.article.content.slice(0, 16) + "...."}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between"
                        }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#ddd"
                                }}
                            >{this.article.author}</Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#ddd"
                                }}
                            >{this.article.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        })
    }
}
