import * as React from "react"
import { View } from "react-native"
import { Config } from "../Config"

export class Separator extends React.Component {
    private static defaultProps = {
        style: {},
        horizontal: false,
    }
    props: {
        style?: any,
        horizontal?: number,
    }

    render() {
        return (
            <View
                style={{
                    marginHorizontal: Config.horizontal,
                    backgroundColor: Config.backgroundColor,
                    height: 0.5,
                    ...this.props.style,
                }} >
            </View>
        )
    }
}

export class SpaceSeparator extends React.Component {
    private static defaultProps = { style: {} }
    props: { style?: any }
    render() {
        return (
            <View
                style={{
                    backgroundColor: Config.backgroundColor,
                    height: 10,
                    ...this.props.style
                }} >
            </View>
        )
    }
}