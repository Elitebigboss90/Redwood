import * as React from "react"
import { AlertIOS, ActionSheetIOS, Platform, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, KeyboardTypeOptions } from "react-native"
import ActionSheet from "react-native-actionsheet"
import { CustomTextInput } from "./Custom"

export namespace AlertView {
    export class Input extends React.Component {
        static defaultProps = {
            title: "",
            message: "",
            placeholder: "",
            defaultValue: "",
            cancelText: "取消",
            submitText: "确定",
            keyboardType: "default",
            onCancel: () => { },
            onSubmit: () => { },
            onChangeText: () => { },
            borderColor: "#ccc",
            backgroundStyle: {},
            promptContentStyle: {},
            titleStyle: {},
            buttonStyle: {},
            buttonTextStyle: {},
            submitButtonStyle: {},
            submitButtonTextStyle: {},
            cancelButtonStyle: {},
            cancelButtonTextStyle: {},
            inputStyle: {},
        }
        props: {
            title: string,
            message?: string,
            placeholder?: string,
            defaultValue?: string,
            onCancel?: () => void,
            onSubmit?: (text?: string, meta?: any) => void,
            cancelText?: string,
            submitText?: string,
            keyboardType?: KeyboardTypeOptions,
            onChangeText?: (text?: string) => void,
            borderColor?: string,
            backgroundStyle?: any,
            promptContentStyle?: any,
            titleStyle?: any,
            buttonStyle?: any,
            buttonTextStyle?: any,
            submitButtonStyle?: any,
            submitButtonTextStyle?: any,
            cancelButtonStyle?: any,
            cancelButtonTextStyle?: any,
            inputStyle?: any,
        }
        state: {
            visible: boolean,
            text?: string
        }
        private textInput: CustomTextInput
        private meta = {}

        constructor(props) {
            super(props)
            this.state = ({
                visible: false,
                text: null
            })
        }

        show(meta?: any) {
            this.meta = meta
            this.setState({
                visible: true,
                text: null
            })
        }

        // showAndSubmit(onSubmit: (text: string) => void) {
        //     this.setState
        // }
        hide() {
            this.setState({ visible: false })
        }

