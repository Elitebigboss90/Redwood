import * as React from "react"
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Linking,
    Alert,
    Switch
} from "react-native"
import * as moment from "moment"
import { Pay, PayType } from "./Pay"
import { Config } from "./Config"
import { Icon, TestAvatarCircle, NavigatorSettingBackground, ArrowRightGray, ContactRed } from "./common/Icon"
import { CustomButton } from "./common/Custom"
import { Separator, SpaceSeparator } from "./common/Separator"
import { APIService } from "./service/apiService"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { Cell, ReceiverContent, IndexPath } from "./common/Cell"
import { TabMenu } from "./common/TabMenu"
import { DropDownList, DropCategoryList } from "./common/DropDown"
import { AlertView } from "./common/Alert"
import { CheckMarkView, CheckMark } from "./CheckMarkView"
import * as Transformer from "./util/Transformer"
import { NavigatorBackButton } from "./common/Navigator"
import { Util } from "./util/utilities"


// ---------------------------------------------- Cart ----------------------------------------------

export class Cart extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props;
        return {
            title: "购物车",
            headerBackground:
                <Image
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    source={{ uri: "setup_bg" }} />,
            headerTitleStyle: {
                fontSize: 16,
                color: "white",
                lineHeight: 36
            },
        }
    }
    private allSelection: RoundSelection
    private api = new APIService()
    private didFocus
    props: { navigation?: any }
    state: {
        cartItems?: ShopService.CartItem[],
        groupedItems?: ShopService.CartItem[][],
        allSelected?: boolean,
        itemSelections?: boolean[][],
    }

    constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
            groupedItems: [],
            allSelected: false,
            itemSelections: [],
        }
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.setState({
                    allSelected: false,
                    groupedItems: [],
                })
                this.queryCartItems()
            }
        )
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        this.didFocus.remove()
    }

    private queryCartItems() {
        this.api.handleToken((token) => {
            this.api.setToken(token)
            HUD.show()
            this.api.Shop.queryCartItems(null, (err, cartItems) => {
                HUD.hide()
                //console.log(JSON.stringify([err, cartItems]))
                if (err) {
                    //console.log("queryCartItems err: ", JSON.stringify(err))
                    return
                }
                let itemSelections: boolean[][] = []
                if (cartItems.length === 0) {
                    return
                }
                const groupedItems = this.groupSameElementBySelleId(cartItems)
                groupedItems.forEach((items, section) => {
                    let selections: boolean[] = []
                    items.forEach((item, row) => {
                        selections.push(false)
                    })
                    itemSelections.push(selections)
                })
                this.setState({
                    cartItems: cartItems,
                    groupedItems: groupedItems,
                    itemSelections: itemSelections
                })
            })
        })
    }

    private groupSameElementBySelleId(items: ShopService.CartItem[]): Array<ShopService.CartItem[]> {
        if (items === null || items.length === 0) return []
        let sameItems: ShopService.CartItem[] = []
        let diffItems: ShopService.CartItem[] = []
        sameItems.push(items[0])
        items.forEach((item, index) => {
            if (index === 0) return
            if (item.sellerId === items[0].sellerId) {
                sameItems.push(item)
            } else {
                diffItems.push(item)
            }
        })
        let groupedItems = this.state.groupedItems
        groupedItems.push(sameItems)
        if (diffItems.length !== 0) {
            this.groupSameElementBySelleId(diffItems)
        }
        return groupedItems
    }

    private deleteCartItem(itemId: string, section: number, row: number) {
        let groupedItems = this.state.groupedItems
        if (groupedItems.length === 0 || groupedItems[section] === null || groupedItems[section][row] === null) return
        this.api.Shop.deleteCartItem({ cartItemId: itemId }, (err, result) => {
            if (err && !result) return
            Toast.show("删除成功")
            groupedItems[section].splice(row, 1)
            // console.log("group items after delete: " + JSON.stringify(groupedItems))
            this.setState({ groupedItems: groupedItems })
        })
    }

    private onPressSeller(sellerId: string) {
        this.props.navigation.navigate("Seller", { id: sellerId })
    }

    private onPressSelectAll(selected: boolean = false) {
        let itemSelections = this.state.itemSelections
        itemSelections.forEach((selections, section) => {
            selections.forEach((selection, row) => {
                itemSelections[section][row] = selected
            })
        })
        this.setState({
            allSelected: selected,
            itemSelections: itemSelections
        })
    }

    private onPressRow(item: ShopService.CartItem, index: number) {
        this.props.navigation.navigate("SPU", { id: item.productId })
    }

    private onPressDelete(item: ShopService.CartItem, section: number, row: number) {
        this.deleteCartItem(item.id, section, row)
    }

    private onPressPay(seletedCount: number) {
        if (seletedCount === 0) {
            Toast.show("您还没有选择宝贝哦")
            return
        }
        const { groupedItems, itemSelections } = this.state
        let groupedOrderItems: ShopService.Order.Item[][] = []
        groupedItems.forEach((items, section) => {
            let orderItems: ShopService.Order.Item[] = []
            items.forEach((item, row) => {
                if (itemSelections[section][row]) {
                    orderItems.push({
                        sellerId: item.sellerId,
                        skuId: item.skuId,
                        productId: item.productId,
                        transportFee: null,
                        basePrice: item.unitPrice,
                        totalPrice: null,
                        name: item.displayName,
                        quantity: item.quantity
                    })
                }
            })
            orderItems.length > 0 ? groupedOrderItems.push(orderItems) : null
        })
        this.props.navigation.navigate("Order", { items: groupedOrderItems, cartItems: this.state.cartItems })
    }

    private renderSections() {
        const { groupedItems } = this.state
        let sectionNodes: JSX.Element[] = []
        groupedItems.forEach((sectionItems, section) => {
            if (sectionItems === null || sectionItems.length === 0) return
            sectionNodes.push(
                <View
                    key={section.toString()}
                    style={{
                        backgroundColor: "white",
                        marginBottom: 10
                    }} >
                    <TouchableWithoutFeedback
                        onPress={() => this.onPressSeller(sectionItems[0].sellerId)} >
                        <View
                            style={{
                                padding: Config.horizontal,
                                flexDirection: "row",
                                alignItems: "center",
                            }} >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: Config.textColor,
                                }} >
                                {sectionItems[0].sellerName}
                            </Text>
                            <Icon icon={ArrowRightGray} />
                        </View>
                    </TouchableWithoutFeedback>
                    {this.renderItems(sectionItems, section)}
                </View>
            )
        })
        return sectionNodes
    }

    private renderItems(items: ShopService.CartItem[], section: number) {
        let itemCells = []
        const { itemSelections } = this.state
        const itemHeight = 120
        const padding = Config.horizontal
        const iconSize = itemHeight - padding * 2
        items.forEach((item, row) => {
            const itemSelected = itemSelections[section][row]
            const orderItem: ShopService.Order.Item = {
                sellerId: item.sellerId,
                skuId: item.skuId,
                productId: item.productId,
                transportFee: null,
                basePrice: item.unitPrice,
                totalPrice: null,
                name: item.displayName,
                quantity: item.quantity
            }
            const itemCell =
                <View
                    key={row.toString()} >
                    <Separator />
                    <TouchableOpacity
                        onPress={() => this.onPressRow(item, row)}>
                        <View
                            style={{
                                flexDirection: "row",
                                height: itemHeight,
                            }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    let selections = itemSelections
                                    selections[section][row] = !itemSelected
                                    this.setState({ itemSelections: selections })
                                }}>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingHorizontal: 10,
                                    }}>
                                    <RoundSelection
                                        selected={itemSelected} />
                                </View>
                            </TouchableWithoutFeedback>
                            <OrderItem
                                style={{
                                    flex: 1,
                                    paddingRight: Config.horizontal,
                                }}
                                item={orderItem}
                                thumb={item.thumbs[0]}
                                onPressDelete={() => this.onPressDelete(item, section, row)} />
                        </View>
                    </TouchableOpacity>
                </View>
            itemCells.push(itemCell)
        })
        return (
            <View >
                {itemCells}
            </View>
        )
    }

    renderFooter() {
        const { groupedItems, itemSelections } = this.state
        let sumPrice = 0
        let sumSelection = 0
        groupedItems.forEach((items, section) => {
            items.forEach((item, row) => {
                const selection = itemSelections[section][row]
                if (selection) {
                    sumPrice += item.unitPrice * item.quantity
                }
                sumSelection += +selection
            })
        })
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <TouchableWithoutFeedback
                    onPress={() => this.onPressSelectAll(!this.state.allSelected)}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: Config.horizontal,
                            height: "100%"
                        }}>
                        <RoundSelection selected={this.state.allSelected} />
                        <Text
                            style={{
                                fontSize: 14,
                                marginLeft: 6,
                                color: Config.textColor
                            }}>
                            {"全选"}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        height: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        right: 0
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 10
                        }}>
                        {"合计：￥" + Transformer.centToYuan(sumPrice)}
                    </Text>
                    <CustomButton
                        style={{
                            height: "100%",
                            width: 100,
                            backgroundColor: Config.styleColor
                        }}
                        textStyle={{
                            color: "white"
                        }}
                        text={"结算 (" + sumSelection + ")"}
                        onPress={() => this.onPressPay(sumSelection)} />
                </View>
            </View>
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1
                }}>
                <ScrollView>
                    {this.renderSections()}
                </ScrollView>
                {this.renderFooter()}
            </View>
        )
    }
}


