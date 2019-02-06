import { AsyncStorage } from "react-native"

// export const Items = {
//     token: "token",
//     accountId: "id",
// }

// interface Storage {
//     Items: any
//     setItem: (key: string, value: string, callback?: (error?: Error) => void) => Promise<void>
//     getItem: (key: string, callback?: (error?: Error, result?: string) => void) => Promise<string>
//     removeItem: (key: string, callback?: (error?: Error) => void) => Promise<void>
// }

// export async function setItem(key: string, value: string, callback?: (error?: Error) => void) {
//     try {
//         await AsyncStorage.setItem(key, value, callback)
//     } catch (error) {
//         alert(JSON.stringify("storage err:" + error))
//     }
// }

// export async function getItem(key: string, callback?: (error?: Error, result?: string) => void) {
//     try {
//         const value = await AsyncStorage.getItem(key, callback)
//         return value
//     } catch (error) {
//         alert(JSON.stringify("storage err:" + error))
//     }
// }

// export async function removeItem(key: string, callback?: (error?: Error) => void) {
//     return await AsyncStorage.removeItem(key, callback)
// }