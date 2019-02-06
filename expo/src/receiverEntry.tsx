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
import * as TestData from "./testData"
import * as AddressUtil from "./util/address"
import { ReceiverSelector } from "./receiverSelector"


const CommonMargin = 15
export class ReceiverEntry extends Widget {
    constructor(public readonly receiver: Model.Receiver, public readonly allowSelect = false, public readonly interactiveCallback: Function = null) {
        super()
        this.compose(() => {
            return <TouchableWithoutFeedback
                onPress={() => {
                    if (this.interactiveCallback) {
                        this.interactiveCallback()
                        return
                    }
                    if (!this.allowSelect) return
                    let pd = new ReceiverSelector(this.receiver)
                    pd.asPopup.show()
                }}
            >

                <View style={{
                    padding: CommonMargin,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                    backgroundColor: "white",
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            fontSize: 16,
                        }}
                        >收货人: {this.receiver.name}</Text>
                        <Text style={{
                            fontSize: 16
                        }}
                        >{this.receiver.phone}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        paddingTop: CommonMargin
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={{
                                fontSize: 12,
                            }}
                            >收货地址: {AddressUtil.format(this.receiver.addressDistrict) + this.receiver.addressDetail}</Text>
                        </View>
                        <Icon src={Resource.Image.Icon.blackRight} size={20} />
                    </View>
                </View>

            </TouchableWithoutFeedback>
        })
    }
}
