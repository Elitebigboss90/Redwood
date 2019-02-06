import * as React from "react"
import { View, Modal, ActivityIndicator } from "react-native"
import RootSiblings from "react-native-root-siblings"

const LOADER_TIMEOUT = 10
const LOADER_INTERVAL = 0.5

export class HUD {
    private static _instance: HUD
    private static visible: boolean = false
    private static hud: any
    private static timer: NodeJS.Timer
    private static currentInterval = 0
    public static props: {
        style?: any,
        contentStyle?: any,
        // renderContentComponent?: () => JSX.Element,
        timeout?: number
    } = {
            style: {},
            contentStyle: {},
            // renderContentComponent: () => null,
            timeout: 8
        }
    // public static get sharedInstance() {
    //     return this._instance || (this._instance = new this())
    // }

    private constructor() {
    }

    private static renderHUD() {
        const { style, contentStyle, timeout } = this.props
        const visible = this.visible
        // const { visible } = this.state
        // const content = renderContentComponent() || null
        let loader =
            // content :
            <ActivityIndicator
                animating={visible}
                color={"gray"}
                size={"small"}
                hidesWhenStopped={true} />
        return (
            <Modal
                transparent={true}
                animationType={"none"}
                visible={visible}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        ...this.props.style
                    }}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 100,
                            height: 100,
                            ...this.props.contentStyle
                        }}>
                        {loader}
                    </View>
                </View>
            </Modal>
        )
    }

    public static show() {
        if (!this) return
        this.resetTimer()
        if (this.hud) {
            // this.hud.update(this.renderHUD())
            return
        } else {
            this.visible = true
            this.hud = new RootSiblings(this.renderHUD())
        }
        this.timer = setInterval(() => {
            if (!this) return
            this.currentInterval += LOADER_INTERVAL
            if (!this.visible || this.currentInterval >= this.props.timeout) {
                this.hide()
            }
        }, 500)
    }

    public static hide() {
        if (!this || !this.hud) return
        this.visible = false
        this.resetTimer()
        this.hud.destroy()
        this.hud = null
    }

    private static resetTimer() {
        if (!this || !this.timer) {
            this.currentInterval = 0
            clearInterval(this.timer)
        }
    }
}

// export class Loader extends React.Component {
//     static defaultProps: {
//         backgroundStyle: {},
//         loaderContentStyle: {},
//     }
//     props: {
//         backgroundStyle?: any,
//         loaderContentStyle?: any,
//         loaderComponent?: JSX.Element
//     }
//     state: {
//         visible?: boolean
//     }
//     private timer: NodeJS.Timer
//     private currentInterval = 0

//     constructor(props) {
//         super(props)
//         this.state = ({ visible: false })
//     }

//     // componentWillMount() {
//     //     const { visible } = this.state
//     // }

//     componentWillUnmount() {
//         this!.resetTimer!()
//     }

//     show() {
//         if (!this) return
//         this.resetTimer()
//         this.timer = setInterval(() => {
//             if (!this) return
//             this.currentInterval += LOADER_INTERVAL
//             if (this.currentInterval <= LOADER_INTERVAL) {
//                 this.setState({ visible: true })
//             } else if (!this.state.visible || this.currentInterval >= LOADER_TIMEOUT) {
//                 this!.hide()
//             }
//         }, 1000 * LOADER_INTERVAL)
//     }

//     hide() {
//         try {
//             this!.setState({ visible: false })
//             this!.resetTimer()
//         } catch (e) {
//             console.log("loader err: ", JSON.stringify(e))
//         }
//     }

//     private resetTimer() {
//         if (this!.timer!) {
//             this!.currentInterval! = 0
//             clearInterval(this.timer)
//         }
//     }

//     render() {
//         const { loaderComponent } = this.props
//         const { visible } = this.state
//         let loader = loaderComponent === undefined ?
//             <ActivityIndicator
//                 animating={visible}
//                 color={"gray"}
//                 size={"small"}
//                 hidesWhenStopped={true} /> : loaderComponent
//         return (
//             <Modal
//                 transparent={true}
//                 animationType={"none"}
//                 visible={visible}>
//                 <View
//                     style={{
//                         flex: 1,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         ...this.props.backgroundStyle
//                     }}>
//                     <View
//                         style={{
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: 100,
//                             height: 10,
//                             ...this.props.loaderContentStyle
//                         }}>
//                         {loader}
//                     </View>
//                 </View>
//             </Modal>
//         )
//     }
// }