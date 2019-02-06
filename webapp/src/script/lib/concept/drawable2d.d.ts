import { Point, Vector2 } from "./vector";
export interface IDrawable2D {
    draw(context: CanvasRenderingContext2D): any;
    position: Point;
    rotate: number;
    scale: Vector2;
}
export interface IIteratable {
    next(delta: number): boolean;
    reset(): any;
}
export interface IInlineEffect extends IIteratable {
    decorate(context: CanvasRenderingContext2D): any;
}
export declare abstract class DrawableObject implements IDrawable2D {
    position: Point;
    scale: Vector2;
    origin: Point;
    rotate: number;
    draw(context: CanvasRenderingContext2D): void;
    next(t: number): void;
    abstract onDraw(context: CanvasRenderingContext2D): any;
    effect<T extends IInlineEffect>(e: T): T;
    effects: IInlineEffect[];
}
export declare const Drawable: typeof DrawableObject;
export declare class Group extends DrawableObject {
    onDraw(context: any): void;
    children: IDrawable2D[];
    add<T extends IDrawable2D>(...items: T[]): this;
    remove<T extends IDrawable2D>(target: T): this;
    next(t: number): void;
}
export declare class Scene extends Group {
    canvas: HTMLCanvasElement;
    constructor(canvas?: HTMLCanvasElement);
    resize(option?: {
        width?: number;
        height?: number;
        devicePixelRatio?: number;
    }): void;
    width: number;
    height: number;
    devicePixelRatio: number;
    render(): void;
    time: TimeControl;
    private framer;
    readonly fps: number;
    do(handler: Function): void;
    pause(): void;
}
export declare class Image extends DrawableObject {
    readonly src: string;
    option: {
        width?: number;
        height?: number;
    };
    private el;
    constructor(src: string, option?: {
        width?: number;
        height?: number;
    });
    width: number;
    height: number;
    onDraw(context: CanvasRenderingContext2D): void;
}
export declare abstract class FrameSprite extends DrawableObject implements IIteratable {
    frameInterval: number;
    abstract generateFrames(): ImageSlice[];
    frames: ImageSlice[];
    frameIndex: number;
    private time;
    next(delta: any): boolean;
    reset(): void;
}
export declare class ImageClip extends DrawableObject {
    readonly src: any;
    option: {
        ratio?: number;
        width?: number;
        height?: number;
        origin?: "center" | Vector2;
    };
    image: HTMLImageElement;
    constructor(src: any, option?: {
        ratio?: number;
        width?: number;
        height?: number;
        origin?: "center" | Vector2;
    });
    onDraw(context: CanvasRenderingContext2D): void;
}
export declare class TimeControl {
    base: number;
    prev: number;
    next(): number;
}
export interface ImageSlice {
    image: HTMLImageElement;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
}
