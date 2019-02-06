import * as pathModule from "path"
import { Flow } from "root-ts-flow/lib/flow"
import { Context } from "root-ts-flow/lib/context"
import { Action } from "root-ts-flow/lib/action"
import * as fs from "fs"

let file = "./register.flow.js"
let fp = pathModule.join(__dirname, file)
let actions = Action.actionsFromScriptRecursive(fp)

let context = new Context({
    apiPathes: [
        pathModule.join(__dirname, "../webapp/src/script/R.api.js"),
        pathModule.join(__dirname, "../server/node_modules/root-ts/frontend/src/script/R.api.js")
    ],
    host: "120.55.44.120",
    port: parseInt(fs.readFileSync(pathModule.join(__dirname, "../meta/port"), "utf8"))
})

console.log(context.option.port)
let flow = new Flow(context, actions)


let session = flow.go((err) => {
    if (err) {
        console.error(err)
    } else {
        console.error(":-)")
    }
})

session.verbose = true
