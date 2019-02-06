import { SillyTable } from "../base/sillyTable";
import { App } from "../../app";
import { ArticleEditor } from "./editors";
import * as moment from "moment";
import { SillyPagination } from "../base/sillyPagination";

export class ArticleCollectionManager extends R.Dashboard.ArticleCollectionManager {
    data = {
        pagination: {
            pageIndex: 0,
            pageLimit: 4,
            pageSize: 30
        }
    }
    table = new SillyTable<PostService.Post, { delete, edit, stick }>({
        fields: {
            title: "标题",
            // createAt: "创建时间"
        },
        actions: {
            delete: "删除",
            stick: "置顶",
            edit: "编辑",
        }
    })
    pagination = new SillyPagination(this.data.pagination)
    constructor() {
        super()
        this.refresh()
        this.table.events.listenBy(this, "stick", (data) => {
            if (window.confirm("确认置顶？")) {
                App.api.Posting.stickPost({
                    postId: data.id,
                }, (err, res) => {
                    if (err) {
                        alert("置顶失败，请重试")
                        console.error(err)
                    } else {
                        alert("置顶成功")
                    }
                    this.refresh()
                })
            }
        })
        this.table.events.listenBy(this, "delete", (data) => {
            if (window.confirm("确认删除？")) {
                App.api.Posting.deletePost({
                    postId: data.id,
                }, (err, res) => {
                    if (err) {
                        alert("删除失败，请重试")
                        console.error(err)
                        this.refresh()
                        return
                    }
                    this.refresh()
                })
            }
        })
        this.table.events.listenBy(this, "edit", (origin) => {
            let ed = new ArticleEditor()
            ed.edit(origin, (err, data) => {
                if (err) {
                    return
                }
                App.api.Posting.updatePost({
                    postId: origin.id,
                    ...data
                }, (err, post) => {
                    if (err) {
                        console.error(err)
                        alert("更新失败，请重试")
                        this.refresh()
                        return
                    }
                    console.log("update")
                    this.refresh()
                })
            })
        })

        this.pagination.events.listenBy(this, "goto", (pageIndex) => {
            console.log(pageIndex)
            this.refresh({ pageIndex: pageIndex })
        })
    }
    refresh(option: {
        pageIndex?: number
    } = {}) {
        App.api.Posting.queryPostsAsPaginate({
            pageIndex: option.pageIndex || 0,
            pageSize: this.data.pagination.pageSize,
            type: "article",
            keyword: "",
        }, (err, res: PaginateService.PaginateResult<PostService.Post>) => {
            console.log(res)
            this.table.from(res.items)
            this.pagination.setData({
                pageIndex: res.pageIndex,
                pageTotal: res.pageTotal,
                total: res.total
            })
        })
    }
    onClickCreate() {
        let ed = new ArticleEditor()
        ed.setTitle("新建文章")
        ed.setValue({
            category: "最新"
        })
        ed.edit({}, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            App.api.Posting.createPost({
                ...data,
                type: "article",
                meta: null,
            }, (err, post) => {
                console.log(err, post)
                if (err) {
                    alert("创建失败，请重试")
                    this.refresh()
                    return
                }
                this.refresh()
            })
        })
    }
}

