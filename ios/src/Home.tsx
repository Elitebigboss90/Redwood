import * as React from "react";
import {
    Text,
    Image,
    ScrollView,
    View, FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Platform,
    StatusBar,
    ActivityIndicator,
    AsyncStorage,
    Animated,
} from "react-native"
// import FastImage from "react-native-fast-image"
import { Icon, NavigatorMenuLightground, NavigatorSettingBackground, NavigatorSettingLightground, TestSKUItem, Logo, ArrowDownGray } from "./common/Icon"
import { Separator } from "./common/Separator";
import { Config, PostType } from "./Config";
import { SearchBar } from "./common/SearchBar"
import { CustomButton, CustomIndicator, CustomRefreshControl } from "./common/Custom"
import { FooterButton } from "./common/Footer"
import { DropDownList } from "./common/DropDown"
import { TabMenu } from "./common/TabMenu"
import { APIService } from "./service/apiService"
import { Navigator } from "./common/Navigator"
import { GestureRecognizer } from "./GestureRecognizer"
import { Cell, HomeArticleContent, SellerDisplayContent, SPUDisplayContent, JobDisplayContent, SubjectDisplayContent } from "./common/Cell"
import * as Transformer from "./util/Transformer"
import { HUD } from "./common/HUD"
import { Toast } from "./common/Toast"
import { ImageUtil } from "./util/ImageUtil"
import { sellers } from "./TestData";

const types = [
    { type: PostType.subject, text: "服务" },
    { type: PostType.seller, text: "厂家" },
    { type: PostType.furniture, text: "家具" },
    { type: PostType.wood, text: "原材" },
    { type: PostType.job, text: "求职" },
    { type: PostType.position, text: "职位" },
]


export class Home extends React.Component {
    static navigationOptions = props => {
        const { navigation } = props
        return {
            title: "首页",
            headerBackground:
                <Icon
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    icon={NavigatorSettingBackground} />,
            headerTitleStyle: {
                fontSize: 16,
                color: "white",
                lineHeight: 36,
            },
        };
    };
    private searchBar: SearchBar
    private dropDown: DropDownList
    private searchTextInput: React.Component
    private listScrollView: ScrollView
    private contentFlatLists = []
    private api = new APIService()
    private currentPage = 0
    private readonly tabTitles = ["推荐", "热门", "最新"]
    private readonly pageWidth = Dimensions.get("window").width
    private readonly logoInitialSize = { width: 120, height: 55 }
    private logoBottomY: number
    private didFocus
    private searchBarLayoutY: number = 0
    private lastScrollOffsetY: number[] = []
    props: { navigation?: any }
    state: {
        currentType?: number,
        posts?: PostService.Post[],
        refreshing?: boolean,
        indicatorAnimating?: boolean,
        currentTabIndex?: number,
        logoHeightAnimation?: Animated.Value,
        logoWidthAnimation?: Animated.Value,
        searchBarShouldSticky?: boolean
    }


    constructor(props) {
        super(props)
        this.state = {
            currentType: 0,
            posts: [],
            refreshing: false,
            indicatorAnimating: false,
            currentTabIndex: 0,
            logoHeightAnimation: new Animated.Value(this.logoInitialSize.height),
            logoWidthAnimation: new Animated.Value(this.logoInitialSize.width),
            searchBarShouldSticky: false
        }
        for (let tab of this.tabTitles) {
            this.lastScrollOffsetY.push(0)
        }
    }

