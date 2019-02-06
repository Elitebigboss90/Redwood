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

export class BigButton extends React.Component<{
    color: string
    text: string
    callback: Function
    bgColor?: string
}> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={{

            }}
                onPress={() => {
                    return this.props.callback()
                }}
            >
                <View style={{
                    borderColor: this.props.color,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    width: "95%",
                    backgroundColor: this.props.bgColor || "white",
                    margin: 10
                }}>
                    <Text style={{
                        color: this.props.color,
                        fontSize: 18
                    }}
                    >{this.props.text}</Text>
                </View>

            </TouchableOpacity>

        )
    }
}
