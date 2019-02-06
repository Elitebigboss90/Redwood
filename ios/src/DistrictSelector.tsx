import * as React from "react"
import { View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Separator } from "./common/Separator"
import { TabMenu } from "./common/TabMenu"
import { districtMap } from "./service/ContactService"
import { Config } from "./Config"
import { CustomButton } from "./common/Custom"
import { Icon, CheckMarkRed } from "./common/Icon"

type District = { code: string, name: string, level: string }

export class DistrictSelector extends React.Component {
    static defaultProps = {
        style: {},
        titleStyle: {},
        title: "选择地区",
        onPressConfirm: () => { }
    }
    props: {
        style?: any,
        titleStyle?: any,
        title?: string,
        onPressConfirm?: (district: ContactService.AddressDistrict) => void
    }
    state: {
        currentTabIndex?: number,
        levelSelections?: { province: number, city: number, area: number }
    }
    private readonly districtData = districtMap

    constructor(props) {
        super(props)
        this.state = {
            currentTabIndex: 0,
            levelSelections: { province: 0, city: 0, area: 0 }
        }
    }

    private getDistrictData(currentIndex: number) {
        const data = this.districtData
        const { levelSelections } = this.state
        if (currentIndex === 0) {
            return data.map((province) => province.name)
        } else if (currentIndex === 1) {
            return data[levelSelections.province].children.map((city) => city.name)
        } else if (currentIndex === 2) {
            return data[levelSelections.province].children[levelSelections.city].children.map((area) => area.name)
        } else return null
    }
    private getDistrict() {

    }
    private onPressConfirm() {
        const data = this.districtData
        const { levelSelections } = this.state
        const province: ContactService.District<"province"> = {
            code: data[levelSelections.province].code,
            name: data[levelSelections.province].name,
            level: "province"
        }
        const city: ContactService.District<"city"> = {
            code: data[levelSelections.province].children[levelSelections.city].code,
            name: data[levelSelections.province].children[levelSelections.city].name,
            level: "city"
        }
        const area: ContactService.District<"area"> = {
            code: data[levelSelections.province].children[levelSelections.city].children[levelSelections.area].code,
            name: data[levelSelections.province].children[levelSelections.city].children[levelSelections.area].name,
            level: "area"
        }
        const district: ContactService.AddressDistrict = {
            province: province, city: city, area: area
        }
        this.props.onPressConfirm(district)
    }
    private onPressTabMenu(index: number) {
        this.setState({ currentTabIndex: index })
    }
    private onPressRow(index: number) {
        let selections = this.state.levelSelections
        let tabIndex = this.state.currentTabIndex
        if (tabIndex === 0) {
            selections.province = index
            selections.city = 0
            selections.area = 0
            tabIndex = 1
        } else if (tabIndex === 1) {
            selections.city = index
            selections.area = 0
            tabIndex = 2
        } else if (tabIndex === 2) {
            selections.area = index
        }
        this.setState({ currentTabIndex: tabIndex, levelSelections: selections })
    }
    private renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: Config.horizontal
                }} >
                <Text
                    style={{
                        ...this.props.titleStyle
                    }} >
                    {this.props.title}
                </Text>
                <CustomButton
                    text={"确定"}
                    onPress={() => this.onPressConfirm()} />
            </View>
        )
    }
    private renderTab() {
        const { levelSelections } = this.state
        const data = this.districtData
        const selectedProvince = data[levelSelections.province].name
        const selectedCity = data[levelSelections.province].children[levelSelections.city].name
        const selectedArea = data[levelSelections.province].children[levelSelections.city].children[levelSelections.area].name
        return (
            <TabMenu
                itemStyle={{
                    marginLeft: 30
                }}
                textContainerStyle={{
                    height: 44
                }}
                currentSelectedIndex={this.state.currentTabIndex}
                tabs={[selectedProvince, selectedCity, selectedArea]}
                onPressItem={(index) => this.onPressTabMenu(index)} ></TabMenu>
        )
    }
    private renderRow(item, index) {
        let selected = false
        const { currentTabIndex, levelSelections } = this.state
        if (currentTabIndex === 0 && index === levelSelections.province) {
            selected = true
        } else if (currentTabIndex === 1 && index === levelSelections.city) {
            selected = true
        } else if (currentTabIndex === 2 && index === levelSelections.area) {
            selected = true
        }
        return (
            <TouchableOpacity
                onPress={() => this.onPressRow(index)} >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                    <Text
                        style={{
                            fontSize: 14 + +selected,
                            color: selected ? Config.styleColor : Config.textColor
                        }} >
                        {item}
                    </Text>
                    {selected ? <Icon icon={CheckMarkRed} /> : undefined}
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View
                style={{
                    padding: 15,
                    ...this.props.style
                }} >
                {this.renderHeader()}
                <Separator />
                {this.renderTab()}
                <Separator />
                <FlatList
                    data={this.getDistrictData(this.state.currentTabIndex)}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id} />
            </View>
        )
    }
}