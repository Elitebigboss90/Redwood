import { Errors } from "../errors"
import * as ServiceSpec from "../spec/service"
import * as mongodb from "mongodb"
import * as Leaf from "leaf-ts"

export class PaginateService extends ServiceSpec.PaginateService {
    query<T>(option: PaginateService.PaginateQuery & {
        collection: mongodb.Collection
        query?: any,
        sort?: {
            [K in keyof T]?: number
        }
    }, callback: Callback<PaginateService.PaginateResult<T>>) {
        option.pageIndex = option.pageIndex || 0
        let pageSize = option.pageSize || 20
        option.collection.count(option.query || {}, (err, count) => {
            if (err) {
                callback(new Errors.UnknownError("Fail to count", { via: err }))
                return
            }
            console.log("paginate service query", option.query)
            let cursor = option.collection.find(option.query || {})
            option.sort = option.sort || {
                _id: -1
            } as any
            if (option.sort) {
                cursor.sort(option.sort as any)
            }
            cursor.skip(option.pageIndex * pageSize).limit(pageSize).toArray((err, res: T[]) => {
                if (err) {
                    callback(new Errors.UnknownError("Fail to get items"))
                    return
                }
                callback(null, {
                    pageIndex: option.pageIndex,
                    pageTotal: Math.ceil(count / pageSize),
                    items: res,
                    total: count
                })
            })
        })
    }
}
