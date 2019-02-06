import * as ServiceSpec from "../spec/service";
import * as uuid from "uuid"
import { Errors } from "../errors"

export class PostService extends ServiceSpec.PostService {
    initialize() {
        // @ts-ignore
        this.postCollection = this.services.MongodbService.db.collection("post")
        this.postCollection.createIndex({
            id: 1
        }, {
                unique: true
            })
    }
    private createPostParamsCheck(option: {
        body: {
            type: string
            authorId: string
            title: string
            content: string
            images: string[]
            createAt: number
            category: string
            authorName: string
            meta: any
        }
    }): PostService.Post {
        let post: PostService.Post = {
            id: null,
            type: option.body.type as any,
            authorName: option.body.authorName,
            authorId: option.body.authorId,
            title: option.body.title,
            content: option.body.content,
            images: option.body.images || [],
            createAt: Date.now(),
            category: option.body.category as any,
            meta: option.body.meta
        }
        if (!post.type) {
            throw new Error("Invalid type")
        }
        if (!post.title) {
            throw new Error("No title")
        }
        if (!post.content) {
            throw new Error("No content")
        }
        return post
    }
    createPost(option: {
        body: any,
        accoundId: AccountService.AccountId
    }, callback: Callback<PostService.Post>) {
        let post: PostService.Post
        try {
            post = this.createPostParamsCheck({ body: option.body })
        }
        catch (e) {
            callback(new Errors.InvalidParameter(e.message))
            return
        }

        post.id = uuid.v4()
        post.authorId = option.accoundId
        // TODO if type==message topic incremental
        this.postCollection.insertOne(post, (err, res) => {
            if (err) {
                callback(new Errors.UnknownError("fail to create post"))
                return
            }
            callback(null, post)
        })
    }
    deletePost(option: { id: PostService.PostId }, callback: Callback<boolean>) {
        this.postCollection.deleteOne({ id: option.id }, (err, res) => {
            if (err) {
                callback(new Errors.UnknownError("faile to delete post"))
                return
            }
            callback(null, true)
        })
    }

    getPost(option: {
        id: PostService.PostId
    }, callback: Callback<PostService.Post>) {
        this.postCollection.findOne({ id: option.id }, (err, res) => {
            if (err) {
                callback(new Errors.UnknownError("fail to get post"))
                return
            }
            callback(null, res)
        })
    }
    updatePost(option: { id: PostService.PostId, updates: Partial<Pick<PostService.Post, "title" | "content" | "images" | "category">> }, callback: Callback<PostService.Post>) {
        let updates = option.updates
        for (let name in updates) {
            if (!updates[name]) delete updates[name]
        }
        this.postCollection.findOneAndUpdate({ id: option.id }, { $set: updates }, { returnOriginal: false }, (err, res) => {
            if (err) {
                callback(new Errors.NotFound())
                return
            }
            callback(null, res.value)
        })
    }
    private updatePostParamsCheck(option: { body: any }): Partial<PostService.Post> {
        let postUpdate = {}
        let body = option.body
        if (body.type) {
            postUpdate["type"] = body.type
        }
        if (body.content) {
            postUpdate["content"] = body.content
        }
        if (body.images) {
            postUpdate["images"] = body.images
        }
        if (body.props) {
            postUpdate["props"] = body.props
        }
        return postUpdate
    }
    queryPost(option: EndlessService.EndlessQueryMeta & Partial<Pick<PostService.Post, "type" | "category" | "authorId">> & {
        keyword: string,
    }, callback: Callback<PostService.Post[]>) {
        let criteria = {
            type: option.type,
            category: option.category
        }
        if (option.keyword) {
            let reg = new RegExp(escapeRegExp(option.keyword))
            criteria["$or"] = [{
                title: reg
            }, {
                content: reg
            }]
        }
        if (option.authorId) {
            criteria["authorId"] = option.authorId
        }
        for (let name in criteria) {
            if (!criteria[name]) delete criteria[name]
        }
        this.services.EndlessService.query({
            collection: this.postCollection,
            count: option.count,
            offset: option.offset,
            sort: {
                createAt: -1
            },
            criteria
        }, (err, result: any[] = []) => {
            console.log(result)
            callback(err, result)
        })
    }
    queryPostsAsPaginate(option: PaginateService.PaginateQuery & Partial<Pick<PostService.Post, "authorId" | "type" | "category">> & {
        keyword: string,
    }, callback: Callback<PaginateService.PaginateResult<PostService.Post>>) {
        let query = {
            type: option.type,
            category: option.category
        }
        for (let name in query) {
            if (!query[name]) {
                delete query[name]
            }
        }
        this.services.PaginateService.query<PostService.Post>({
            collection: this.postCollection,
            pageIndex: option.pageIndex,
            pageSize: option.pageSize,
            query,
            sort: {
                createAt: -1
            }
        }, (err, res: PaginateService.PaginateResult<PostService.Post>) => {
            callback(err, res)
        })
    }
    getPostsByOwner(option: EndlessService.EndlessQueryMeta & {
        type: string
        ownerId: string
    }, callback: Callback<PostService.Post[]>) {
        let criteria = {
            authorId: option.ownerId
        }
        if (option.type) {
            criteria["type"] = option.type
        }
        this.services.EndlessService.query<PostService.Post>({
            count: option.count,
            offset: option.offset,
            criteria,
            collection: this.postCollection
        }, callback)
    }
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
