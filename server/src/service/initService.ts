import * as ServiceSpec from "../spec/service"
import * as Settings from "../settings"

export class InitService extends ServiceSpec.Service {
    readonly name = "InitService"
    dependencies = [
        "AuthenticationService",
        "AccountService"
    ]
    constructor(private option: {
        initialize: {
            initDatabase: boolean
        }
    }) {
        super(option)
    }
    async initialize(done) {
        let { initDatabase } = this.option.initialize
        if (initDatabase) {
            this.initAdmin()
            done()
        } else {
            done()
        }
    }
    initAdmin() {
        return new Promise((resolve) => {
            let { meta } = Settings.admin
            this.services.AuthenticationService.get({
                authentication: {
                    type: "common",
                    meta
                }
            }, (err, authentication) => {
                if (!err && authentication) {
                    resolve()
                    return
                }
                this.services.AccountService.register({
                    type: "common",
                    role: "admin",
                    meta
                }, (err, account) => {
                    if (err) {
                        console.log("register", err)
                        resolve()
                        return
                    }
                    resolve()
                })
            })

        })
    }
}