import * as mongodb from "mongodb"
import * as ServiceSpec from "../spec/service"
import * as Leaf from "leaf-ts"
import * as asyncModule from "async"
import * as uuid from "uuid"
export const Errors = Leaf.ErrorDoc.build({
    InvalidParameter: {},
    InvalidState: {},
    InnerError: {},
    NotFound: {},
    Failed: {},
    AlreadyExists: {}
})

export class EndlessService extends ServiceSpec.EndlessService {
    query<K, T = any>(option: EndlessService.EndlessQuery<T> & {
        collection: mongodb.Collection
        sort?: any
    }, callback: Callback<K[]>) {
        let col = option.collection
        let offset = option.offset || 0
        let count = option.count || this.settings.endless.count
        if (typeof count !== "number") {
            count = parseInt(count) || this.settings.endless.count
        }
        if (typeof offset !== "number") {
            offset = 0
        }
        let cursor = col.find(option.criteria as any)
        if (option.sort) {
            cursor.sort(option.sort)
        }
        cursor.skip(offset).limit(count).toArray(callback)
    }
}
