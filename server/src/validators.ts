import * as Leaf from "leaf-ts"
import { Errors } from "./errors"

export namespace Decorator {
    export function OptionMatch(validator: Leaf.Validator, error?: Error) {
        return function (obj: any, name: string, descriptor: TypedPropertyDescriptor<Function>) {
            let fn = descriptor.value
            descriptor.value = function (option, callback: Function) {
                try {
                    validator.check(option)
                } catch (e) {
                    callback(error || e)
                    return
                }
                fn.call(this, option, callback)
            }
        }
    }
}