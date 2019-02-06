export interface RGBA {
    r: number
    g: number
    b: number
    a: number
}
export type Color = RGBA
export namespace Color {
    export function randomRGB(): Color {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
            a: 1
        }
    }
    export function randomHexRGB() {
        return toHexString(randomRGB())
    }
    export function fromString(str): Color {
        if (str[0] === "#") {
            str = str.slice(1)
            if (str.length == 3) {
                let colors = str.split("").map(item => parseInt(item + item, 16))
                let c: RGBA = {
                    r: colors[0],
                    g: colors[1],
                    b: colors[2],
                    a: 1
                }
                return c
            } else if (str.length == 6) {
                let r = parseInt(str.slice(0, 2), 16)
                let g = parseInt(str.slice(2, 4), 16)
                let b = parseInt(str.slice(4, 6), 16)
                return {
                    r, g, b, a: 1
                }
            } else {
                throw new Error("Unknown color: " + str)
            }
        } else if (str.slice(0, 4) === "rgb(") {
            let colors = str.replace("rgb(", "").replace(")", "").split(",").map(item => parseInt(item, 10))
            return {
                r: colors[0],
                g: colors[1],
                b: colors[2],
                a: 1
            }
        } else if (str.slice(0, 5) === "rgba(") {
            let colors = str.replace("rgba(", "").replace(")", "").split(",").map(item => parseInt(item, 10))
            return {
                r: colors[0],
                g: colors[1],
                b: colors[2],
                a: colors[3]
            }
        } else {
            throw new Error("Unknown color format: " + str)
        }
    }
    export function mix(from: Color, to: Color, between: number = 0.5) {
        let c: Color = {
            r: from.r * (1 - between) + to.r * between,
            g: from.g * (1 - between) + to.g * between,
            b: from.b * (1 - between) + to.b * between,
            a: from.a * (1 - between) + to.a * between,
        }
        return c
    }
    export function toHexString(color: Color) {
        return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`
    }
    export function toString(color: Color) {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`
    }
}
