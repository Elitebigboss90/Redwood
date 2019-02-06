/// <reference path="./spec/type.d.ts" />
import { ServiceContext } from "root-ts/lib/service"
import * as BuiltInService from "root-ts/lib/builtInService"
import * as Settings from "./settings"
import * as pathModule from "path"
import * as BuiltIn from "root-ts/lib/builtInService"
import { AccountAPIService } from "root-ts/route/api.account"
import { setTimeout } from "timers";
if (Settings.debug) {
    console.log("Debug mode: On")
}

export const context = new ServiceContext(Settings)
context.register(new BuiltIn.UploadService(Settings))
context.register(new BuiltIn.BlobService(Settings))
context.loadServices(pathModule.join(__dirname, "./service/"))
context.loadServices(pathModule.join(__dirname, "./route/"))
context.register(new BuiltInService.DefaultPageService(Settings))
context.register(new AccountAPIService(Settings))

context.setup((err) => {
    if (err) {
        console.error(err)
        console.error("Fail to setup service")
        process.exit(1)
    }
    console.log("All services ready")

})

if (!Settings.debug) {
    process.on("uncaughtException", (e) => {
        console.error(new Date, "Uncaught Fatal error", e)
    })
}
