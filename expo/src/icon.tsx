import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
export type IconOption = {
    name: string
    value: any
}
export class Icon extends React.Component<{
    src: any,
    size: number
    style?: any
}, {
        src: any,
        size: number
        style?: any
    }> {
    constructor(props) {
        super(props)
        this.state = { ...props }
    }
    render() {
        let src = this.props.src
        let style = this.props.style || {}
        let size = this.props.size
        return (
            <Image
                source={src}
                style={{ ...style, width: size, height: size, resizeMode: "center" }}
            />
        );
    }
}
const styles = StyleSheet.create({
});