    componentDidMount() {
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                const { posts } = this.state
                if (posts.length === 0) {
                    this.queryPosts()
                }

            }
        )

    }
    componentWillUnmount() {
        this.didFocus && this.didFocus.remove()
    }

    private queryPosts(page: number = 0, categoryIndex: number = this.state.currentTabIndex) {
        if (page === 0) {
            this.currentPage = 0
            this.setState({
                refreshing: true,
                indicatorAnimating: false
            })
        }
        else this.setState({ indicatorAnimating: true })
        const category = categoryIndex && this.tabTitles[categoryIndex] ? this.tabTitles[categoryIndex] : this.tabTitles[0]
        this.api.Post.queryPosts(
            {
                type: PostType.article,
                category: category,
                offset: Config.countPerPage * page,
                count: Config.countPerPage,
                keyword: null
            },
            (err, result) => {
                this.setState({ refreshing: false, indicatorAnimating: false })
                if (!result) return
                if (page === 0) {
                    this.setState({ posts: result })
                } else {
                    let posts = this.state.posts
                    result.forEach(element => {
                        posts.push(element)
                    })
                    this.setState({ posts: posts })
                }
            })
    }
    private onPressHeaderLeft() {
        this.props.navigation.navigate("Seller")
    }
    private onPressSearchType() {
        this.dropDown.showInTarget(this.searchBar.selector)
    }
    private onSubmitSearch(text: string) {
        this.props.navigation.navigate("Search", { text: text, type: this.state.currentType })
    }
    private onPressFloatItem(index) {
        this.setState({ currentType: index })
    }
    private onPressTabMenu(index: number) {
        this.setState({
            currentTabIndex: index,
            posts: []
        })
        index != this.state.currentTabIndex ? this.queryPosts(0, index) : null
        this.listScrollView.scrollTo({ x: this.pageWidth * index, animated: true })
    }
    private onPressSectionRow(item, index) {
        const postId = this.state.posts[index].id
        this.props.navigation.navigate("Article", { postId: postId })
    }
    private renderHeader() {
        const { logoImageHeight } = this.state
        const logoMarginVertival = 35
        this.searchBarLayoutY = logoMarginVertival * 2
        let buttons: JSX.Element[] = []
        const horizontalMargin = 10
        const numColumn = 6
        const width = (Dimensions.get("window").width - Config.horizontal * 2 - horizontalMargin * numColumn) / numColumn
        types.forEach((type, index) => {
            const button =
                <View
                    key={index.toString()}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        //backgroundColor: "red"
                    }}>
                    {index !== 0 ?
                        <View style={{
                            backgroundColor: Config.grayColor,
                            width: 1.5,
                            height: 10,
                            marginHorizontal: horizontalMargin / 2,
                        }} /> :
                        undefined}
                    <CustomButton
                        style={{
                            width: width,
                            paddingVertical: 10,
                            //backgroundColor: "red"
                            // marginLeft: index === 0 ? 0 : horizontalMargin,
                        }}
                        textStyle={{
                            fontSize: 14,
                            color: Config.grayColor,
                            //backgroundColor: "yellow"
                        }}
                        text={type.text}
                        //numColumn={1}

                        onPress={() => this.props.navigation.navigate("Search", { text: this.searchBar.text, type: index })} />
                </View>
            buttons.push(button)
        })
        return (
            <View
                style={{
                    paddingHorizontal: Config.horizontal
                }} >
                <View
                    style={{
                        alignItems: "center",
                        paddingTop: !this.state.searchBarShouldSticky ? logoMarginVertival : 0,
                    }} >
                    {this.state.searchBarShouldSticky ?
                        null :
                        <Animated.Image
                            style={{
                                marginBottom: logoMarginVertival,
                                width: this.state.logoWidthAnimation,
                                height: this.state.logoHeightAnimation
                            }}
                            onLayout={(event) => {
                                const { y, height } = event.nativeEvent.layout
                                this.logoBottomY = y + height
                            }}
                            source={{ uri: Logo.name }} />
                    }
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        style={{
                            marginTop: 10,
                            paddingVertical: 8
                        }}
                        type={types[this.state.currentType].text}
                        placeholder={"搜索" + types[this.state.currentType].text}
                        onPressType={() => this.onPressSearchType()}
                        onSubmit={(text) => this.onSubmitSearch(text)}
                    />
                    <ScrollView
                        style={{
                            marginTop: 10,
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: horizontalMargin / 2,
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                        pagingEnabled={true} >
                        {buttons}
                    </ScrollView>
                </View>
                <TabMenu
                    itemStyle={{
                        marginLeft: 20
                    }}
                    textContainerStyle={{
                        height: 44
                    }}
                    scrollEnabled={false}
                    currentSelectedIndex={this.state.currentTabIndex}
                    tabs={this.tabTitles}
                    onPressItem={(index) => this.onPressTabMenu(index)} />
            </View>
        )
    }
    private renderRow(item: PostService.Post, index: number) {
        return (
            <Cell
                indexPath={{ section: 0, row: index }}
                renderContent={(indexPath) => <HomeArticleContent item={item} />}
                onPressCell={(indexPath) => this.onPressSectionRow(item, index)} />
        )
    }
    private renderTab() {
        <TabMenu
            style={{
                marginVertical: 10
            }}
            itemStyle={{
                marginLeft: 20
            }}
            currentSelectedIndex={this.state.currentTabIndex}
            tabs={this.tabTitles}
            textContainerStyle={{ height: 44 }}
            onPressItem={(index) => this.onPressTabMenu(index)} />
    }
    private renderListScrollView() {
        const pageWidth = this.pageWidth
        const page = this.tabTitles.length
        return (
            <ScrollView
                ref={(ref) => this.listScrollView = ref}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                pagingEnabled={true}
                onMomentumScrollEnd={(event) => {
                    const { x, y } = event.nativeEvent.contentOffset
                    if (y > 0) return
                    const offsetPage = Math.floor(x / pageWidth)
                    if (offsetPage === this.state.currentTabIndex || offsetPage > page || offsetPage < 0) {
                        return
                    } else {
                        this.setState({
                            currentTabIndex: offsetPage,
                            posts: []
                        })
                        this.queryPosts(0, offsetPage)
                    }
                }} >
                {this.renderLists()}
            </ScrollView>
        )
    }
    private renderLists() {
        let lists: JSX.Element[] = []
        this.tabTitles.forEach((title, index) => {
            const list = (
                <FlatList
                    key={index.toString()}
                    ref={(ref) => {
                        this.contentFlatLists[index] = ref
                    }}
                    contentContainerStyle={{
                        width: this.pageWidth,
                    }}
                    data={this.state.posts}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ListFooterComponent={() =>
                        <CustomIndicator
                            animating={this.state.indicatorAnimating} />
                    }
                    ListEmptyComponent={() => <View style={{ height: 150 }} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={false}
                    //refreshControl={<CustomRefreshControl />}
                    onRefresh={() => { this.queryPosts() }}
                    refreshing={this.state.refreshing}
                    onEndReached={() => {
                        this.state.posts.length <= Config.countPerPage ? {} : this.queryPosts(++this.currentPage)
                    }}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => item.id} />
            )
            lists.push(list)
        })
        return lists
    }
    private renderDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.dropDown = ref}
                containerStyle={{
                    borderRadius: 8,
                    marginTop: 10,
                    width: 66,
                }}
                itemStyle={{
                    alignItems: "center",
                    height: 25,
                }}
                options={types.map((value) => value.text)}
                onPressItem={(index) => this.onPressFloatItem(index)} />
        )
    }
    render() {
        const pageWidth = this.pageWidth
        const page = this.tabTitles.length
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white"
                }} >
                {this.state.searchBarShouldSticky ? this.renderHeader() : null}
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={60}
                    onEndReached={() => {
                        console.log("end reached")
                    }}
                    onMomentumScrollEnd={(event) => {
                        const { x, y } = event.nativeEvent.contentOffset
                        if (y <= this.lastScrollOffsetY[this.state.currentTabIndex]) return
                        if (y > 80 * Config.countPerPage * this.currentPage) {
                            this.currentPage++
                            this.queryPosts(this.currentPage)
                        }
                        this.lastScrollOffsetY = y
                    }}
                    onScroll={(event) => {
                        const { x, y } = event.nativeEvent.contentOffset
                        if (x > 0) {
                            return
                        }
                        if (y < -15) {
                            this.queryPosts()
                        }
                        let logoHeight = this.logoInitialSize.height
                        if (y > 0 && y < this.logoInitialSize.height) {
                            logoHeight -= y
                        } else if (y >= this.logoInitialSize.height) {
                            logoHeight = 0
                        }
                        let logoWidth = logoHeight * (this.logoInitialSize.width / this.logoInitialSize.height)
                        Animated.parallel([
                            this.state.logoHeightAnimation.setValue(logoHeight),
                            this.state.logoWidthAnimation.setValue(logoWidth)
                        ])
                        let platformY = y
                        if (platformY >= this.searchBarLayoutY && !this.state.searchBarShouldSticky) {
                            this.setState({ searchBarShouldSticky: true })
                        }
                    }} >
                    {!this.state.searchBarShouldSticky ? this.renderHeader() : null}
                    {this.renderListScrollView()}
                </ScrollView>
                {this.renderDropDown()}
            </View >
        )
    }
}

