import * as React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ScrollView } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from './authenticator';
import { Widget, List } from "./base/widget"
import { PopupBehavior } from "./popupManager"
import { PopupHeader } from "./popupHeader"
import { ArticleView } from "./article"
import * as Resource from "./resource"
import { SellerEntry } from "./sellerEntry"
import { Cart } from './cart';
import { Article } from "./article";
import { CartItemEditor } from "./cartItemEditor"
import * as AddressUtil from "./util/address";
import { OrderCreator } from './orderCreator';
import * as TestData from "./testData"
const CommonMargin = 20
export class ProductDisplayer extends Widget {
    asPopup = new PopupBehavior(this)
    article = new ArticleView(this.detail)
    sellerEntry = new SellerEntry(this.seller)
    constructor(public readonly product: Model.SPU, public readonly seller: Model.Seller, public readonly detail: Article) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    flex: 1
                }}>
                    <ScrollView
                        style={{
                            padding: 0,
                            position: "absolute",
                            backgroundColor: "white",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}>

                        <View
                            style={{
                                position: "absolute",
                                left: 20,
                                top: 38,
                                backgroundColor: "rgba(0,0,0,0.3)",
                                zIndex: 200,
                                borderRadius: 100,
                                width: 36,
                                height: 36,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    this.asPopup.hide()
                                }}
                            >
                                <Icon src={Resource.Image.Icon.whiteLeft} size={24} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                right: 20,
                                top: 38,
                                backgroundColor: "rgba(0,0,0,0.3)",
                                zIndex: 200,
                                borderRadius: 100,
                                width: 36,
                                height: 36,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    let cart = new Cart(true)
                                    cart.asPopup.show()
                                }}
                            >
                                <Icon src={Resource.Image.Icon.whiteCart} size={24} />
                            </TouchableOpacity>
                        </View>
                        <Image style={{
                            width: "100%",
                            height: 280
                        }}
                            source={Resource.Image.exampleProduct}
                            resizeMode="cover"
                        />
                        <View
                            style={{
                                padding: CommonMargin,
                                borderBottomWidth: 6,
                                borderBottomColor: "#eee",
                            }}>
                            <Text
                                style={{
                                    color: "#333",
                                    fontSize: 18,
                                }}
                            >{this.product.name}</Text>
                            <Text
                                style={{
                                    color: "#CA2D30",
                                    fontSize: 18,
                                }}
                            >¥{(this.product.price / 100).toFixed(2)}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#aaa",
                                        fontSize: 12,
                                    }}
                                >销量{(this.product.tradeCount)}</Text>
                                <Text
                                    style={{
                                        color: "#aaa",
                                        fontSize: 12,
                                    }}
                                >{AddressUtil.format(this.seller.addressDistrict)}</Text>
                            </View>
                        </View>
                        <this.sellerEntry.Component />
                        <this.article.Component />
                    </ScrollView >
                    < View style={{
                        position: "absolute",
                        bottom: 0,
                        height: 48,
                        width: "100%",
                        backgroundColor: "white",
                        shadowOffset: {
                            width: 0,
                            height: -0.2
                        },
                        shadowOpacity: 0.1,
                        shadowColor: "black",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.addToCart()
                            }}
                            style={{
                                height: 49,
                                width: "25%"
                            }}
                        >
                            <View style={{
                                height: 49,
                                backgroundColor: "#EE9426",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 16
                                    }}
                                >加入购物车</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.buyNow()
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
                                >立即下单</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                </View>)
        })
    }
    addToCart() {
        this.getItem(() => {
            alert("已加入购物车")
        })
    }
    buyNow() {
        this.getItem((err, item) => {
            if (!item) return
            let oc = new OrderCreator([item])
            oc.asPopup.show()
        })
    }
    getItem(callback: Callback<Model.CartItem>) {
        let ce = new CartItemEditor(this.product)
        ce.asPopup.show()
        ce.events.listenBy(this, "done", () => {
            let props = {}
            for (let editor of ce.editors) {
                props[editor.name] = editor.state.select
            }
            let ci: Model.CartItem = TestData.cartItem
            callback(null, ci)
        })
    }
}
