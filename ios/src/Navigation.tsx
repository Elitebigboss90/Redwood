import * as React from "react"
import { View, Image, AsyncStorage, TouchableWithoutFeedback } from "react-native"
import { SwitchNavigator, TabNavigator, StackNavigator, TabBarBottom } from "react-navigation"
import { Icon, TabBarHomeNormal, TabBarHomeSelected, TabBarCartNormal, TabBarCartSelected, TabBarAccountNormal, TabBarAccountSelected, NavigatorBackIcon, ArrowLeft } from "./common/Icon"
import { CustomStatusBar, CustomIndicator } from "./common/Custom"
import { Config } from "./Config"
import { Home, SearchDisplayer } from "./Home"
import { Cart, Order, OrderManager, OrderDetail } from "./Cart"
import { Setting } from "./Setting"
import { SPU, SPUManager, SPUEditor } from "./SPU"
import { ReceiverSelector, ReceiverEditor, ReceiverManager } from "./Receiver"
import { Article, ArticleEditor } from "./Article"
import { Seller, SellerApply } from "./Seller"
import { AccountManager, PostManager } from "./Manager"
import { Login, Register, ResetPwd } from "./Auth"
import { ImageViewer } from "./ImageViewer"
import { Browser } from "./Browser"
import { CameraRoll } from "./util/CameraRoll"
import { ImageBrowser } from "./util/ImageBrowser"


class LaunchLoading extends React.Component {
    props: { navigation: any }
    constructor(props) {
        super(props)
        this.launch()
    }
    private launch() {
        // AsyncStorage.getItem(Config.keys.token).then((token) => {
        //     this.props.navigation.navigate(token ? "Tab" : "Auth")
        // })
        this.props.navigation.navigate("Tab")
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <CustomStatusBar />
            </View>
        )
    }
}


function renderTabBarIcon(focused, tintColor, normalImage, selectedImage) {
    return (
        <TabBarItem
            style={{ tintColor: tintColor }}
            focused={focused}
            normalImage={normalImage}
            selectedImage={selectedImage} >
        </TabBarItem>
    )
}


class TabBarItem extends React.Component {
    private static defaultProps = { style: {} }
    props: {
        style?: any,
        focused?: boolean,
        normalImage: any,
        selectedImage: any,
    }
    render() {
        const { normalImage, selectedImage } = this.props
        return (
            <Icon
                style={{
                    width: 25,
                    height: 25,
                    ...this.props.style
                }}
                icon={this.props.focused ? selectedImage : normalImage} />
        )
    }
}

const AuthStack = StackNavigator(
    {
        Login: { screen: Login, navigationOptions: { header: null } },
        Register: { screen: Register, navigationOptions: { header: null } },
        Reset: { screen: ResetPwd, navigationOptions: { title: "重置密码" } },
    },
    {
        headerMode: "screen",
        mode: "modal",
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: Config.headerTintColor,
        }
    }
)

const navigatorHeaderBackImage = NavigatorBackIcon.source

const HomeNav = StackNavigator(
    {
        Home: { screen: Home, navigationOptions: { tabBarVisible: true } },
        Article: { screen: Article, navigationOptions: { tabBarVisible: false } },
        ArticleEditor: { screen: ArticleEditor, navigationOptions: { tabBarVisible: false } },
        Seller: { screen: Seller, navigationOptions: { tabBarVisible: false } },
        Search: { screen: SearchDisplayer, navigationOptions: { tabBarVisible: false } },
        SPU: { screen: SPU, navigationOptions: { tabBarVisible: false, header: null } },
        Order: { screen: Order, navigationOptions: { tabBarVisible: false } },
        OrderDetail: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
        ReceiverSelector: { screen: ReceiverSelector, navigationOptions: { tabBarVisible: false } },
        ReceiverManager: { screen: ReceiverManager, navigationOptions: { tabBarVisible: false } },
        ReceiverEditor: { screen: ReceiverEditor, navigationOptions: { tabBarVisible: false } },
        SPUEditor: { screen: SPUEditor, navigationOptions: { tabBarVisible: false } },
    }, {
        headerMode: "screen",
        navigationOptions: {
            headerBackTitle: null,
            // headerBackImage: navigatorHeaderBackImage,
            headerTintColor: Config.headerTintColor,
        },
    }
)


const HomeStack = StackNavigator(
    {
        Main: { screen: HomeNav, navigationOptions: { header: null } },
        CartModal: { screen: Cart, navigationOptions: { tabBarVisible: false } },
        OrderDetailModal: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
    },
    {
        mode: "modal",
        headerMode: "screen",
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: Config.headerTintColor,
        },
    }
)

