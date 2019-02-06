export interface Vector2 {
    x: number;
    y: number;
}
export declare type Point = Vector2;
export declare namespace Vector2 {
    function fromTouchCenter(e: TouchEvent): Vector2;
    function fromTouch(touch: Touch): Vector2;
    function center(...vecs: Vector2[]): Vector2;
    function substract(v1: Vector2, v2: Vector2): Vector2;
    function sum(...vecs: Vector2[]): Vector2;
}
export declare const Point: typeof Vector2;
