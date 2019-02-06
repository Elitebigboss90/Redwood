import * as React from "react"
import { View, Image, TouchableOpacity } from "react-native"

export class ImageAdder extends React.Component {
    static defaultProps = {
        style: {},
        itemStyle: {},
        imageStyle: {},
        itemContentStyle: {},
        onPress: () => { },
        numColumns: 1,
        maxCount: 1,
        horizontalMargin: 15,
        verticalMargin: 15,
        editable: true,
        uris: []
    }
    uris: string[] = []
    props: {
        style?: any,
        itemStyle?: any,
        imageStyle?: any,
        itemContent?: React.ReactNode,
        onPress?: (index: number) => void,
        numColumns?: number,
        maxCount?: number,
        horizontalMargin?: number,
        verticalMargin?: number,
        editable?: boolean,
        uris?: any[]
    }

    private renderImages() {
        const { itemStyle, imageStyle, itemContent, onPress, numColumns, maxCount, horizontalMargin, verticalMargin, editable, uris } = this.props
        let imageAdders: JSX.Element[] = []
        for (let index = 0; index < uris.length + +editable && index < maxCount; index++) {
            const uri = uris[index]
            const content =
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: index % numColumns === 0 ? 0 : horizontalMargin,
                        marginTop: index < numColumns ? 0 : verticalMargin,
                        ...itemStyle
                    }} >
                    {itemContent}
                    <Image
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            ...imageStyle
                        }}
                        source={{ uri: uri }} />
                </View>
            const imageAdder = editable ?
                <TouchableOpacity
                    key={index.toString()}
                    onPress={() => onPress(index)} >
                    {content}
                </TouchableOpacity> :
                <View
                    key={index.toString()} >
                    {content}
                </View>
            imageAdders.push(imageAdder)
        }
        return (
            imageAdders
        )
    }
    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    ...this.props.style
                }} >
                {this.renderImages()}
            </View>
        )
    }
}

