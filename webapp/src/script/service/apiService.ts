import * as API from "../R.api"
import * as RootAPI from "../R.root.api"
import { platform } from "os";

const Account = RootAPI.GenerateAccountAPIService()
const Echo = API.GenerateEchoAPIService()
const Posting = API.GeneratePostingAPIService()
const Shopping = API.GenerateShoppingAPIService()
const Platform = API.GeneratePlatformAPIService()
const AccountQuery = API.GenerateAccountQueryAPIService()
const AccountProp = API.GenerateAccountPropAPIService()
export class APIService extends Leaf.Service {
    readonly name = "APIService"
    states = []
    Echo = new Echo
    Posting = new Posting
    Shopping = new Shopping
    Account = new Account
    AccountQuery = new AccountQuery
    AccountProp = new AccountProp
    Platform = new Platform
    constructor() {
        super({}, {})
        // this.Posting.factory.option.mock = true
        this.Posting.queryPosts.mock({
            type: "article",
            keyword: ""
        }, null, [
                {
                    id: "1",
                    authorName: "1",
                    authorId: "1",
                    type: "article",
                    createAt: Date.now(),
                    title: "红木小知识",
                    content: "一个红木小知识",
                    images: ["https://i2.kknews.cc/SIG=3vd9q75/127n00026ssn323p4s67.jpg"]
                }
            ])

    }
}
