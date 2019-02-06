import { PlatformInformationProvider } from "./platformInformationProvider"
import { CommandManager } from "./commandManager"
const Platform = new PlatformInformationProvider()
export type HotkeyActionHandler = () => boolean
export interface HotkeyConfig {
    // If string, it means a command name
    action: HotkeyActionHandler
    info: KeyInfo
    description: string
    keyString: string
}
export namespace HotkeyConfig {
    const keyStringReg = /^(input:|buffer:|editor:)?((<[^<>]+>\s*)*)([a-z0-9A-Z]+)(\s*@down)?(\s*@up)?$/
    export function normalize(str: string) {
        return str.replace(/\s/g, "").replace(/>/g, "> ")
    }
    export function fromString(str: string): HotkeyConfig {
        let modifierReg = /<([^<]+)>/gi
        let matches = str.match(keyStringReg)
        if (!matches) return null
        let level = matches[1] || "buffer"
        let modifiers = matches[2]
        let config: HotkeyConfig = {
            info: {
                ctrlKey: false,
                shiftKey: false,
                altKey: false,
                commandKey: false
            }
        } as any
        let result;
        while (result = modifierReg.exec(modifiers)) {
            let v = result[1] || ""
            let keyName = result[1].trim().toLowerCase()
            if (keyName === "ctrl")
                config.info.ctrlKey = true
            if (keyName === "alt")
                config.info.altKey = true
            if (keyName === "shift")
                config.info.shiftKey = true
            if (keyName === "mod") {
                if (Platform.isOSX()) {
                    config.info.commandKey = true
                } else {
                    config.info.ctrlKey = true
                }

            }
            if (keyName === "command")
                config.info.commandKey = true
        }
        let keyName = matches[4]
        config.info.code = Leaf.Key[keyName] || -1
        let keyDown = matches[5] && true || false
        let keyUp = matches[6] && true || false
        if (!keyDown && !keyUp) {
            keyDown = true
        }
        let keyString = HotkeyConfig.normalize(str)
        config.keyString = keyString
        if (keyUp) {
            config.info.type = "up"
        }
        if (keyDown) {
            config.info.type = "down"
        }
        return config
    }
}
export class HotkeySolution {
    public candidates: HotkeyConfig[] = []
    public blacklist: HotkeyConfig[] = []
    constructor(public commandManager?: CommandManager) {
    }
    register(keyString: string, todo: string | HotkeyActionHandler, description?: string) {
        let config = HotkeyConfig.fromString(keyString)
        if (typeof todo == "function") {
            config.action = todo as any
        } else {
            config.action = this.createCommandHandler(todo)
            config.description = this.commandManager.getCommandDescription(todo)
        }
        config.description = description || config.description || `Not description for ${keyString}`
        this.candidates.push(config)
        return this
    }
    block(keyString: string, description?: string) {
        let config = HotkeyConfig.fromString(keyString)
        config.description = description || keyString
        this.blacklist.push(config)
    }
    createCommandHandler(name: string) {
        return () => {
            return this.commandManager.conduct(name)
        }
    }
}
export class HotkeyManager {
    constructor(public commandManager: CommandManager) {
        this.use(this.solution("default"))
    }
    private solutions: {
        [key: string]: HotkeySolution
    } = {}
    private currentSolution: HotkeySolution = null
    use(solution: HotkeySolution | string) {
        if (typeof solution == "string") {
            let name: string = solution
            if (!this.solutions[name]) {
                throw new Error("Unknown hotkey solution:" + name)
            }

            this.currentSolution = this.solutions[name]
        } else {
            this.currentSolution = solution
        }
        return this
    }
    solution(name: string = "default"): HotkeySolution {
        if (!this.solutions[name]) {
            this.solutions[name] = new HotkeySolution(this.commandManager)
        }
        return this.solutions[name]
    }
    test(info: KeyInfo, config: HotkeyConfig): boolean {
        if (info.code !== config.info.code) return false
        if (info.type !== config.info.type) return false
        let metas = ["alt", "ctrl", "command", "shift"]
        for (let meta of metas) {
            if (config.info[meta + "Key"] !== info[meta + "Key"]) {
                return false
            }
        }
        return true
    }
    handle(e: KeyboardEvent): boolean {
        let result = ((e) => {
            let info = KeyInfo.fromEvent(e)
            let todos = this.currentSolution.candidates.reverse()
            for (let cand of todos) {
                if (this.test(info, cand)) {
                    let result = false
                    try {
                        result = cand.action()
                    } catch (e) {
                        console.error("hotkey error", e, info)
                        console.error(e)
                    }
                    if (result) return result
                }
            }
            for (let block of this.currentSolution.blacklist) {
                if (this.test(info, block)) {
                    console.debug("Block", block.keyString, block.description)
                    return true
                }
            }
        })(e)
        if (result) {
            e.stopImmediatePropagation()
            e.preventDefault()
        }
        return result
    }

}
export interface KeyInfo {
    altKey: boolean
    ctrlKey: boolean
    commandKey: boolean
    shiftKey: boolean
    code: number
    type: "up" | "down"
}
export namespace KeyInfo {
    export let hasCommand: boolean = false
    export function fromEvent(e: KeyboardEvent): KeyInfo {
        const TypeMap = {
            "keydown": "down",
            "keyup": "up",
        }
        let info: KeyInfo = {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            commandKey: KeyInfo.hasCommand,
            shiftKey: e.shiftKey,
            code: e.which,
            type: TypeMap[e.type],
        }
        return info
    }
    let clearCmdTimer
    export function applyGlobalKeyListener() {
        window.addEventListener("keydown", (e) => {
            if (e.which in [224, 91, 93] && Platform.isOSX()) {
                hasCommand = true
                clearTimeout(clearCmdTimer)
                clearCmdTimer = setTimeout(() => {
                    hasCommand = false
                }, 5000)
            }
        })
        window.addEventListener("keyup", (e) => {
            if (e.which in [224, 91, 93] && Platform.isOSX()) {
                hasCommand = false
            }
        })
        window.addEventListener("focus", (e) => {
            hasCommand = false
        })
        window.addEventListener("blur", (e) => {
            hasCommand = false
        })
    }
}
// let hm = new HotkeyManager()
// // or let cm = new CommandManager()
// //    let hm = new HotkeyManager(cm)
// let solution = new HotkeySolution()
// solution.register("<ctrl><shift><mod><cmd><alt> up",()=>{...})
// solution.register("<ctrl><shift><mod><cmd><alt> j","command name")
