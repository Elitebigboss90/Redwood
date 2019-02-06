import * as React from "React"
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from "react-native"
// import FastImage from "react-native-fast-image"
import { Config } from "../Config"
import { Icon, ArrowRightGray, TestAvatarCircle } from "./Icon"
import * as Transformer from "../util/Transformer"
import { CustomTextInput } from "./Custom"
import { ManagerEditor } from "../Manager"
import { Separator } from "./Separator";
import { cartItems } from "../TestData"
import { ImageUtil } from "../util/ImageUtil"

enum CellTouchType { "none", "opacity", "without" }
export interface IndexPath { section: number, row: number }

function indexPathToString(indexPath: IndexPath) {
    let key = "section: " + indexPath.section + ", " + "row: " + indexPath.row
    return key
}

export class Cell extends React.Component {
    static defaultProps = {
        style: {},
        contentStyle: {},
        touch: CellTouchType.opacity,
        activeOpacity: 0.5,
        renderContent: () => null,
        onPressCell: () => { },
        onLongPressCell: () => { },
    }
    props: {
        style?: any,
        contentStyle?: any,
        indexPath?: IndexPath,
        touch?: CellTouchType,
        activeOpacity?: number,
        data?: any,
        indicator?: boolean,
        renderContent: (indexPath: IndexPath) => JSX.Element | JSX.Element[],
        onPressCell?: (indexPath: IndexPath) => void,
        onLongPressCell?: (indexPath: IndexPath) => void,
    }
    render() {
        const { style, indexPath, touch, activeOpacity, renderContent, indicator, onPressCell, onLongPressCell } = this.props
        const indicatorView = indicator ?
            <View
                style={{
                    marginLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Icon icon={ArrowRightGray} />
            </View> :
            undefined
        const contentView =
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: Config.horizontal,
                    backgroundColor: "white",
                    ...style,
                }}>
                <View
                    style={{
                        flex: 1,
                        ...this.props.contentStyle
                    }} >{renderContent(indexPath)}
                </View>
                {indicatorView}
            </View>
        let container: JSX.Element
        if (touch == CellTouchType.none) {
            container = contentView
        } else if (touch == CellTouchType.opacity) {
            container =
                <TouchableOpacity
                    activeOpacity={activeOpacity}
                    onPress={() => onPressCell(indexPath)}
                    onLongPress={() => onLongPressCell(indexPath)} >
                    {contentView}
                </TouchableOpacity>
        } else if (touch == CellTouchType.without) {
            container =
                <TouchableWithoutFeedback
                    onPress={() => onPressCell(indexPath)}
                    onLongPress={() => onLongPressCell(indexPath)}>
                    {contentView}
                </TouchableWithoutFeedback>
        }
        return (
            <View key={indexPathToString(this.props.indexPath)} >{[container]}</View>
        )
    }
}

export interface IOSContentData { image?: NodeRequire, text?: string, detailText?: string }
enum IOSCellType { "default", "subtitle", "value1", "value2" }
/**
 * iOS style cell content, like iOS default UITableViewCell
 */
export class IOSContent extends React.Component {
    static defaultProps = {
        style: {},
        imageStyle: {},
        textStyle: {},
        detailTextStyle: {},
        type: IOSCellType.default,
    }
    props: {
        style?: any,
        imageStyle?: any,
        textStyle?: any,
        detailTextStyle?: any,
        type?: IOSCellType,
        indicator?: boolean,
        data: IOSContentData,
    }

    render() {
        const { style, imageStyle, textStyle, detailTextStyle, type, indicator, data } = this.props
        let content: any
        const defaultImageStyle = { width: 30, height: 30, ...imageStyle }
        const defaultTextStyle = { fontSize: 16, color: Config.textColor, marginLeft: data.image ? 15 : 0, ...textStyle }
        const defaultDetailTextStyle = { fontSize: 14, color: Config.grayColor, ...detailTextStyle }
        const indicatorView = indicator && type !== IOSCellType.value1 ?
            <Icon style={{ marginLeft: 10, alignSelf: "center", width: 20 }} icon={ArrowRightGray} /> : undefined
        switch (type) {
            case IOSCellType.default:
                content = <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }} >
                    {[
                        data.image ? <Image style={defaultImageStyle} source={data.image} /> : undefined,
                        data.text ? <Text style={defaultTextStyle} >{data.text}</Text> : undefined,
                    ]}
                </View>
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row"
                }} >
                {[content, indicatorView]}
            </View>
        )
    }
}

