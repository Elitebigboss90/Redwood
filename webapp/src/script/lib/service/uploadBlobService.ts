
export type Callback<TData = any> = (err?: Error, data?: TData) => void
export interface UploadBlob {
    name?: string
    blob: Blob | File
}

export interface Progress {
    number: number,
    percent: string
}

export class UploadInfo {
    events = new Leaf.EventEmitter<{
        progress: Progress
        result
    }>()
}

export class UploadBlobService extends Leaf.Service {
    readonly name = "UploadBlobService"
    //it is same with backend uploadBlobService webuploadBlobRoute
    readonly uploadRoute = "upload"
    //it is same with backup blobService webdownloadRoute
    readonly downloadRoute = "blob"
    serverPath: string
    host: string
    states = []
    constructor(config: {
        host: string
    }) {
        super()
        this.host = config.host
        this.serverPath = `${this.host}/${this.uploadRoute}`

    }

    upload(blob: UploadBlob) {
        let xhr = new XMLHttpRequest()
        let formData = new FormData();
        let uploadInfo = new UploadInfo()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let res = JSON.parse(xhr.responseText)
                if (xhr.status == 200) {
                    uploadInfo.events.emit("result", res)
                } else {
                    uploadInfo.events.emit("result", res)
                }
            }
        }
        formData.append("file", blob.blob)
        formData.append("filename", blob.name)
        xhr.open("POST", this.serverPath, true)
        xhr.upload.onprogress = (ev) => {
            let progress: Progress = {
                number: 0,
                percent: `0%`
            }
            if (ev.lengthComputable) {
                let number = Math.round(10000 * ev.loaded / ev.total) / 100;
                progress.number = number
                progress.percent = number + "%"
                if (ev.loaded == ev.total) {
                    let number = 100
                    progress.number = number
                    progress.percent = number + "%"
                }
            }
            uploadInfo.events.emit("progress", progress)
        }
        xhr.send(formData);
        return uploadInfo
    }

    download(option: { blobId: string }, callback) {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let res = JSON.parse(xhr.responseText)
                if (xhr.status == 200) {
                    if (res.url) {
                        callback(null, `${this.host}${res.url}`)
                    } else {
                        callback(new Error("get downloadUrl failed"))
                    }
                } else {
                    callback(new Error(`status:${xhr.status},msg:${res.error}`))
                }
            }
        }
        let url = `${this.serverPath}?blobId=${option.blobId}`
        xhr.open("GET", url, true)
        xhr.send();
    }
}