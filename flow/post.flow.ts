export const after = ["login"]
let randTitle = Math.random().toString()
let randContent = Math.random().toString()
let content = "CONTENT" + randContent
let content2 = "CONTENT2" + randContent
let images = ["IMAGES"]
let title = "TITLE" + randTitle

export const actions = [{
    name: "createPost",
    data: {
        type: "article",
        title,
        content,
        images: images,
        category: null
    },
    save: {
        id: "postId"
    },
    shouldBe: {
        type: "article",
        content,
        title,
        images: images,
    }
}, {
    name: "updatePost",
    data: {
        postId: "$postId",
        title,
        type: "article",
        content: content2,
        images: images,
        category: null
    },
    shouldBe: {
        title,
        content: content2
    }
}, {
    name: "getPostById",
    data: {
        postId: "$postId"
    },
    shouldBe: {
        title,
        content: content2
    }
}, {
    name: "queryPosts",
    data: {
        type: "article",
        keyword: randTitle,
        offset: 0,
        count: 10
    },
    shouldBe: {
        length: 1
    },
    check: (result: any) => {
        return
    }
}, {
    name: "queryPosts",
    data: {
        type: "other",
        keyword: randTitle,
        offset: 0,
        count: 10
    },
    shouldBe: {
        length: 0
    },
    check: (result: any) => {
        return
    }
}]