export class HomeArticleContent extends React.Component {
    props: { item: PostService.Post }

    render() {
        const { item } = this.props
        const imageCount = item.images.length
        const spaceMargin = 10
        const titleContainer =
            <View
                style={{
                    flex: 1,
                    marginBottom: spaceMargin
                }} >
                <Text
                    style={{ fontSize: 16, color: Config.textColor }} >{item.title}</Text>
            </View>
        const subtitleContainer =
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: spaceMargin
                }} >
                <Text
                    style={{
                        fontSize: 12,
                        color: "#C5C5C5"
                    }}>
                    {item.authorName}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        color: "#C5C5C5"
                    }}>
                    {Transformer.timestampToString(item.createAt)}
                </Text>
            </View>
        // let imageUri = item && item.images && item.images[0] + Config.root || null
        if (imageCount <= 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }} >
                    {imageCount > 0 ?
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                marginRight: spaceMargin,
                            }}
                            source={{ uri: Config.root + item.images[0] }} /> : undefined}
                    <View
                        style={{ flex: 1 }} >
                        {titleContainer}
                        {subtitleContainer}
                    </View>
                </View>
            )
        }
        else {
            const maxMutiImage = 3
            const mutiImageW = (Dimensions.get('window').width - Config.horizontal * 2 - maxMutiImage * (maxMutiImage - 1) * 2) / maxMutiImage
            let images = []
            const count = imageCount % 3 == 0 ? 3 : imageCount % 3;
            for (let i = 0; i < count; i++) {
                images.push(
                    <Image
                        key={i}
                        style={{
                            height: 80,
                            width: mutiImageW,
                            marginRight: spaceMargin * 0.5
                        }}
                        source={{ uri: Config.root + item.images[i] }} />
                )
            }
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between"
                    }}>
                    {titleContainer}
                    <View
                        style={{
                            flexDirection: "row"
                        }} >
                        {images}
                    </View>
                    {subtitleContainer}
                </View>
            )
        }
    }
}

export class SPUDisplayContent extends React.Component {
    props: { item: ShopService.Product }
    render() {
        const { item } = this.props
        const imageUri = item.thumbs && item.thumbs.length > 0 ? (Config.root + item.thumbs[0]) : ""
        return (
            <View
                style={{
                    flexDirection: "row"
                }}>
                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={{
                        uri: imageUri
                    }} />
                {/* <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={{ uri: imageUri }} /> */}
                <View
                    style={{
                        justifyContent: "space-between",
                        marginLeft: 10,
                        flex: 1
                    }}>
                    <Text
                        style={{
                            fontSize: 16
                        }}
                        numberOfLines={3}>
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor
                        }}
                        numberOfLines={1}>
                        {item.description}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: Config.styleColor
                        }}>
                        {"¥" + item.basePrice / 100}
                    </Text>
                </View>
            </View>
        )
    }
}

export class JobDisplayContent extends React.Component {
    props: { item: PostService.Post }
    render() {
        const { item } = this.props
        return (
            <View
                style={{
                    justifyContent: "space-between"
                }} >
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: "#666666", marginTop: 10 }}>{item.content}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} >
                    <Text style={{ fontSize: 12, color: "#C5C5C5", marginTop: 15 }}>{item.authorName}</Text>
                    <Text style={{ fontSize: 12, color: "#C5C5C5" }}>{Transformer.timestampToString(item.createAt)}</Text>
                </View>
            </View>
        )
    }
}

