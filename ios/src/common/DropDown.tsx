import * as React from "react"
import { View, Text, TouchableWithoutFeedback, Dimensions, StatusBar, Platform, ScrollView, Modal } from "react-native"
import { Header } from "react-navigation"
import { Separator } from "../common/Separator"
import { Config } from "../Config"
import { CustomButton } from "./Custom"
import { ENGINE_METHOD_DIGESTS } from "constants";

export type TargetPosition = { x: number, y: number, width: number, height: number }

// export class DropDown extends React.Component {
//     private static defaultProps = {
//         style: {},
//         contentStyle: {},
//         hasNavigation: false,
//     }
//     props: {
//         style?: any,
//         contentStyle?: any,
//         hasNavigation?: boolean,
//         contentWidth?: number,
//         container: JSX.Element,
//     }
//     state: {
//         hidden: boolean,
//         position?: TargetPosition
//     }
//     constructor(props) {
//         super(props)
//         this.state = {
//             hidden: true,
//             position: { x: 0, y: 0, width: 0, height: 0 }
//         }
//     }
//     showInPosition(frame: TargetPosition) {
//         this.setState({ hidden: false, position: frame })
//     }
//     showInTarget(target: React.Component) {
//         if (target == null) return
//         target.measure((x, y, width, height, pageX, pageY) => {
//             // alert(JSON.stringify([x, y, width, height, pageX, pageY]))
//             this.setState({
//                 position: { x: pageX, y: pageY, width: width, height: height }
//             })
//             this.setState({ hidden: false })
//         })
//     }
//     hide() {
//         this.setState({ hidden: true })
//     }
//     render() {
//         const { style, contentStyle, hasNavigation, contentWidth } = this.props
//         const { hidden, position } = this.state
//         const { x, y, width, height } = position
//         const containerWidth = hidden ? 0 : Dimensions.get("window").width
//         const containerHeight = hidden ? 0 : Dimensions.get("window").height
//         const contentLeft = contentWidth ? x + width / 2 - contentWidth / 2 : position.x
//         const navigationHeight = hasNavigation ? Header.HEIGHT + (Platform.OS === "ios" ? 0 : StatusBar.currentHeight) : 0
//         const contentTop = y + height - navigationHeight
//         const hiddenNode = hidden ? <View /> :
//             <TouchableWithoutFeedback
//                 onPress={() => this.hide()} >
//                 <View
//                     style={{
//                         backgroundColor: "rgba(0, 0, 0, 0.1)",
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: containerWidth,
//                         height: containerHeight,
//                         ...style,
//                     }} >
//                     <View
//                         style={{
//                             backgroundColor: "white",
//                             position: "absolute",
//                             left: contentLeft,
//                             top: contentTop,
//                             width: contentWidth || position.width,
//                             borderRadius: 5,
//                             ...contentStyle,
//                         }} >
//                         {this.props.container}
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>
//         return (
//             hiddenNode
//         )
//     }
// }

// export class FloatList extends React.Component {
//     private static defaultProps = {
//         style: {},
//         contentContainerStyle: {},
//         itemStyle: {},
//         itemTextStyle: {},
//         titles: [],
//         onPressItem: () => { },
//     }
//     props: {
//         style?: any,
//         contentContainerStyle?: any,
//         itemStyle?: any,
//         itemTextStyle?: any,
//         titles: string[],
//         separator?: JSX.Element,
//         onPressItem?: (index: number) => void,
//     }
//     constructor(props) {
//         super(props)
//     }
//     private renderItem() {
//         const { itemStyle, itemTextStyle, titles, separator } = this.props
//         var items = []
//         for (let index = 0; index < titles.length; index++) {
//             const title = titles[index]
//             if (index > 0 && separator) {
//                 var separatorNode = separator
//             }
//             const item =
//                 <TouchableWithoutFeedback
//                     key={title}
//                     onPress={() => this.props.onPressItem(index)} >
//                     <View style={{
//                         width: "100%",
//                         height: 30,
//                         justifyContent: "center",
//                         flex: 1,
//                         ...itemStyle,
//                     }} >
//                         {separatorNode}
//                         <Text style={{ fontSize: 14, ...itemTextStyle }} >{title}</Text>
//                     </View>
//                 </TouchableWithoutFeedback>
//             items.push(item)
//         }
//         return items
//     }
//     render() {
//         const { style, contentContainerStyle } = this.props
//         return (
//             <ScrollView
//                 style={{ ...style }}
//                 contentContainerStyle={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginVertical: 5,
//                     ...contentContainerStyle,
//                 }} >
//                 {this.renderItem()}
//             </ScrollView>
//         )
//     }
// }

// export class searchDropDown extends React.Component {
//     static defaultProps = {
//         style: {},
//         contentWidth: 80,
//         hasNavigation: true,
//         itemTextStyle: {},
//         types: []
//     }
//     props: {
//         style?: any,
//         contentWidth?: number,
//         hasNavigation?: boolean,
//         itemTextStyle?: any,
//         types: string[],
//         container?: JSX.Element,
//         onPressItem?: (index: number) => void
//     }
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         const { style, contentWidth, hasNavigation, itemTextStyle, types, container, onPressItem } = this.props
//         return (
//             <DropDown
//                 contentStyle={{ marginTop: 10, ...style }}
//                 contentWidth={contentWidth || 80}
//                 hasNavigation={hasNavigation || true}
//                 container={container ||
//                     <FloatList
//                         itemTextStyle={{ color: Config.textColor }}
//                         titles={types}
//                         onPressItem={(index) => onPressItem(index)} />
//                 } >
//             </DropDown>
//         )
//     }
// }

