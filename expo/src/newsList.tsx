import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { Dropdown } from "./dropdown"
import { Authenticator } from './authenticator';
import { Widget, List } from "./base/widget"
import { ArticleDisplayer } from './articleDisplayer';

export class NewsList extends Widget {
    latestTab = new TabItem("最新")
    hotestTab = new TabItem("热门")
    recommandedTab = new TabItem("推荐")
    tabs = [this.latestTab, this.hotestTab, this.recommandedTab]
    currentTab: TabItem
    items = new List<NewsItem>()
    constructor() {
        super()
        this.tabs.forEach((tab) => {
            tab.events.listenBy(this, "trigger", () => {
                this.focusAt(tab)
            })
        })
        this.compose(() => {
            let T1 = this.latestTab.Component
            let T2 = this.hotestTab.Component
            let T3 = this.recommandedTab.Component
            return (
                <View style={{
                    alignItems: "stretch",
                    width: "95%",
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginTop: 20,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee"
                    }}>
                        <this.latestTab.Component />
                        <this.hotestTab.Component />
                        <this.recommandedTab.Component />
                    </View >
                    <ScrollView
                        style={{
                            width: "100%"
                        }}
                    >
                        <this.items.Component />
                    </ScrollView>
                </View >
            );
        })
        this.focusAt(this.latestTab)
    }
    focusAt(tab: TabItem) {
        if (this.currentTab) {
            this.currentTab.deactivate()
        }
        this.currentTab = tab
        tab.activate()
        this.refresh()
    }
    refresh() {
        this.items.clear()
        this.setState({
            loading: true
        })
        setTimeout(() => {
            for (let i = 0; i < Math.random() * 30; i++) {
                this.items.add(new NewsItem({
                    src: require("../resource/image/example.png"),
                    content: "我是测试文字测试文字，我觉得测试文字还是非常复杂的。",
                    author: "木头佬",
                    time: "一小时前"
                }))
            }
            this.setState({
                loading: false
            })
        }, 1000)
    }
}
export interface News {
    time: string
    author: string
    content: string
    src: any
}

export class TabItem extends Widget {
    deactivate() {
        this.setState({
            isActive: false
        })
    }
    activate() {
        this.setState({
            isActive: true
        })
    }
    state: {
        isActive?: boolean
    } = {}
    constructor(public readonly name: string) {
        super()
        this.compose(() => {
            return <TouchableWithoutFeedback
                onPress={() => {
                    this.events.emit("trigger")
                }}
            >
                <View
                    style={{
                        borderBottomColor: "#CA2D30",
                        borderBottomWidth: this.state.isActive && 2 || 0,
                        marginRight: 20,
                        paddingBottom: 5
                    }}
                >
                    <Text
                        style={{
                            color: "#CA2D30",
                        }}
                    >{this.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        })
    }
}
export class NewsItem extends Widget {
    constructor(news: News) {
        super()
        this.compose(() => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        let ad = new ArticleDisplayer({
                            title: "测试标题",
                            content: "实施创新驱动发展战略，优化创新生态，形成多主体协同、全方位推进的创新局面。扩大科研机构和高校科研自主权，改进科研项目和经费管理，深化科技成果权益管理改革。支持北京、上海建设科技创新中心，新设14个国家自主创新示范区，带动形成一批区域创新高地。以企业为主体加强技术创新体系建设，涌现一批具有国际竞争力的创新型企业和新型研发机构。深入开展大众创业、万众创新，实施普惠性支持政策，完善孵化体系。各类市场主体达到9800多万户，五年增加70%以上。国内有效发明专利拥有量增加两倍，技术交易额翻了一番。我国科技创新由跟跑为主转向更多领域并跑、领跑，成为全球瞩目的创新创业热土",
                            image: require("../resource/image/example-large.png")
                        })
                        ad.asPopup.show()
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        padding: 15
                    }}>
                        {
                            news.src && <Image
                                source={news.src}
                                style={{
                                    width: 80,
                                    height: 80,
                                }}
                                resizeMode="cover"
                            />
                        }
                        <View
                            style={{
                                padding: 15
                            }}
                        >
                            <Text
                                style={{
                                    width: "85%"
                                }}
                            >{news.content}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }
}


