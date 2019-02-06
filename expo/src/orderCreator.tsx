import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { App } from "./app"
import { PopupHeader } from "./popupHeader"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { PopupBehavior } from "./popupManager"
import { Widget, List } from "./base/widget"
import { ReceiverEntry } from './receiverEntry';
import * as Resource from "./resource"
import * as TestData from "./testData"

export class OrderCreator extends Widget {
    receiverEntry = new ReceiverEntry(TestData.receiver, true)
    orderItems: OrderItem[] = []
    getTotalPrice() {
        let price = 0
        for (let item of this.items) {
            price += item.quantity * item.sku.price
        }
        return price
    }
    getTransportFee() {
        let unit = 500
        let price = 0
        for (let item of this.items) {
            price += item.quantity * unit
        }
        return price
    }
    getTotalFee() {
        return this.getTotalPrice() + this.getTransportFee()
    }
    constructor(public items: Model.Order.Item[]) {
        super()
        this.orderItems = this.items.map(item => new OrderItem(item))
        this.compose(() => {
            return (
                <View style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#eee"
                }}>
                    <this.header.Component />
                    <ScrollView style={{
                        width: "100%"
                    }}>
                        <this.receiverEntry.Component />
                        <View style={{
                            borderTopWidth: 10,
                            borderTopColor: "#eee",
                            backgroundColor: "white",
                        }}>
                            {this.orderItems.map((item, index) => <item.Component key={index} />)}
                        </View>
                        <View style={{
                            backgroundColor: "white",
                        }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: CommonMargin,
                            }}>
                                <Text style={{
                                    color: "#aaa"
                                }}
                                >商品总价:</Text>
                                <Text style={{
                                    color: "#333"
                                }}
                                >{(this.getTotalPrice() / 100).toFixed(2)}元</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: CommonMargin,
                            }}>
                                <Text style={{
                                    color: "#aaa"
                                }}
                                >运费:</Text>
                                <Text style={{
                                    color: "#333"
                                }}
                                >{(this.getTransportFee() / 100).toFixed(2)}元</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: CommonMargin,
                            }}>
                                <Text style={{
                                    color: "#aaa"
                                }}
                                >订单总价:</Text>
                                <Text style={{
                                    color: "#333"
                                }}
                                >{(this.getTotalFee() / 100).toFixed(2)}元</Text>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={{
                        height: 49,
                        width: "100%",
                        shadowOffset: {
                            width: 0,
                            height: -0.2
                        },
                        shadowOpacity: 0.1,
                        shadowColor: "black",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.apply()
                            }}
                            style={{
                                height: 49,
                                width: "25%"
                            }}
                        >
                            <View style={{
                                height: 49,
                                backgroundColor: "#CA2D30",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 16
                                    }}
                                >下单</Text>
                            </View>
                        </TouchableOpacity>
                    </View >

                </View>
            )
        })
    }
    apply() {
        alert("未实现")
    }
    asPopup = new PopupBehavior(this)
    header = new PopupHeader("创建订单")
    confirm() {
        this.events.emit("done")
        this.asPopup.hide()
    }
    cancel() {
        this.asPopup.hide()
    }
}

const CommonMargin = 16
export class OrderItem extends Widget {
    constructor(public item: Model.Order.Item) {
        super()
        this.compose(() => {
            return (<View style={{
                flexDirection: "row",
                padding: CommonMargin,
                borderBottomWidth: 1,
                borderBottomColor: "#eee"
            }}>
                <Image source={Resource.Image.example} style={{
                    width: 92,
                    height: 92,
                }}
                    resizeMode="cover" />
                <View style={{
                    flex: 1,
                    paddingLeft: CommonMargin
                }}>
                    <Text style={{
                        fontSize: 16
                    }}
                    >{this.item.sku.spu.name}</Text>
                    <View style={{
                        paddingTop: 20
                    }}>
                        <Text
                            style={{
                                color: "#aaa",
                            }}
                        >{
                                Object.keys(this.item.sku.props).map(name => {
                                    let prop = this.item.sku.props[name]
                                    return prop || "默认规格"
                                }).join(",") || "默认规格"
                            }</Text>
                    </View>
                    <View style={{
                        paddingTop: 20
                    }}>
                        <Text
                            style={{
                                color: "#CA2D30",
                            }}
                        >{(this.item.sku.price / 100).toFixed(2).toString()}元</Text>
                    </View>
                </View>
            </View>
            )
        })
    }
}
