import * as React from "react"
import { View, Text, Image, TouchableWithoutFeedback } from "react-native"
import { Icon, AddGray, SubtractGray } from "./Icon"
import { CustomTextInput } from "./Custom"
import { Config } from "../Config"

export class QuantityAdder extends React.Component {
    static defaultProps = {
        style: {},
        buttonStyle: {},
        textStyle: {},
        editable: false,
        defaultQuantity: 0,
        minQuantity: 0,
        maxQuantity: 1,
        fastCountInterval: 100,
        onCount: () => { }
    }
    props: {
        style?: any,
        buttonStyle?: any,
        textStyle?: any,
        editable?: boolean,
        defaultQuantity?: number,
        minQuantity?: number,
        maxQuantity?: number,
        fastCountInterval?: number,
        onCount?: (quantity: number) => void
    }
    state: {
        currentQuantity?: number,
    }
    private timer: NodeJS.Timer

    constructor(props) {
        super(props)
        const { defaultQuantity, minQuantity, maxQuantity, onCount } = this.props
        let quantity: number = 0
        if (defaultQuantity >= minQuantity && defaultQuantity <= maxQuantity) {
            quantity = defaultQuantity
        } else if (minQuantity >= 0) {
            quantity = minQuantity
        } else {
            quantity = 0
        }
        onCount(quantity)
        this.state = ({
            currentQuantity: quantity
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    private operateQuantity(add: boolean) {
        const { minQuantity, maxQuantity, onCount } = this.props
        let quantity = this.state.currentQuantity
        if (add && quantity < maxQuantity) {
            quantity += 1
        } else if (!add && quantity <= maxQuantity && quantity > minQuantity) {
            quantity -= 1
        }
        // console.log(quantity)
        onCount(quantity)
        this.setState({
            currentQuantity: quantity
        })
    }
    private renderAdderButton(add: boolean = true) {
        const { minQuantity, maxQuantity, fastCountInterval } = this.props
        const buttonSize = 30
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.operateQuantity(add)
                }}
                onPressIn={() => {
                    this.timer = setInterval(() => {
                        this.operateQuantity(add)
                    }, fastCountInterval)
                }}
                onPressOut={() => {
                    clearInterval(this.timer)
                }}>
                <View
                    style={{
                        width: buttonSize,
                        height: buttonSize,
                    }}>
                    <Image
                        style={{
                            width: buttonSize,
                            height: buttonSize,
                        }}
                        source={add ? AddGray.source : SubtractGray.source}>
                    </Image>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    private renderQuantity() {
        const maxLength = this.props.maxQuantity.toString().length
        const maxTextWidth = maxLength <= 5 ? maxLength * 8 : 50
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: "#BBBBBB",
                    paddingHorizontal: 20,
                }}>
                {
                    this.props.editable ?
                        <CustomTextInput>
                        </CustomTextInput> :
                        <Text
                            style={{
                                width: maxTextWidth,
                                textAlign: "center",
                                color: Config.textColor,
                                fontSize: 12,
                                ...this.props.textStyle
                            }}>
                            {this.state.currentQuantity}
                        </Text>
                }
            </View>
        )
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#BBBBBB",
                    borderRadius: 4,
                    padding: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    ...this.props.style
                }}>
                {this.renderAdderButton(false)}
                {this.renderQuantity()}
                {this.renderAdderButton(true)}
            </View>
        )
    }
}