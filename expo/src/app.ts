import { Root } from "./root"
export class Application {
    initialize() {
        this.root = new Root()
        let cp = new this.root.Component()
    }
    root: Root
    log() {
        console.error("~~~")
    }
}

export const App = new Application()