class RoundSelection extends React.Component {
    static defaultProps = {
        style: {},
        selected: false,
        normalTintColor: "#979797",
        seletedTintColor: Config.styleColor,
    }
    props: {
        style?: any,
        selected: boolean,
        normalTintColor?: string,
        seletedTintColor?: string,
    }

    render() {
        const { style, selected, normalTintColor, seletedTintColor } = this.props
        const size = style.width || style.height || Math.min(style.width, style.height) || 18
        const borderWidth = style.borderWidth || 1
        const inset = borderWidth + 2
        const inSize = size - borderWidth - inset
        let insideView = selected ?
            <View
                style={{
                    backgroundColor: seletedTintColor,
                    width: inSize,
                    height: inSize,
                    borderRadius: inSize * 0.5
                }} /> : undefined
        return (
            <View
                style={{
                    width: size,
                    height: size,
                    borderColor: selected ? seletedTintColor : (normalTintColor),
                    borderWidth: borderWidth,
                    borderRadius: size * 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    ...style,
                }} >{insideView}</View>
        )
    }
}


class CartSectionHeader extends React.Component {
    static defaultProps = {
        style: {},
        imageStyle: {},
        textStyle: {}
    }
    props: {
        style?: any,
        imageStyle?: any,
        textStyle?: any,
        icon?: NodeRequire,
        title: string
    }

    render() {
        const { style, imageStyle, textStyle, icon, title } = this.props
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    ...style,
                }} >
                <Image
                    style={{
                        width: 24,
                        height: 24,
                        ...imageStyle
                    }}
                    source={icon} />
                <Text
                    style={{
                        marginLeft: 5,
                        fontSize: 14,
                        color: Config.textColor,
                        ...style
                    }} >
                    {title}
                </Text>
            </View>
        )
    }
}



// ---------------------------------------------- Order ----------------------------------------------

