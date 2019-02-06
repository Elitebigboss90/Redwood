import * as React from "react"
import { View, PanResponder, GestureResponderEvent, PanResponderGestureState } from "react-native"

const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

type SwipeDirection = "up" | "down" | "left" | "right"

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

export class GestureRecognizer extends React.Component {

    private swipeConfig
    private panResponder
    static defaultProps = { onSwipe: () => { }, onSwipeUp: () => { }, onSwipeDown: () => { }, onSwipeLeft: () => { }, onSwipeRight: () => { } }
    props: {
        onSwipe?: (direction: SwipeDirection, state: PanResponderGestureState) => void,
        onSwipeUp?: (state: PanResponderGestureState) => void,
        onSwipeDown?: (state: PanResponderGestureState) => void,
        onSwipeLeft?: (state: PanResponderGestureState) => void,
        onSwipeRight?: (state: PanResponderGestureState) => void
    }
    constructor(props, context) {
        super(props, context);
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillReceiveProps(props) {
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillMount() {
        const responderEnd = this.handlePanResponderEnd.bind(this);
        const shouldSetResponder = this.handleShouldSetPanResponder.bind(this);
        this.panResponder = PanResponder.create({ //stop JS beautify collapse
            onStartShouldSetPanResponder: shouldSetResponder,
            onMoveShouldSetPanResponder: shouldSetResponder,
            onPanResponderRelease: responderEnd,
            onPanResponderTerminate: responderEnd
        });
    }

    private handleShouldSetPanResponder(evt: GestureResponderEvent, gestureState: PanResponderGestureState) {
        return evt.nativeEvent.touches.length === 1 && !this.gestureIsClick(gestureState);
    }

    private gestureIsClick(gestureState: PanResponderGestureState) {
        return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
    }

    private handlePanResponderEnd(evt, gestureState: PanResponderGestureState) {
        const swipeDirection = this.getSwipeDirection(gestureState);
        this.triggerSwipeHandlers(swipeDirection, gestureState);
    }

    private triggerSwipeHandlers(swipeDirection: SwipeDirection, gestureState: PanResponderGestureState) {
        const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
        onSwipe && onSwipe(swipeDirection, gestureState);
        switch (swipeDirection) {
            case "left":
                onSwipeLeft && onSwipeLeft(gestureState);
                break;
            case "right":
                onSwipeRight && onSwipeRight(gestureState);
                break;
            case "up":
                onSwipeUp && onSwipeUp(gestureState);
                break;
            case "down":
                onSwipeDown && onSwipeDown(gestureState);
                break;
        }
    }

    private getSwipeDirection(gestureState: PanResponderGestureState) {
        const { dx, dy } = gestureState;
        let direction: SwipeDirection
        if (this.isValidHorizontalSwipe(gestureState)) {
            direction = (dx > 0) ? "right" : "left"
        } else if (this.isValidVerticalSwipe(gestureState)) {
            direction = (dy > 0) ? "down" : "up"
        }
        return direction
    }

    private isValidHorizontalSwipe(gestureState: PanResponderGestureState) {
        const { vx, dy } = gestureState;
        const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
        return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
    }

    private isValidVerticalSwipe(gestureState: PanResponderGestureState) {
        const { vy, dx } = gestureState;
        const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
        return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
    }

    render() {
        return (
            <View
                {...this.props}
                {...this.panResponder.panHandlers} />
        )
    }
}
