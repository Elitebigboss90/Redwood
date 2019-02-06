export interface Vector2 {
    x: number
    y: number
}
export type Point = Vector2
export namespace Vector2 {
    export function fromTouchCenter(e: TouchEvent) {
        let touches = [].slice.call(e.touches) as Touch[]
        return center(...touches.map(fromTouch))
    }
    export function fromTouch(touch: Touch): Vector2 {
        let x = touch.clientX
        let y = touch.clientY
        return { x, y }
    }
    export function center(...vecs: Vector2[]): Vector2 {
        let x = 0
        let y = 0
        for (let vec of vecs) {
            x += vec.x
            y += vec.y
        }
        x /= vecs.length
        y /= vecs.length
        return { x, y }
    }
    export function substract(v1: Vector2, v2: Vector2): Vector2 {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        }
    }
    export function sum(...vecs: Vector2[]): Vector2 {
        return {
            x: vecs.reduce((value, v2) => {
                return value + v2.x
            }, 0),
            y: vecs.reduce((value, v2) => {
                return value + v2.y
            }, 0),
        }
    }
}
export const Point = Vector2
