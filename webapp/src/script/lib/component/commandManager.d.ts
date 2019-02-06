import { HotkeySolution } from "./hotkeyManager";
export interface Command {
    name: string;
    invoke: (...args: any[]) => boolean;
    description: string;
}
export declare class CommandManager {
    private commands;
    constructor();
    private lastDeclaration;
    register(cmd: Command): this;
    command(name: string, description: string, invoke: (...args: any[]) => boolean): this;
    conduct(name: string, ...args: any[]): boolean;
    has(name: string): boolean;
    getCommandDescription(name: string): string;
    key(str: string, solution?: HotkeySolution): this;
    private currentSolution;
    solution(solution: HotkeySolution): this;
}
