import { Point } from "./vector";
export declare class VisualDesignContext2D<TMarks extends {
    [name: string]: {
        x: number;
        y: number;
        relative?: "begin" | "center" | "end";
    };
} = {}, TColors = {}, TSizes = {}, TConst = any> {
    readonly design: {
        width: number;
        height: number;
        offset: {
            top: number;
            left: number;
            right: number;
            bottom: number;
        };
        clipWidth: number;
        clipHeight: number;
    };
    width: number;
    height: number;
    ratio: number;
    stretch: number;
    marks: {
        [K in keyof TMarks]: Point;
    };
    visualPosition: {
        [K in keyof TMarks]: VisualPosition;
    };
    colors: TColors;
    sizes: TSizes;
    sizesStretched: TSizes;
    const: TConst;
    private _sizes;
    constructor(option: {
        width: number;
        height: number;
        offset?: {
            top?: number;
            left?: number;
            right?: number;
            bottom?: number;
        };
        marks?: TMarks;
        colors?: TColors;
        sizes?: TSizes;
        const?: TConst;
    });
    addMark(name: string, info: {
        x: number;
        y: number;
        relative?: "begin" | "center" | "end";
        keepRelative?: boolean;
    }): void;
    resize(width?: number, height?: number): this;
    see<T>(data: T, stretch?: boolean): T;
    see(n: number, stretch?: boolean): number;
    see(p: Point, stretch?: boolean): Point;
    retain(v: number): number;
}
export declare class VisualPosition {
    private readonly context;
    point: Point;
    constructor(context: VisualDesignContext2D, point?: Point);
    private from;
    private shouldKeepRelative;
    move(option: Point): void;
    get(): Point;
    private scalarStretch(scalar, stretchRelative, stretch, keepRelative?);
    getDesign(): Point;
    relativeTo(pos: "begin" | "center" | "end"): void;
    keepRelative(): void;
}
