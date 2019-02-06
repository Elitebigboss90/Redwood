import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';
import { App } from "./app"
import { Logo } from "./logo"
import { Widget } from "./base/widget"
import { PopupBehavior } from "./popupManager"
export class Authenticator extends Widget {
    constructor() {
        super()
        this.compose((state) => {
            return (
                <View style={styles.container}>
                    <Logo />
                    <TextInput
                        style={styles.input}
                        placeholder="请输入手机号"
                        underlineColorAndroid="#f4f4f4"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        underlineColorAndroid="#f4f4f4"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.asPopup.hide()
                            App.root.goto("home")
                        }}
                        style={styles.primaryButton}
                    >
                        <Text
                            style={styles.primaryButtonText}
                        >登录</Text>
                    </TouchableOpacity>
                </ View >
            );
        })
    }
    asPopup = new PopupBehavior(this)
}
const CommonWidth = "80%"
const CommonMargin = 50
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0
    },
    input: {
        height: 40,
        width: CommonWidth,
        backgroundColor: "#f4f4f4",
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: CommonMargin,
        paddingRight: 20,
        borderBottomWidth: 0,
        color: "#bababa"
    },
    primaryButton: {
        width: CommonWidth,
        height: 40,
        marginTop: CommonMargin,
        backgroundColor: "#af1d1f",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    primaryButtonText: {
        color: "white",
    }
});
