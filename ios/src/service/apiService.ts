import { AsyncStorage } from "react-native"
import * as API from "../R.api"
import * as Leaf from "leaf-ts"
import { Config } from "../Config"

let factory = new Leaf.APIFactory({
    prefix: "/api/",
    bodyType: "json",
    root: Config.root
})

const Echo = API.GenerateEchoAPIService(factory)
const Authentication = API.GenerateAuthenticatingAPIService(factory)
const Post = API.GeneratePostingAPIService(factory)
const Shop = API.GenerateShoppingAPIService(factory)
const Transport = API.GenerateTransportAPIService(factory)
const Account = API.GenerateAccountPropAPIService(factory)
const Platform = API.GeneratePlatformAPIService(factory)
// const Sell = API.GenerateSellingAPIService(factory)
// const Advertise = API.GenerateAdvertisingAPIService(factory)

export class APIService extends Leaf.Service {
    readonly name = "APIService"
    states = []
    Echo = new Echo
    Authentication = new Authentication
    Post = new Post
    Shop = new Shop
    Transport = new Transport
    Account = new Account
    Platform = new Platform


    constructor() {
        super()
    }

    setToken(token: string) {
        if (!factory.option.headers) { factory.option.headers = {} }
        factory.option.headers["x-auth-token"] = token
    }

    handleNeedToken(receiver: any, tokenHandler?: (token: string) => void, noTokenHandler?: () => void) {
        if (!receiver) {
            return
        }
        this.handleToken((token) => {
            this.setToken(token)
            tokenHandler ? tokenHandler(token) : null
        }, () => {
            receiver.props.navigation.navigate("Auth")
            noTokenHandler ? noTokenHandler() : null
        })
    }

    handleToken(tokenHandler: (token: string) => void, noTokenHandler?: () => void) {
        AsyncStorage.getItem(Config.keys.token).then((token) => {
            if (token) {
                tokenHandler ? tokenHandler(token) : null
            } else {
                noTokenHandler ? noTokenHandler() : null
            }
        })
    }

    handlerCommonError(receiver: any, err: Error) {
        if (!err) return
        if (!receiver)
            if (err.name === "Forbidden") {
                receiver.props.navigation.navigate("Auth")
                return
            }
    }
}
