export interface PositionItem {
    name: string;
    element: HTMLElement;
}
export declare class TargetScroller {
    readonly scrollable: HTMLElement;
    private positionItems;
    private lastFireEvent;
    private scrollDistanceRate;
    private scrollToElement;
    constructor(scrollable: HTMLElement);
    events: Leaf.EventEmitter<{
        at: string;
    }>;
    add(name: string, target: HTMLElement): void;
    goto(name: string): void;
    private start();
    private animation();
    next(): boolean;
    private get(name);
    private check(e);
    private getPositionInfoList();
}
