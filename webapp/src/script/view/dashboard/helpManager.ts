import { HelpEditor } from "./editors";
import { App } from "../../app";

export class HelpManager extends R.Dashboard.HelpManager {
    constructor() {
        super()
        this.refresh()
    }
    data: {
        content?: string
    } = {}
    refresh() {
        App.api.Posting.queryPosts({
            count: 1,
            category: "使用帮助",
            type: "help"
        }, (err, res) => {
            if (!res || res.length < 1) {
                return
            }
            let content = res[0].content
            this.VM.content = content
            this.data.content = content
        })
    }
    onClickEdit() {
        console.log("click")
        let ed = new HelpEditor()
        let content = this.data.content || ""
        console.log(content)
        ed.edit({ content }, (err, res) => {
            console.log(res)
            App.api.Posting.createPost({
                title: "使用帮助",
                content: res.content,
                type: "help",
                category: "使用帮助",
                meta: null
            }, (err, res) => {
                if (err) {
                    console.error(err)
                    alert("修改失败，请重试")
                }
                alert("修改成功")
                this.refresh()
            })
        })
    }
}