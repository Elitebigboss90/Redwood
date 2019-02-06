import * as React from "react"
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { Icon, CheckMarkRed } from "./common/Icon"

type RenderTitleOrElement = () => string | JSX.Element

export class CheckMarkView extends React.Component {
    static defaultprops = {
        style: {},
        selected: false,
        titleTextStyle: {},
        detailTextStyle: {},
        renderCheckmarkComponent: () => null,
        renderTitleComponent: () => "",
        renderDetailComponent: () => ""
    }
    props: {
        style?: any,
        titleTextStyle?: any,
        detailTextStyle?: any,
        renderCheckmarkComponent?: () => React.ReactElement<CheckMark>,
        renderTitleComponent?: RenderTitleOrElement,
        renderDetailComponent?: RenderTitleOrElement
    }

    private renderTextOrElement(type: "title" | "detail", renderFunction: RenderTitleOrElement) {
        if (!renderFunction) return
        const childElement = renderFunction()
        if (!childElement) return
        let textStyle: any
        switch (type) {
            case "title": textStyle = this.props.titleTextStyle; break;
            case "detail": textStyle = this.props.detailTextStyle; break;
        }
        return (
            typeof childElement === "string" ?
                <Text
                    style={{
                        ...textStyle
                    }}>
                    {childElement}
                </Text> :
                { childElement }
        )
    }

    render() {
        const {
            style,
            renderTitleComponent,
            renderDetailComponent,
            renderCheckmarkComponent
        } = this.props
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 5,
                    ...style
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    {this.renderTextOrElement("title", renderTitleComponent)}
                    {renderCheckmarkComponent()}
                </View>
                {this.renderTextOrElement("detail", renderDetailComponent)}
            </View >
        )
    }
}


export class CheckMark extends React.Component {
    static defaultProps = {
        style: {},
        normalColor: "#979797",
        selectedColor: "#979797",
        selected: false,
        onPress: () => { },
    }
    props: {
        style?: any,
        normalColor?: string,
        selectedColor?: string,
        selected?: boolean,
        onPress?: (selected: boolean) => void
    }

    render() {
        const { style, selected, normalColor, selectedColor, onPress } = this.props
        return (
            <TouchableWithoutFeedback
                onPress={() => onPress(selected)}>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: selected ? selectedColor : normalColor,
                        ...style
                    }}>
                    {/* {selected ? */}
                        <Icon
                            style={{
                                width: selected ? style.width * 0.8 | 20 : 0,
                                height: selected ? style.height * 0.8 | 20 : 0
                            }} 
                            icon={CheckMarkRed} />
                        {/* undefined
                    } */}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}