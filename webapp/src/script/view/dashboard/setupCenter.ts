import { Tabs } from "../component/tabs";
import { PlatformManager } from "./platformManager";
import { HelpManager } from "./helpManager";

export class SetupCenter extends R.Dashboard.SetupCenter {
    tabs = new Tabs({
        tabs: [
            {
                name: "参数设置",
                content: new PlatformManager().node
            },
            {
                name: "使用帮助设置",
                content: new HelpManager().node
            },
        ]
    })

}