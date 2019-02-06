import * as React from "react"
import {
    View,
    Text,
    Image,
    SectionList,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Linking,
} from "react-native"
import { Config, PostType } from "./Config"
import { Icon, NavigatorMenuLightground, NavigatorSettingLightground, TestAvatarCircle } from "./common/Icon"
import { Cell, IOSContent, IOSContentData } from "./common/Cell"
import { Separator } from "./common/Separator"
import { FooterButton } from "./common/Footer"
import { APIService } from "./service/apiService"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"


const buyerDataSource = [
    {
        data: [{ title: "我的订单" }, { title: "服务管理" },],
        title: 0
    }, {
        data: [{ title: "厂家入驻" }, { title: "求职管理" },],
        title: 1
    }, {
        data: [{ title: "联系客服" },],
        title: 2
    },
]

const sellerDataSource = [
    {
        data: [{ title: "我的订单" }, { title: "服务管理" },],
        title: 0
    }, {
        data: [{ title: "厂家信息" }, { title: "商品管理" }, { title: "职位管理" }],
        title: 1
    },
    {
        data: [{ title: "销售订单" }],
        title: 2
    }, {
        data: [{ title: "联系客服" },],
        title: 3
    },
]

const disabledDataSource = [
    { data: [{ title: "联系客服" }], title: 0 }
]

export class Setting extends React.Component {
    private api = new APIService()
    private didFocus
    private lastPressTime: number = 0
    props: { navigation?: any }
    state: {
        account?: AccountService.Account,
        seller?: ShopService.Seller,
        information?: PlatformService.Information,
        sectionDataSource?: any
        currentRouteFocused?: boolean
    }

