import * as React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { App } from "./app"
import { Widget } from "./base/widget"
import { Icon } from "./icon"
export class PopupHeader extends Widget {
    constructor(public readonly title: string) {
        super()
        this.setState({ title })
        this.compose((state) => {
            return (
                <View style={styles.header}>
                    <Text
                        style={{
                            position: "absolute",
                            bottom: 13,
                            left: 0,
                            width: "100%",
                            textAlign: "center",
                            fontSize: 18,
                            color: "black"
                        }}
                    > {this.title}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            App.root.popupManager.pop()
                        }}
                        style={{
                            position: "absolute",
                            left: 20,
                            bottom: 13,
                        }}
                    >
                        <Icon
                            src={require("../resource/image/icon@3x/icon-left.png")}
                            size={24}
                        />
                    </TouchableOpacity>
                </View >
            );
        })
    }
}
const CommonWidth = "80%"
const CommonMargin = 50
const HeaderHeight = 70
const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        zIndex: 100,
        width: "100%",
        height: HeaderHeight,
        top: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",
        shadowOffset: {
            width: 0,
            height: 0.2
        },
        shadowOpacity: 0.1,
        shadowColor: "black",
    }
});

