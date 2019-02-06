import * as React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    RefreshControl,
    TextProperties,
    TextInputProperties,
    ActivityIndicatorProperties,
    ActivityIndicator,
    StatusBarProperties,
    StatusBar,
    ImagePropertiesSourceOptions,
    Platform,
    RefreshControlProperties
} from "react-native"
import { Config } from "../Config"

/**
 * provide button with kinds of type, like plain text, image, image with text, custom and so on.
 */
export class CustomButton extends React.Component {
    private static defaultProps = {
        type: "text",
        style: {},
        imageStyle: {},
        textStyle: {},
        round: false,
    }
    props: {
        style?: any,
        imageStyle?: any,
        textStyle?: any,
        round?: boolean,
        type?: "text" | "image" | "image-text" | "image|text" | "text|image" | "custom"
        text?: string,
        image?: ImagePropertiesSourceOptions,
        custom?: JSX.Element
        onPress?: () => void,
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { style, imageStyle, textStyle, round, type, text, custom, image, onPress } = this.props
        let container: JSX.Element = undefined
        if (type === "text") {
            container = <TextContainer style={textStyle} text={text} />
        } else if (type === "image") {
            container = <ImageContainer style={imageStyle} image={image} />
        } else if (type === "custom") {
            container = custom
        }
        return (
            <TouchableOpacity onPress={onPress} >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: round ? style.height / 2 : style.borderRadius,
                        ...style,
                    }} >
                    {container}
                </View>
            </TouchableOpacity>
        )
    }
}

// class Touchable
/**
 * text component in container, like custom button
 */
class TextContainer extends React.Component {
    static defaultProps = { style: {} }
    props: { style?: any, text?: string }
    render() {
        const { style, text } = this.props
        return (
            <Text style={{ fontSize: 16, color: Config.textColor, ...style }}>{text}</Text>
        )
    }
}

/**
 * image component in container, like custom button
 */
class ImageContainer extends React.Component {
    static defaultProps = { style: {} }
    props: {
        style?: any,
        image: ImagePropertiesSourceOptions,
    }
    render() {
        const { style, image } = this.props
        return (
            <Image style={{ ...style }} resizeMode={"center"} source={image} />
        )
    }
}

export class CustomText extends React.Component<TextProperties> {
    props: {
        style?: any,
        children?: any,
        type?: "normal" | "small" | "highlight"
    }
    render() {
        const props = this.props
        let fontSize: number
        let color: string
        switch (props.type) {
            case "normal":
                fontSize = 14; color = Config.textColor
                break
            case "small":
                fontSize = 12; color = Config.grayColor
                break
            case "highlight":
                fontSize = 16; color = Config.styleColor
        }
        return (
            <Text
                {...this.props}
                style={[{ fontSize: fontSize, color: color }, props.style]} >
                {props.children}
            </Text>
        )
    }
}

export class CustomTextInput extends React.Component<TextInputProperties> {
    // private _text: string = null
    private textInput: React.Component
    state: { text?: string }

    constructor(props) {
        super(props)
        this.state = { text: props.value || props.defaultValue || null }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return Platform.OS !== "ios" || this.props.value === nextProps.value
    }
    get text(): string {
        return this.state.text
    }
    focus() {
        this.textInput.focus()
    }
    blur() {
        this.textInput.blur()
    }
    render() {
        const props = this.props
        let androidProps = Platform.OS == "android" && {
            onChangeText: (text) => this.setState({ text: text }),
            value: this.state.text
        }
        return (
            <TextInput
                ref={(ref) => this.textInput = ref}
                underlineColorAndroid={"transparent"}
                selectionColor={Config.styleColor}
                placeholderTextColor={Config.grayColor}
                clearButtonMode={"while-editing"}
                keyboardType={"default"}
                onEndEditing={(e) => {
                    const { text } = e.nativeEvent
                    this.setState({ text: text })
                }}
                {...androidProps}
                {...props}
                style={[{ fontSize: 16 }, props.style]} >
                {props.children}
            </TextInput>
        )
    }
}

export class CustomIndicator extends React.Component<ActivityIndicatorProperties> {
    render() {
        const props = this.props
        return (
            <ActivityIndicator
                color={Config.styleColor}
                {...props} >
                {props.children}
            </ActivityIndicator>
        )
    }
}

export class CustomRefreshControl extends React.Component<RefreshControlProperties> {
    render() {
        const props = this.props
        return (
            <RefreshControl
                tintColor={Config.styleColor}
                progressBackgroundColor={Config.styleColor}
                enabled={true}
                {...props}>
                {props.children}
            </RefreshControl>
        )
    }
}

export class CustomStatusBar extends React.Component<StatusBarProperties> {
    render() {
        const props = this.props
        return (
            <StatusBar
                barStyle={"dark-content"} // "default" | "light-content" | "dark-content"
                backgroundColor={"rgba(0,0,0,0.5)"}
                translucent={true}
                {...props} >
                {props.children}
            </StatusBar>
        )
    }
}
