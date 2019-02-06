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
import { Article } from "./article"
import { ArticleDisplayer } from "./articleDisplayer"
import { ServiceResultDisplayer } from "./serviceResultDisplayer"
import { JobResultDisplayer } from './jobResultDisplayer';
import { SellerResultDisplayer } from './sellerResultDisplayer';
import { ProductResultDisplayer } from './productResultDisplayer';
export class Searcher extends Widget {
    asPopup = new PopupBehavior(this)
    searchBuilder = new GlobalSearchBuilder()
    header = new Header(this.searchBuilder)
    serviceResultDisplayer = new ServiceResultDisplayer()
    jobResultDisplayer = new JobResultDisplayer()
    sellerResultDisplayer = new SellerResultDisplayer()
    productResultDisplayer = new ProductResultDisplayer()
    constructor() {
        super()
        this.searchBuilder.setState({
            headerMode: true
        })
        this.searchBuilder.events.listenBy(this, "search", (query) => {
            let cr = this.currentResult
            if (query.type === "service") {
                cr = this.serviceResultDisplayer
            } else if (query.type === "job") {
                cr = this.jobResultDisplayer
            } else if (query.type === "seller") {
                cr = this.sellerResultDisplayer
            } else if (query.type === "wood") {
                cr = this.productResultDisplayer
                this.productResultDisplayer.setSubType("wood")
            } else if (query.type === "furniture") {
                cr = this.productResultDisplayer
                this.productResultDisplayer.setSubType("furniture")
            }
            if (cr !== this.currentResult) {
                this.currentResult = cr
                this.render()
            }
            if (this.currentResult) {
                this.currentResult.setQuery(query.keyword)
            }
        })
        this.compose(() => {
            let query = this.searchBuilder.state
            return (<View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "white"

            }}>
                <this.header.Component />
                {this.currentResult && <this.currentResult.Component />}
            </View >)
        })
    }
    currentResult: Widget & {
        more()
        setQuery(kw: string)
    }
}



export class Header extends Widget {
    constructor(searcher: GlobalSearchBuilder) {
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
const CommonMargin = 50
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
