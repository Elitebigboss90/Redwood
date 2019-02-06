import * as React from 'react';
import { StyleSheet, Text, View, TextInput, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';
import { App } from "./app"
import { Logo } from "./logo"
import { Widget } from "./base/widget"

export class HelloPop extends Widget {
    constructor() {
        super()
        this.compose(() => {
            return <View>
                <Text style={{}}
                >Hellow</Text>
                <this.button.Component />
                <RNButton />
                {this.objsViews.map(view => <view.Component />)}
            </View>
        })
    }
    objs = []
    objsViews = this.objs.map(item => new HelloObjectWidget(item))
    button = new HelloBigButton()
}


export class HelloBigButton extends Widget {
    constructor() {
        super()
        this.compose(() => {
            return <Text style={{

            }}
            >ButtonText</Text>

        })
    }
}


export class RNButton extends React.Component<{}, {}>{
    render() {
        return <Text style={{}}>ButtonText</Text>

    }
}

export class HelloObjectWidget extends HelloBigButton {
}