export class SubjectDisplayContent extends React.Component {
    props: { item: PostService.Post }
    render() {
        const { item } = this.props
        return (
            <View
                style={{
                    flexDirection: "row"
                }}>
                {item.images && item.images.length > 0 ?
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            marginRight: 10
                        }}
                        source={{ uri: (Config.root + item.images[0]) }} /> :
                    undefined}
                <View style={{ justifyContent: "space-between", flex: 1 }}>
                    <Text style={{ fontSize: 16 }} numberOfLines={3}>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: Config.grayColor }}>{item.content}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }} >
                        <Text style={{ fontSize: 12, color: "#C5C5C5", marginTop: 15 }}>{item.authorName}</Text>
                        <Text style={{ fontSize: 12, color: "#C5C5C5" }}>{Transformer.timestampToString(item.createAt)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export class SellerDisplayContent extends React.Component {
    props: { item: ShopService.Seller }
    render() {
        const { item } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-between"
                }} >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }} >
                    <Image style={{ width: 44, height: 44, borderRadius: 22 }} source={item.avatar ? { uri: Config.root + item.avatar } : TestAvatarCircle.source} />
                    <Text style={{ fontSize: 16, marginLeft: 10 }} >{item.name}</Text>
                </View>
                <Text style={{ marginTop: 10, fontSize: 12, color: Config.grayColor }} >{item.description}</Text>
                <Text style={{ marginTop: Config.horizontal, fontSize: 12, color: Config.grayColor }}>{item.productCount + "件商品"}</Text>
            </View>
        )
    }
}

export class ReceiverContent extends React.Component {
    static defaultProps = {
        style: {}
    }
    props: {
        style?: any,
        item: ContactService.Contact,
    }

    render() {
        const { item, style } = this.props
        const name = item && item.name ? item.name : ""
        const phone = item && item.phone ? item.phone : ""
        const district = item ? item.addressDistrict : null
        const province = district && district.province && district.province.name || ""
        const city = district && district.city && district.city.name || ""
        const area = district && district.area && district.area.name || ""
        const addressDetail = item && item.addressDetail ? item.addressDetail : ""
        return (
            <View style={{ ...style }} >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }} >
                    <Text style={{ fontSize: 14, color: Config.textColor }} >{"收货人：" + name}</Text>
                    <Text style={{ fontSize: 14, color: Config.textColor }} >{phone}</Text>
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color: Config.textColor,
                        marginTop: 10
                    }}
                    numberOfLines={2} >
                    {"收货地址：" + province + city + area + addressDetail}
                </Text>
            </View>
        )
    }
}

export class TextInputContent extends React.Component {
    static defaultProps = {
        title: null,
        style: {},
        textStyle: {},
        textInputStyle: {},
        direction: "right"
    }
    props: {
        title?: string,
        placeholder?: string,
        defaultValue?: string,
        style?: any,
        textStyle?: any,
        textInputStyle?: any,
        direction?: "right" | "bottom"
    }
    textInput: CustomTextInput = null
    render() {
        const { title, placeholder, style, textStyle, textInputStyle, direction } = this.props
        return (
            <View
                style={{
                    flexDirection: direction === "right" ? "row" : "column",
                    ...style
                }} >
                <Text style={{ width: 60, fontSize: 14, color: Config.textColor, ...textStyle }} >{title}</Text>
                <CustomTextInput
                    ref={(ref) => this.textInput = ref}
                    style={{
                        marginLeft: direction === "right" ? 20 : 0,
                        marginTop: direction === "bottom" ? Config.horizontal : 0,
                        flex: 1,
                        ...textInputStyle
                    }} placeholder={placeholder}
                    defaultValue={this.props.defaultValue} ></CustomTextInput>
            </View>
        )
    }
}