const CartNav = StackNavigator(
    {
        Cart: { screen: Cart, navigationOptions: { tabBarVisible: true } },
        SPU: { screen: SPU, navigationOptions: { header: null, tabBarVisible: false } },
        Seller: { screen: Seller, navigationOptions: { tabBarVisible: false } },
        Order: { screen: Order, navigationOptions: { tabBarVisible: false } },
        OrderDetail: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
        ReceiverSelector: { screen: ReceiverSelector, navigationOptions: { tabBarVisible: false } },
        ReceiverManager: { screen: ReceiverManager, navigationOptions: { tabBarVisible: false } },
        ReceiverEditor: { screen: ReceiverEditor, navigationOptions: { tabBarVisible: false } },
    },
    {
        headerMode: "screen",
        navigationOptions: {
            headerBackTitle: null,
            // headerBackImage: navigatorHeaderBackImage,
            headerTintColor: Config.headerTintColor,
        }
    }
)

const CartStack = StackNavigator(
    {
        Main: { screen: CartNav, navigationOptions: { header: null } },
        CartModal: { screen: Cart, navigationOptions: { tabBarVisible: false } },
        OrderDetailModal: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
    },
    {
        headerMode: "screen",
        mode: "modal",
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: Config.headerTintColor,
        },
    }
)
const Settingnav = StackNavigator(
    {
        Setting: { screen: Setting, navigationOptions: { tabBarVisible: true, header: null } },
        SellerApply: { screen: SellerApply, navigationOptions: { tabBarVisible: false } },
        Seller: { screen: Seller, navigationOptions: { tabBarVisible: false } },
        SPU: { screen: SPU, navigationOptions: { header: null, tabBarVisible: false } },
        SPUManager: { screen: SPUManager, navigationOptions: { tabBarVisible: false } },
        PostManager: { screen: PostManager, navigationOptions: { tabBarVisible: false } },
        ArticleEditor: { screen: ArticleEditor, navigationOptions: { tabBarVisible: false } },
        SPUEditor: { screen: SPUEditor, navigationOptions: { tabBarVisible: false } },
        AccountManager: { screen: AccountManager, navigationOptions: { tabBarVisible: false } },
        OrderManager: { screen: OrderManager, navigationOptions: { tabBarVisible: false } },
        OrderDetail: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
        Order: { screen: Order, navigationOptions: { tabBarVisible: false } },
        ReceiverManager: { screen: ReceiverManager, navigationOptions: { tabBarVisible: false } },
        ReceiverEditor: { screen: ReceiverEditor, navigationOptions: { tabBarVisible: false } },
        Browser: { screen: Browser, navigationOptions: { tabBarVisible: false } },
        //CameraRoll:{screen: CameraRoll, navigationOptions: { tabBarVisible: false }},
        ImageBrowser:{screen: ImageBrowser, navigationOptions: {header:null, tabBarVisible: false }},
    },
    {
        headerMode: "screen",
        navigationOptions: {
            headerBackTitle: null,
            // headerBackImage: navigatorHeaderBackImage,
            headerTintColor: Config.headerTintColor,
        },
    }
)
const SettingStack = StackNavigator(
    {
        Main: { screen: Settingnav, navigationOptions: { header: null } },
        Article: { screen: Article, navigationOptions: { tabBarVisible: false } },
        ImageViewer: { screen: ImageViewer, navigationOptions: { tabBarVisible: false, header: null } },
        CartModal: { screen: Cart, navigationOptions: { tabBarVisible: false } },
        OrderDetailModal: { screen: OrderDetail, navigationOptions: { tabBarVisible: false } },
    },
    {
        headerMode: "screen",
        mode: "modal",
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: Config.headerTintColor,
        },
    }
)

export const Tab = TabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "首页",
                tabBarIcon: ({ focused, tintColor }) => (
                    renderTabBarIcon(focused, tintColor, TabBarHomeNormal, TabBarHomeSelected)
                )
            }),
        },
        Cart: {
            screen: CartStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "购物车",
                tabBarIcon: ({ focused, tintColor }) => (
                    renderTabBarIcon(focused, tintColor, TabBarCartNormal, TabBarCartSelected)
                )
            }),
        },
        Setting: {
            screen: SettingStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "我的",
                tabBarIcon: ({ focused, tintColor }) => (
                    renderTabBarIcon(focused, tintColor, TabBarAccountNormal, TabBarAccountSelected)
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: Config.styleColor,
            inactiveTintColor: "gray",
            style: { backgroundColor: "white", height: 50 },
            tabStyle: { borderBottomWidth: 0 },
        },
    },

)

export const Launcher = SwitchNavigator(
    {
        Launcher: LaunchLoading,
        Tab: Tab,
        Auth: AuthStack
    },
    {
        initialRouteName: "Launcher",
        resetOnBlur: true,
        backBehavior: "none",
    }
)
