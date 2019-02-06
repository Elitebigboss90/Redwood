type Partial<T> = {
    [K in keyof T]?: T[K]
}
export class LazyProperty {
    static define<T>(obj: any, name: string, creator: () => T) {
        let v: T = null
        Object.defineProperty(obj, name, {
            get: () => {
                if (!v) v = creator()
                return v
            },
            set: (todo) => {
                v = todo
            }
        })
    }
    static defines<T= any>(obj: T, creators: Partial<{
        [K in keyof T]: () => T[K]
    }>) {
        for (let name in creators) {
            this.define(obj, name, creators[name] as any)
        }
    }
}