export class Order extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "确认订单",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    props: { navigation: any }
    state: {
        receiver?: TransportService.Receiver,
        groupedProducts?: ShopService.Product[][],
        sellers?: ShopService.Seller[],
        procurementSelected?: boolean,
        platformInformation?: PlatformService.Information,
    }
    private api = new APIService()
    private cartItems: ShopService.CartItem[] = []
    private groupedItems: ShopService.Order.Item[][] = []
    private didFocus
    private selectedReceiverId: string = null
    private sumPrices: {
        itemPrice?: number,
        transportPrice?: number,
        orderPrice?: number,
    } = {
            itemPrice: 0,
            transportPrice: 0,
            orderPrice: 0
        }

    constructor(props) {
        super(props)
        this.state = {
            receiver: null,
            groupedProducts: [],
            sellers: [],
            procurementSelected: false,
        }
        this.api.handleNeedToken(this)
        const { params } = this.props.navigation.state
        if (params.items) {
            this.groupedItems = params.items
            // console.log("orderItems: " + JSON.stringify(this.groupedItems))
            // console.log("orderItems: " + JSON.stringify(this.groupedItems.map(items => items.map(item => item.productId))))
        }
        if (params.cartItems) {
            this.cartItems = params.cartItems
        }
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getMyReceiver()
            }
        )
    }

    componentDidMount() {
        this.getProductAndSellers()
        this.getPlatformInformation()
    }

    componentWillUnmount() {
        this.didFocus.remove()
    }

    private getMyReceiver() {
        this.api.Transport.getMyReceivers(null, (err, receivers) => {
            if (!receivers || receivers.length === 0) {
                this.setState({ receiver: null })
                return
            }
            if (this.selectedReceiverId) {
                receivers.forEach((receiver, index) => {
                    if (this.selectedReceiverId === receiver.id) {
                        this.setState({ receiver: receivers[index] })
                    }
                })
            } else {
                AsyncStorage.getItem(Config.keys.defaultReceiverId).then((receiverId) => {
                    // console.log(JSON.stringify(receivers))
                    let defaultReceiverIndex = 0
                    if (receiverId) {
                        receivers.forEach((receiver, index) => {
                            if (this.selectedReceiverId === receiver.id) {
                                this.setState({ receiver: receivers[index] })
                            }
                        })
                    } else {
                        this.setState({ receiver: receivers[0] })
                    }
                })
            }
        })
    }

    private getPlatformInformation() {
        this.api.Platform.getInformation(null, (err, information) => {
            if (err) return
            console.log("platform information: " + JSON.stringify(information))
            this.setState({ platformInformation: information })
        })
    }

    private getProductAndSellers() {
        const items = this.groupedItems || null
        if (items === null) return
        HUD.show()
        let sumItemPrice: number = 0
        let sumTransportPrice: number = 0
        let groupedProducts: ShopService.Product[][] = []
        let sellers: ShopService.Seller[] = []
        items.forEach((itemSection, section) => {
            let products: ShopService.Product[] = []
            this.api.Shop.getSellerById({ sellerId: itemSection[0].sellerId }, (err, seller) => {
                if (err) {
                    HUD.hide()
                    return
                }
                sellers.push(seller)
                if (section === items.length - 1 && sellers.length === items.length) {
                    this.setState({
                        sellers: sellers
                    })
                }
            })
            itemSection.forEach((itemRow, row) => {
                this.api.Shop.getProduct({ productId: itemRow.productId }, (err, product) => {
                    if (err) {
                        HUD.hide()
                        return
                    }
                    // console.log("product: " + "section" + section + " row" + row + " " + JSON.stringify(product))
                    sumItemPrice += product.basePrice * itemRow.quantity
                    sumTransportPrice += product.transportPrice
                    products.push(product)
                    if (row === itemSection.length - 1 && products.length > 0) {
                        groupedProducts.push(products)
                    }
                    if (section === items.length - 1 && products.length === itemSection.length) {
                        HUD.hide()
                        // console.log("products: " + JSON.stringify(groupedProducts))
                        // console.log("productIds: " + JSON.stringify(groupedProducts.map(items => items.map(item => item.id))))
                        this.sumPrices = {
                            itemPrice: sumItemPrice,
                            transportPrice: sumTransportPrice,
                            orderPrice: sumItemPrice + sumTransportPrice
                        }
                        this.setState({
                            groupedProducts: groupedProducts,
                        })
                    }
                })
            })
        })
    }

    private orderPay(payload: any, paymentId: string, payType: PayType) {
        const pay = new Pay(payType)
        pay.pay(payload, (payErr) => {
            if (payErr) {
                Toast.show("支付失败")
            }
            pay.syncPayment(paymentId, (syncErr, payment) => {
                if (syncErr || payment.state !== "completed") {
                    Toast.show("支付失败")
                }
                if (payment && payment.orderIds[0]) {
                    this.props.navigation.navigate("OrderDetail", { orderId: payment.orderIds[0], goBack: () => this.returnFromOrderDetail() })
                }
            })
        })
    }

    private deleteItems(callback: Callback<null>) {
        let successes: boolean[] = []
        const cartItems = this.cartItems
        if (cartItems === null || cartItems.length === 0) {
            callback(null)
            return
        }
        cartItems.forEach((cartItem, index) => {
            this.api.Shop.deleteCartItem({ cartItemId: cartItem.id }, (err, success) => {
                //console.log("delete cartItem: " + JSON.stringify([err, success]))
                if (err) {
                    let _cb = callback
                    _cb(err)
                    return
                }
                successes.push(success)
                if (successes.length === cartItems.length) {
                    callback(null)
                    return
                }
            })
        });
    }

    private onSelectBack(receiverId: string) {
        console.log(receiverId)
        this.selectedReceiverId = receiverId
    }

    private returnFromOrderDetail() {
        console.log("returnFromOrderDetail")
        this.props.navigation.goBack()
    }

    private onPressReceiver() {
        this.props.navigation.navigate("ReceiverSelector", { onSelectReceiverId: (receiverId) => this.onSelectBack(receiverId) })
    }

    private onPressCommit() {
        const orderItems = this.groupedItems
        if (orderItems === null || orderItems.length === 0) {
            Toast.show("订单错误")
            return
        }
        const { receiver } = this.state
        if (receiver === null) {
            Toast.show("您还未选择收货地址哦")
            return
        }

        let itemQuerys: ShopService.Order.ItemQuery[] = []
        orderItems.forEach((items, i) => {
            items.forEach((item, j) => {
                itemQuerys.push({
                    skuId: item.skuId,
                    productId: item.productId,
                    quantity: item.quantity
                })
            })
        })
        const contact = receiver.contact
        const paymentType = Config.paymentType.wechat
        // console.log(JSON.stringify([contact, itemQuerys, paymentType]))
        HUD.show()
        this.api.Shop.createOrderAndPayment(
            {
                contact: contact,
                items: itemQuerys,
                paymentType: paymentType,
                procurement: this.state.procurementSelected || false
            },
            (err, payment) => {
                HUD.hide()
                console.log("createOrderAndPayment: " + JSON.stringify([err, payment]))
                if (err) {
                    Toast.show("订单创建失败")
                    return
                }
                this.deleteItems((err) => {
                    HUD.hide()
                    if (err) {
                        console.log("delete cartItem failed: " + JSON.stringify(err))
                    }
                    this.orderPay(payment.meta.payData, payment.id, "wechat")
                })
            }
        )
    }
    private renderReceiver() {
        const { receiver } = this.state
        return (
            <Cell
                indexPath={{ section: 0, row: 0 }}
                indicator={true}
                renderContent={(indexPath) =>
                    receiver ?
                        <ReceiverContent
                            style={{
                                backgroundColor: "white"
                            }}
                            item={receiver.contact} /> :
                        <View
                            style={{
                                backgroundColor: "white"
                            }}>
                            <Text
                                style={{
                                    color: Config.textColor,
                                    fontSize: 16,
                                }}>
                                {"选择收货地址"}
                            </Text>
                        </View>}
                onPressCell={(indexPath) => this.onPressReceiver()} />
        )
    }

    private renderSections() {
        const groupedItems = this.groupedItems
        const { groupedProducts, sellers } = this.state
        let sectionNodes: JSX.Element[] = []
        groupedItems.forEach((sectionItems, section) => {
            sectionNodes.push(
                <View
                    key={section.toString()}
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: Config.horizontal,
                        paddingVertical: 10,
                        marginTop: 10
                    }} >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            marginBottom: 10
                        }} >
                        {sellers && sellers.length === groupedItems.length ? sellers[section].name : ""}
                    </Text>
                    {this.renderItems(sectionItems, groupedProducts[section])}
                </View>
            )
        })
        return sectionNodes
    }

    private renderItems(items: ShopService.Order.Item[], products: ShopService.Product[]) {
        let itemCells = []

        items.forEach((item, index) => {
            itemCells.push(
                <View
                    key={index.toString()}>
                    <Separator />
                    <OrderItem
                        item={item}
                        thumb={products && products.length === items.length ? products[index].thumbs[0] : null} />
                </View>
            )
        });
        return (
            <View >
                {itemCells}
            </View>
        )
    }

    private renderPrice() {
        const { procurementSelected, platformInformation } = this.state
        const procurementFeeText = "代购费率：" + (platformInformation && platformInformation.procurementFeeRate ? platformInformation.procurementFeeRate : 0) * 100 + "%"
        const sumPrices = this.sumPrices
        return (
            <View
                style={{
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: "white",
                }} >
                <PriceCell
                    title={"代购"}
                    description={procurementFeeText}
                    renderTitleComponent={() =>
                        <Switch
                            style={{
                                transform: [{ scale: 0.8 }],
                            }}
                            onTintColor={Config.styleColor}
                            // thumbTintColor={"white"}
                            onValueChange={(on) => this.setState({ procurementSelected: on })}
                            value={this.state.procurementSelected}
                        />} >
                </PriceCell>
                <PriceCell
                    title={"商品总价："}
                    price={sumPrices.itemPrice} >
                </PriceCell>
                <PriceCell
                    title={"运费："}
                    price={sumPrices.transportPrice} >
                </PriceCell>
                <PriceCell
                    title={"订单总价："}
                    price={sumPrices.orderPrice} >
                </PriceCell>
                <Text
                    style={{
                        marginTop: 10,
                        color: Config.grayColor,
                        fontSize: 10
                    }}
                    numberOfLines={0}>
                    {"注：若您选择代购，订单总价=（代购费率+1）× 原订单价格"}
                </Text>
            </View>
        )
    }

    private renderPayment() {
        return (
            <Cell
                style={{
                    marginVertical: 10,
                }}
                indexPath={{ section: 0, row: 0 }}
                indicator={true}
                onPressCell={() => Toast.show("暂仅支持微信支付")}
                renderContent={() =>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                color: Config.grayColor,
                                fontSize: 16,
                            }}>
                            {"支付方式"}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 20,
                                color: Config.textColor,
                                fontSize: 16
                            }}>
                            {"微信支付"}
                        </Text>
                    </View>} />
        )
    }
    private renderFooter() {
        const { orderPrice } = this.sumPrices
        return (
            <View
                style={{
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }} >
                <Text
                    style={{
                        fontSize: 14,
                        color: Config.textColor,
                        marginRight: 10
                    }} >
                    {"合计金额：￥" + Transformer.centToYuan(orderPrice)}
                </Text>
                <CustomButton
                    style={{
                        width: 100,
                        height: 50,
                        backgroundColor: Config.styleColor
                    }}
                    textStyle={{
                        color: "white"
                    }}
                    text={"提交订单"}
                    onPress={() => this.onPressCommit()} />
            </View>
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                <ScrollView
                    showsVerticalScrollIndicator={false} >
                    {this.renderReceiver()}
                    {/* <View
                        style={{
                            backgroundColor: "white",
                            paddingHorizontal: Config.horizontal,
                            paddingVertical: 10,
                            marginTop: 10
                        }} > */}
                    {this.renderSections()}
                    {this.renderPrice()}
                    {/* </View> */}
                    {this.renderPayment()}
                </ScrollView>
                {this.renderFooter()}
            </View>
        )
    }
}

