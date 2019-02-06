import * as React from "react"
import { View, Text, TouchableOpacity, FlatList, ScrollView, AsyncStorage, Alert, TouchableWithoutFeedback, Modal, Dimensions } from "react-native"
import { Config } from "./Config"
import { Separator } from "./common/Separator";
import { Cell, ReceiverContent, TextInputContent, ReceiverManagerContent } from "./common/Cell"
import { FooterButton } from "./common/Footer"
import { Icon, ArrowDownGray } from "./common/Icon"
import { DistrictSelector } from "./DistrictSelector"
import { CustomTextInput } from "./common/Custom"
import { APIService } from "./service/apiService"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import * as TestData from "./TestData"
import { NavigatorBackButton } from "./common/Navigator"

const receiverEditorText = [
    { title: "姓名", placeholder: "请输入姓名" },
    { title: "联系电话", placeholder: "请输入联系电话" },
    { title: "所在地区", placeholder: "请选择地区" },
    { title: "详细地址", placeholder: "请输入详细地址" },
]
export class ReceiverEditor extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const receiver = navigation.state.params!.receiver!
        return {
            title: (receiver ? "编辑" : "新增") + "收货地址",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private nameTI?: CustomTextInput
    private phoneTI?: CustomTextInput
    private districtTI?: CustomTextInput
    private addressTI?: CustomTextInput
    props: { navigation?: any }
    state: {
        district?: ContactService.AddressDistrict,
        modalVisible?: boolean,
        receiver?: TransportService.Receiver
    }

    constructor(props) {
        super(props)
        const receiver: TransportService.Receiver = this.props.navigation.state.params!.receiver! || null
        this.state = {
            district: receiver ? receiver.contact.addressDistrict : null,
            modalVisible: false,
            receiver: receiver
        }
        this.api.handleNeedToken(this)
    }
    private onPressSelectArea() {
        this.setState({ modalVisible: true })
    }
    private onPressConfirmDistrict(district: ContactService.AddressDistrict) {
        this.setState({ modalVisible: false, district: district })
    }
    private onPressFooter() {
        const { district } = this.state
        const name = this.nameTI.text
        const phone = this.phoneTI.text
        const addressDetail = this.addressTI.text
        if (!(name && phone && district && addressDetail)) {
            Toast.show("输入为空!")
            return
        }
        const contact: ContactService.Contact = {
            name: name,
            phone: phone,
            addressDistrict: district,
            addressDetail: addressDetail,
        }
        const receiver: TransportService.Receiver = this.props.navigation.state.params.receiver
        HUD.show()
        if (receiver) {
            this.api.Transport.updateReceiver({ receiverId: receiver.id, contact: contact }, (err, result) => {
                HUD.hide()
                // alert(JSON.stringify([err, result]))
                if (err) return
                // alert("地址编辑成功!")
                this.props.navigation.goBack()
            })
        } else {
            this.api.Transport.createReceiver({
                contact: contact
            }, (err, result) => {
                HUD.hide()
                // alert(JSON.stringify([err, result]))
                if (err) return
                // alert("地址添加成功!")
                this.props.navigation.goBack()
            })
        }
    }
    private renderModal() {
        return (
            <Modal
                visible={this.state.modalVisible}
                animationType={"none"}
                transparent={true} >
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ modalVisible: false })} >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.3)"
                        }} >
                        <DistrictSelector
                            style={{
                                backgroundColor: "white",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: Dimensions.get("window").height * 0.6
                            }}
                            onPressConfirm={(district) => this.onPressConfirmDistrict(district)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    private renderFooter() {
        return (
            <FooterButton
                text={"保存"}
                onPress={() => this.onPressFooter()} />
        )
    }
    render() {
        const { district, receiver } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                {/* <FlatList
                    data={receiverEditorText}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} >
                </FlatList> */}
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: Config.horizontal
                    }} >
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            alignItems: "center"
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.textColor,
                                width: 60
                            }} >
                            {"姓名"}
                        </Text>
                        <CustomTextInput
                            ref={(ref) => this.nameTI = ref}
                            style={{
                                marginLeft: 10,
                                flex: 1
                            }}
                            placeholder={"请输入姓名"}
                            defaultValue={receiver && receiver.contact ? receiver.contact.name : null} />
                    </View>
                    <Separator />
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            alignItems: "center"
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.textColor,
                                width: 60
                            }} >
                            {"联系电话"}
                        </Text>
                        <CustomTextInput
                            ref={(ref) => this.phoneTI = ref}
                            style={{
                                marginLeft: 10,
                                flex: 1
                            }}
                            placeholder={"请输入联系电话"}
                            defaultValue={receiver && receiver.contact ? receiver.contact.phone : null}
                            keyboardType={"numeric"} />
                    </View>
                    <Separator />
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            alignItems: "center"
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.textColor,
                                width: 60
                            }} >
                            {"所在地区"}
                        </Text>
                        <CustomTextInput
                            ref={(ref) => this.districtTI = ref}
                            style={{ marginLeft: 10, flex: 1, flexDirection: "row" }}
                            placeholder={"请选择地区"}
                            editable={false}
                            defaultValue={district ? district.province.name + " " + district.city.name + " " + district.area.name : null}
                        />
                        <TouchableOpacity
                            onPress={() => this.onPressSelectArea()} >
                            <Icon icon={ArrowDownGray} />
                        </TouchableOpacity>
                    </View>
                    <Separator />
                    <View
                        style={{
                            paddingVertical: 10,
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                color: Config.textColor,
                                width: 60
                            }} >
                            {"详细地址"}
                        </Text>
                        <CustomTextInput
                            ref={(ref) => this.addressTI = ref}
                            style={{
                                marginTop: 10,
                            }}
                            placeholder={"请输入详细地址"}
                            multiline={true}
                            numberOfLines={3}
                            defaultValue={receiver && receiver.contact ? receiver.contact.addressDetail : null} />
                    </View>
                </ScrollView>
                {this.renderModal()}
                {this.renderFooter()}
            </View>
        )
    }
}


