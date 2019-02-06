///<reference path="./spec/type.d.ts"/>
import * as React from 'react';
import { App } from "./app"
import { Widget, List } from "./base/widget"
import { Header } from "./header"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { GlobalSearchBuilder } from "./globalSearchBuilder"
import { NewsList } from "./newsList"
import { StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Searcher } from "./searcher"
import { PopupBehavior } from './popupManager';
import * as TestData from "./testData"
import { OrderCreator } from './orderCreator';
export class Cart extends Widget {
    asPopup = new PopupBehavior(this)
    constructor(public isPopup: boolean = false) {
        super()
        this.selectAllRadio.events.listenBy(this, "change", () => {
            this.toggleSelectAll()
        })
        this.compose((state) => {
            let Header = this.header.Component
            return (<View style={{
                width: "100%",
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'flex-start',
                overflow: "hidden",
                position: this.isPopup && "absolute" || "relative",
                height: "100%",
            }}>
                <Header />
                <View style={
                    styles.container
                } >
                    <ScrollView style={{
                        width: "100%",
                        flex: 1
                    }}>
                        <this.cartList.Component />
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 80
                        }}>
                            <this.selectAllRadio.Component />
                            <Text> 全选 </Text>
                        </View>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={{
                                fontSize: 16,
                                textAlign: "right",
                                paddingRight: 20
                            }}>
                                合计: {this.state.totalPrice || 0}元
                            </Text>
                        </View>
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
                                >结算({this.state.count || 0})</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                </View >
            </View >);
        })
        this.refresh()
    }
    apply() {
        let items = this.getSelectedItem()
        if (items.length === 0) {
            alert("未选中商品")
            return
        }
        let oc = new OrderCreator(items);
        oc.asPopup.show()
    }
    getSelectedItem() {
        let items: Model.CartItem[] = []
        for (let item of this.cartList.items) {
            for (let ci of item.list.items) {
                if (ci.radio.state.select) {
                    items.push(ci.item)
                }
            }
        }
        return items
    }
    toggleSelectAll() {
        if (!this.selectAllRadio.state.select) {
            this.unselectAll()
        } else {
            this.selectAll()
        }
    }
    selectAll() {
        for (let item of this.cartList.items) {
            for (let ci of item.list.items) {
                ci.radio.select()
            }
        }
    }
    unselectAll() {
        for (let item of this.cartList.items) {
            for (let ci of item.list.items) {
                ci.radio.unselect()
            }
        }
    }
    update() {
        let count = 0
        let price = 0
        for (let item of this.cartList.items) {
            for (let ci of item.list.items) {
                if (ci.radio.state.select) {
                    count += 1 // ci.item.quantity
                    price += ci.item.sku.price * ci.item.quantity
                }
            }
        }
        this.setState({ count, totalPrice: (price / 100).toFixed(2).toString() })
    }
    selectAllRadio = new Radio()
    refresh() {
        let item: Model.CartItem = TestData.cartItem
        let seller: Model.Seller = {
            id: null,
            name: "大清之巅红木源头厂家",
            phone: "13037124308",
            addressDistrict: null,
            addressDetail: null,
            avatar: require("../resource/image/example-avatar.png"),
            ownerId: null,
            createAt: Date.now(),
            available: false,
            spuCount: 256,
            state: "enabled"
        }
        let bundles = [{
            seller,
            items: [item, item]
        }, {
            seller,
            items: [item, item]
        }]
        this.cartList.clear()
        for (let bundle of bundles) {
            let cs = new CartSection(bundle.seller, bundle.items)
            this.cartList.add(cs)
            cs.events.listenBy(this.cartList, "change", () => {
                this.update()
            })
        }
    }
    header = new Header("购物车", this.isPopup && this.asPopup)
    cartList = new List<CartSection>()
}
class CartSection extends Widget {
    constructor(public readonly seller: Model.Seller, public readonly items: Model.CartItem[]) {
        super()
        this.compose(() => {
            return (<View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: CommonWrapperMargin,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                    width: "100%",
                }}>
                    <Icon
                        src={require("../resource/image/example-avatar.png")}
                        size={24}
                    ></Icon>
                    <Text
                        style={{
                            color: "#333",
                            fontSize: 18,
                            flex: 1,
                            paddingLeft: 15
                        }}
                    >
                        {this.seller.name}
                    </Text>
                </View>
                <this.list.Component />
            </View >)
        })
        for (let item of this.items) {
            let ci = new CartItem(item)
            this.list.add(ci)
            ci.events.listenBy(this.list, "change", () => {
                this.events.emit("change")
            })
        }
    }
    list = new CartItemList()
}
export class CartItemList extends List<CartItem> { }
export class CartItem extends Widget {
    radio = new Radio()
    state: {
        isEdit?: boolean
    } = {}
    constructor(public readonly item: Model.CartItem) {
        super()
        this.radio.events.listenBy(this, "change", () => {
            this.events.emit("change")
        })
        this.compose(() => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.radio.select()
                        this.events.emit("change")
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            padding: 20
                        }}
                    >
                        <View
                            style={{
                                width: 34,
                                justifyContent: "center",
                            }}
                        >
                            <this.radio.Component />
                        </View>
                        <Image
                            source={this.item.sku.spu.thumbs as any}
                            style={{
                                width: 94,
                                height: 94
                            }}
                            resizeMode="cover"
                        />
                        <View
                            style={{
                                flex: 1,
                                paddingLeft: 15
                            }}
                        >
                            <View>
                                <View style={{
                                    flexDirection: "row"
                                }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            width: "65%",
                                            paddingTop: 4
                                        }}
                                    >{this.item.sku.spu.name}</Text>
                                </View>
                            </View>
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
                </TouchableWithoutFeedback>
            )
        })
    }
    toggleEdit() {
        if (this.state.isEdit) {
            this.setState({ isEdit: false })
        } else {
            this.setState({ isEdit: true })
        }
    }
}
export class Radio extends Widget {
    state: {
        select?: boolean
    } = {}
    constructor() {
        super()
        this.compose(() => {
            return <TouchableOpacity
                onPress={() => {
                    this.toggle()
                }}
            ><View
                style={{
                    borderRadius: 50,
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: "#CA2D30",
                }}>
                    <View
                        style={{
                            borderRadius: 50,
                            width: 16,
                            height: 16,
                            backgroundColor: this.state.select && "#CA2D30" || "white",
                            marginLeft: 1,
                            marginTop: 1
                        }}
                    ></View>
                </View>
            </TouchableOpacity>
        })
    }
    toggle() {
        if (this.state.select) {
            this.unselect()
        } else {
            this.select()
        }
    }
    select() {
        this.setState({ select: true })
        this.events.emit("change", this.state.select)
    }
    unselect() {
        this.setState({ select: false })
        this.events.emit("change", this.state.select)
    }
}
const CommonWidth = "90%"
const CommonMargin = 50
const CommonWrapperMargin = 14
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: "hidden"
    },
    input: {
        height: 40,
        width: CommonWidth,
        backgroundColor: "#f4f4f4",
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: CommonMargin,
        paddingRight: 20,
        borderBottomWidth: 0,
        color: "#bababa"
    },
    primaryButton: {
        width: CommonWidth,
        height: 40,
        marginTop: CommonMargin,
        backgroundColor: "#af1d1f",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    primaryButtonText: {
        color: "white",
    },
});
interface CartItemBundle {
    seller: Model.Seller,
    items: CartItem[]
}
const Button = (<TouchableOpacity
    onPress={() => {
        this.toggleEdit()
    }}
>
    <View style={{
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 12,
        width: 60
    }}>
        <Text
            style={{
                textAlign: "center"
            }}
        >编辑</Text>
    </View>
</TouchableOpacity>)
