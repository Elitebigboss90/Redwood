import { Errors } from "../errors"
import * as MongoDB from "mongodb";
import * as Validators from "../validators"
import * as Leaf from "leaf-ts"
import OptionMatch = Validators.Decorator.OptionMatch


export type EndlessQuery = {
    cursor: IncrementalId,
    size: number
}
export type Endless<T> = {
    items: T[],
}

export class DbEndlessQuery<T> {
    constructor(public collection: MongoDB.Collection) {
    }
    query(option: EndlessQuery & {
        query?: any,
        sortBy?: {
            [K in keyof T]?: number
        }
    }, callback: Callback<Endless<T>>) {
        let size = option.size || 20
        option.query = {
            ...option.query,
            id: { $lt: option.cursor }
        }
        let cursor = this.collection.find(option.query)
        if (option.sortBy) {
            cursor.sort(option.sortBy as any as Object)
        }
        cursor.sort({ id: -1 })
        cursor.limit(option.size).toArray((err, res: T[]) => {
            if (err) {
                callback(new Errors.UnknownError("Failed to get items"))
                return
            }
            callback(null, {
                items: res
            })
        })
    }
}
