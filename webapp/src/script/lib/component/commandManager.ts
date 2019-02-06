import { HotkeySolution } from "./hotkeyManager"
export interface Command {
    name: string
    invoke: (...args: any[]) => boolean
    description: string
}
export class CommandManager {
    private commands: {
        [name: string]: Command
    } = {}
    constructor() { }
    private lastDeclaration: Command = null
    register(cmd: Command) {
        if (this.commands[cmd.name]) throw new Error("Duplicate command:" + cmd.name)
        this.commands[cmd.name] = cmd
        this.lastDeclaration = cmd
        return this
    }
    command(name: string, description: string, invoke: (...args: any[]) => boolean) {
        return this.register({
            name, description, invoke
        })
    }
    conduct(name: string, ...args: any[]): boolean {
        let cmd = this.commands[name]
        if (!cmd) return false
        return cmd.invoke(...args)
    }
    has(name: string) {
        return this.commands[name] && true || false
    }
    getCommandDescription(name: string) {
        if (!this.has(name)) {
            return null
        }
        return this.commands[name].description || null
    }
    key(str: string, solution: HotkeySolution = this.currentSolution) {
        solution.register(str, this.lastDeclaration.name)
        return this
    }
    private currentSolution: HotkeySolution
    solution(solution: HotkeySolution) {
        this.currentSolution = solution
        return this
    }
}
