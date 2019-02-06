import {
    Clipboard as RNClipboard
} from "react-native"


export namespace Util {
    export namespace Clipboard {
        export function getString(callback: Callback<string>): void {
            RNClipboard.getString().then((value) => {
                callback && callback(null, value)
            }).catch((e) => {
                callback && callback(e)
            })
        }

        export function setString(text: string): void {
            RNClipboard.setString(text)
        }
    }
}
