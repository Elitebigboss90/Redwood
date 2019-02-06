import { Platform } from "react-native"
import { Permissions } from "expo"

type PermissionCallBack = (response: Permissions.PermissionResponse) => void

export namespace Permission {
    export function permissionInitialize() {
        askPermission(Permissions.CAMERA_ROLL, () => {
            askPermission(Permissions.CAMERA)
        })
    }

    export function cameraRollPermissionHandler(callBack: PermissionCallBack = null) {
        if (callBack === null) return
        if (Platform.OS === "ios") {
            askPermission(Permissions.CAMERA_ROLL, (cameraRollResponse) => {
                permissionResponseHandler(cameraRollResponse, callBack)
            })
        } else if (Platform.OS === "android") {
            callBack(null)
        }
    }

    export function permissionResponseHandler(
        response: Permissions.PermissionResponse,
        grantedCallBack: PermissionCallBack = null,
        deniedCallBack: PermissionCallBack = null) {
        if (!response) return
        console.log("permission response: " + JSON.stringify(response))
        if (response.status === "granted") {
            grantedCallBack ? grantedCallBack(response) : null
        } else {
            console.log("未授权")
            deniedCallBack ? deniedCallBack(response) : null
        }
    }

    export function askPermission(permission: string, callBack: PermissionCallBack = null) {
        Permissions.askAsync(permission).then((response) => {
            callBack ? callBack(response) : null
        })
    }
}