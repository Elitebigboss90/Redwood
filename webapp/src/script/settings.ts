import * as meta from "./meta"
let url = window.location.toString()

export const debug = url.indexOf("debug") >= 0

console.log("Running on", meta.version)

export const apkURL = `${meta.cdnBase}/resource/apk/mutoumulao_v1.1.8.apk`
