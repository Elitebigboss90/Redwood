export namespace Hex {
    export function random(count: number) {
        let str = ""
        for (let i = 0; i < count; i++) {
            let num = Math.floor(Math.random() * 16)
            str += num.toString(16)
        }
        return str
    }
}
