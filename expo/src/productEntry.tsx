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
import { ProductDisplayer } from './productDisplayer';
import * as TestData from "./testData"

export class ProductEntry extends Widget {
    constructor(public readonly product: Model.SPU) {
        super()
        this.compose(() => {
            return <TouchableWithoutFeedback
                onPress={() => {
                    let pd = new ProductDisplayer(this.product, TestData.seller, TestData.article)
                    pd.asPopup.show()
                }}
            >

                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}>
                    {
                        this.product.thumbs && <Image
                            source={this.product.thumbs as any}
                            style={{
                                width: 60,
                                height: 60,
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
                            >{this.product.name.slice(0, 32)}</Text>
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
                            >{this.product.detail.slice(0, 16) + "...."}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between"
                        }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#CA2D30"
                                }}
                            >¥{(this.product.price / 100).toFixed(2).toString()}</Text>
                        </View>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        })
    }
}
