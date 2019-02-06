try {
    var Leaf = window["Leaf"]
    var _d = Leaf.Util
} catch (e) {
    var Leaf = require("leaf-ts")
}
export function GenerateAccountAPIService<T extends (new (...args: any[]) => {}) = new (...args: any[]) => {}>(factory: Leaf.APIFactory = new Leaf.APIFactory({ prefix: "/api/", bodyType: "json", serializer: Leaf.Serializer.getDefault() }), Base: T = class { } as any) {
    return class extends Base {
        public factory = factory
        getCurrentAccount = factory.createAPIFunction<{}, AccountService.Account>({
            method: "POST",
            path: "account/me/GET"
        })
        webLoginStandard = factory.createAPIFunction<{
            login: string
            password: string
        }, {
                account: AccountService.Account
            }>({
                method: "POST",
                path: "account/authentication/standard/GET"
            })
        getTokenStandard = factory.createAPIFunction<{
            login: string
            password: string
        }, {
                account: AccountService.Account
                token: string
            }>({
                method: "POST",
                path: "account/authentication/standard/token/GET"
            })
        registerStandard = factory.createAPIFunction<{
            name: string
            password: string
            email: string
        }, {
                account: AccountService.Account
            }>({
                method: "POST",
                path: "account/authentication/standard"
            })
    }
}