class OrderItem extends React.Component {
    static defaultProps = {
        style: {},
        deleteButtonStyle: {},
        onPressDelete: null,
    }
    props: {
        style?: any,
        deleteButtonStyle?: any,
        item: ShopService.Order.Item,
        thumb?: string
        onPressDelete?: (item: ShopService.Order.Item) => void
    }
    render() {
        const { item, thumb, onPressDelete } = this.props
        const specificationName: string = item && item.skuId ? item.skuId : null
        const orderPrice = Transformer.centToYuan(item && item.basePrice ? item.basePrice : 0)
        const quantity = item && item.quantity ? item.quantity : 0
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: Config.horizontal,
                    alignItems: "center",
                    ...this.props.style,
                }}>
                <Image
                    style={{
                        width: 90,
                        height: 90
                    }}
                    source={{ uri: Config.root + (thumb ? thumb : "") }} />
                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: "space-between"
                    }} >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }} >
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 14,
                                color: Config.textColor,
                            }}
                            numberOfLines={2} >
                            {item.name}
                        </Text>
                        {onPressDelete ?
                            <CustomButton
                                style={{
                                    width: 44,
                                    height: 24,
                                    borderWidth: 1,
                                    borderColor: Config.grayColor,
                                    ...this.props.deleteButtonStyle
                                }}
                                textStyle={{
                                    fontSize: 12,
                                    color: Config.textColor
                                }}
                                text={"删除"}
                                onPress={() => this.props.onPressDelete(item)} /> :
                            null}
                    </View>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Config.grayColor,
                            marginVertical: 10
                        }} >
                        {specificationName}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }} >
                        <Text
                            style={{
                                fontSize: 12,
                                color: Config.styleColor
                            }} >
                            {orderPrice}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: Config.grayColor
                            }} >
                            {"x" + quantity}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

class PriceCell extends React.Component {
    static defaultProps = {
        style: {},
        price: 0,
        renderTitleComponent: () => null
    }
    props: {
        style?: any,
        title: string,
        price?: number,
        description?: string,
        renderTitleComponent?: () => JSX.Element,
    }
    render() {
        const { style, title, price, description, renderTitleComponent } = this.props
        const descriptionText = description ? description : "¥" + Transformer.centToYuan(this.props.price)
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 5,
                    ...style,
                }} >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.grayColor,
                            marginRight: 10,
                        }} >
                        {this.props.title}
                    </Text>
                    {renderTitleComponent()}
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        color: Config.textColor
                    }} >
                    {descriptionText}
                </Text>
            </View>
        )
    }
}

