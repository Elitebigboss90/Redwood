import { Blob } from "root-ts/service/blobService"
export namespace UploadService {
    export type Settings = {
        upload?: {
            root?: string
        }
    }
}


export class UploadService extends Leaf.Service {
    readonly name = "UploadService"
    readonly uploadRoute = "upload"
    readonly downloadRoute = "blob"
    host: string
    states = []
    constructor(config: {
        host: string
    }) {
        super()
        this.host = config.host
    }
    upload(file: File, callback: (err?: Error, blob?: Blob) => void) {
        let formData = new FormData()
        formData.append("file", file)
        let xhr = new XMLHttpRequest()
        let url = `${this.host}/${this.uploadRoute}`
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
            alert(e.message)
            alert("ERROR?" + JSON.stringify(e))
            callback(new Error("Fail to upload"))
        }
        xhr.send(formData)
    }
}
