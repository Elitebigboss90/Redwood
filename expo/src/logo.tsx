import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';
import { App } from "./app"

export class Logo extends React.Component<{
    style?: any
}, {}> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Image
                style={{
                    ...this.props.style || {}
                }}
                source={require('../resource/image/logo.png')}
            />
        )
    }
}
