import * as React from "react"
import {
    WebView,
    StyleSheet,
} from "react-native"

export default class Message extends React.Component {
    render() {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{ uri: "https://github.com/facebook/react-native" }}
                automaticallyAdjustContentInsets={true}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
            />
        )
    }
}
