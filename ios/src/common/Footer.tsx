import * as React from "react"
import { View, Text, Image, Dimensions, ViewProperties } from "react-native"
import { CustomButton } from "./Custom"
import { Config } from "../Config"

export class Footer extends React.Component<ViewProperties> {
    static defaultProps = {
        style: {},
        children: null
    }
    props: {
        style?: any,
        children?: any
    }
    render() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    ...this.props.style
                }} >
                {this.props.children}
            </View>
        )
    }
}


export class FooterButton extends React.Component {
    static defaultProps = {
        style: {},
        buttonStyle: {},
        textStyle: {},
        text: null,
        onPress: () => {}
    }
    props: {
        style?: any,
        buttonStyle?: any,
        textStyle?: any,
        text?: string,
        onPress?: () => void
    }
    render() {
        return (
            <Footer
                style={{ ...this.props.style }} >
                <CustomButton
                    style={{
                        backgroundColor: Config.styleColor,
                        borderRadius: 4,
                        height: 36,
                        width: Dimensions.get("window").width - Config.horizontal * 2,
                        ...this.props.buttonStyle
                    }}
                    textStyle={{ color: "white", ...this.props.textStyle }}
                    text={this.props.text || "确定"}
                    onPress={this.props.onPress} />
            </Footer>
        )
    }
}
