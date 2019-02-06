import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { PopupBehavior } from "./popupManager"
import { Widget, List } from "./base/widget"
export class CartItemEditor extends Widget {
    editors = this.product.props.map(item => new PropEditor(item.name, item.values))
    constructor(public product: Model.SPU) {
        super()
        this.compose(() => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.asPopup.hide()
                    }}
                >
                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.35)",
                        zIndex: 100,
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                return
                            }}
                        >
                            <View style={{
                                width: "100%",
                                backgroundColor: "white"
                            }}>
                                <View style={{
                                    width: "100%",
                                    backgroundColor: "white"
                                }}>
                                    {this.editors.map(item => <item.Component key={item.name} />)}
                                </View>
                                <View style={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        this.cancel()
                                    }}
                                        style={{
                                            padding: 8
                                        }}
                                    ><View
                                        style={{
                                            borderRadius: 14,
                                            borderWidth: 1,
                                            borderColor: "#aaa",
                                            padding: 4,
                                            paddingHorizontal: 8,
                                        }}
                                    ><Text
                                        style={{
                                            color: "#aaa"
                                        }}
                                    >取消</Text></View></TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.confirm()
                                    }}
                                        style={{
                                            padding: 8
                                        }}
                                    ><View
                                        style={{
                                            borderRadius: 14,
                                            borderWidth: 1,
                                            borderColor: "#CA2D30",
                                            padding: 4,
                                            paddingHorizontal: 8,
                                        }}
                                    ><Text
                                        style={{
                                            color: "#CA2D30"
                                        }}
                                    >确定</Text></View></TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback >
            )
        })
    }
    asPopup = new PopupBehavior(this)
    confirm() {
        this.events.emit("done")
        this.asPopup.hide()
    }
    cancel() {
        this.asPopup.hide()
    }
}
const CommonMargin = 25
export class PropEditor extends Widget {
    state: {
        select?: string
    } = {}
    constructor(public readonly name: string, public values: {
        name: string,
        value: string
    }[]) {
        super()
        this.compose(() => {
            return (<View
                style={{
                    padding: CommonMargin,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}
            >
                <Text
                    style={{
                        fontSize: 16
                    }}
                >{this.name}</Text>
                <View style={{
                    flexDirection: "row"
                }}>
                    {this.values.map((prop) => {
                        return <TouchableOpacity
                            onPress={() => {
                                this.setState({ select: prop.value })
                                this.events.emit("change")
                            }}
                            style={{
                                paddingRight: 20,
                                paddingTop: 10
                            }}
                            key={prop.name}
                        >
                            <View key={prop.name}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    paddingVertical: 4,
                                    paddingHorizontal: 8,
                                    borderColor: this.state.select === prop.value && "#CA2D30" || "#333"
                                }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: this.state.select === prop.value && "#CA2D30" || "#333"
                                }}>
                                    {prop.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    })
                    }
                </View>
            </View>)
        })
    }
}
