export declare abstract class ListReflower {
    static reflow(list: Leaf.List, itemHeight: number): void;
    static transform(item: Leaf.WidgetAny, top: any): void;
}
export interface GridReflowable extends Leaf.Widget {
    width?: number;
    height?: number;
    isPadding?: boolean;
    position?: {
        x: number;
        y: number;
    };
}
export declare class GridReflower<TItem extends GridReflowable> {
    readonly list: Leaf.List<TItem>;
    config: {
        margin: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        size: {
            width: number;
            height: number;
            margin: {
                vertical: number;
                horizontal: number;
            };
        };
    };
    constructor(list: Leaf.List<TItem>);
    events: Leaf.EventEmitter<{
        reflow: any;
    }>;
    reflow(): void;
    move: (item: TItem, x: number, y: number) => void;
}
export declare class DynamicGridReflower<TItem extends GridReflowable> {
    readonly list: Leaf.List<TItem>;
    readonly viewport: HTMLElement;
    items: TItem[];
    config: {
        margin: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        size: {
            width: number;
            height: number;
        };
        bufferZone: number;
    };
    constructor(list: Leaf.List<TItem>, viewport?: HTMLElement);
    reflow(): void;
    private runtime;
    private sync();
}
