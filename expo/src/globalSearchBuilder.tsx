import * as React from 'react';
import { Widget } from "./base/widget"
import { Header } from "./header"
import { Logo } from "./logo"
import { Dropdown } from "./dropdown"
import { Icon } from "./icon"
import * as Leaf from "leaf-ts"
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, ImageBackground, TouchableOpacity } from 'react-native'

export class GlobalSearchBuilder extends Widget {
    state: {
        keyword?: string
        type?: string
        headerMode?: boolean
    } = {}
    events = new Leaf.EventEmitter<{
        search: SearchQuery
    }>()
    setQuery(query: SearchQuery) {
        this.setState({
            keyword: query.keyword,
            type: query.type
        })
        this.events.emit("search", query)
    }
    constructor() {
        super()
        this.compose(() => {
            return (
                <View style={!this.state.headerMode && styles.rounder || styles.asHeader}>
                    <Dropdown
                        style={{
                            width: 80
                        }}
                        current={
                            Services[this.state.type]
                        }
                        options={ServiceOptions}
                        onSelect={(whom) => {
                            this.setState({
                                type: whom.value,
                            })
                        }}
                    ></Dropdown>
                    <TextInput
                        onChangeText={(value) => {
                            this.setState({
                                keyword: value
                            })
                        }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        value={this.state.keyword || ""}
                        style={{
                            flex: 1
                        }}
                        placeholder="搜索全部!"
                        onSubmitEditing={() => {
                            this.commit()
                        }}
                    ></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            this.commit()
                        }}
                    >
                        <Icon
                            src={require("../resource/image/icon@3x/icon-search.png")}
                            size={24}
                            style={{
                                marginRight: 16
                            }}
                        />
                    </TouchableOpacity>
                </View >
            )
        })
    }
    commit() {
        this.events.emit("search", {
            keyword: this.state.keyword,
            type: this.state.type
        })
    }
}
export interface SearchQuery {
    keyword: string
    type: string
}
const CommonWidth = "90%"
const CommonMargin = 50
const styles = StyleSheet.create({
    rounder: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#bbb",
        width: CommonWidth,
        height: 44,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100
    },
    asHeader: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#F5F6F9",
        width: CommonWidth,
        height: 32,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100
    }


});

const Services = {
    "service": {
        name: "服务",
        value: "service"
    },
    "job": {
        name: "招聘",
        value: "job"
    },
    "furniture": {
        name: "家具",
        value: "furniture"
    },
    "seller": {
        name: "厂家",
        value: "seller"
    },
    "wood": {
        name: "原材",
        value: "wood"
    }
}
const ServiceOptions = Object.keys(Services).map(name => {
    return Services[name]
})
