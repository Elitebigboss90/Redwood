import * as React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { PopupBehavior } from "./popupManager"
import { App } from "./app"
import { Icon } from "./icon"
import { Widget } from "./base/widget"
import * as Resource from "./resource"
export class Header extends Widget {
    constructor(public readonly title: string, public asPopup: PopupBehavior = null) {
        super()
        this.setState({ title })
        this.compose((state) => {
            return (
                <View style={styles.header}>
                    {!!this.asPopup &&
                        <View style={{
                            position: "absolute",
                            left: 10,
                            bottom: 13,
                            zIndex: 200
                        }}>
                            <TouchableOpacity style={{
                            }}
                                onPress={() => {
                                    this.asPopup.hide()
                                }}
                            >
                                <Icon
                                    src={Resource.Image.Icon.whiteLeft}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>

                    }

                    <Image
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            backgroundColor: "#d84a39"
                        }}
                        source={require('../resource/image/bg.png')}
                        resizeMode="cover"
                    >
                    </Image>
                    <Text
                        style={{
                            position: "absolute",
                            bottom: 13,
                            left: 0,
                            width: "100%",
                            textAlign: "center",
                            fontSize: 18,
                            color: "white"
                        }}
                    > {this.title}</Text>
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
        width: "100%",
        height: HeaderHeight,
        top: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",
    }
});

