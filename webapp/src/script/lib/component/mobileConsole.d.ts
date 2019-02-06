import { Inspector } from "./inspector";
export declare class MobileConsole extends Leaf.Widget {
    constructor();
    inspect: Inspector;
    log(...args: any[]): void;
    error(...args: any[]): void;
    content(args: any[], color: string): void;
    isShow: any;
    show(force?: boolean): void;
    hide(): void;
    toggle(): void;
    static initialize(): MobileConsole;
    static console: MobileConsole;
}
