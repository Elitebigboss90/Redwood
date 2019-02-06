import { Blob } from "root-ts/lib/builtIn/blobService"
import * as Leaf from "leaf-ts"
import { Config } from "../Config"
export namespace UploadService {
    export type Settings = {
        upload?: {
            root?: string
        }
    }
}

export class UploadService extends Leaf.Service<UploadService.Settings> {
    readonly name = "UploadService"
    constructor(settings?: UploadService.Settings) {
        super({
            upload: {
                root: Config.root
            }
        }, settings)
    }
    upload(file: any, callback: (err?: Error, blob?: Blob) => void) {
        let formData = new FormData()
        formData.append("file", file)
        let xhr = new XMLHttpRequest()
        let url = this.settings.upload.root + "/upload"
        // alert(url)
        xhr.open("POST", url, true)
        xhr.onload = () => {
            let text = xhr.responseText
            let data
            try {
                data = JSON.parse(text)
            } catch (e) {
                callback(new Error("Invalid server response" + text))
                return
            }
            if (data.state) {
                callback(null, data.data)
            } else {
                callback(new Error(JSON.stringify(data.error)))
            }
        }
        xhr.onerror = (e) => {
            // alert(e.message)
            // alert("ERROR?" + JSON.stringify(e))
            callback(new Error("Fail to upload"))
        }
        xhr.send(formData)
    }
}
