import * as React from 'react';
import { App } from "./app"
import { Widget, List } from "./base/widget"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { GlobalSearchBuilder } from "./globalSearchBuilder"
import { NewsList } from "./newsList"
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { PopupBehavior } from "./popupManager"
import * as Config from "./config"
import * as Resource from "./resource"
import * as TestData from "./testData"
import * as AddressUtil from "./util/address"
import { PopupHeader } from './popupHeader';
import { ReceiverEntry } from './receiverEntry';
import { SwipableTab } from "./swipableTab"
import { RoundButton } from "./roundButton"
const CommonMargin = 15
export class PurchaseOrderManager extends Widget {
    asPopup = new PopupBehavior(this)
    tabs = new SwipableTab(["全部", "待付款", "待发货", "已发货", "已结束"])
    header = new PopupHeader("订单管理")
    constructor(public defaultReceiver: Model.Receiver = null) {
        super()
        this.tabs.events.listenBy(this, "trigger", (tab) => {
            this.refresh()
        })
        this.compose(() => {
            return (
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#eee",
                }}>
                    <this.header.Component />
                    <this.tabs.Component />
                    {this.orders.map(item => <item.Component key={item.order.id} />)}

                </View>
            )
        })
        this.refresh()
    }
    orders: Order[] = []
    refresh() {
        this.orders.length = 0
        this.render()
        let orders = [TestData.order]
        setTimeout(() => {
            this.orders = orders.map(order => new Order(order))
            this.render()
        }, 500)
    }
}

export class Order extends Widget {
    items = this.order.items.map(item => new OrderItem(item))
    constructor(public readonly order: Model.Order) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    backgroundColor: "white",
                    marginTop: 10
                }}>
                    {this.items.map((item, index) => <item.Component key={index} />)}
                    <View style={{
                        flexDirection: "row",
                        padding: 15,
                        justifyContent: "flex-end",
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#aaa"
                        }}
                        >共{this.items.length}件商品</Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#aaa",
                        }}
                        > 合计: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#333"
                        }}
                        >{(order.amount / 100).toFixed(2)}元</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        <RoundButton
                            text="查看物流"
                            color="#bbb"
                            callback={() => {
                                alert("暂无物流信息")
                            }}
                        />
                        <RoundButton
                            text="确认收货"
                            color="#CA2D30"
                            callback={() => {
                                alert("开发中")
                            }}
                        />
                    </View>
                </View >
            )
        })
    }
}
export class OrderItem extends Widget {
    constructor(public readonly item: Model.Order.Item) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}>
                    {
                        this.item.sku.spu.thumbs && <Image
                            source={this.item.sku.spu.thumbs as any}
                            style={{
                                width: 60,
                                height: 60,
                            }}
                            resizeMode="cover"
                        />
                    }
                    <View style={{
                        flex: 1
                    }}>
                        <View
                            style={{
                                marginLeft: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingRight: 20
                                }}
                            >{this.item.sku.spu.name.slice(0, 32)}</Text>
                        </View>
                        <View
                            style={{
                                margin: 10,
                                marginTop: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: "#aaa",
                                    fontSize: 12,
                                }}
                            >{this.item.sku.spu.detail.slice(0, 16) + "...."}</Text>
                        </View>
                    </View>
                </View >

            )
        })
    }
}