export class ReceiverManager extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "管理收货地址",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />
        }
    }
    private api = new APIService()
    private willFocus
    private defaultReceiverId: string = null
    props: { navigation?: any }
    state: { receivers?: TransportService.Receiver[] }

    constructor(props) {
        super(props)
        this.state = { receivers: [] }
        this.api.handleNeedToken(this)
        this.getDefaultReceiverId()
        this.willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.getReceivers()
            }
        )
    }

    componentWillUnmount() {
        this.willFocus.remove()
    }

    private getReceivers() {
        HUD.show()
        this.api.Transport.getMyReceivers(null, (err, result) => {
            HUD.hide()
            // alert(JSON.stringify([err, result]))
            if (err) return
            this.setState({ receivers: result })
        })
    }

    private getDefaultReceiverId() {
        AsyncStorage.getItem(Config.keys.defaultReceiverId).then((defaultReceiverId) => {
            this.defaultReceiverId = defaultReceiverId ? defaultReceiverId : null
        })
    }

    private onPressEdit(index) {
        this.props.navigation.navigate("ReceiverEditor", { receiver: this.state.receivers[index] })
    }

    private onPressDelete(index) {
        Alert.alert("确定删除？", "", [{ text: "否", onPress: () => { } }, {
            text: "是", onPress: () => {
                this.api.Transport.deleteReceiver({ receiverId: this.state.receivers[index].id }, (err, result) => {
                    // alert(JSON.stringify([err, result]))
                    if (err) { Toast.show("删除失败"); return }
                    let receivers = this.state.receivers
                    receivers.splice(index, 1)
                    this.setState({ receivers: receivers })
                    Toast.show("删除成功")
                })
            }
        }])
    }

    private onPressFooter() {
        this.props.navigation.navigate("ReceiverEditor", { receiver: null })
    }

    private renderRow(item, index) {
        return (
            <Cell
                style={{
                    backgroundColor: "white",
                }}
                indexPath={{ section: 0, row: index }}
                onPressCell={(indexPath) => { }}
                renderContent={(indexPath) =>
                    <ReceiverManagerContent
                        data={item}
                        onPressEdit={() => this.onPressEdit(indexPath.row)}
                        onPressDelete={() => this.onPressDelete(indexPath.row)} />
                } />
        )
    }

    renderFooter() {
        return (
            <FooterButton
                text={"添加新地址"}
                onPress={() => this.onPressFooter()} />
        )
    }

    render() {
        const { receivers } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                <FlatList
                    data={receivers.map((receiver) => receiver.contact)}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} >
                </FlatList>
                {this.renderFooter()}
            </View>
        )
    }
}


export class ReceiverSelector extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "选择收货地址",
            headerLeft: <NavigatorBackButton onPress={() => navigation.goBack()} />,
            headerRight: (
                <TouchableOpacity
                    style={{
                        marginRight: Config.horizontal
                    }}
                    onPress={() => navigation.navigate("ReceiverManager")} >
                    <Text
                        style={{
                            fontSize: 16
                        }}>
                        {"管理"}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    props: {
        navigation: any,
    }
    state: {
        receivers?: TransportService.Receiver[]
    }
    private api = new APIService()
    private didFocus

    constructor(props) {
        super(props)
        this.state = {
            receivers: []
        }
        this.api.handleNeedToken(this)
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.getReceivers()
            }
        )
    }

    componentWillUnmount() {
        this.didFocus.remove()
    }
    // componentDidMount() {
    //     this.getReceivers()
    // }

    private getReceivers() {
        HUD.show()
        this.api.Transport.getMyReceivers(null, (err, receivers) => {
            HUD.hide()
            // alert(JSON.stringify([err, result]))
            if (err) return
            this.setState({ receivers: receivers })
        })
    }

    private onPressRow(item: TransportService.Receiver, row: number) {
        const { navigation } = this.props
        const onSelectReceiverId: (receiverId: string) => void = navigation.state.params.onSelectReceiverId
        onSelectReceiverId!(item.id)
        navigation.goBack()
    }

    private onPressFooter() {
        this.props.navigation.navigate("ReceiverEditor", { receiver: null })
    }

    private renderRow(item, index) {
        const receiver: TransportService.Receiver = item
        return (
            <Cell
                style={{
                    padding: Config.horizontal,
                    backgroundColor: "white"
                }}
                indexPath={{ section: 0, row: index }}
                onPressCell={(indexPath) => this.onPressRow(receiver, indexPath.row)}
                renderContent={() => <ReceiverContent item={receiver.contact} />} />
        )
    }

    private renderFooter() {
        return (
            <FooterButton
                text={"添加新地址"}
                onPress={() => this.onPressFooter()} />
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Config.backgroundColor
                }} >
                <FlatList
                    data={this.state.receivers}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} >
                </FlatList>
                {this.renderFooter()}
            </View>
        )
    }
}