const OrderStates: ShopService.Order.State[] = [
    null,
    "pending",
    "paid",
    "delivering",
    "refunding",
    "refunded",
    "refundRejected",
    "completed",
    "canceled",
]

export class OrderManager extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "订单管理",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    props: {
        navigation: any,
    }
    state: {
        currentOrderState?: number,
        displayOrders?: {
            sellerName: string,
            thumb?: string,
            order: ShopService.Order
        }[],
        orders?: ShopService.Order[],
        sellers?: ShopService.Seller[],
        displayThumbss?: string[][]
        refreshing?: boolean,
    }
    private role: "buyer" | "seller"
    private headerView: React.Component
    private dropDown: DropDownList
    private tabMenu: TabMenu
    private api = new APIService()
    private didFocus
    private currentPage: number = 0
    private transportNamePrompt: AlertView.Input
    private transportNumPrompt: AlertView.Input
    private readonly tabItemWidth = Dimensions.get("window").width / 5

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state
        if (params && params.type) {
            this.role = params.type
        }
        this.state = {
            currentOrderState: 0,
            orders: [],
            sellers: [],
            displayThumbss: [],
            refreshing: false
        }
        this.api.handleNeedToken(this)
    }

    componentDidMount() {
        this.queryOrders()
    }

    private queryOrders(stateIndex: number = this.state.currentOrderState) {
        const { currentOrderState, orders, sellers, displayThumbss } = this.state
        const queryCallBack: Callback<ShopService.Order<{
            contact: ContactService.Contact;
        }>[]> = (err, result) => {
            HUD.hide()
            console.log(JSON.stringify([err, result]))
            if (err) return
            // console.log("api - querySellerOrder: " + JSON.stringify(orders))
            let fetchedSellers: ShopService.Seller[] = []
            let fetchedThumbss: string[][] = []
            result.forEach((order, i) => {
                this.api.Shop.getSellerById({ sellerId: order.sellerId }, (err, seller) => {
                    if (err) return
                    fetchedSellers[i] = seller
                    if (fetchedSellers.length === result.length) {
                        if (this.currentPage === 0) {
                            this.setState({ sellers: fetchedSellers })
                        } else {
                            let sumSellers = sellers
                            fetchedSellers.forEach((fetchedSeller => {
                                sumSellers.push(fetchedSeller)
                            }))
                            this.setState({ sellers: sumSellers })
                        }
                    }

                })

                let fetchedThumbs: string[] = []
                order.items.forEach((item, j) => {
                    this.api.Shop.getProduct({ productId: item.productId }, (err, product) => {
                        if (err) return
                        fetchedThumbs[j] = product.thumbs && product.thumbs[0] ? product.thumbs[0] : ""
                        //if (fetchedThumbs.length === order.items.length) {
                        fetchedThumbss[i] = fetchedThumbs
                        //}
                        if (this.currentPage == 0) {
                            this.setState({ displayThumbss: fetchedThumbss })
                        } else {
                            let sumthumbss = this.state.displayThumbss
                            fetchedThumbss.forEach(fetchedThumbs => {
                                let sumThumbs: string[] = []
                                fetchedThumbs.forEach(fetchedThumb => {
                                    sumThumbs.push(fetchedThumb)
                                })
                                sumthumbss.push(sumThumbs)
                            })
                            this.setState({ displayThumbss: sumthumbss })
                        }

                        //if (fetchedThumbss.length === result.length) {
                        //if (this.currentPage === 0) {
                        //this.setState({ displayThumbss: fetchedThumbss })
                        //} else {
                        //let sumThumbss = displayThumbss
                        //fetchedThumbss.forEach(fetchedThumbs => {
                        //let sumThumbs: string[] = []
                        //fetchedThumbs.forEach(fetchedThumb => {
                        //sumThumbs.push(fetchedThumb)
                        //})
                        //sumThumbss.push(sumThumbs)
                        //})
                        //this.setState({ displayThumbss: sumThumbss })
                        //}
                        //}
                    })
                })
            })

            if (this.currentPage === 0) {
                this.setState({
                    orders: result
                })
            } else {
                let sumOrders = orders
                result.forEach(order => {
                    sumOrders.push(order)
                })
                this.setState({ orders: sumOrders })
            }
        }
        HUD.show()
        const state = OrderStates[stateIndex] ? OrderStates[stateIndex] : null
        const count = Config.countPerPage
        const params = { state: state, count: count, offset: this.currentPage * count }
        if (this.role === "seller") {
            this.api.Shop.querySellerOrder(params, (err, orders) => {
                queryCallBack(err, orders)
            })
        } else {
            this.api.Shop.queryBuyerOrder(params, (err, orders) => {
                queryCallBack(err, orders)
            })
        }
    }

    private async orderPay(payload: any, paymentId: string, payType: PayType) {
        const pay = new Pay(payType)
        pay.pay(payload, (payErr) => {
            if (payErr) {
                Toast.show("支付失败")
                return
            }
            pay.syncPayment(paymentId, (syncErr, payment) => {
                if (syncErr || payment.state !== "completed") {
                    Toast.show("支付失败")
                    return
                }
                Toast.show("订单支付成功")
                if (payment && payment.orderIds[0]) {
                    this.props.navigation.navigate("OrderDetail", { orderId: payment.orderIds[0] })
                }
            })
        })
    }

    private editOrderState(order: ShopService.Order, index: number) {
        if (!order) return
        const state = order.state
        if (this.role === "buyer") {
            if (state === "pending") {
                if (index === 0) {
                    this.setOrderCanceled(order.id)
                } else if (index === 1) {
                    this.api.Shop.createPayment({ orderId: order.id, type: Config.paymentType.wechat }, (err, payment) => {
                        if (err) {
                            Toast.show("支付失败")
                            return
                        }
                        this.orderPay(payment.meta.payData, payment.id, "wechat")
                    })
                }
            } else if (state === "delivering") {
                if (index == 0) {
                    this.showTransportInfo(order)
                } else if (index == 1) {
                    this.setOrderCompleted(order.id)
                }
            }
        } else if (this.role === "seller") {
            if (state === "paid") {
                this.transportNamePrompt.show({ order: order })
            } else if (state === "pending") {
                this.setOrderCanceled(order.id)
            } else if (state == "delivering") {
                this.showTransportInfo(order)
            }
        }
    }

    private setOrderCanceled(orderId: string) {
        if (!orderId) return
        Alert.alert("温馨提示", "确定取消订单?",
            [{ text: "否", onPress: () => { } },
            {
                text: "取消订单", onPress: () => {
                    console.log("edwfe")
                    this.api.Shop.setOrderCanceled({ orderId: orderId }, (err) => {
                        console.log("sefijoedf, ", JSON.stringify(err))
                        if (err) {
                            Toast.show("订单取消失败")
                            console.log("setOrderCanceled err: ", JSON.stringify(err))
                            return
                        }
                        Toast.show("订单取消成功")
                        this.queryOrders()
                    })
                }
            }]
        )
    }

    private setOrderCompleted(orderId: string) {
        if (!orderId) return
        Alert.alert("温馨提示", "确定已收货？",
            [{ text: "否", onPress: () => { } },
            {
                text: "是", onPress: () => {
                    this.api.Shop.setOrderCompleted({ orderId: orderId }, (err) => {
                        if (err) {
                            console.log("setOrderCompleted err: " + JSON.stringify(err))
                            Toast.show("确定收货失败")
                            return
                        }
                        this.queryOrders()
                    })
                }
            }]
        )
    }

    private onSubmitTransportNum(value: string, meta: any) {
        if (!value || !meta) return
        const transportName: string = meta.transportName || null
        const transportNum: string = value || null
        const order: ShopService.Order = meta.order || null
        if (!transportName || !transportNum || !order) return
        console.log("transportName: ", transportName, " transportNum: ", transportNum, " order: ", order)
        this.api.Shop.setOrderDelivering({ orderId: order.id, transportName: transportName, transportNum: transportNum }, (err, updatedOrder) => {
            if (!updatedOrder) {
                console.log("setOrderDelivering err: " + JSON.stringify(err))
                Toast.show("订单发货失败")
                return
            }
            Toast.show("订单发货成功")
            console.log("setOrderDelivering: " + JSON.stringify(updatedOrder))
            this.queryOrders()
        })
    }

    private onSubmitTransportName(value: string, meta: any) {
        if (!value || !meta) return
        meta["transportName"] = value
        this.transportNumPrompt.show(meta)
    }

    private showTransportInfo(order: ShopService.Order) {
        if (!order) return
        if (order.state != "delivering") return
        const { meta } = order
        Alert.alert(
            "物流信息",
            "物流名称: " + meta.transportName + "\n物流单号: " + meta.transportNum,
            [{ text: "我知道了", onPress: () => { } }]
        )
    }

    private onPressOrderTab(index: number) {
        this.setState({ currentOrderState: index })
        this.currentPage = 0
        this.queryOrders(index)
    }

    private onPressMore() {
        this.dropDown.showInTarget(this.headerView)
    }

    private onPressCategory(index: number) {
        // this.setState({ currentOrderState: index })
        this.onPressOrderTab(index)
        this.dropDown.hide()
    }

    private onPressOrderItem(item: ShopService.Order, index: number) {
        // console.log(item)
        if (!item) return
        this.props.navigation.navigate("OrderDetail", { orderId: item.id })
    }

    private renderHeader() {
        const { currentOrderState } = this.state
        return (
            <View
                style={{
                    backgroundColor: "white",
                    height: 44,
                    flexDirection: "row",
                    alignItems: "center"
                }}
                ref={(ref) => this.headerView = ref} >
                <TabMenu
                    ref={(ref) => this.tabMenu = ref}
                    style={{
                        flex: 1,
                    }}
                    scrollViewContentContainerStyle={{
                        alignItems: "center",
                    }}
                    textContainerStyle={{
                        width: this.tabItemWidth,
                        height: 35,
                    }}
                    currentSelectedIndex={currentOrderState}
                    tabs={OrderStates.map((state) => Transformer.orderStateToCN(state))}
                    onPressItem={(index) => this.onPressOrderTab(index)}
                    contentOffset={{ x: this.tabItemWidth * (currentOrderState - +(currentOrderState > 0)), y: 0 }} />
                <CustomButton
                    style={{
                        width: this.tabItemWidth,
                        height: "100%",
                        borderLeftWidth: 1,
                        borderLeftColor: Config.backgroundColor
                    }}
                    text={"更多"}
                    textStyle={{ color: Config.styleColor }}
                    onPress={() => this.onPressMore()} />
            </View>
        )
    }

    private renderContent() {
        const { orders } = this.state
        let orderSectionNodes: JSX.Element[] = []
        orders.forEach((order, section) => {
            orderSectionNodes.push(
                this.renderOrderSection(order, section)
            )
        })
        return (
            <View
                style={{
                    flex: 1
                }}>
                <FlatList
                    data={this.state.orders}
                    renderItem={({ item, index }) => this.renderOrderSection(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={() => {
                        this.currentPage = 0
                        this.queryOrders()
                    }}
                    refreshing={this.state.refreshing}
                    onEndReached={() => {
                        if (this.state.orders.length >= Config.countPerPage) {
                            this.currentPage++
                            this.queryOrders()
                        }
                    }}
                    onEndReachedThreshold={0.1} >
                </FlatList>
            </View>
        )
    }

    private renderOrderSection(order: ShopService.Order, section: number) {
        const { sellers, displayThumbss } = this.state
        let orderItemNodes: JSX.Element[] = []
        let sumQuantity = 0
        let sumOrderPrice = order && order.totalFee ? order.totalFee : 0
        let sumTransportPrice = 0
        order.items.forEach((item, row) => {
            sumQuantity += item.quantity
            sumTransportPrice += item.transportFee
            const thumb = displayThumbss[section] && displayThumbss[section][row] ? displayThumbss[section][row] : ""
            orderItemNodes.push(this.renderOrderItem(item, thumb, row))
        })
        return (
            <View
                key={section.toString()}
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: Config.horizontal,
                    paddingTop: 10,
                    marginTop: 10,
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }} >
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            marginBottom: 10
                        }} >
                        {sellers && sellers[section] ? sellers[section].name : ""}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Config.textColor,
                            marginBottom: 10
                        }} >
                        {order && order.state ? Transformer.orderStateToCN(order.state) : ""}
                    </Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => this.onPressOrderItem(order, section)}>
                    <View>
                        {orderItemNodes}
                    </View>
                </TouchableWithoutFeedback>
                <Separator style={{ marginHorizontal: 0 }} />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginVertical: 10
                    }}>
                    <Text
                        style={{
                            color: Config.grayColor,
                            fontSize: 14,
                        }}>
                        {"共" + sumQuantity + "件" + "商品" + " 合计："}
                    </Text>
                    <Text
                        style={{
                            color: Config.textColor,
                            fontSize: 14,
                        }}>
                        {"¥" + Transformer.centToYuan(sumOrderPrice) + " (含运费¥" + Transformer.centToYuan(sumTransportPrice) + ")"}
                    </Text>
                </View>
                {this.renderOrderEditor(order, section)}
                {this.renderTransportNamePrompt()}
                {this.renderTransportNumPrompt()}
            </View>
        )
    }

    private renderOrderEditor(order: ShopService.Order, index: number) {
        let orderDeliveredNode: JSX.Element = null
        if (order.state == "delivering" && order.meta.transportCreatedAt) {
            let autoDeliverDate = Math.round(10 - (Date.now() - order.meta.transportCreatedAt) / 1000 / 60 / 60 / 24)
            let autoDeliverText = ""
            if (this.role == "buyer") {
                autoDeliverText = "天后订单默认自动收货"
            } else if (this.role == "seller") {
                autoDeliverText = "天后订单默认确定收货"
            }
            if (autoDeliverDate > 0) {
                orderDeliveredNode =
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: Config.styleColor
                            }}>
                            {autoDeliverDate.toString()}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: Config.textColor,
                            }} >
                            {autoDeliverText}
                        </Text>
                    </View>
            }
        }
        let buttonTexts: string[] = []
        if (this.role === "buyer") {
            if (order.state === "pending") {
                buttonTexts[0] = "取消订单"
                buttonTexts[1] = "付款"
            } else if (order.state === "delivering") {
                buttonTexts[0] = "查看物流"
                buttonTexts[1] = "确定收货"
            }
        } else if (this.role === "seller") {
            if (order.state === "pending") {
                buttonTexts.push("取消订单")
            } else if (order.state === "paid") {
                buttonTexts.push("发货")
            } else if (order.state == "delivering") {
                buttonTexts[0] = "查看物流"
            }
        }
        let buttonNodes: JSX.Element[] = []
        buttonTexts.forEach((buttonText, index) => {
            buttonNodes.push(
                <CustomButton
                    key={index.toString()}
                    style={{
                        height: 30,
                        width: 80,
                        borderWidth: 1,
                        borderRadius: 100,
                        borderColor: "#BBBBBB",
                        marginLeft: 10
                    }}
                    textStyle={{
                        color: Config.grayColor,
                        fontSize: 14,
                    }}
                    text={buttonText}
                    onPress={() => this.editOrderState(order, index)}>
                </CustomButton>
            )
        })
        if (buttonNodes.length === 0) return <View></View>
        return (
            <View>
                <Separator style={{ marginHorizontal: 0 }} />
                <View
                    style={{
                        height: 50,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                    {orderDeliveredNode}
                    {buttonNodes}
                </View>
            </View>
        )
    }

    private renderOrderItem(item: ShopService.Order.Item, thumb: string, row: number) {
        return (
            <View
                key={row.toString()}>
                <Separator style={{ marginHorizontal: 0 }} />
                <OrderItem
                    item={item}
                    thumb={thumb}
                />
            </View>
        )
    }

    private renderTransportNamePrompt() {
        return (
            <AlertView.Input
                ref={(ref) => this.transportNamePrompt = ref}
                title={"输入物流名称"}
                placeholder={"请输入物流名称"}
                inputStyle={{ marginHorizontal: Config.horizontal }}
                cancelText={"取消"}
                submitText={"确定"}
                onSubmit={(text, meta) => this.onSubmitTransportName(text, meta)}
            />
        )
    }

    private renderTransportNumPrompt() {
        return (
            <AlertView.Input
                ref={(ref) => this.transportNumPrompt = ref}
                title={"输入物流单号"}
                placeholder={"请输入物流单号"}
                inputStyle={{ marginHorizontal: Config.horizontal }}
                cancelText={"取消"}
                submitText={"确定"}
                onSubmit={(text, meta) => this.onSubmitTransportNum(text, meta)}
            />
        )
    }

    private renderDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.dropDown = ref}
                containerStyle={{
                    marginTop: 10
                }}
                renderContent={() =>
                    <DropCategoryList
                        title={"分类筛选"}
                        categories={OrderStates.map((state) => Transformer.orderStateToCN(state))}
                        currentCategoryIndex={this.state.currentOrderState}
                        onPressCategory={(index) => this.onPressCategory(index)} />
                } >
            </DropDownList>
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderDropDown()}
            </View>
        )
    }
}


