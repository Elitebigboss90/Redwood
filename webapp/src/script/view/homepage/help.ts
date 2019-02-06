import { App } from "../../app";

export class Help extends R.Homepage.Help {
    constructor() {
        super()
        this.refresh()
    }
    refresh() {
        App.api.Posting.queryPosts({
            count: 1,
            category: "使用帮助",
            type: "help"
        }, (err, res) => {
            if (err) {
                this.VM.content = "请求失败，请重试"
                return
            }
            this.VM.content = res[0].content
        })
    }
}