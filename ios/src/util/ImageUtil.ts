import * as React from "react"
import { ImageManipulator, FloatFromZeroToOne, Camera } from "expo"
import { Image, CameraRoll, Platform } from "react-native"
import * as RNFS from "react-native-fs"  // no configuration in ios, you should not use it in ios
import { unlink } from "fs";


export namespace ImageUtil {

    export interface ImageSize {
        width?: number,
        height?: number,
    }

    interface ImageResult {
        uri: string;
        width: number;
        height: number;
        base64?: string;
    }

    interface CropParameters {
        originX: number;
        originY: number;
        width: number;
        height: number;
    }

    interface ImageManipulationOptions {
        resize?: { width?: number; height?: number };
        rotate?: number;
        flip?: { vertical?: boolean; horizontal?: boolean };
        crop?: CropParameters;
    }

    export function sizeToLimit(size: ImageSize, lsize: ImageSize) {
        if (!size.width || !size.height || !lsize.width || !lsize.height) return size
        const ratio = size.width / size.height
        const lratio = lsize
        if (size.width <= lsize.width && size.height <= lsize.height) {
            return size
        }
        if (ratio <= lratio) {
            return { width: lsize.height * ratio, height: lsize.height }
        } else {
            return { width: lsize.width, height: lsize.width / ratio }
        }
    }

    export function getSize(uri: string, callback: Callback<ImageSize>) {
        if (!uri) {
            callback(new Error("InvalidParameter"), null)
        }
        Image.getSize(uri, (width, height) => {
            callback(null, { width: width, height: height })
        }, (err) => {
            callback(err, null)
        })
    }

    export function getSizes(uris: string[], callback: Callback<ImageSize[]>) {
        if (uris === null || uris.length === 0) {
            callback(new Error("InvalidParameter"), null)
            return
        }
        let sizes: ImageSize[] = []
        uris.forEach((uri, index) => {
            getSize(uri, (err, size) => {
                if (err) callback(err, null)
                sizes[index] = { width: size.width, height: size.height }
                if (sizes.length === uris.length) {
                    console.log(sizes)
                    callback(null, sizes)
                }
            })
        });
    }

    export function manipulate(
        uri: string,
        option: {
            action?: ImageManipulator.ImageManipulationOptions,
            compressQuality?: FloatFromZeroToOne,
            format?: "jpeg" | "png",
        },
        callback: Callback<ImageManipulator.ImageResult>
    ) {
        if (!uri) return
        let actions: ImageManipulator.ImageManipulationOptions[] = []
        actions.push(option.action)
        ImageManipulator.manipulate(
            uri,
            actions,
            { compress: option.compressQuality || 0.7, format: option.format || "jpeg" }
        ).then((result) => {
            callback ? callback(null, result) : null
        }).catch(e => {
            callback ? callback(e, null) : null
        })
    }

    export function saveToRoll(url: string, callback: Callback<string>): void {
        if (!url) {
            callback(new Error("InvaldParameter"), null)
            return
        }
        if (Platform.OS == "ios") {
            CameraRoll.saveToCameraRoll(url, "photo").then((uri) => {
                callback(null, uri)
                return
            }).catch((e) => {
                callback(e, null)
            })
        } else if (Platform.OS == "android") {
            let root = RNFS.PicturesDirectoryPath
            //console.log(RNFS.DocumentDirectoryPath, RNFS.ExternalStorageDirectoryPath, RNFS.MainBundlePath, RNFS.CachesDirectoryPath)
            let path = root + Date.now() + ".jpg"
            //console.log("rnfs file path", path)
            let unlinkFile = (path: string, callback?: Callback<null>) => {
                RNFS.unlink(path).then(() => {
                    callback(null)
                }).catch((e) => {
                    callback(e)
                })
            }
            RNFS.downloadFile({
                fromUrl: url,
                toFile: path,
                background: true,
                begin: (res) => {
                }
            }).promise.then((res) => {
                let filePath = "file://" + path
                CameraRoll.saveToCameraRoll(filePath, "photo").then((uri) => {
                    unlinkFile(path)
                    callback(null, uri)
                    return
                }).catch((e) => {
                    unlinkFile(path)
                    callback(e)
                })
            }).catch((e) => {
                callback(e, null)
            })
        }
    }
}