        private onPress(type: "cancel" | "submit") {
            this.hide()
            switch (type) {
                case "cancel": {
                    this.props.onCancel()
                    break
                }
                case "submit": {
                    this.props.onSubmit(this.textInput.text || null, this.meta)
                    break
                }
            }
        }
        private renderButton(type: "cancel" | "submit") {
            let buttonText: string
            switch (type) {
                case "cancel": {
                    buttonText = this.props.cancelText
                    break
                }
                case "submit": {
                    buttonText = this.props.submitText
                    break
                }
            }
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={() => this.onPress(type)}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            ...this.props.buttonStyle
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: "#007AFF",
                                letterSpacing: -0.4,
                                textAlign: "center",
                                ...this.props.buttonTextStyle
                            }}>
                            {buttonText}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        render() {
            const { visible } = this.state
            let prompt: JSX.Element = undefined
            if (Platform.OS === "ios") {
                if (visible) {
                    AlertIOS.prompt(
                        this.props.title,
                        this.props.message,
                        [
                            {
                                text: this.props.cancelText, onPress: () => {
                                    this.hide()
                                    this.props.onCancel()
                                }
                            },
                            {
                                text: this.props.submitText, onPress: (text) => {
                                    this.hide()
                                    this.props.onSubmit(text, this.meta)
                                }
                            },
                        ],
                        "plain-text",
                        this.props.defaultValue,
                    )
                }
            } else if (Platform.OS === "android") {
                prompt =
                    <Modal
                        transparent={true}
                        animationType={"none"}
                        visible={visible} >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                ...this.props.backgroundStyle
                            }}>
                            <View
                                style={{
                                    alignItems: "center",
                                    width: "75%",
                                    backgroundColor: "white",
                                    borderRadius: 12,
                                    ...this.props.promptContentStyle
                                }}>
                                <Text
                                    style={{
                                        marginVertical: 20,
                                        fontSize: 17,
                                        color: "black",
                                        letterSpacing: -0.4,
                                        textAlign: "center",
                                        ...this.props.titleStyle
                                    }}
                                    numberOfLines={2} >
                                    {this.props.title}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginHorizontal: 20,
                                        paddingHorizontal: 4,
                                        paddingVertical: 3,
                                        borderColor: "rgba(77, 77, 77,0.45)",
                                        borderWidth: 0.5,
                                        backgroundColor: "white",
                                        height: 24,
                                    }}>
                                    <CustomTextInput
                                        style={{
                                            width: "100%",
                                            fontSize: 13,
                                            ...this.props.inputStyle
                                        }}
                                        ref={(ref) => this.textInput = ref}
                                        placeholder={this.props.placeholder}
                                        placeholderTextColor={"#C7C7CD"}
                                        numberOfLines={1}
                                        returnKeyType={"done"}
                                        defaultValue={this.props.defaultValue}
                                        keyboardType={this.props.keyboardType}
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({ text: text })}
                                        value={this.state.text}
                                    // onChangeText={this.props.onChangeText}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderTopWidth: 0.5,
                                        borderTopColor: "rgba(77, 77, 77, 0.25)",
                                        height: 44,
                                        marginTop: 15,
                                        width: "100%"
                                    }}>
                                    {this.renderButton("cancel")}
                                    <View style={{
                                        height: "100%",
                                        width: 0.5,
                                        backgroundColor: "rgba(77, 77, 77, 0.25)",
                                    }} />
                                    {this.renderButton("submit")}
                                </View>
                            </View>
                        </View>
                    </Modal>
            }
            return (
                <View>
                    {prompt}
                </View>
            )
        }
    }


    export class Sheet extends React.Component {
        static defaultProps = {
            backgroundStyle: {},
            // title: "",
            // message: "",
            options: [],
            tintColor: "#007AFF",
            // buttonUnderlayColor: "#F4F4F4",
            cancelText: "取消",
            onPress: () => { },
        }
        props: {
            backgroundStyle?: any,
            title?: string,
            message?: string,
            options: Array<string | JSX.Element>,
            tintColor?: string,
            // buttonUnderlayColor?: string,
            cancelButtonIndex?: number,
            cancelText?: string,
            destructiveButtonIndex?: number,
            onPress?: (buttonIndex: number) => void,
        }
        state: {
            visible: boolean
        }
        private actionSheet: ActionSheet

        constructor(props) {
            super(props)
            this.state = { visible: false }
        }
        show() {
            this.actionSheet.show()
            this.setState({ visible: true })
        }
        hide() {
            this.actionSheet.hide()
            this.setState({ visible: true })
        }
        render() {
            const {
                backgroundStyle,
                title,
                message,
                options,
                tintColor,
                // cancelButtonIndex,
                cancelText,
                destructiveButtonIndex,
                onPress
            } = this.props
            const { visible } = this.state
            let prompt: JSX.Element = <View />
            if (options.length <= 0) return prompt
            if (Platform.OS === "ios") {
                // if (visible) {
                //     let optionsIOS: string[] = typeof options[0] === "string" ? options.map((option) => String(option)) : []
                //     cancelText ? optionsIOS.push(cancelText) : null
                //     ActionSheetIOS.showActionSheetWithOptions(
                //         {
                //             options: optionsIOS,
                //             destructiveButtonIndex: destructiveButtonIndex,
                //             cancelButtonIndex: optionsIOS.length - +(cancelText !== null)
                //         },
                //         (buttonIndex) => onPress(buttonIndex)
                //     )
                // }
            } else if (Platform.OS === "android") {
                // <Modal
                //     transparent={true}
                //     animationType={"none"}
                //     visible={visible} >
                //     <TouchableWithoutFeedback
                //         onPress={() => this.hide()}>
                //         <View
                //             style={{
                //                 flex: 1,
                //                 justifyContent: "flex-end", 
                //                 alignItems: "center",
                //                 backgroundColor: "rgba(0, 0, 0, 0.3)",
                //                 padding: 5,
                //                 ...this.props.backgroundStyle
                //             }}>
                //             <View
                //                 style={{
                //                     alignItems: "center",
                //                     width: "100%",
                //                 }} >

                //             </View>
                //         </View>
                //     </TouchableWithoutFeedback>
                // </Modal>
            }
            return (
                <ActionSheet
                    ref={(ref) => {
                        this.actionSheet = ref
                    }}
                    {...this.props} />
            )
        }
    }
}