    constructor(props) {
        super(props)
        this.state = {
            account: null,
            seller: null,
            information: null,
            sectionDataSource: buyerDataSource,
            currentRouteFocused: false
        }
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getShopEnv()
                this.getInformation()
                this.setState({ currentRouteFocused: true })
            }
        )
    }

    componentDidMount() {
    }
    componentWillUnmount() {
        this.didFocus.remove()
    }

    private getShopEnv() {
        this.api.handleToken((token) => {
            this.api.setToken(token)
            HUD.show()
            this.api.Shop.getShopEnv(null, (err, { seller, account }) => {
                HUD.hide()
                if (err) {
                    console.log("getShopEnv err: ", JSON.stringify(err))
                    return
                }
                //console.log("getShopEnv account: ", JSON.stringify(account), " seller: ", seller)
                if (seller) this.setState({ account: account, seller: seller, sectionDataSource: seller.verified ? (seller.disabled ? disabledDataSource : sellerDataSource) : buyerDataSource })
                else this.setState({ account: account })
            })
        })
    }

    private getInformation() {
        this.api.Platform.getInformation(null, (err, information) => {
            if (err) return
            this.setState({ information: information })
        })
    }

    private getRowKey(section, row) {
        let dataSource = this.state.sectionDataSource
        if (dataSource.length > section) {
            let sectionData = dataSource[section].data
            if (sectionData.length > row) {
                return sectionData[row].title
            }
        }
    }

    private contactService() {
        const { information } = this.state
        if (!information || !information.customerServicePhoneNumber) return
        const contactURL = "tel://" + information.customerServicePhoneNumber
        Linking.canOpenURL(contactURL).then((open) => {
            if (open) {
                Linking.openURL(contactURL)
            } else {
                Toast.show("无效的手机号")
            }
        })
    }

    private onPressAccount() {
        this.props.navigation.navigate("AccountManager", { account: this.state.account })
    }

    private onPressAvatar() {
        this.onPressAccount()
    }

    private onPressRow(item, index) {
        let { seller } = this.state
        if (!seller || !seller.verified) {
            if (item.title === this.getRowKey(0, index)) {
                if (index == 0) {
                    this.props.navigation.navigate("OrderManager", { type: "buyer" })
                    // alert(Config.testAlertMessage)
                } else if (index == 1) {
                    this.props.navigation.navigate("PostManager", { type: PostType.subject })
                }
            } else if (item.title === this.getRowKey(1, index)) {
                if (index == 0) {
                    //if (seller && !seller.verified) {
                    //Toast.show("您还未通过审核，通过后会以短信通知您")
                    //return
                    //}
                    this.props.navigation.navigate("SellerApply", { id: null })
                } else if (index == 1) {
                    this.props.navigation.navigate("PostManager", { type: PostType.job })
                }
            } else if (item.title === this.getRowKey(2, index)) {
                if (index == 0) {
                    this.contactService()
                }
            }
            return
        }
        if (this.state.seller.disabled) {
            if (item.title == this.getRowKey(0, index)) {
                if (index == 0) {
                    this.contactService()
                }
            }
            return
        }
        if (item.title === this.getRowKey(0, index)) {
            if (index == 0) {
                this.props.navigation.navigate("OrderManager", { type: "buyer" })
                // alert(Config.testAlertMessage)
            } else if (index == 1) {
                this.props.navigation.navigate("PostManager", { type: PostType.subject })
            }
        } else if (item.title === this.getRowKey(1, index)) {
            if (index == 0) {
                this.props.navigation.navigate("SellerApply", { id: this.state.seller.id })
            } else if (index == 1) {
                this.props.navigation.navigate("SPUManager")
            } else if (index == 2) {
                this.props.navigation.navigate("PostManager", { type: PostType.position })
            }
        } else if (item.title === this.getRowKey(2, index)) {
            if (index == 0) {
                this.props.navigation.navigate("OrderManager", { type: "seller" })
            }
        } else if (item.title === this.getRowKey(3, index)) {
            if (index === 0) {
                this.contactService()
            }
        }
    }

    private onPressFooter() {
        Alert.alert("是否退出登录?", null, [{ text: "否", onPress: () => { } }, {
            text: "是", onPress: () => {
                AsyncStorage.removeItem(Config.keys.token).then(() => {
                    this.props.navigation.navigate("Auth")
                })
            }
        }])
    }

    private renderHeader() {
        const { account } = this.state
        return (
            <View
                style={{
                    height: 200
                }} >
                <Image
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    source={{ uri: "setup_bg" }} />
                <View
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }} >
                    <View
                        style={{
                            paddingHorizontal: 8,
                            height: 44,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }} >
                        <View
                            style={{
                                width: NavigatorMenuLightground.width
                            }} />
                        <Text
                            style={{
                                fontSize: 16,
                                color: "white"
                            }}>
                            {"我的"}
                        </Text>
                        {/* <View
                            style={{
                                width: NavigatorSettingLightground.width
                            }} /> */}
                        <TouchableOpacity onPress={() => this.onPressAccount()} >
                            <Icon icon={NavigatorSettingLightground} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            alignSelf: "center"
                        }}
                        onPress={() => this.onPressAvatar()} >
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                marginTop: 10
                            }}
                            source={{ uri: account && account.props.avatar ? (Config.root + account.props.avatar) : TestAvatarCircle.name }} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginTop: 10,
                            alignSelf: "center",
                            fontSize: 14,
                            color: "white",
                            marginBottom: 15,
                        }}>
                        {account ? account.displayName : "红木爱好者"}
                    </Text>
                </View >
            </View>
        )
    }

    private renderRow(item, index) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: "white",
                    height: 50,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                }}
                onPress={() => this.onPressRow(item, index)} >
                <Text
                    style={{
                        fontSize: 16
                    }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    private renderBottom() {
        const { account, seller } = this.state
        if (seller && seller.disabled) {
            return (
                <Text
                    style={{
                        color: Config.textColor,
                        fontSize: 16,
                        paddingHorizontal: Config.horizontal,
                        marginBottom: 20,
                        width: "100%",
                        textAlign: "center",
                    }}
                    numberOfLines={0}>
                    {"您的商家功能已停用，请联系客服"}
                </Text>
            )
        }
        return null
    }

    render() {
        const { seller, sectionDataSource } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                {this.renderHeader()}
                <SectionList
                    automaticallyAdjustContentInsets={false}
                    sections={sectionDataSource}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    renderSectionHeader={() =>
                        <View
                            style={{
                                height: 10,
                            }} >
                        </View>
                    }
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} />
                {this.renderBottom()}
            </View>

        )
    }
}
