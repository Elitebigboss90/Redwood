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
import { SellerDisplayer } from "./sellerDisplayer"
export class SellerEntryInfo extends Widget {

    constructor(public readonly seller: Model.Seller) {
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
                        this.seller.avatar && <Image
                            source={this.seller.avatar as any}
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
                            >{this.seller.name.slice(0, 32)}</Text>
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
                            >{this.seller.desc.slice(0, 16) + "...."}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between"
                        }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#ddd"
                                }}
                            >总共{this.seller.spuCount}个商品</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderLeftWidth: 1,
                            borderLeftColor: "#eee",
                            width: 60
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => {
                            this.call()
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Icon
                                    src={Resource.Image.Icon.phone}
                                    size={32}
                                />
                                <Text style={{
                                    color: "#999999",
                                    fontSize: 10
                                }}>联系卖家</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
        })
    }
    call() {
        alert("CAll" + this.seller.phone)
    }
}
export class SellerEntry extends Widget {
    info = new SellerEntryInfo(this.seller)
    constructor(public readonly seller: Model.Seller) {
        super()
        this.compose(() => {
            return <TouchableWithoutFeedback
                onPress={() => {
                    let ad = new SellerDisplayer(this.seller)
                    ad.asPopup.show()
                }}
            >

                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}>
                    {
                        this.seller.avatar && <Image
                            source={this.seller.avatar as any}
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
                            >{this.seller.name.slice(0, 32)}</Text>
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
                            >{this.seller.desc.slice(0, 16) + "...."}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            justifyContent: "space-between"
                        }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#ddd"
                                }}
                            >总共{this.seller.spuCount}个商品</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderLeftWidth: 1,
                            borderLeftColor: "#eee",
                            width: 60
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => {
                            this.call()
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Icon
                                    src={Resource.Image.Icon.phone}
                                    size={32}
                                />
                                <Text style={{
                                    color: "#999999",
                                    fontSize: 10
                                }}>联系卖家</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        })
    }
}
