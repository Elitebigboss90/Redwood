import * as React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, AppRegistry, Button, Image } from 'react-native';
import { App } from "./app"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from './authenticator';
import { Widget, List } from "./base/widget"
import { PopupBehavior } from "./popupManager"
import { PopupHeader } from "./popupHeader"
import { LocalSearchBuilder } from "./localSearchBuilder"
import { LocalSearcher } from "./localSearcher"
import { SellerEntryInfo } from "./sellerEntry"
import { SwipableTab } from './swipableTab';
import { Article, ArticleView } from "./article"
import * as Resource from "./resource"
import { JobResultDisplayer } from './jobResultDisplayer';
import { ProductResultDisplayer } from './productResultDisplayer';
const L = Resource.Literal
const CommonMargin = 20

export class SellerDisplayer extends Widget {
    asPopup = new PopupBehavior(this)
    localSeacher = new LocalSearchBuilder()
    header = new Header(this.localSeacher)
    info = new SellerEntryInfo(this.seller)
    tabs = new SwipableTab([L.AllProduct, L.SellerDetail, L.JobInfo])
    job = new JobResultDisplayer()
    product = new ProductResultDisplayer()
    detail = new ArticleView({
        title: "",
        content: `
  苏州蠡口家具城是华东最大、全国排名第二的家具市场。卖场有数十个栋展馆、展出品牌超过3000家。在苏州但凡有装修需求的老百姓，或者过年前后都会到家具城逛逛，淘自己喜欢的家居用品，可最让百姓们犯难的是，蠡口家具城经营面积超过120万平方米，有大大小小的家具大楼38座，故不但普通老百姓会迷路，里面的商户也常发生“找不到回厅的路“的情况。[1] 
  为解决消费者迷路、挑选产品左右奔波等各类问题，蠡口家具城官方导购平台“逛蠡口”正式上线。“逛蠡口”平台由苏州双水瓶网络科技有限公司开发运营，平台口号是“买家具，上逛蠡口”，以消费者为核心立足点，同时透过广播电台、报纸、杂志、网络等平面媒体推送家具信息。我们的目的，通过整合“蠡口家具城”商家的品牌信息，打造一个信息需求方与供应商有效对接的专业导购平台。
  为让消费者享受诚信、公正、透明的购物环境，入驻“逛蠡口”的都是蠡口家具行业有影响力的知名商家，并在上网前接受诚信认证。“逛蠡口”邀请各大知名品牌商家展开“夏季疯狂让利打折促销活动”，要者买得放心、买得实惠。
`,
        image: Resource.Image.exampleLarge
    })
    tabView: Widget = this.detail
    constructor(public readonly seller: Model.Seller) {
        super()
        this.localSeacher.events.listenBy(this, "search", (query) => {
            let searcher = new LocalSearcher()
            searcher.searchBuilder.setQuery(query)
            searcher.asPopup.show()
        })
        this.tabs.events.listenBy(this, "trigger", (tab) => {
            if (tab.name === L.AllProduct) {
                this.tabView = this.product
                this.product.more()
            } else if (tab.name === L.SellerDetail) {
                this.tabView = this.detail
            } else if (tab.name === L.JobInfo) {
                this.tabView = this.job
                this.job.setSeller(this.seller.id)
                this.job.more()
            } else if (tab.name === L.AllProduct) {
            }
            this.render()
        })
        this.compose(() => {
            return (<View
                style={{
                    padding: 0,
                    position: "absolute",
                    backgroundColor: "white",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}>
                <this.header.Component />
                <this.info.Component />
                <this.tabs.Component />
                <this.tabView.Component />
            </View >)
        })
    }
}


export class Header extends Widget {
    constructor(searcher: LocalSearchBuilder) {
        super()
        this.compose((state) => {
            return (
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            App.root.popupManager.pop()
                        }}
                    >
                        <Icon
                            src={require("../resource/image/icon@3x/icon-left.png")}
                            size={24}
                        />
                    </TouchableOpacity>
                    <searcher.Component />
                </View >
            );
        })
    }
}

const CommonWidth = "80%"
const HeaderHeight = 48
const AppMarginTop = 22
const styles = StyleSheet.create({
    header: {
        marginTop: AppMarginTop,
        width: "100%",
        height: HeaderHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 100,
        shadowOffset: {
            width: 0,
            height: 0.2
        },
        shadowOpacity: 0.1,
        shadowColor: "black",
    }
});
