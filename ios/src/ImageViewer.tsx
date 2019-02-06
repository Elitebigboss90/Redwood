import * as React from "react"
import { View, Image, ScrollView, Dimensions, CameraRoll, Platform, ActionSheetIOS, Animated } from "react-native"
import { CustomButton } from "./common/Custom"
import { Touchable } from "./common/Touchable"
import { AlertView } from "./common/Alert"
import { ImageUtil } from "./util/ImageUtil"

const defaultImageSize = { width: Dimensions.get("window").width, height: Dimensions.get("window").height }
type Size = { width?: number, height?: number }

export class ImageViewer extends React.Component {
    static defaultProps = {
        backgroundStyle: {},
        contentStyle: {},
        images: []
    }
    props: {
        navigation?: any,
        backgroundStyle?: any,
        contentStyle?: any,
        images?: string[],
        index?: number,
    }
    state: {
        imageSizes?: Size[],
        currentImageIndex?: number,
        sheetVisible?: boolean,
    }
    private images: string[] = []
    private index: number
    private actionSheet: AlertView.Sheet
    private imageScrollView: ScrollView

    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.images = params.images || props.images
        this.index = params.index || props.index
        this.state = {
            imageSizes: [],
            currentImageIndex: 0,
            sheetVisible: false
        }
    }
    componentWillMount() {
        const window = Dimensions.get("window")
        ImageUtil.getImageSizes(this.images, (err, sizes) => {
            this.setState({
                imageSizes: sizes
            })
        })
    }
    componentDidMount() {
        const offsetX = defaultImageSize.width * this.index
        this.imageScrollView.scrollTo({ x: offsetX, y: 0, animated: false })
    }
    onDoublePress(index: number) {
        // let sizes = this.state.imageSizes
        // const size = sizes[index]
        // sizes[index] = {width: size.width * 2, height: size.height * 2}
        // this.setState({imageSizes: sizes})
        // alert(JSON.stringify(this.images[index]))

    }
    onLongPressImage(index: number) {
        this.setState({ currentImageIndex: index, sheetVisible: true })
        this.actionSheet.show()
    }
    renderImages() {
        const { imageSizes } = this.state
        let imageNodes: JSX.Element[] = []
        this.images.forEach((image, index) => {
            const size = imageSizes.length > index ? imageSizes[index] : defaultImageSize
            imageNodes.push(
                <View
                    style={{
                        width: defaultImageSize.width,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    key={index.toString()} >
                    <Touchable
                        touthType={"none"}
                        onPress={() => this.props.navigation.goBack()}
                        onDoublePress={() => this.onDoublePress(index)}
                        onLongPress={() => this.onLongPressImage(index)} >
                        <Animated.Image
                            style={{
                                width: size.width,
                                height: size.height,
                            }}
                            source={{ uri: image }} />
                    </Touchable>
                </View>
            )
        })
        return imageNodes
    }
    private renderActionSheet() {
        return (
            <AlertView.Sheet
                ref={(ref) => this.actionSheet = ref}
                // visible={this.state.sheetVisible}
                options={["保存图片", "取消"]}
                cancelButtonIndex={1}
                onPress={(index) => {
                    if (index === 0) {
                        const uri = this.images[this.state.currentImageIndex]
                        CameraRoll.saveToCameraRoll(uri, "photo").then((uri) => {
                            if (uri) alert("图片保存成功")
                        })
                    }
                }} />
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    ...this.props.backgroundStyle
                }} >
                <ScrollView
                    ref={(ref) => this.imageScrollView = ref}
                    style={{ backgroundColor: "black" }}
                    contentContainerStyle={{
                        width: defaultImageSize.width * this.images.length,
                        ...this.props.contentStyle
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true} >
                    {this.renderImages()}
                </ScrollView>
                {this.renderActionSheet()}
            </View>
        )
    }
}