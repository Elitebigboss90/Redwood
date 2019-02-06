import * as React from "react"
import { View, Text, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { Config } from "../Config"
import { Icon, ArrowLeft, NavigatorBackIcon } from "./Icon"
import { Constants } from "expo"

export class NavigatorBackButton extends React.Component {
    static defaultProps = {
        style: {},
        imageStyle: {},
        titleStyle: {},
        tintColor: Config.headerTintColor,
        renderBackImage: () => null,
        renderBackTitle: () => null,
        onPress: () => { }
    }
    props: {
        style?: any,
        imageStyle?: any,
        titleStyle?: any,
        title?: string,
        tintColor?: string,
        renderBackImage?: () => React.ReactElement<Image>
        renderBackTitle?: () => React.ReactElement<Text>
        onPress?: () => void
    }

    private renderImage() {
        const { imageStyle, renderBackImage, tintColor } = this.props
        const backImage = renderBackImage()
        return (
            backImage ?
                backImage :
                <Icon
                    style={{
                        marginVertical: 8,
                        tintColor: tintColor,
                        ...imageStyle
                    }}
                    icon={NavigatorBackIcon} />
        )
    }

    private renderTitle() {
        const { titleStyle, title, renderBackTitle, tintColor } = this.props
        const backTitle = renderBackTitle()
        let titleNode: JSX.Element
        if (!title && !backTitle) {
            return null
        }
        return (
            backTitle ?
                backTitle :
                <Text
                    style={{
                        fontSize: 16,
                        color: tintColor,
                        marginLeft: 3,
                        ...titleStyle
                    }} >
                    {title}
                </Text>
        )
    }

    render() {
        const { style, title, onPress } = this.props
        return (
            <TouchableOpacity
                onPress={() => onPress()}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 10,
                        paddingRight: 10,
                        ...style
                    }}>
                    {this.renderImage()}
                    {this.renderTitle()}
                </View>
            </TouchableOpacity>
        )
    }
}

export class Navigator extends React.Component {
    static defaultProps = {
        title: null,
        titleView: null,
        leftTitle: null,
        leftIcon: null,
        leftView: null,
        rightTitle: null,
        rightIcon: null,
        style: {},
        contentStyle: {},
        titleTextStyle: {},
        titleStyle: {},
        rightTextStyle: {},
        rightIconStyle: {},
        backgroundIcon: null,
        tintColor: Config.headerTintColor,
        onPressLeft: () => { },
        onPressRight: () => { },
    }
    props: {
        title?: string,
        titleView?: JSX.Element,
        leftTitle?: string,
        leftIcon?: any,
        leftView?: JSX.Element,
        rightTitle?: string,
        rightIcon?: any,
        style?: any,
        contentStyle?: any,
        titleTextStyle?: any,
        titleStyle?: any,
        rightTextStyle?: any,
        rightIconStyle?: any,
        backgroundIcon?: any,
        tintColor?: string,
        onPressLeft?: () => void,
        onPressRight?: () => void,
    }
    private renderLeft() {
        const { leftTitle, leftIcon } = this.props
        let leftNode: JSX.Element = null
        if (leftTitle) {
            leftNode = <Text style={{ fontSize: 16, color: this.props.tintColor || "black", ...this.props.rightTextStyle }} >{leftTitle}</Text>
        } else {
            leftNode = <Icon style={{ width: 12, height: 21, tintColor: this.props.tintColor, ...this.props.rightIconStyle }} icon={NavigatorBackIcon} />
        }
        return leftNode
    }
    private renderTitle() {
        const { title, titleView } = this.props
        let titleNode: JSX.Element = null
        if (title) {
            titleNode = <Text style={{ fontSize: 18, color: this.props.tintColor || "black", ...this.props.titleTextStyle }} >{title}</Text>
        } else if (titleView) {
            titleNode = titleView
        }
        return titleNode
    }
    private renderRight() {
        const { rightTitle, rightIcon } = this.props
        let rightNode: JSX.Element = null
        if (rightTitle) {
            rightNode = <Text style={{ fontSize: 16, color: this.props.tintColor || "black", textAlign: "right", ...this.props.rightTextStyle }} >{rightTitle}</Text>
        } else if (rightIcon) {
            rightNode = <Image style={{ width: 30, height: 30, tintColor: this.props.tintColor, ...this.props.rightIconStyle }} source={rightIcon} />
        }
        return rightNode
    }
    render() {
        const defaultHeight = 44
        const statusBarHeight = Constants.statusBarHeight
        const navigatorWidth = Dimensions.get("window").width
        return (
            <View style={{ marginTop: statusBarHeight, height: defaultHeight, ...this.props.style }} >
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingTop: statusBarHeight,
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: -statusBarHeight,
                        height: defaultHeight + statusBarHeight,
                        borderBottomWidth: 1,
                        borderColor: "rgba(126,103,96,0.10)",
                        backgroundColor: "white",
                        ...this.props.contentStyle
                    }} >
                    <TouchableOpacity onPress={this.props.onPressLeft} >
                        <View
                            style={{
                                width: navigatorWidth * 0.1,
                                height: defaultHeight * 0.8,
                                justifyContent: "center",
                                // backgroundColor: "red",
                            }} >
                            {this.renderLeft()}
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10, marginVertical: 5, flex: 1, ...this.props.titleStyle }} >
                        {this.renderTitle()}
                    </View>
                    <TouchableOpacity onPress={this.props.onPressRight} >
                        <View
                            style={{
                                width: navigatorWidth * 0.1,
                                height: defaultHeight * 0.8,
                                justifyContent: "center",
                                // backgroundColor: "red",
                            }} >
                            {this.renderRight()}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
