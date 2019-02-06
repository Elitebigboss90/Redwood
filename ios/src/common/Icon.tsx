import * as React from "react"
import { Image } from "react-native"

// "native" "react"
type IconLoadMode = "react" | "native"

const STATICICONLoadMode: IconLoadMode = "native"

const iconPath = "../../assets/images/"

interface IconSource { width: number, height: number, source: NodeRequire, name?: string }

export class Icon extends React.Component {
    static defaultProps = {
        style: {}
    }
    props: {
        style?: any,
        icon?: IconSource,
        source?: NodeRequire,
    }
    render() {
        const { style, icon, source } = this.props
        let imageSource
        switch (STATICICONLoadMode) {
            case "react": imageSource = icon.source || App.source; break
            case "native": imageSource = { uri: icon.name || App.name }; break
        }
        return (
            <Image
                style={{
                    width: icon.width || "100%",
                    height: icon.height || "100%",
                    ...style
                }}
                source={source || imageSource} >
            </Image>
        )
    }
}

// logo
export const Logo: IconSource = { width: 120, height: 55, source: require(iconPath + "logo.png"), name: "logo" }

// app
export const App: IconSource = { width: 1024, height: 1024, source: require(iconPath + "app.png"), name: "app" }

export const Launch: IconSource = { width: 375, height: 667, source: require(iconPath + "launchimage_logo.png"), name: "launchimage_logo" }

// navigator

export const NavigatorBackIcon: IconSource = { width: 12, height: 21, source: require(iconPath + "back_icon.png"), name: "back_icon" }

export const NavigatorSettingBackground: IconSource = { width: 375, height: 200, source: require(iconPath + "setup_bg.png"), name: "setup_bg" }

export const NavigatorMenuLightground: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_bars_light.png"), name: "icon_bars_light" }

export const NavigatorSettingLightground: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_setting_light.png"), name: "icon_setting_light" }


// tabbar
export const TabBarHomeSelected: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_mall_pre.png"), name: "icon_mall_pre" }

export const TabBarHomeNormal: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_mall.png"), name: "icon_mall" }

export const TabBarCartSelected: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_shopping_cart_pre.png"), name: "icon_shopping_cart_pre" }

export const TabBarCartNormal: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_shopping_cart.png"), name: "icon_shopping_cart" }

export const TabBarAccountSelected: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_user_pre.png"), name: "icon_user_pre" }

export const TabBarAccountNormal: IconSource = { width: 30, height: 30, source: require(iconPath + "icon_user.png"), name: "icon_user" }

// arrow
export const ArrowDownGray: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_down.png"), name: "icon_down" }

export const ArrowRightGray: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_right.png"), name: "icon_right" }

export const ArrowLeft: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_left.png"), name: "icon_left" }

export const ArrowLeftLight: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_left_light.png"), name: "icon_left_light" }

// small icon
export const SearchBarSearch: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_search.png"), name: "icon_search" }

export const ContactRed: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_call.png"), name: "icon_call" }

export const ContactGray: IconSource = { width: 20, height: 20, source: require(iconPath + "icon_phone.png"), name: "icon_phone" }

export const LocationGray: IconSource = { width: 20, height: 20, source: require(iconPath + "icon_adress.png"), name: "icon_adress" }

export const CartLight: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_car_light.png"), name: "icon_car_light" }

export const ImageAddGray: IconSource = { width: 20, height: 20, source: require(iconPath + "icon_img_add.png"), name: "icon_img_add" }

export const DeleteGray: IconSource = { width: 48, height: 48, source: require(iconPath + "icon_delete.png"), name: "icon_delete" }

export const CheckMarkRed: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_select.png"), name: "icon_select" }

export const CloseGray: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_close.png"), name: "icon_close" }

export const AddGray: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_add.png"), name: "icon_add" }

export const SubtractGray: IconSource = { width: 24, height: 24, source: require(iconPath + "icon_less.png"), name: "icon_less" }

export const WeixinLogo: IconSource = { width: 48, height: 48, source: require(iconPath + "icon_appwx_logo.png"), name: "icon_appwx_logo" }

// test data icon
export const TestAvatarCircle: IconSource = { width: 44, height: 44, source: require(iconPath + "picture_circle.png"), name: "picture_circle" }

export const TestAvatar: IconSource = { width: 44, height: 44, source: require(iconPath + "picture.png"), name: "picture" }
