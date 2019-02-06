import { History } from "../component/history";
export declare class PopupStack {
    readonly base: number;
    index: number;
    popups: PopupBehavior[];
    readonly step: number;
    private cancelBehavior;
    bindHistory(history: History): void;
    constructor(base?: number);
    events: Leaf.EventEmitter<{
        push: PopupBehavior;
        remove: PopupBehavior;
    }>;
    add(p: PopupBehavior): boolean;
    remove(p: PopupBehavior): boolean;
}
export declare class PopupBehavior {
    widget: {
        node: HTMLElement;
    };
    private manager;
    static globalManager: PopupStack;
    zIndex: number;
    isShow: boolean;
    constructor(widget: {
        node: HTMLElement;
    }, manager?: PopupStack);
    readonly events: Leaf.EventEmitter<{
        hide: any;
        show: any;
    }>;
    private mask;
    withoutMask(): void;
    withMask(option?: {
        color?: string;
        opacity?: number;
    }): this;
    isBlocked: boolean;
    shouldBlock(): this;
    whenShow(fn: Function): this;
    whenHide(fn: Function): this;
    show(): this;
    hide(): this;
    private shouldCenter;
    center(): this;
    applyCenter(): {
        x: number;
        y: number;
    };
}
export declare class Mask {
    el: HTMLDivElement;
    constructor();
    events: Leaf.EventEmitter<{
        interact: any;
    }>;
    color(color: string): void;
    opacity(o: number): void;
}
export declare class BackButtonPopupCancelBehavior {
    readonly history: History;
    readonly popups: PopupStack;
    constructor(history: History, popups: PopupStack);
    private stack;
}
