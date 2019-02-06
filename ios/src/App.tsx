import * as React from "react"
import { AppLoading, Asset } from "expo"
import { payInitialize } from "./Pay"
import { Permission } from "./Permission"
import { Launcher } from "./Navigation"


export default class App extends React.Component {

    componentDidMount() {
        Permission.permissionInitialize()
        payInitialize()
    }

    render() {
        return (
            <Launcher />
        )
    }
}
