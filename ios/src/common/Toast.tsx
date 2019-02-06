import * as React from "react"
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ToastAndroid,
    Platform
} from "react-native"
import RootSiblings from "react-native-root-siblings"

export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
}

export class Toast {
    private static visible: boolean = false
    private static toast: any
    private static timer: NodeJS.Timer
    public static props: {
        style?: any,
        textContainerStyle?: any,
        textStyle?: any,
        opacity?: number,
        position?: "top" | "center" | "bottom",
        bottom?: number,
        fadeInDurationMS?: number,
        fadeOutDurationMS?: number,
        defaultCloseDelay?: number,
    } = {
            style: {},
            textContainerStyle: {},
            textStyle: {},
            opacity: 1,
            position: "bottom",
            bottom: 50,
            fadeInDurationMS: 500,
            fadeOutDurationMS: 500,
            defaultCloseDelay: 250
        }
    private static opacityValue: Animated.Value = new Animated.Value(Toast.props.opacity)
    private static text: string = ""
    private static duration: number = 0
    private static callback: () => void = () => { }

    private constructor() { }

    private static renderToast() {
        const { height } = Dimensions.get("window")
        let bottom
        switch (this.props.position) {
            case "top":
                bottom = height - this.props.bottom
                break
            case "center":
                bottom = height / 2
                break
            case "bottom":
                bottom = this.props.bottom
                break
        }

        let prompt: JSX.Element = <View />
        prompt = this.visible &&
            <View
                style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: bottom,
                    elevation: 999,
                    alignItems: "center",
                    zIndex: 10000,
                    ...this.props.style
                }}
                pointerEvents="none" >
                <Animated.View
                    style={{
                        backgroundColor: "black",
                        borderRadius: 8,
                        padding: 10,
                        opacity: this.opacityValue,
                        ...this.props.textContainerStyle,
                    }} >
                    {React.isValidElement(this.text) ?
                        this.text :
                        <Text
                            style={{
                                color: "white",
                                fontSize: 17,
                                ...this.props.textStyle
                            }}>
                            {this.text}
                        </Text>}
                </Animated.View>
            </View>
        return prompt
    }

    static show(text?: string, duration?: number, callback?: () => void) {
        this.duration = duration ? duration : DURATION.LENGTH_SHORT
        this.callback = callback
        this.visible = true
        this.text = text

        if (this.toast) {
            this.toast.update(this.renderToast())
        } else {
            this.visible = true
            this.toast = new RootSiblings(this.renderToast())
        }
        Animated.timing(
            this.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDurationMS,
            }
        ).start(() => {
            this.visible = true
            if (duration !== DURATION.FOREVER) this.hide()
        })
    }

    static hide(duration?: number) {
        if (!this.visible) return
        let delay = duration ? duration : this.duration
        if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay

        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            Animated.timing(
                this.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDurationMS,
                }
            ).start(() => {
                this.visible = false
                this.callback ? this.callback() : null
            })
        }, delay)
    }
}


// export class Toast extends React.Component {
//     static defaultProps = {
//         style: {},
//         textContainerStyle: {},
//         textStyle: {},
//         position: "bottom",
//         bottom: 50,
//         opacity: 1,
//         fadeInDurationMS: 500,
//         fadeOutDurationMS: 500,
//         defaultCloseDelay: 250,
//     }
//     props: {
//         style?: any,
//         textContainerStyle?: any,
//         textStyle?: any,
//         opacity?: number,
//         position?: "top" | "center" | "bottom",
//         bottom?: number,
//         fadeInDurationMS?: number,
//         fadeOutDurationMS?: number,
//         defaultCloseDelay?: number,
//     }
//     state: {
//         isShow?: boolean,
//         text?: string | React.ReactElement<Text>,
//         opacityValue?: Animated.Value,
//     }
//     private timer: NodeJS.Timer
//     private isShow: boolean = false
//     private duration: number = 0
//     private callback: () => void = () => { }

//     constructor(props) {
//         super(props)
//         this.state = {
//             isShow: false,
//             text: "",
//             opacityValue: new Animated.Value(this.props.opacity),
//         }
//     }

//     componentWillUnmount() {
//         this.timer && clearTimeout(this.timer)
//     }

//     show(text?: string, duration?: number, callback?: () => void) {
//         this.duration = duration ? duration : DURATION.LENGTH_SHORT
//         // if (Platform.OS === "android") {
//         //     ToastAndroid.show(text, this.duration)
//         //     return
//         // }
//         this.callback = callback
//         this.setState({
//             isShow: true,
//             text: text,
//         })

//         Animated.timing(
//             this.state.opacityValue,
//             {
//                 toValue: this.props.opacity,
//                 duration: this.props.fadeInDurationMS,
//             }
//         ).start(() => {
//             this.isShow = true
//             if (duration !== DURATION.FOREVER) this.close()
//         })
//     }

//     close(duration?: number) {
//         let delay = duration ? duration : this.duration
//         if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay

//         if (!this.isShow && !this.state.isShow) return
//         this.timer && clearTimeout(this.timer)
//         this.timer = setTimeout(() => {
//             Animated.timing(
//                 this.state.opacityValue,
//                 {
//                     toValue: 0.0,
//                     duration: this.props.fadeOutDurationMS,
//                 }
//             ).start(() => {
//                 this.setState({
//                     isShow: false,
//                 })
//                 this.isShow = false
//                 this.callback ? this.callback() : null
//             })
//         }, delay)
//     }

//     render() {
//         const { isShow, opacityValue, text } = this.state
//         const { height } = Dimensions.get("window")
//         let bottom
//         switch (this.props.position) {
//             case "top":
//                 bottom = height - this.props.bottom
//                 break
//             case "center":
//                 bottom = height / 2
//                 break
//             case "bottom":
//                 bottom = this.props.bottom
//                 break
//         }

//         let prompt: JSX.Element = <View />
//         prompt = isShow &&
//             <View
//                 style={{
//                     position: "absolute",
//                     left: 20,
//                     right: 20,
//                     bottom: bottom,
//                     elevation: 999,
//                     alignItems: "center",
//                     zIndex: 10000,
//                     ...this.props.style
//                 }}
//                 pointerEvents="none" >
//                 <Animated.View
//                     style={{
//                         backgroundColor: "black",
//                         borderRadius: 8,
//                         padding: 10,
//                         opacity: this.state.opacityValue,
//                         ...this.props.textContainerStyle,
//                     }} >
//                     {React.isValidElement(text) ?
//                         text :
//                         <Text
//                             style={{
//                                 color: "white",
//                                 fontSize: 17,
//                                 ...this.props.textStyle
//                             }}>
//                             {text}
//                         </Text>}
//                 </Animated.View>
//             </View>
//         return prompt
//     }
// }

