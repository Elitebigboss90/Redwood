import * as RouteSpec from "../spec/route"
import { Errors } from "../errors"
// import { RouteDecorators } from "root-ts/lib/decorator";
import { AccountDecorators } from "root-ts/decorator/account"
import { PostDecorators } from "../decorator/post"

export class PostingAPIService extends RouteSpec.PostingAPIServiceSpec {
    initialize() {
        // this.decorateAll(AccountDecorators.decorate("WithAccount"))
        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("createPost", (ctx) => {
            console.log("create post api", ctx.body.images)
            this.services.PostService.createPost({
                body: {
                    ...ctx.body,
                    authorName: ctx.body.authorName || ctx.info.account.displayName,
                    meta: ctx.body.meta
                }, accoundId: ctx.info.account.id
            }, (err, post) => {
                ctx.done(err, post)
            })
        })

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("deletePost", async (ctx) => {
            let postId = ctx.params.postId
            let post: PostService.Post = ctx.info.post
            // TODD check permission
            this.services.PostService.deletePost({ id: postId }, (err, res) => {
                ctx.done(err, res)
            })
        }).decorate(PostDecorators.decorate("WithPost"))

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("updatePost", (ctx) => {
            if (ctx.info.account.id !== ctx.info.post.authorId) {
                ctx.error(new Errors.AuthorizationFailed())
                return
            }
            this.services.PostService.updatePost({
                id: ctx.params.postId, updates: {
                    title: ctx.body.title,
                    content: ctx.body.content,
                    images: ctx.body.images,
                    category: ctx.body.category
                }
            }, (err, newPost) => {
                ctx.done(err, newPost)
            })
        }).decorate(PostDecorators.decorate("WithPost"))

        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("getMyPosts", (ctx) => {
            this.services.PostService.getPostsByOwner({
                ownerId: ctx.info.account.id,
                type: ctx.body.type
            }, ctx.done)
        })
        this.api("queryPosts", (ctx) => {
            let { type, category, count, offset, keyword, authorId } = ctx.body
            this.services.PostService.queryPost({ keyword, type, category, count, offset, authorId }, (err, posts) => {
                ctx.done(err, posts)
            })
        })
        this.api("queryPostsAsPaginate", (ctx) => {
            let { pageIndex, pageSize, type, category, keyword, authorId } = ctx.body
            this.services.PostService.queryPostsAsPaginate({
                pageIndex, pageSize, type, category, keyword, authorId
            }, (err, res) => {
                ctx.done(err, res)
            })

        })
        this.api("getPostById", (ctx) => {
            let id: PostService.PostId = ctx.params.postId
            this.services.PostService.getPost({ id: id }, (err, res) => {
                ctx.done(err, res)
            })
        })
        this.decorate(AccountDecorators.decorate("WithAccount"))
        this.api("stickPost", (c) => {
            let id = c.params.postId
            this.services.PostExtraService.stickPost({ id }, c.done)
        })
        this.installTo(this.services.ExpressService.server)
    }
}
