import * as React from "react"
import { View, Dimensions,StyleSheet, Text, Button, ScrollView,Image } from "react-native"
//import { ImagePicker } from "expo"
import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from './util/CameraRoll'
import ImageBrowser from './util/ImageBrowser'
import { Permission } from "./Permission"
import { ImageAdder } from "./ImageAdder"
import { Config } from "./Config"
import { Icon, ImageAddGray } from "./common/Icon"
import { UploadService } from "./service/uploadService"
import { AlertView } from "./common/Alert"
import { ImageUtil } from "./util/ImageUtil"


const imageType = "image/jpeg"
const imageName = "upload.jpg"

//const ImagePicker = require('react-native-image-picker');

type ImageInfo = { uri: string, width?: number, height?: number }
type ImageFile = { uri: string, type: string, name: string }

export class ImageUploader extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "编辑商品",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    static defaultProps = {
        style: {},
        itemStyle: {},
        imageStyle: {},
        numColumns: 1,
        maxCount: 1,
        uris: []
    }
    props: {
        style?: any,
        itemStyle?: any,
        imageStyle?: any,
        numColumns?: number,
        maxCount?: number,
        uris?: any[],
    }
    state: {
        currentIndex?: number,
        imageBrowserOpen?:false,
        photos?: any[],
    }
    private uploader = new UploadService()
    private actionSheet: AlertView.Sheet
    images: ImageInfo[] = []
    private files = []

    constructor(props) {
        super(props)
        const { uris } = this.props
        this.state = {
            currentIndex: 0
        }
        if (uris) {
            uris.forEach(uri => {
                this.files.push({ uri: uri, type: imageType, name: imageName })
            });
        }
    }

    private askPermission(type: "library" | "camera" = "library") {
        switch (type) {
            case "library": {
                Permission.askPermission("cameraRoll", (response) => {
                    Permission.permissionResponseHandler(response, (response) => {
                        this.launchImagePicker(type)
                    })
                })
                break
            }
            case "camera": {
                Permission.askPermission("camera", (response) => {
                    Permission.permissionResponseHandler(response, (response) => {
                        this.launchImagePicker(type)
                    })
                })
                break
            }
        }
    }

    async launchImagePicker(type: "library" | "camera" = "library") {
        let result=[];
        console.log("type",type)
        switch (type) {
            case "library": await ImagePicker.openPicker({multiple:true}).then(images=>{console.log(images),result=images}).catch(e=>{console.log(e)}); break
            case "camera":  await ImagePicker.openCamera({width: 300,
                                                          height: 400,
                                                          cropping: true}).then(image=>{console.log(images),result=image}).catch(e=>{console.log(e)}); break
        }

        console.log(result)
        //if (result.cancelled) return
        if(result.length==1){
          result = result[0];
          const { sourceURL } = result;
          console.log("picker image: " , result,sourceURL)
          const imageInfo = { uri: sourceURL, width: result.width, height: result.height }
          this.handleImage(imageInfo, (err, handledImage) => {
          })
          if (sourceURL === null) return
          const { uris } = this.props
          const { currentIndex } = this.state
          if (currentIndex === uris.length) {
              uris.push(sourceURL)
              this.images.push(imageInfo)
          } else {
              uris[currentIndex] = sourceURL
              this.images[currentIndex] = imageInfo
          }
          this.setState({})
        }else if(result.length>1){
          //var sourceURL = [];
          for(let i=0;i<result.length;i++){
            //sourceURL.push()
            const imageInfo = { uri: result[i].sourceURL, width: result[i].width, height: result[i].height }
            this.handleImage(imageInfo, (err, handledImage) => {
            })
            if (result[i].sourceURL === null) return
            const { uris } = this.props
            const { currentIndex } = this.state
            if (currentIndex === uris.length) {
                uris.push(result[i].sourceURL)
                this.images.push(imageInfo)
            } else {
                uris[currentIndex] = result[i].sourceURL
                this.images[currentIndex] = imageInfo
            }
            this.setState({currentIndex:this.state.currentIndex+1})
            //console.log("picker image: " , result,sourceURL)
          }

        }
    }

    private onPressImagePicker(index: number) {
        this.actionSheet.show()
        this.setState({
            currentIndex: index
        })
    }

    private handleImage(imageInfo: ImageInfo, callback: Callback<ImageInfo>) {
        if (!imageInfo) return
        let targetSize: ImageUtil.ImageSize
        if (imageInfo.width * imageInfo.height <= 800 * 1600) {
            targetSize = { width: imageInfo.width, height: imageInfo.height }
        } else {
            targetSize = ImageUtil.sizeToLimit({ width: imageInfo.width, height: imageInfo.height }, { width: 800, height: 800 * (imageInfo.width / imageInfo.height) })
        }
        console.log("targetSize",targetSize);
        ImageUtil.manipulate(imageInfo.uri, { action: { resize: { width: targetSize.width, height: targetSize.height } } }, (err, result) => {
            callback(null, { uri: result.uri, width: result.width, height: result.height })
        })
    }

    uploads(callback: Callback<string[]>) {
        console.log("this.images",this.images)
        const images = this.images
        if (images.length === 0) {
            callback(null, null)
            return
        }
        let imageResults: string[] = []
        images.forEach((image, index) => {
            this.handleImage(image, (err, imageResult) => {
                if (err) return
                const uri = imageResult.uri
                const file: ImageFile = { uri: uri, type: imageType, name: imageName }
                this.uploader.upload(file, (err, result) => {
                    if (err) {
                        let _cb = callback
                        _cb(err)
                        callback = () => { }
                        return
                    }
                    imageResults.push(result.urls[0].value)
                    if (imageResults.length == images.length) {
                        callback(null, imageResults)
                        return
                    }
                })
            })
        })
    }

    renderActionsheet() {
        return (
            <AlertView.Sheet
                ref={(ref) => this.actionSheet = ref}
                options={["拍照", "从手机相册选择", "取消"]}
                cancelButtonIndex={2}
                onPress={(index) => {
                    if (index === 0) { this.askPermission("camera") }
                    else if (index === 1) { this.askPermission("library") }
                }} />
        )
    }

    render() {
        const { style, itemStyle, imageStyle, numColumns, maxCount, uris } = this.props
        const imageMargin = Config.horizontal
        return (
            <View>
                <ImageAdder
                    style={{ ...style }}
                    itemStyle={{
                        borderWidth: 1,
                        borderColor: "#DDDDDD",
                        ...itemStyle
                    }}
                    imageStyle={{ ...imageStyle }}
                    horizontalMargin={imageMargin}
                    verticalMargin={imageMargin}
                    numColumns={numColumns}
                    maxCount={maxCount}
                    uris={uris}
                    itemContent={<Icon icon={ImageAddGray} />}
                    onPress={(index) => this.onPressImagePicker(index)} />
                {this.renderActionsheet()}
            </View>
        )
    }
}