export class DropDownList extends React.Component {
    static defaultProps = {
        backgroundStyle: {},
        containerStyle: {},
        contentStyle: {},
        itemStyle: {},
        textStyle: {},
        options: [],
        renderContent: null,
        onPressItem: () => { }
    }
    props: {
        backgroundStyle?: any,
        containerStyle?: any,
        contentStyle?: any,
        itemStyle?: any,
        textStyle?: any,
        options?: Array<String | JSX.Element>,
        renderContent?: () => JSX.Element,
        onPressItem?: (index?: number) => void
    }
    state: {
        visible?: boolean,
        position?: TargetPosition
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            position: { x: 0, y: 0, width: 0, height: 0 }
        }
    }
    showInPosition(frame: TargetPosition) {
        this.setState({ visible: true, position: frame })
    }
    showInTarget(target: React.Component) {
        if (target == null) return
        target.measure((x, y, width, height, pageX, pageY) => {
            this.setState({
                position: { x: pageX, y: pageY + (Platform.OS == "android" ? -Config.statusBarHeight : 0), width: width, height: height }
            })
            this.setState({ visible: true })
        })
    }
    hide() {
        this.setState({ visible: false })
    }
    private onPressItem(index?: number) {
        this.hide()
        this.props.onPressItem(index)
    }
    private renderItems() {
        const { itemStyle, textStyle, options } = this.props
        const { position } = this.state
        var items = []
        options.forEach((option, index) => {

            // if (index > 0 && separator) {
            //     var separatorNode = separator
            // }
            const item =
                <TouchableWithoutFeedback
                    key={index.toString()}
                    onPress={() => this.onPressItem(index)} >
                    <View style={{
                        flex: 1,
                        width: "100%",
                        height: position.height || 30,
                        // backgroundColor: index === 0 ? "red" : "white",
                        justifyContent: "center",
                        ...itemStyle,
                    }} >
                        {/* {separatorNode} */}
                        {
                            typeof option === "string" ?
                                <Text style={{
                                    fontSize: 14,
                                    // backgroundColor: index === 0 ? "yellow" : "white",
                                    ...textStyle
                                }} >
                                    {option}
                                </Text> :
                                options
                        }
                    </View>
                </TouchableWithoutFeedback>
            items.push(item)
        })
        return items
    }
    render() {
        const { backgroundStyle, containerStyle, contentStyle, options, renderContent } = this.props
        const { visible, position } = this.state
        const { x, y, width, height } = position
        const window = Dimensions.get("window")
        const contentWidth = containerStyle.width || width
        const contentLeft = width ? x + width / 2 - contentWidth / 2 : x
        const contentTop = y + height
        return (
            <Modal
                transparent={true}
                animationType={"none"}
                visible={visible} >
                <TouchableWithoutFeedback
                    onPress={() => this.hide()}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                            ...backgroundStyle
                        }} >
                        <View
                            style={{
                                backgroundColor: "white",
                                position: "absolute",
                                left: contentLeft,
                                top: contentTop,
                                width: contentWidth,
                                padding: 8,
                                ...containerStyle,
                            }} >
                            {
                                renderContent ?
                                    renderContent() :
                                    <ScrollView
                                        style={{
                                            width: "100%",
                                            ...contentStyle
                                        }} >
                                        {this.renderItems()}
                                    </ScrollView>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}


export class DropCategoryList extends React.Component {
    static defaultProps = {
        style: {},
        titleStyle: {},
        contentStyle: {},
        buttonStyle: {},
        buttonTitleStyle: {},
        title: "",
        numColumns: 4,
        currentCategoryIndex: 0,
        onPressCategory: () => { }
    }
    props: {
        style?: any,
        titleStyle?: any,
        contentStyle?: any,
        buttonStyle?: any,
        buttonTitleStyle?: any,
        categories?: string[],
        title?: string,
        numColumns?: number,
        currentCategoryIndex?: number,
        onPressCategory?: (index: number) => void
    }
    private onPressCategoryItem(index?: number) {
        this.props.onPressCategory(index)
    }
    render() {
        const { categories, currentCategoryIndex } = this.props
        const column = this.props.numColumns
        const itemMargin = 10
        const itemWidth = (Dimensions.get("window").width - Config.horizontal * 2 - itemMargin * (column - 1)) / column
        let items = []
        categories.forEach((category, index) => {
            const selected = currentCategoryIndex === index
            items.push(
                <CustomButton
                    key={index.toString()}
                    style={{
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: selected ? Config.styleColor : Config.grayColor,
                        width: itemWidth,
                        height: 30,
                        marginTop: 10,
                        ...this.props.buttonStyle
                    }}
                    textStyle={{
                        fontSize: 14,
                        color: selected ? Config.styleColor : Config.textColor,
                        ...this.props.buttonTitleStyle,
                    }}
                    text={category}
                    onPress={() => this.onPressCategoryItem(index)} />
            )
        })
        return (
            <View
                style={{
                    backgroundColor: "white",
                    padding: Config.horizontal,
                    ...this.props.style
                }} >
                <Text
                    style={{
                        ...this.props.titleStyle
                    }}>
                    {this.props.title}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        marginTop: 5,
                        ...this.props.contentStyle
                    }} >
                    {items}
                </View>
            </View>
        )
    }
}
