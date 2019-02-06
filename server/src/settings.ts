import * as commander from "commander"
import * as pathModule from "path"
let program = commander.option("--debug", "Enable debug mode")
    .option("--port <port>", "Specify the listening port instead of the default settings")
    .option("--host <host>", "Specify the listening host instead of the default setiings ")

    .option("--db-host <dataBaseHost>", "Specity database host")
    .option("--db-port <dataBasePort>", "Specity database port")
    .option("--db-name <dataBaseName>", "Specity database name")

    .option("--project-name <projectName>", "Specify the project name")
    .option("--project-domain <projectDomain>", "Specify the domain name")

    // init
    .option("--init-database", "Initialize database")
    .parse(process.argv)

    // etc
    .option("--offline", "Don't listen to http-port, we will do something and then go offline")
    .option("--test", "Specify using test mode")

declare const __dirname: string
export const project = {
    name: program["projectName"] || "AnonymouseProject",
    domain: program["projectDomain"] || "test.fusroda.io",
    debug: program["debug"] && true || false,
    test: program["test"] && true || false,
    offline: program["offline"]
}
export const debug: boolean = program["debug"] && true || false


export const staticRoot = debug && pathModule.join(__dirname, "../../webapp/src") || pathModule.join(__dirname, "../../dist/webapp/")
export const http = {
    port: parseInt(program["port"]) || 10096,
    host: program["host"] || "0.0.0.0",
    offline: program["offline"],
    session: {
        secret: "6d6af3ef1973b6f5"
    },
    staticResources: [{
        path: staticRoot,
        route: null
    }]
}


export const user = {
    salt: "9c018e80a8c4b754",
    blacklist: ["offline", "admin", "share", "public", "private", "jitaku", "guest", "view", "dashboard", "markoff", "home", "setting", "settings", "config", "configs", "notebook", "login", "introduction", "stream", "config", "public", "private", "guest", "history", "note", "notes", "all", "reset", "bot", "api", "document", "organization"]
}

export const database = {
    host: program["dbHost"] || "localhost",
    port: program["dbPort"] || 27017,
    name: program["dbName"] || project.name + (project.test && "-test" || "")
}
export const email = {
    fromEmail: "test@" + project.domain,
    fromName: "test",
    siteBase: `https://${project.domain}/`
}


export const page = {
    default: pathModule.join(staticRoot, "index.template.html")
}

export const initialize = {
    offline: program["offline"],
    initDatabase: program["initDatabase"]
}


export const phoneValidation = {
    magicCode: "abcdefg",
    expires: 1000 * 60 * 15,
    // aliSMS: {
    //     accessKeyId: "LTAIz0HfmTBUHAEO",
    //     secretAccessKey: "iUDeJKtEGHkFL3bLInOVm06RiOhHZr",
    //     TemplateCode: "SMS_129420075",
    //     SignName: "木頭木佬"
    // }
    aliSMS: {
        accessKeyId: "LTAIaHEjLnBkXpAY",
        secretAccessKey: "fzwMWdmyzhOcZFTdM5MoJqoClN5n25",
        TemplateCode: "SMS_140005248",
        SignName: "木頭木佬"
    }
}

export const category = [
    "运输"
]

export const blob = {
    storage: project.debug && "/tmp/blob" || "/storage/fzc/blob"
}
export const upload = {
    temp: project.debug && "/tmp/upload" || "/storage/fzc/upload"
}

export const shop = {
    enableDebugPayment: project.debug
}

export const admin = {
    meta: {
        name: "mtml",
        email: "test@test.com",
        password: "888888"
    }
}

export const wechat = {
    appId: "wx84bd33fbc16c10b7",
    secret: "3704828f306a9b90752029191d25ba69",
    domain: {
        filename: null,
        content: null,
    },
    baseUrl: "https://" + project.domain + "/",
    payment: {
        merchantId: "1503383261",
        key: "cee268408fa3609e33d4d49dacdf9883",
        notificationUrl: "https://" + project.domain + "/wechat/payment/notifiy_callback"
    }
}

export const endless = {
    count: 100
}
