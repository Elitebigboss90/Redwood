import { FastClick } from "./lib/fastclick"
import * as Settings from "./settings"
import { APIService } from "./service/apiService"
import { RouteService } from "./lib/service/routeService"
import { Layout as DashboardLayout } from "./view/dashboard/layout"
import { Layout as HomepageLayout } from "./view/homepage/layout"
import { UploadService } from "./service/uploadService";
import { Privacy } from "./view/homepage/privacy";
import { Help } from "./view/homepage/help";

class Application {
    events = new Leaf.EventEmitter<{
        initializing
        initialized
    }>()
    constructor() {
    }
    services = new Leaf.ServiceContext()
    api = this.services.register(new APIService())
    router = this.services.register(new RouteService())
    uploader = this.services.register(new UploadService({ host: `${window.location.protocol}//${window.location.host}` }))
    initialize() {
        this.events.emit("initializing")
        // Solve mobile problem
        FastClick.attach(document.body);
        // All other code goes here

        this.events.emit("initialized")
        this.services.setup(() => {
            // Invoke echo api service
            this.api.Echo.echo({
                name: "name",
                content: "QAQ"
            }, (err, result) => {
                console.log(err, result)
            })
            this.setupRoutes()
        })
    }
    setupRoutes() {
        this.router.events.listenBy(this, "unhandledUrl", () => {
            let scene = new Scene("homepage", new HomepageLayout())
        })
        this.router.route("/dashboard", () => {

            let scene = new Scene("dashboard", new DashboardLayout())
        })
        this.router.route("/privacy", () => {
            let scene = new Scene("privacy", new Privacy())
        })
        this.router.route("/help", () => {
            document.title = "使用帮助"
            let scene = new Scene("help", new Help())
        })
        this.router.handle(window.location.toString())
    }
}

namespace Scene {
    type Layout = Leaf.Widget & {
        content: HTMLElement
    }
}
class Scene {
    constructor(public name: string, public layout: Leaf.Widget) {
        document.body.innerHTML = ""
        document.body.appendChild(this.layout.node)
    }
}

export const App = new Application()

window["App"] = App
