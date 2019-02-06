export declare class GestureManager {
    constructor();
    el: HTMLElement;
    config: {
        verticalSwipe: number;
        horizentalSwipe: number;
    };
    states: TouchStates;
    events: Leaf.EventEmitter<{
        swipeLeft: any;
        swipeRight: any;
        swipeUp: any;
        swipeDown: any;
        holdStart: any;
        holdMove: any;
        holdFinish: any;
        tap: any;
        trace: Point[];
    }>;
    attached: boolean;
    attachTo(el: HTMLElement): void;
    detach(): void;
    startPoint: {
        x: number;
        y: number;
    };
    handler: (e: TouchEvent) => void;
}
export declare class TouchStates extends Leaf.States {
    manager: GestureManager;
    constructor(manager: GestureManager);
    atWait(): void;
    protected data: {
        startPoint?: Point;
        trace?: Point[];
    };
    atInit(stale: any, e: TouchEvent): void;
    atHandleMove(): void;
    atFinish(stale: any, e: TouchEvent): void;
    atPanic(): void;
}
export interface Point {
    x: number;
    y: number;
}
