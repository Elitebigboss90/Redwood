import { CommandManager } from "./commandManager";
export declare type HotkeyActionHandler = () => boolean;
export interface HotkeyConfig {
    action: HotkeyActionHandler;
    info: KeyInfo;
    description: string;
    keyString: string;
}
export declare namespace HotkeyConfig {
    function normalize(str: string): string;
    function fromString(str: string): HotkeyConfig;
}
export declare class HotkeySolution {
    commandManager: CommandManager;
    candidates: HotkeyConfig[];
    blacklist: HotkeyConfig[];
    constructor(commandManager?: CommandManager);
    register(keyString: string, todo: string | HotkeyActionHandler, description?: string): this;
    block(keyString: string, description?: string): void;
    createCommandHandler(name: string): () => boolean;
}
export declare class HotkeyManager {
    commandManager: CommandManager;
    constructor(commandManager: CommandManager);
    private solutions;
    private currentSolution;
    use(solution: HotkeySolution | string): this;
    solution(name?: string): HotkeySolution;
    test(info: KeyInfo, config: HotkeyConfig): boolean;
    handle(e: KeyboardEvent): boolean;
}
export interface KeyInfo {
    altKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    shiftKey: boolean;
    code: number;
    type: "up" | "down";
}
export declare namespace KeyInfo {
    let hasCommand: boolean;
    function fromEvent(e: KeyboardEvent): KeyInfo;
    function applyGlobalKeyListener(): void;
}
