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
import { PopupHeader } from './popupHeader';
import { ReceiverEntry } from './receiverEntry';

const CommonMargin = 15
export class ReceiverSelector extends Widget {
    asPopup = new PopupBehavior(this)
    select(callback: Callback<Model.Receiver>) {
        this.asPopup.show()
        this.events.listenBy(this, "select", (receiver) => {
            callback(null, receiver)
        })
        this.events.listenBy(this, "cancel", (receiver) => {
            callback(new Error("abort"))
        })
    }
    header = new PopupHeader("选择地址")
    receivers = [TestData.receiver]
    constructor(public defaultReceiver: Model.Receiver = null) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                }}>
                    <this.header.Component />
                    {this.receivers.map(rc => new ReceiverEntry(rc, false, () => {
                        this.use(rc)
                    })).map((item, index) => <item.Component key={index} />)}
                </View>
            )
        })
    }
    use(receiver) {
        this.events.emit("select", receiver)
        this.asPopup.hide()
    }
}
