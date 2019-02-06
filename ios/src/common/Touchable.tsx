import * as React from "react"
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedbackProps, GestureResponderEvent } from "react-native"

export type TouchableType = "none" | "opacity" | "highlight"

interface TouchableProps extends TouchableWithoutFeedbackProps {
    children?: React.ReactNode,
    touthType?: TouchableType,
    onDoublePress?: (e?: GestureResponderEvent) => void
}

const DOUBLE_PRESS_DELAY_MS = 200

export class Touchable extends React.Component<TouchableProps> {
    static defaultProps = { children: null, touthType: "opacity", onDoublePress: () => { } }
    private lastPressTime: number = null
    private pressTimes = []
    private timer: any
    constructor(props) {
        super(props)
    }
    
    private onPress(e) {
        // if (timer)
        const now = Date.now()
        if (this.lastPressTime && (now - this.lastPressTime) <= DOUBLE_PRESS_DELAY_MS) {
            delete this.lastPressTime
            clearTimeout(this.timer)
            this.props.onDoublePress(e)
        } else {
            this.lastPressTime = now
            this.timer = setTimeout(() => {
                this.props.onPress(e)
            }, DOUBLE_PRESS_DELAY_MS);
        }
    }
    render() {
        const { children, touthType } = this.props
        let touchNode: JSX.Element
        if (touthType === "none") {
            touchNode =
                <TouchableWithoutFeedback
                    {...this.props}
                    onPress={(e) => this.onPress(e)} >
                    {children}
                </TouchableWithoutFeedback>
        } else if (touthType === "opacity") {
            touchNode =
                <TouchableOpacity
                    {...this.props}
                    onPress={(e) => this.onPress(e)} >
                    {children}
                </TouchableOpacity>
        } else if (touthType === "highlight") {
            touchNode =
                <TouchableHighlight
                    {...this.props}
                    onPress={(e) => this.onPress(e)} >
                    {children}
                </TouchableHighlight>
        }
        return (
            touchNode
        )
    }
}