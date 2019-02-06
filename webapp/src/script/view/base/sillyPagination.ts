export class SillyPagination extends R.Base.SillyPagination {
    pageIndexList: Leaf.List<PageIndexItem | PageEllipsisItem>
    data: PaginationDefinition = {
        pageIndex: 0,
        pageLimit: 5,
        pageSize: 10,
    }
    events = new Leaf.EventEmitter<{
        goto: number
    }>()
    constructor(data: PaginationDefinition = { pageIndex: 0 }) {
        super()
        this.setData(data)
    }
    setData(data: PaginationDefinition = { pageIndex: 0 }) {
        let { pageTotal, pageIndex, pageSize, pageLimit, total } = data
        let ellipsis: number
        let pagination = this
        pageIndex = pageIndex
        pageLimit = pageLimit || this.data.pageLimit
        pageSize = pageSize || this.data.pageSize
        this.VM.pageTotal = pageTotal
        this.VM.pageIndex = pageIndex + 1
        this.VM.pageTotalNumber = total;
        let pageIndexTotal = total - pageIndex * pageSize;
        this.VM.pageIndexNumber = pageIndexTotal < pageSize ? pageIndexTotal : pageSize
        this.pageIndexList.empty()
        this.data = { pageTotal, pageIndex, pageSize, pageLimit }

        if (!pageTotal || pageTotal == 0) {
            this.VM.empty = true
            return
        }
        this.VM.empty = false

        function addIndexItems(start: number, end: number, current: number) {
            for (let index = start; index < end; index++) {
                let item = new PageIndexItem(index + 1)
                if (index == current) {
                    item.select()
                }
                item.events.listenBy(pagination, "click", () => {
                    pagination.events.emit("goto", index)
                })
                pagination.pageIndexList.push(item)
            }
        }
        function addEllipsisItem() {
            pagination.pageIndexList.push(new PageEllipsisItem())
        }

        ellipsis = pageTotal - pageLimit
        if (ellipsis <= 0) {
            addIndexItems(0, pageTotal, pageIndex)
        } else {
            if (pageIndex < pageLimit - 1) {
                addIndexItems(0, pageLimit, pageIndex)
                addEllipsisItem()
            } else if (pageTotal - pageIndex < pageLimit) {
                addEllipsisItem()
                addIndexItems(pageTotal - pageLimit, pageTotal, pageIndex)
            } else {
                addEllipsisItem()
                addIndexItems(pageIndex - 1, pageIndex + pageLimit - 2, pageIndex)
                addEllipsisItem()
            }
        }
    }
    getData() {
        return this.data
    }
    clear() {
        this.pageIndexList.forEach((item) => {
            if (isPageIndexItem(item)) {
                item.select(false)
            }
        })
    }
    onClickGoFirst() {
        this.events.emit("goto", 0)
    }
    onClickGoLast() {
        let pageIndex = this.getData().pageTotal - 1
        this.events.emit("goto", pageIndex)
    }
    onClickGoPrev() {
        let pageIndex = this.getData().pageIndex - 1
        if (pageIndex < 0) {
            return
        }
        this.events.emit("goto", pageIndex)
    }
    onClickGoNext() {
        let pageIndex = this.getData().pageIndex + 1
        let pageTotal = this.getData().pageTotal
        if (pageIndex >= pageTotal) {
            return
        }
        this.events.emit("goto", pageIndex)
    }
}

class PageIndexItem extends R.Base.SillyPagination.PageIndexItem {
    events: Leaf.EventEmitter<{
        click,
        select: boolean
    }>
    constructor(index: number) {
        super()
        this.VM.index = `${index}`
    }
    select(selected: boolean = true) {
        this.VM.selected = selected
        this.events.emit("select", selected)
    }
    onClickNode() {
        this.events.emit("click")
    }
}
class PageEllipsisItem extends R.Base.SillyPagination.PageEllipsisItem {
    constructor() {
        super()
    }
}

function isPageIndexItem(item: PageIndexItem | PageEllipsisItem): item is PageIndexItem {
    return (<PageIndexItem>item).select !== undefined
}

export type PaginationDefinition = {
    pageIndex: number,
    pageTotal?: number,
    pageSize?: number,
    pageLimit?: number,
    total?: number
}