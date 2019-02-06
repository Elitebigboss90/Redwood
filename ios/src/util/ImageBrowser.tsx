import * as React from "react"
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { FileSystem } from 'expo';
import ImageTile from './ImageTile';
const { width } = Dimensions.get('window')
import { NavigatorBackButton } from "../common/Navigator"

export class ImageBrowser extends React.Component {

  static navigationOptions = ({ navigation }) => {
      /*return {
          title: "选择图片",
          headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
          headerRight: <Button title="确定2"
                               onPress={()=>navigation.getParam('prepareCallback')}
                      />
      }*/
      header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    }
  }

  componentDidMount() {
    console.log("this.props",this.props)
    this.getPhotos()
    //this.props.navigation.setParams({ prepareCallback: this.prepareCallback() });
  }

  selectImage = (index) => {
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
  }

  getPhotos = () => {
    let params = { first: 50, mimeTypes: ['image/jpeg'] };
    if (this.state.after) params.after = this.state.after
    if (!this.state.has_next_page) return
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos)
  }

  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    let uris = r.edges.map(i=> i.node).map(i=> i.image).map(i=>i.uri)
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  }

  getItemLayout = (data,index) => {
    let length = width/4;
    return { length, offset: length * index, index }
  }

  prepareCallback() {
    console.log("here")
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      return(selected[index])
    });
    let files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    let callbackResult = Promise
      .all(files)
      .then(imageData=> {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data}
        })
      })
      console.log("files",files)
    this.props.navigation.state.params.imageBrowserCallback(callbackResult);
    this.props.navigation.goBack();
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText =  '已选择' + selectedCount ;
    if (selectedCount === this.props.max) headerText = headerText + ' (Max)';
    return (
      <View style={styles.header}>
        <Button
          title="退出"
          onPress={() => this.props.navigation.pop()}
        />
        <Text>{headerText}</Text>
        <Button
          title="确定"
          onPress={() => this.prepareCallback()}
        />
      </View>
    )
  }

  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
  }

  renderImages() {
    return(
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
  header: {
    height: 60,
    width: width,
    backgroundColor:'#ffffff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
})
