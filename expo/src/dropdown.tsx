import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { App } from "./app"
import { Header } from "./header"
import { Logo } from "./logo"
import { Icon } from "./icon"
import { PopupBehavior } from "./popupManager"
import { Widget, List } from "./base/widget"
export type DropdownOption = {
    name: string
    value: any
}

export class Dropdown extends React.Component<{
    options: DropdownOption[],
    current?: DropdownOption,
    onSelect: (op: DropdownOption) => void
    style: any
}, {
        options: DropdownOption[],
        current?: DropdownOption,
        onSelect: (op: DropdownOption) => void,
        showSelection: boolean
    }> {
    selection = new DropdownSelections(this.props.options)
    constructor(public readonly props) {
        super(props)
        this.state = {
            options: props.options || [],
            current: props.current || null,
            onSelect: props.onSelect || (() => { }),
            showSelection: false
        }
        this.selection.events.listenBy(this, "select", (op) => {
            this.selection.asPopup.hide()
            this.setState({
                current: op
            })
            this.state.onSelect(op)
        })
    }
    render() {
        let current = this.state.current || this.state.options[0]
        let options = this.state.options
        let name = current && current.name || "无"
        return (
            <TouchableOpacity style={{
                ...this.props.style || {},
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "relative",
                overflow: "visible"
            }}
                onPress={() => {
                    this.selection.asPopup.show()
                }}
            >
                <Text style={{
                    textAlign: "center",
                    minWidth: 26
                }}>{name}</Text>
                <Icon
                    src={require("../resource/image/icon@3x/icon-down.png")}
                    size={24}
                />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
});
export class DropdownSelections extends List<DropdownItem> {
    constructor(public options: DropdownOption[]) {
        super()
        this.compose(() => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.asPopup.hide()
                    }}
                >
                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.35)",
                        zIndex: 100,
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "100%",
                        }}>
                            {this.items.map((item) => <item.Component key={item.option.name} />)}
                        </View>
                    </View></TouchableWithoutFeedback>)
        })
        for (let op of options) {
            this.add(new DropdownItem(this, op))
        }
    }
    asPopup = new PopupBehavior(this)
}
export class DropdownItem extends Widget {
    constructor(public parent: DropdownSelections, public readonly option: DropdownOption) {
        super()
        this.compose(() => {
            let op = this.option
            return <TouchableWithoutFeedback onPress={() => {
                this.parent.events.emit("select", this.option)
            }}
                key={op.value}
            ><View
                style={{
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    backgroundColor: "white",
                    zIndex: 100,
                    borderBottomWidth: 1,
                    height: 48,
                    borderBottomColor: "#eee",
                    justifyContent: "center",
                }}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 16
                        }}
                    >{op.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        })
    }
}
