export namespace Distribution {
    export namespace Normal {
        export function random() {
            var rand = 0
            let c = 6
            for (var i = 0; i < c; i += 1) {
                rand += Math.random()
            }
            return rand / c
        }
    }
}
