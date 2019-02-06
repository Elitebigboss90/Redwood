import * as ServiceSpec from "../spec/service"
export class PostExtraService extends ServiceSpec.PostExtraService {
    stickPost(option: { id: string }, callback: Callback<null>) {
        let { id } = option
        this.services.PostService.postCollection.findOneAndUpdate({
            id
        }, {
                $set: {
                    createAt: Date.now()
                }
            }, callback)
    }
}