export class OrderDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "订单详情",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    props: {
        navigation
    }
    state: {
        order?: ShopService.Order,
        seller?: ShopService.Seller,
        products?: ShopService.Product[],
        role?: "buyer" | "seller",
        purchaseSelected?: boolean,
        platformInformation?: PlatformService.Information,
    }
    private api = new APIService()
    private orderId: string = null

    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state
        const { orderId } = params
        if (orderId) {
            this.orderId = orderId
        }
        this.state = {
            products: [],
            role: "buyer",
        }
        this.api.handleNeedToken(this)
    }

    componentDidMount() {
        this.getOrder(this.orderId)
    }

    componentWillUnmount() {
        const { params } = this.props.navigation.state
        const { goBack } = params
        if (goBack) {
            goBack()
        }
    }

    private getOrder(orderId: string) {
        if (orderId === null) return
        this.api.Shop.getOrderById({ orderId: orderId }, (err, order) => {
            console.log("getOrderById: ", + JSON.stringify([err, order]))
            if (err) {
                return
            }
            this.setState({ order: order })
            this.api.Shop.getAccountSeller(null, (err, seller) => {
                if (err) return
                if (seller && seller.id === order.sellerId) {
                    this.setState({ role: "seller" })
                }
            })

            this.api.Shop.getSellerById({ sellerId: order.sellerId }, (err, seller) => {
                //console.log("getSellerById: " + JSON.stringify(seller))
                if (err) return
                this.setState({
                    seller: seller
                })
            })

            let products: ShopService.Product[] = []
            order.items.forEach((item, index) => {
                this.api.Shop.getProduct({ productId: item.productId }, (err, product) => {
                    if (err) return
                    products[index] = product
                    if (products.length == order.items.length) {
                        this.setState({
                            products: products
                        })
                    }
                })
            })
        })
    }

    private onPressItem(item: ShopService.Order.Item, index: number) {
        const product = this.state.products[index] || null
        if (product && product.disabled) {
            Toast.show(Config.productDisabledPrompt)
        } else {
            this.props.navigation.navigate("SPU", { id: item.productId })
        }
    }

    private onPressContact(phone: string) {
        if (phone === null) return
        const contactURL = "tel://" + phone
        Linking.canOpenURL(contactURL).then((open) => {
            if (open) {
                Linking.openURL(contactURL)
            } else {
                Toast.show("无效的手机号")
            }
        })
    }

    private renderHeader() {
        const { order } = this.state
        return (
            <View
                style={{
                    backgroundColor: "white",
                    padding: Config.horizontal,
                    width: "100%"
                }}>
                <Text
                    style={{
                        color: Config.styleColor,
                        fontSize: 14
                    }}>
                    {order && order.state ? Transformer.orderStateToCN(order.state) : ""}
                </Text>
            </View>
        )
    }

    private renderReceiver() {
        const { order } = this.state
        const contact: ContactService.Contact = order && order.meta && order.meta.contact ? order.meta.contact : null
        return (
            <Cell
                style={{
                    marginTop: 10
                }}
                indexPath={{ section: 0, row: 0 }}
                renderContent={(indexPath) =>
                    <ReceiverContent
                        style={{
                            backgroundColor: "white"
                        }}
                        item={contact} />} />
        )
    }

    private renderSection() {
        const { order, seller, products } = this.state
        let itemNodes: JSX.Element[] = []
        if (order) {
            order.items.forEach((item, index) => {
                const product = products[index]
                const thumb = product && product.thumbs && product.thumbs[index] ? product.thumbs[0] : ""
                itemNodes.push(
                    this.renderItem(item, thumb, index)
                )
            })
        }
        const sellerName = seller ? seller.name : ""
        return (
            <View
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: Config.horizontal,
                    paddingVertical: 10,
                    marginTop: 10
                }} >
                <Text
                    style={{
                        fontSize: 14,
                        color: Config.textColor,
                        marginBottom: 10
                    }} >
                    {sellerName}
                </Text>
                {itemNodes}
                <Separator style={{ marginHorizontal: 0 }} />
                {this.renderContentFooter()}
            </View>
        )
    }

    private renderItem(item: ShopService.Order.Item, thumb: string, index: number) {
        return (
            <View
                key={index.toString()}>
                <Separator />
                <TouchableOpacity
                    onPress={() => this.onPressItem(item, index)}>
                    <OrderItem
                        item={item}
                        thumb={thumb}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    private renderContentFooter() {
        const { order, purchaseSelected, platformInformation } = this.state
        let sumItemPrice = 0
        let sumTransportPrice = 0
        let procurementFee = 0
        if (order) {
            order.items.forEach((item, index) => {
                sumItemPrice = item.basePrice * item.quantity
                sumTransportPrice = item.transportFee
            })
            procurementFee = order.extraFee && order.extraFee["procurementFee"] ? order.extraFee["procurementFee"] : 0
        }
        let sumOrderPrice = order && order.totalFee ? order.totalFee : 0
        //console.log("sumItemPrice: " + sumItemPrice + " procurementFee: " + procurementFee + " sumOrderPrice: " + sumOrderPrice)
        return (
            <View
                style={{
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: "white",
                }} >
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",

                    }}>
                </View>
                <PriceCell
                    title={"商品总价："}
                    price={sumItemPrice} >
                </PriceCell>
                <PriceCell
                    title={"运费："}
                    price={sumTransportPrice} >
                </PriceCell>
                <PriceCell
                    title={"代购费："}
                    price={procurementFee} >
                </PriceCell>
                <PriceCell
                    title={"订单总价："}
                    price={sumOrderPrice} >
                </PriceCell>
            </View>
        )
    }

    private renderOrderDetail() {
        const { order } = this.state
        let displayOrderId = (this.orderId.length <= 25 ? this.orderId : this.orderId.substring(0, 24) + "...")
        let createdAt = order && order.createAt && order.createAt || Date.now()
        let timeString = moment(createdAt).format("YYYY-MM-DD HH:mm:ss")
        return (
            <View
                style={{
                    marginTop: 10,
                    backgroundColor: "white",
                    padding: Config.horizontal,
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            color: Config.grayColor,
                            fontSize: 12,
                            flex: 1
                        }}
                        numberOfLines={1}
                        selectable={true}>
                        {"订单编号：" + this.orderId}
                    </Text>
                    <CustomButton
                        style={{
                            paddingVertical: 3,
                            paddingHorizontal: 15,
                            borderRadius: 3,
                            borderWidth: 1,
                            borderColor: "rgba(232, 232, 232, 1)",
                            marginLeft: 5
                        }}
                        textStyle={{
                            fontSize: 14,
                            color: Config.grayColor
                        }}
                        text={"复制"}
                        onPress={() => {
                            Util.Clipboard.setString(this.orderId)
                            Toast.show("已复制到剪切板")
                        }}
                    />
                </View>
                <Text
                    style={{
                        color: Config.grayColor,
                        fontSize: 12,
                        marginTop: 10
                    }}>
                    {"订单创建时间：" + timeString}
                </Text>
            </View>
        )
    }

    private renderFooter() {
        const { seller, role } = this.state
        const phone = seller && seller.contact && seller.contact.phone ? seller.contact.phone : null
        if (role === "seller") return <View></View>
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: "white",
                    paddingHorizontal: Config.horizontal,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <TouchableWithoutFeedback
                    onPress={() => this.onPressContact(phone)}>
                    {role === "buyer" ?
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Image
                                style={{
                                    width: 24,
                                    height: 24
                                }}
                                source={ContactRed.source} />
                            <Text
                                style={{
                                    color: Config.textColor,
                                    fontSize: 14
                                }}>
                                {"联系商家"}
                            </Text>
                        </View> :
                        <View />
                    }
                </TouchableWithoutFeedback>
                {/* <View>
                    <CustomButton
                        style={{
                            borderWidth: 1,
                            borderRadius: 100,
                            borderColor: "#BBBBBB",
                        }}
                        text={""}/>
                </View> */}
            </View>
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor,
                }}>
                <ScrollView>
                    {this.renderHeader()}
                    {this.renderReceiver()}
                    {this.renderSection()}
                    {this.renderOrderDetail()}
                </ScrollView>
                {this.renderFooter()}
            </View>
        )
    }
}
