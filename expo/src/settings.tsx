import * as React from 'react';
import { App } from "./app"
import { Widget } from "./base/widget"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { GlobalSearchBuilder } from "./globalSearchBuilder"
import { NewsList } from "./newsList"
import { StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Searcher } from "./searcher"
import * as Resource from "./resource"
import { PopupBehavior } from './popupManager';
import { PurchaseOrderManager } from './purchaseOrderManager';
import { ServicePublisher } from './servicePublisher';
export class Settings extends Widget {
    purchase = new SettingEntry("购买订单", new PurchaseOrderManager().asPopup)
    service = new SettingEntry("服务发布", new ServicePublisher().asPopup)
    sellerInfo = new SettingEntry("厂家信息")
    products = new SettingEntry("商品信息")
    jobInfo = new SettingEntry("招聘发布")
    sells = new SettingEntry("销售订单")
    refund = new SettingEntry("退款管理")
    divider = new Divider()
    qa = new SettingEntry("联系客服")
    constructor() {
        super()
        this.compose((state) => {
            let Header = this.header.Component
            let GlobalSearcher = this.globalSearchBuilder.Component
            let News = this.newsList.Component
            return (<View style={styles.container}>
                <Header />
                <ScrollView style={{
                    flex: 1,
                    width: "99%"
                }}>
                    <View style={
                        styles.container
                    } >
                        <this.purchase.Component />
                        <this.service.Component />

                        <this.divider.Component />

                        <this.sellerInfo.Component />
                        <this.products.Component />

                        <this.divider.Component />

                        <this.jobInfo.Component />
                        <this.sells.Component />
                        <this.refund.Component />
                        <this.qa.Component />
                    </View>
                </ScrollView>
            </View >
            );
        })
        this.globalSearchBuilder.events.listenBy(this, "search", (query) => {
            let searcher = new Searcher()
            searcher.searchBuilder.setQuery(query)
            searcher.asPopup.show()
        })
    }
    newsList = new NewsList()
    globalSearchBuilder = new GlobalSearchBuilder()
    header = new Header("木头木佬", Resource.Image.avatar)
}
const HeaderHeight = 200
const CommonWidth = "90%"
const CommonMargin = 50
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
    header: {
        width: "100%",
        height: HeaderHeight,
        top: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",
    }
});
export class Header extends Widget {
    constructor(public name: string, public readonly avatar: any) {
        super()
        this.compose(() => {
            return (
                <View style={styles.header}>
                    <Image
                        style={{
                            flex: 1,
                            height: HeaderHeight,
                            width: "100%",
                            backgroundColor: "#d84a39",
                            position: "absolute",
                        }}
                        source={Resource.Image.settingsBg}
                        resizeMode="cover" />
                    <View style={{
                        width: "100%",
                        height: HeaderHeight,
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Text
                            style={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: 18,
                                color: "white"
                            }}
                        >我的</Text>
                        <Image source={this.avatar}
                            style={{
                                width: 74,
                                height: 74,
                                borderRadius: 37,
                            }}
                        />
                        <Text
                            style={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: 16,
                                color: "white"
                            }}
                        >{this.name}</Text>
                    </View>
                </View >
            );
        })
    }
}
export class SettingEntry extends Widget {
    constructor(public name: string, public view: PopupBehavior = null) {
        super()
        this.compose(() => {
            return (
                <View style={{
                    padding: 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                    width: "100%",
                }}>
                    <TouchableOpacity style={{
                        width: "100%"
                    }}
                        onPress={() => {
                            this.view.show()
                        }}
                    >
                        <View style={{
                        }}>
                            <Text style={{
                                fontSize: 18
                            }}
                            >{this.name}</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            )
        })
    }
}
export class Divider extends Widget {
    constructor() {
        super()
        this.compose(() => {
            return <View style={{
                height: 6,
                width: "100%",
                backgroundColor: "#eee"
            }}>
            </View>

        })
    }
}
