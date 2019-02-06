import { PopupBehavior } from "./popupBehavior";
export declare type Direction = "left" | "top" | "bottom" | "right";
export interface Fix {
    x?: number;
    y?: number;
}
export declare class StickyBehavior {
    readonly asPopup: PopupBehavior;
    sticky: HTMLElement;
    stickToNode: HTMLElement;
    private fix;
    private direction;
    constructor(asPopup: PopupBehavior);
    stickTo(stickyToNode: HTMLElement, option?: {
        direction?: Direction;
        fix?: Fix;
    }): void;
    private toLeft(rectObject);
    private toRight(rectObject);
    private toBottom(rectObject);
    private toTop(rectObject);
    private apply();
    toFix(fix: Fix): void;
}
