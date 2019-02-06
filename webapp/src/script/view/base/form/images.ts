import { App } from "../../../app"

export class Images extends R.Base.Form.Images {
    name: string
    displayName: string
    imageList: Leaf.List<ImageListItem>
    constructor(option: {
        name: string,
        displayName: string,
    }) {
        super()
        this.name = option.name
        this.displayName = option.displayName
        this.VM.displayName = option.displayName
    }
    getValue(): string[] {
        let srcs: string[] = []
        this.imageList.forEach((item) => {
            srcs.push(item.data.src)
        })
        if (srcs.length < 1) {
            return null
        }
        return srcs
    }
    setValue(srcs: string[] | string) {
        if (!srcs || srcs.length < 1) {
            this.VM.emptyHint = "没有内容"
            return
        }
        if (typeof srcs == "string") {
            srcs = [srcs]
        }
        this.imageList.empty()
        srcs.forEach((src) => {
            let item = new ImageListItem()
            this.imageList.push(item)
            item.show({ src })
        })

    }
    readonly() {
        this.VM.readonly = true
    }
    onChangeInput() {
        let files = this.UI.input.files
        let length = files.length
        if (length > 6) {
            alert("最多上传6张图片")
        }
        this.imageList.empty()
        for (let i = 0; i < length; i++) {
            let file = files[i]
            let item = new ImageListItem()
            this.imageList.push(item)
            item.loading()
            let uploadBlob = App.uploader.upload(file, (err, res) => {
                if (err) {
                    console.error(err)
                    return
                }
                item.show({
                    src: `${res.urls[0].value}`
                })
            })
        }
    }
}



class ImageListItem extends R.Base.Form.Images.ImageListItem {
    data: {
        src?: string
    } = {}
    loading() {
        this.VM.loading = true
    }
    show(data: { src: string }) {
        this.VM.loading = false
        this.VM.src = data.src
        this.data.src = data.src
    }
}