export class SearchDisplayer extends React.Component {
    static navigationOptions = props => {
        return { header: null }
    }
    static searchBar: SearchBar
    private willFocus
    api = new APIService()
    searchBar: SearchBar
    dropDown: DropDownList
    categoryDropDown: DropDownList
    searchTextInput: React.Component
    headerNode: React.Component
    categories: string[]
    private currentPage = 0
    props: { navigation?: any }
    state: {
        currentType?: number,
        results?: Array<PostService.Post | ShopService.Seller | ShopService.Product>,
        refreshing?: boolean,
        indicatorAnimating?: boolean,
        currentCategory?: number,
        seller?: ShopService.Seller
    }
    constructor(props) {
        super(props)
        this.state = {
            currentType: 0,
            results: [],
            refreshing: false,
            indicatorAnimating: false,
            currentCategory: 0,
            seller: null
        }
        this.categories = [""]
        Config.categories.map((value) => this.categories.push(value + ""))
        this.willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({ refreshing: false, indicatorAnimating: false })
            }
        )
    }
    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({ currentType: params.type })
        const type = types[params.type].type
        if (type == PostType.subject || type == PostType.job || type == PostType.position) {
            this.queryPosts(0, params.type, params.text)
        } else if (type == PostType.seller) {
            this.querySellers(0, params.text)
        } else if (type == PostType.wood || type == PostType.furniture) {
            this.queryProducts(0, params.type, params.text)
        }
        this.getCurrentSeller()
    }
    componentWillUnmount() {
        this.willFocus.remove()
    }

    private getCurrentSeller() {
        this.api.Shop.getAccountSeller(null, (err, seller) => {
            if (err) return
            //console.log("getAccountSeller: " + JSON.stringify(seller))
            if (seller) {
                this.setState({
                    seller: seller
                })
            }
        })
    }

    private queryPosts(page: number = 0, typeIndex: number = this.state.currentType, keyword: string = this.searchBar.text, category: number = this.state.currentCategory) {
        const type: string = types[typeIndex].type
        if (page === 0) { this.currentPage = 0; this.setState({ refreshing: true, indicatorAnimating: false }) }
        else this.setState({ indicatorAnimating: true })
        const count = Config.countPerPage
        this.api.Post.queryPosts({ type: type, category: this.categories[category], offset: count * page, count: count, keyword: keyword }, (err, result) => {
            if (err) return
            this.setState({ refreshing: false })
            if (page === 0) {
                this.setState({ results: result })
            } else {
                let posts = this.state.results
                result.forEach(element => {
                    posts.push(element)
                });
                this.setState({ results: posts, indicatorAnimating: false })
            }
        })
    }

    private querySellers(page: number = 0, keyword: string = this.searchBar.text) {
        if (page === 0) { this.currentPage = 0; this.setState({ refreshing: true, indicatorAnimating: false }) }
        else this.setState({ indicatorAnimating: true })
        const count = Config.countPerPage
        this.api.Shop.querySellers({ offset: count * page, count: count, keyword: keyword }, (err, result) => {
            if (err) return
            this.setState({ refreshing: false })
            if (page === 0) {
                this.setState({ results: result })
            } else {
                let sellers = this.state.results
                result.forEach(element => {
                    sellers.push(element)
                });
                this.setState({ results: sellers, indicatorAnimating: false })
            }
        })
    }

    private queryProducts(page: number = 0, typeIndex: number = this.state.currentType, keyword: string = this.searchBar.text) {
        const type: string = types[typeIndex].type
        if (page === 0) { this.currentPage = 0; this.setState({ refreshing: true, indicatorAnimating: false }) }
        else this.setState({ indicatorAnimating: true })
        this.api.Shop.queryProducts({ offset: Config.countPerPage * page, count: Config.countPerPage, category: type, keyword: keyword }, (err, result) => {
            // alert(JSON.stringify([type, err, result]))
            //console.log(JSON.stringify([err, result]))
            if (!result) return
            this.setState({ refreshing: false })
            if (page === 0) {
                this.setState({ results: result })
            } else {
                let products = this.state.results
                result.forEach(element => {
                    products.push(element)
                });
                this.setState({ results: products, indicatorAnimating: false })
            }
        })
    }
    private onPressSearchType() {
        this.dropDown.showInTarget(this.searchBar.selector)
    }
    private onSubmitSearch(text) {

        const type = types[this.state.currentType].type
        if (type == PostType.subject || type == PostType.job || type == PostType.position) this.queryPosts(0, this.state.currentType, text)
        else if (type == PostType.seller) this.querySellers(0, text)
        else if (type == PostType.wood || type == PostType.furniture) this.queryProducts(0, this.state.currentType, text)
    }

    private onPressSelectCategory() {
        this.categoryDropDown.showInTarget(this.headerNode)
    }

    private onPressCategoryItem(index: number) {
        this.queryPosts(0, 0, this.searchBar.text, index)
        this.setState({ currentCategory: index })
        this.categoryDropDown.hide()
    }

    private onPressFloatItem(index: number) {
        this.setState({ currentType: index })
        this.dropDown.hide()
        this.setState({ results: [] })
        const type = types[index].type
        if (type === PostType.subject || type === PostType.job || type === PostType.position) this.queryPosts(0, index)
        else if (type === PostType.seller) this.querySellers(0)
        else if (type === PostType.wood || type === PostType.furniture) this.queryProducts(0, index)
    }

    private onPressRow(item, index: number) {
        const result: any = this.state.results[index]
        const type = types[this.state.currentType].type
        const disabled = result.disabled || false
        if (type === PostType.subject || type === PostType.job || type === PostType.position) {
            this.props.navigation.navigate("Article", { postId: result.id })
        } else if (type === PostType.wood || type === PostType.furniture) {
            if (disabled) {
                Toast.show(Config.productDisabledPrompt)
            } else {
                this.props.navigation.navigate("SPU", { id: result.id })
            }
        } else if (type === PostType.seller) {
            if (disabled) {
                Toast.show(Config.sellerDisabledPrompt)
            } else {
                this.props.navigation.navigate("Seller", { id: result.id })
            }
        }
    }
    private onPressFooter() {
        const type = types[this.state.currentType].type
        if (type === PostType.subject || type === PostType.job || type === PostType.position) this.props.navigation.navigate("ArticleEditor", { type: type })
    }
    private renderNavigator() {
        const { params } = this.props.navigation.state
        return (
            <Navigator
                tintColor={Config.headerTintColor}
                titleView={
                    <SearchBar
                        style={{
                            height: "100%"
                        }}
                        ref={(ref) => this.searchBar = ref}
                        type={types[this.state.currentType].text}
                        placeholder={"搜索" + types[this.state.currentType].text}
                        defaultValue={params.text}
                        onPressType={() => this.onPressSearchType()}
                        onSubmit={(text) => this.onSubmitSearch(text)} />}
                rightTitle={"搜索"}
                onPressLeft={() => this.props.navigation.goBack()}
                onPressRight={() => this.onSubmitSearch(this.searchBar.text)} />
        )
    }
    private renderHeader() {
        let header: JSX.Element = undefined
        const type = types[this.state.currentType].type
        if (type === PostType.subject) {
            header =
                <View
                    ref={(ref) => this.headerNode = ref}
                    style={{
                        backgroundColor: "white",
                        height: 44,
                        paddingHorizontal: Config.horizontal,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} >
                    <Text>
                        {this.state.currentCategory ? Transformer.postCategoryToCN(this.categories[this.state.currentCategory]) : "全部分类"}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.onPressSelectCategory()} >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }} >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: Config.styleColor
                                }} >
                                {"选择分类"}
                            </Text>
                            <Icon
                                style={{
                                    tintColor: Config.styleColor
                                }}
                                icon={ArrowDownGray} />
                        </View>
                    </TouchableOpacity>
                </View>
        }
        return header
    }
    private renderCategoryList() {
        const column = 4
        const itemMargin = 10
        const itemWidth = (Dimensions.get("window").width - Config.horizontal * 2 - itemMargin * (column - 1)) / column
        let items = []
        const { currentCategory } = this.state
        this.categories.forEach((category, index) => {
            items.push(
                <CustomButton
                    key={index.toString()}
                    style={{
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: currentCategory === index ? Config.styleColor : Config.grayColor,
                        width: itemWidth,
                        height: 30,
                        marginTop: 10
                    }}
                    textStyle={{
                        fontSize: 14,
                        color: currentCategory === index ? Config.styleColor : Config.textColor
                    }}
                    text={index === 0 ? "全部分类" : Transformer.postCategoryToCN(category)}
                    onPress={() => this.onPressCategoryItem(index)} />
            )
        })
        return (
            <View
                style={{
                    backgroundColor: "white",
                    padding: Config.horizontal
                }} >
                <Text>{"选择分类"}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        marginTop: 5
                    }} >
                    {items}
                </View>
            </View>
        )
    }
    private renderRow(item, index) {
        const { currentType } = this.state
        const type = types[currentType].type
        if (type === PostType.subject) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexpath) => <SubjectDisplayContent item={item} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        } else if (type === PostType.seller) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexPath) => <SellerDisplayContent item={item} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        } else if (type === PostType.furniture || type === PostType.wood) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexPath) => <SPUDisplayContent item={item} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        } else if (type === PostType.job || type === PostType.position) {
            return (
                <Cell
                    indexPath={{ section: 0, row: index }}
                    renderContent={(indexPath) => <JobDisplayContent item={item} />}
                    onPressCell={(indexPath) => this.onPressRow(item, index)} />
            )
        }
    }
    private renderTypeDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.dropDown = ref}
                containerStyle={{
                    borderRadius: 8,
                    marginTop: 10,
                    width: 66,
                }}
                itemStyle={{
                    alignItems: "center",
                    height: 25,
                }}
                options={types.map((value) => value.text)}
                onPressItem={(index) => this.onPressFloatItem(index)} >
            </DropDownList>
        )
    }
    private renderCategoryDropDown() {
        return (
            <DropDownList
                ref={(ref) => this.categoryDropDown = ref}
                containerStyle={{
                    marginTop: 10
                }}
                renderContent={() => this.renderCategoryList()
                } >
            </DropDownList>
        )
    }

    render() {
        const { params } = this.props.navigation.state
        const { seller } = this.state
        const type = types[this.state.currentType].type
        return (
            <View
                style={{
                    flex: 1
                }} >
                {this.renderNavigator()}
                {this.renderHeader()}
                <FlatList
                    style={{
                        marginTop: 10
                    }}
                    data={this.state.results}
                    renderItem={({ item, index }) => this.renderRow(item, index)}
                    ListFooterComponent={() => <CustomIndicator animating={this.state.indicatorAnimating} />}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onRefresh={() => { this.onSubmitSearch(this.searchBar.text) }}
                    refreshing={this.state.refreshing}
                    onEndReached={() => {
                        this.currentPage++
                        if (type == PostType.subject || type == PostType.job || type == PostType.position) this.queryPosts(this.currentPage, this.state.currentType, this.searchBar.text)
                        else if (type == PostType.seller) this.querySellers(this.currentPage, this.searchBar.text)
                        else if (type == PostType.wood || type == PostType.furniture) this.queryProducts(this.currentPage, this.state.currentType, this.searchBar.text)
                    }}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <Separator />}
                    keyExtractor={(item, index) => index.toString()} >
                </FlatList>
                {
                    type === PostType.subject || (type === PostType.job && seller === null) || (type === PostType.position && seller) ?
                        <FooterButton
                            text={"发布" + Transformer.postTypeToCN(type)}
                            onPress={() => this.onPressFooter()} /> :
                        undefined
                }
                {this.renderTypeDropDown()}
                {this.renderCategoryDropDown()}
            </View >
        )
    }
}
