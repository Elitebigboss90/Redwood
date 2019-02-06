import { Errors } from "../errors"
import * as MongoDB from "mongodb";
import * as Validators from "../validators"
import * as Leaf from "leaf-ts"
import OptionMatch = Validators.Decorator.OptionMatch


export class DbEndlessQuery<T> {
    public defaultCount = 20
    public maxCount = 100
    constructor(public collection: MongoDB.Collection) {
    }
    query(option: EndlessService.EndlessQuery<T>, callback: Callback<T[]>) {
        let cursor = this.collection.find(option.criteria as any || {})
        if (option.sortField) {
            cursor.sort(option.sortField, option.sortOrder || -1)
        }
        let limit = option.count
        if (typeof limit !== "number") {
            limit = this.defaultCount
        }
        if (limit > this.maxCount) {
            limit = this.maxCount
        } else if (limit < 0) {
            limit = this.defaultCount
        } else if (isNaN(limit)) {
            limit = this.defaultCount
        }
        let skip = option.offset
        if (!skip) {
            skip = 0
        } else if (skip < 0) {
            skip = 0
        }
        cursor.limit(limit).skip(skip).toArray((err, items: T[]) => {
            if (err) {
                callback(new Errors.UnknownError("Failed to get items"))
                return
            }
            callback(null, items)
        })
    }
}
