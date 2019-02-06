import * as React from "react"
import {
    View,
    Image,
    Text,
    ScrollView,
    WebView,
    NavState,
    NativeSyntheticEvent,
    WebViewMessageEventData
} from "react-native"
import { NavigatorBackButton } from "./common/Navigator"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"

export class Browser extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props
        const { params } = navigation.state
        const title = params && params.title || null
        return {
            header: title ? navigation.header : null,
            title: title,
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    static defaultProps = {
        title: null
    }
    props: {
        navigation: any,
    }
    state: {
        webViewLoadStatus?: "start" | "loading" | "end" | "error"
    }
    private title: string = null
    private source: any

    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            webViewLoadStatus: "start"
        }
        if (params) {
            this.title = params.title ? params.title : null
            this.source = params.source ? params.source : null
        }
    }

    private webViewOnError(event: NavState) {
        console.log("WebView onError.")
        Toast.show("网页加载失败，清守候重试")
        this.setState({ webViewLoadStatus: "error" })
    }

    private webViewOnLoad(event: NavState) {
        console.log("WebView onLoad.")
        this.setState({ webViewLoadStatus: "loading" })
    }

    private webViewOnLoadStart(event: NavState) {
        console.log("WebView onLoadStart.")
        HUD.show()
        this.setState({ webViewLoadStatus: "start" })
    }

    private webViewOnLoadEnd(event: NavState) {
        console.log("WebView onLoadEnd.")
        HUD.hide()
        this.setState({ webViewLoadStatus: "end" })
    }

    private webViewOnMessage(event: NativeSyntheticEvent<WebViewMessageEventData>) {
        console.log("WebView onMessage.")
    }

    private webViewOnNavigationStateChange(event: NavState) {
        console.log("WebView onNavigationStateChange:.")
    }

    private renderPlaceholderView() {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "white"
                }}>
                <View
                    style={{
                        flex: 1
                    }}>

                </View>
            </ScrollView>
        )
    }

    private renderWebView() {
        return (
            <WebView
                style={{
                    flex: 1
                }}
                automaticallyAdjustContentInsets={this.title !== null}
                source={this.source}
                scalesPageToFit={true}
                scrollEnabled={true}
                onError={(event) => this.webViewOnError(event)}
                onLoad={(event) => this.webViewOnLoad(event)}
                onLoadStart={(event) => this.webViewOnLoadStart(event)}
                onLoadEnd={(event) => this.webViewOnLoadEnd(event)}
                onMessage={(event) => this.webViewOnMessage(event)}
                onNavigationStateChange={(event) => this.webViewOnNavigationStateChange(event)}
                renderError={() => null}
                renderLoading={() => null}>
            </WebView>
        )
    }

    render() {
        const { webViewLoadStatus } = this.state
        let contentView: JSX.Element
        switch (webViewLoadStatus) {
            case "loading":
            case "error": {
                contentView = this.renderPlaceholderView()
                break
            }
            case "start":
            case "end": {
                contentView = this.renderWebView()
                break
            }
        }
        return (
            <View
                style={{
                    flex: 1
                }}>
                {contentView}
            </View>
        )
    }
}
