import * as ServiceSpec from "../spec/service"
import * as Settings from "../settings"
import * as wxkit from "wxkit"

export class AuthenticationService extends ServiceSpec.AuthenticationService {
    constructor(settings) {
        super(settings)
        this.define(new PhoneAuthDefinition())
        this.define(new WechatOpenIdAuthentication())
    }

    client: wxkit.WechatClient = new wxkit.WechatClient({
        appId: Settings.wechat.appId,
        secret: Settings.wechat.secret
    })

    getWechatOpenIdByCode(option: { code: string }, callback: Callback<string>) {
        const { code } = option
        if (!code) {
            callback(new Errors.InvalidParameter("Invalid wechat code"))
            return
        }
        this.client.getWebUserClient((err, client) => {
            console.log("sfgedwf", err, client)
            if (err) {
                callback(err, null)
                return
            }
            client.exchangeCodeForInformation({ code }, (err, info) => {
                console.log("dfsgres", err, info)
                if (!info) {
                    callback(err, null)
                    return
                }
                const { accessInfo, openId } = info
                callback(null, openId)
                //client.getUserProfile({ accessToken: accessInfo.token, openId }, (err, profile) => {
                //console.log("sfsgerg", err, profile)
                //if (!profile) {
                //callback(new Errors.Forbidden(), null)
                //return
                //}
                //callback(null, profile)
                //})
            })
        })
    }
}


import * as crypto from "crypto"
import { AuthenticationDefinition, AuthenticationData } from "root-ts/service/authenticationService"
import * as Leaf from "leaf-ts"
import { Errors } from "../errors"
import { WechatClient } from "wxkit";
import { Code } from "bson";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";


declare namespace PhoneAuthDefinition {
    type Meta = {
        phone: string,
        password?: string,
        passwordHash?: string,
        allowCodeAuthentication: boolean
    }
}
declare namespace WechatAuthDefinition {
    type Meta = {
        openId: string
    }
}

export type PhoneAuthenticationData = AuthenticationData<"phone", PhoneAuthDefinition.Meta>
export type WechatAuthenticationData = AuthenticationData<"openId", WechatAuthDefinition.Meta>

export class PhoneAuthDefinition extends AuthenticationDefinition<PhoneAuthenticationData>{
    constructor(public option: {
        salt?: string,
        minPasswordLength?: number,
        maxPasswordLength?: number,
        phoneValidator?: RegExp,
        passwordChecker?: (string) => boolean,
    } = {}) {
        super()
        this.option = Leaf.Util.buildOption({
            salt: "e7ac4793242f40ec",
            minPasswordLength: 3,
            maxPasswordLength: 1024,
            phoneValidator: /^1[3-8][0-9]{9}$/,
            passwordChecker: (o) => true,
        }, this.option)
    }
    readonly type = "phone"
    sanitize(meta: PhoneAuthDefinition.Meta) {
        let copy = { ...meta }
        for (let field of ["phone"]) {
            if (!meta[field]) throw new Errors.InvalidParameter("Missing " + field)
        }
        if (!this.option.phoneValidator.test(meta.phone)) {
            throw new Errors.InvalidParameter("Invalid phone number formation")
        }
        if (meta.password) {
            if (meta.password.length > this.option.maxPasswordLength) {
                throw new Errors.InvalidParameter(`Password length exceed max length ${this.option.maxPasswordLength}`)
            }
            if (meta.password.length < this.option.minPasswordLength) {
                throw new Errors.InvalidParameter(`Password length exceed min length ${this.option.minPasswordLength}`)
            }
            if (!this.option.passwordChecker(meta.password)) {
                throw new Errors.InvalidParameter(`Password too simple`)
            }
        }
        if (meta.password) {
            delete copy["password"]
            copy.passwordHash = this.hash(meta.password)
        }
        return copy
    }
    queryCriteria(meta: PhoneAuthDefinition.Meta) {
        if (!meta.phone) {
            throw new Errors.InvalidParameter("No valid phone number provided")
        }
        let query = {
            "meta.phone": meta.phone
        }
        return query
    }
    authenticateCriteria(meta: PhoneAuthDefinition.Meta) {
        if (!meta.phone) {
            throw new Errors.InvalidParameter("No valid phone number provided")
        }
        if (meta.allowCodeAuthentication && !meta.password && !meta.passwordHash) {
            return {
                "meta.phone": meta.phone,
                "meta.allowCodeAuthentication": true
            }
        } else {
            let hash
            if (meta.password) {
                hash = this.hash(meta.password)
            } else if (meta.passwordHash) {
                hash = meta.passwordHash
            } else {
                throw new Errors.InvalidParameter("No valid password privided")
            }
            let query = {
                "meta.passwordHash": hash,
                "meta.phone": meta.phone
            }
            return query
        }
    }
    clearSensitiveInformation(meta: PhoneAuthDefinition.Meta) {
        let copy = { ...meta }
        delete copy.password
        delete copy.passwordHash
        return copy
    }
    guid(meta: PhoneAuthDefinition.Meta) {
        return crypto.createHash("sha1").update(meta.phone).update(this.option.salt).digest("hex")
    }
    about(meta: PhoneAuthDefinition.Meta, field: string) {
        if (field === "phone") return meta.phone
        if (field === "name") return meta.phone
        if (field === "displayName") return meta.phone
        return null
    }
    unique() {
        return [{
            "meta.phone": 1
        }]
    }
    props(meta: PhoneAuthDefinition.Meta) {
        return {
            phone: meta.phone,
        }
    }
    private hash(raw: string) {
        // 2 level hash creates the possibility that client don't give password to server.
        // Only the sha1 content are transfered
        let h1 = crypto.createHash("sha1").update(raw).digest("hex")
        let h2 = crypto.createHash("sha1").update(h1).update(this.option.salt).digest("hex")
        return h2
    }
}


export class WechatOpenIdAuthentication extends AuthenticationDefinition<WechatAuthenticationData> {
    constructor() {
        super()
    }
    readonly type = "openId"
    sanitize(meta: WechatAuthDefinition.Meta) {
        let copy = { ...meta }
        for (let field of ["openId"]) {
            if (!meta[field]) throw new Errors.InvalidParameter("Missing " + field)
        }

        return copy
    }
    queryCriteria(meta: WechatAuthDefinition.Meta) {
        if (!meta.openId) {
            throw new Errors.InvalidParameter("No valid openId provided")
        }
        let query = {
            "meta.openId": meta.openId
        }
        return query
    }
    authenticateCriteria(meta: WechatAuthDefinition.Meta) {
        if (!meta.openId) {
            throw new Errors.InvalidParameter("No valid openId provided")
        }
        let query = {
            "meta.openId": meta.openId
        }
        return query
    }
    clearSensitiveInformation(meta: WechatAuthDefinition.Meta) {
        let copy = { ...meta }
        return copy
    }
    guid(meta: WechatAuthDefinition.Meta) {
        return crypto.createHash("sha1").update(meta.openId).digest("hex")
    }
    about(meta: WechatAuthDefinition.Meta, field: string) {
        if (field === "phone") return meta.openId
        if (field === "name") return meta.openId
        if (field === "displayName") return meta.openId
        return null
    }
    unique() {
        return [{
            "meta.openId": 1
        }]
    }
    props(meta: WechatAuthDefinition.Meta) {
        return {
            openId: meta.openId
        }
    }
}

interface PhoneAuthVerificationData {
    verificationCode: string,
    expire: number,
}
