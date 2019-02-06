import * as React from "react"
import { View, Image, Text, TextInput, TouchableOpacity, TextInputProperties } from "react-native"
import { Config } from "../Config"
import { Icon, ArrowDownGray, SearchBarSearch } from "./Icon"
import { CustomTextInput } from "./Custom"
import { States } from "leaf-ts";

interface SearchBarProps extends TextInputProperties {
    style?: any,
    textInputStyle?: any,
    type: string,
    onPressType?: () => void,
    onSubmit?: (text: string) => void,
}

export class SearchBar extends React.Component<SearchBarProps> {
    static defaultProps = {
        style: {},
        textInputStyle: {},
        types: [],
        onPressType: () => { },
    }
    selector: React.Component
    textInput: CustomTextInput
    state: { text?: string }

    constructor(props) {
        super(props)
        this.state = { text: props.value || props.defaultValue || null }
    }
    get text(): string {
        return this.state.text
    }
    private onPressSearchType() {
        this.props.onPressType()
    }
    private onPressSearch(text: string) {
        this.props.onSubmit(text)
    }
    render() {
        const props = this.props
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#E5E5E5",
                    width: "100%",
                    borderRadius: 100,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: Config.horizontal,
                    ...props.style,
                }} >
                <TouchableOpacity
                    onPress={() => this.onPressSearchType()}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                        collapsable={false}
                        ref={(ref) => { this.selector = ref }} >
                        <Text style={{ fontSize: 14, color: Config.textColor }}>{props.type}</Text>
                        <Icon icon={ArrowDownGray} />
                    </View>
                </TouchableOpacity>
                <CustomTextInput
                    ref={(ref) => this.textInput = ref}
                    placeholderTextColor={"#B5B5B5"}
                    clearButtonMode={"while-editing"}
                    numberOfLines={1}
                    returnKeyType={"search"}
                    onSubmitEditing={(e) => this.onPressSearch(e.nativeEvent.text)}
                    onChangeText={(text) => this.setState({ text: text })}
                    value={this.state.text}
                    {...props}
                    style={{ flex: 1, marginLeft: 8, ...props.textInputStyle }} />
                <TouchableOpacity
                    onPress={() => {
                        this.textInput.blur()
                        this.onPressSearch(this.state.text)
                    }}>
                    <Icon icon={SearchBarSearch} />
                </TouchableOpacity>
            </View>
        )
    }
}
