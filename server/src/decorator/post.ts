import * as DecoratorSpec from "../spec/decorator"
import { Errors } from "../errors"

export const PostDecorators = new class extends DecoratorSpec.PostDecorators {
    constructor() {
        super()
        this.implement("WithPost", (c, option: {
            optional?: boolean
        } = {}, origin) => {
            c.services.PostService.getPost({
                id: c.params.postId
            }, (err, post) => {
                if (!post) {
                    if (option.optional) {
                        origin()
                        return
                    }
                    c.error(new Errors.NotFound())
                    return
                }
                c.info.post = post
                origin()
            })
        })
    }
}
