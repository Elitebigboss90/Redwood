import * as ServiceSpec from "../spec/service"
import * as mongodb from "mongodb"
export class MongodbService extends ServiceSpec.MongodbService {
    userCollection: mongodb.Collection
}