export class SubjectManagerContent extends React.Component {
    static defaultProps = {
        onPressEdit: () => { },
        onPressDelete: () => { }
    }
    props: {
        data: PostService.Post,
        onPressEdit?: () => void,
        onPressDelete?: () => void
    }
    render() {
        const { data } = this.props
        return (
            <View
                style={{
                    flexDirection: "row"
                }}>
                {
                    data.images.length > 0 ?
                        <Image
                            style={{
                                width: 100,
                                height: 100
                            }}
                            source={{ uri: data.images.length > 0 ? Config.root + data.images[0] : "" }} /> :
                        undefined
                }
                <View
                    style={{
                        justifyContent: "space-between",
                        marginLeft: 10,
                        flex: 1
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: Config.textColor
                        }}
                        numberOfLines={3}>
                        {data.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor,
                            marginTop: 10
                        }} >
                        {data.content}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor,
                            marginTop: 10
                        }}>
                        {Transformer.timestampToString(data.createAt)}
                    </Text>
                    <ManagerEditor
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 0
                        }}
                        onPressEdit={this.props.onPressEdit}
                        onPressDelete={this.props.onPressDelete} />
                </View>
            </View>
        )
    }
}
export class JobManagerContent extends React.Component {
    static defaultProps = {
        onPressEdit: () => { },
        onPressDelete: () => { }
    }
    props: {
        data: PostService.Post,
        onPressEdit?: () => void,
        onPressDelete?: () => void
    }
    render() {
        const { data } = this.props
        return (
            <View
                style={{
                    justifyContent: "space-between",
                    flex: 1
                }} >
                <Text style={{ fontSize: 16, color: Config.textColor }}>{data.title}</Text>
                <Text style={{ fontSize: 12, color: Config.grayColor, marginTop: 10 }}>{data.authorName}</Text>
                <Text style={{ fontSize: 12, color: Config.grayColor, marginTop: 10 }}>{Transformer.timestampToString(data.createAt)}</Text>
                <ManagerEditor
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0
                    }}
                    onPressEdit={this.props.onPressEdit}
                    onPressDelete={this.props.onPressDelete} />
            </View>
        )
    }
}

export class ReceiverManagerContent extends React.Component {
    static defaultProps = {
        style: {},
        onPressEdit: () => { },
        onPressDelete: () => { }
    }
    props: {
        data: ContactService.Contact,
        style?: any,
        onPressEdit?: () => void,
        onPressDelete?: () => void
    }
    render() {
        const { data, style } = this.props
        const district = data && data.addressDistrict ? data.addressDistrict : null
        const province = district && district.province ? district.province.name : ""
        const city = district && district.city ? district.city.name : ""
        const area = district && district.area ? district.area.name : ""
        return (
            <View
                style={{ ...style }} >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }} >
                    <Text style={{ fontSize: 14, color: Config.textColor }} >{"收货人：" + data.name}</Text>
                    <Text style={{ fontSize: 14, color: Config.textColor }} >{data.phone}</Text>
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color: Config.textColor,
                        marginTop: 10
                    }}
                    numberOfLines={3} >
                    {"收货地址：" + province + city + area + data.addressDetail}
                </Text>
                <Separator
                    style={{
                        marginVertical: 10
                    }} />
                <ManagerEditor
                    style={{
                        alignSelf: "flex-end",
                        // marginTop: 10,
                        // height: 20,
                    }}
                    onPressEdit={this.props.onPressEdit}
                    onPressDelete={this.props.onPressDelete} />
            </View>
        )
    }
}


export class SPUManagerContent extends React.Component {
    static defaultProps = {
        style: {},
        onPressEdit: () => { },
        onPressDelete: () => { }
    }
    props: {
        data: ShopService.Product,
        style?: any,
        onPressEdit?: () => void,
        onPressDelete?: () => void
    }
    render() {
        const { data } = this.props
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row"
                    }}>
                    {data.thumbs && data.thumbs.length > 0 ?
                        <Image
                            style={{
                                width: 111,
                                height: 111,
                                marginRight: 10
                            }}
                            source={{ uri: Config.root + data.thumbs[0] }} /> :
                        undefined}
                    <View
                        style={{
                            justifyContent: "space-between",
                            flex: 1
                        }}>
                        <Text
                            style={{
                                fontSize: 16
                            }}
                            numberOfLines={3}>
                            {data.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: Config.grayColor,
                                marginVertical: 10
                            }}
                            numberOfLines={1}>
                            {data.description}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Config.styleColor
                            }}>
                            {"¥" + data.basePrice / 100}
                        </Text>
                    </View>
                    <ManagerEditor
                        style={{
                            alignSelf: "flex-end",
                            marginTop: 10,
                            position: "absolute",
                            bottom: 0,
                            right: 0
                        }}
                        edit={false}
                        onPressEdit={this.props.onPressEdit}
                        onPressDelete={this.props.onPressDelete} />
                </View>
            </View>
        )
    }
}
