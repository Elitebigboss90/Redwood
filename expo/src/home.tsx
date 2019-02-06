import * as React from 'react';
import { App } from "./app"
import { Widget } from "./base/widget"
import { Header } from "./header"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import { GlobalSearchBuilder } from "./globalSearchBuilder"
import { NewsList } from "./newsList"
import { StyleSheet, Text, View, ScrollView, TextInput, AppRegistry, Button, Image, ImageBackground } from 'react-native'
import { Searcher } from "./searcher"
export class Home extends Widget {
    constructor() {
        super()
        this.compose((state) => {
            let Header = this.header.Component
            let News = this.newsList.Component
            return (<View style={styles.container}>
                <Header />
                <View style={
                    styles.container
                } >
                    <Logo style={{
                        marginTop: 20,
                        marginBottom: 20,
                        position: "relative"
                    }} />
                    <this.globalSearchBuilder.Component />
                    <this.newsList.Component />
                </View>
            </View >);
        })
        this.globalSearchBuilder.events.listenBy(this, "search", (query) => {
            let searcher = new Searcher()
            searcher.searchBuilder.setQuery(query)
            searcher.asPopup.show()
        })
    }
    newsList = new NewsList()
    globalSearchBuilder = new GlobalSearchBuilder()
    header = new Header("首页")
}

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
});
