import * as API from "../R.api"
import * as Leaf from "leaf-ts"

let factory = new Leaf.APIFactory({
    prefix: "/api/",
    bodyType: "json",
    root: "http://192.168.0.220:25109"
})

const Authentication = API.GenerateAuthenticatingAPIService(factory)
const Post = API.GeneratePostingAPIService(factory)
const Echo = API.GenerateEchoAPIService(factory)
export class APIService extends Leaf.Service {
    readonly name = "APIService"
    states = []
    Authentication = new Authentication
    Post = new Post
    Echo = new Echo
    setToken(token: string) {
        if (!factory.option.headers) { factory.option.headers = {} }
        factory.option.headers["x-auth-token"] = token
    }
    constructor() {
        super()
    }
}
