import * as ServiceSpec from "../spec/service"

export class PlatformService extends ServiceSpec.PlatformService {
    initialize() {
        this.getInformation({}, (err, info) => {
            if (err) {
                console.log("Failed to get platform information")
            }
            this.infomation = info
        })
    }
    infomation: PlatformService.Information
    setInformation(option: Partial<PlatformService.Information>, callback: Callback<PlatformService.Information>) {
        this.services.KeyValueStorage.get<PlatformService.Information>("platformInfomation", (err, info) => {
            if (err || !info) {
                info = {}
            }
            for (let key in option) {
                info[key] = option[key]
            }
            console.log(info)
            this.services.KeyValueStorage.set<PlatformService.Information>("platformInfomation", info, (err) => {
                this.infomation = info
                callback(err, info)
            })
        })
    }
    getInformation(option: {}, callback: Callback<PlatformService.Information>) {
        this.services.KeyValueStorage.get<PlatformService.Information>("platformInfomation", (err, info) => {
            callback(err, info)
        })
    }
}