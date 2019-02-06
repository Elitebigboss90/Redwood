import * as React from "react"
import { View, Text, TouchableWithoutFeedback, Alert, ScrollView } from "react-native"
import { Config } from "../Config"

export class TabMenu extends React.Component {
    private static defaultProps = {
        style: {},
        scrollViewStyle: {},
        scrollViewContentContainerStyle: {},
        itemStyle: {},
        textContainerStyle: {},
        itemTextStyle: {},
        bottomStyle: {},
        titles: [],
        onPressItem: () => { },
        currentSelectedIndex: null,
        contentOffset: { x: 0, y: 0 },
        scrollEnabled: true,
    }
    props: {
        style?: any,
        scrollViewStyle?: any,
        scrollViewContentContainerStyle?: any,
        itemStyle?: any,
        textContainerStyle?: any,
        itemTextStyle?: any,
        bottomStyle?: any,
        tabs: Array<string | JSX.Element>,
        onPressItem?: (index?: number, title?: string) => void,
        currentSelectedIndex?: number,
        contentOffset?: { x: number, y: number },
        scrollEnabled?: boolean,
    }

    private onPressItem(index: number, title: string) {
        this.props.onPressItem(index, title)
    }
    render() {
        const { style, itemStyle, textContainerStyle, itemTextStyle, scrollViewStyle, scrollViewContentContainerStyle, tabs, currentSelectedIndex } = this.props
        let tabNodes: JSX.Element[] = []
        tabs.forEach((tab, index) => {
            let marginLeft = index > 0 ? itemStyle.marginLeft : 0
            const selected = currentSelectedIndex === index
            const tabNode = typeof tab === "string" ?
                <TabItem
                    key={index.toString()}
                    style={{ ...itemStyle, paddingVertical: itemStyle.paddingVertical || 3, marginLeft: marginLeft }}
                    containerStyle={{ ...textContainerStyle }}
                    textStyle={{ ...itemTextStyle }}
                    bottomStyle={{ ...this.props.bottomStyle }}
                    title={tab}
                    selected={selected}
                    onPress={() => { this.onPressItem(index, tab) }} /> :
                tab
            tabNodes.push(tabNode)
        })
        return (
            <View
                style={{
                    // flex: 1,
                    ...style
                }} >
                <ScrollView
                    style={{
                        ...scrollViewStyle
                    }}
                    contentContainerStyle={{
                        ...scrollViewContentContainerStyle
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    contentOffset={this.props.contentOffset}
                    scrollEnabled={this.props.scrollEnabled}
                    // contentOffset={{ x: textContainerStyle.width || 0 * currentSelectedIndex, y: 0 }}
                    horizontal={true} >
                    {tabNodes}
                </ScrollView>
            </View>
        )
    }
}

export class TabItem extends React.Component {
    private static defaultProps = {
        style: {},
        containerStyle: {},
        textStyle: {},
        bottomStyle: {},
        selectedColor: Config.styleColor,
        normalColor: Config.grayColor,
        selected: false,
    }
    props: {
        style?: any,
        containerStyle?: any,
        textStyle?: any,
        bottomStyle?: any,
        onPress?: () => void,
        selectedColor?: string,
        normalColor?: string,
        title: string,
        selected?: boolean,
    }
    state: { lineWidth?: number }
    constructor(props) {
        super(props)
        this.state = { lineWidth: 0 }
    }
    render() {
        const { style, containerStyle, textStyle, selectedColor, normalColor, selected } = this.props
        return (
            <TouchableWithoutFeedback
                onPress={this.props.onPress} >
                <View
                    style={{
                        alignItems: "center",
                        ...style
                    }} >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            ...this.props.containerStyle,
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                color: selected ? selectedColor : normalColor,
                                ...textStyle
                            }}
                            onLayout={(e) => this.setState({ lineWidth: e.nativeEvent.layout.width })} >
                            {this.props.title}
                        </Text>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            height: selected && 2 || 0,
                            width: this.state.lineWidth,
                            backgroundColor: selected ? selectedColor : normalColor,
                            ...this.props.bottomStyle
                        }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}