import * as RouteSpec from "../spec/route"
// import * as RouteDecorators from "../routeDecorators"
import { AccountDecorators } from "root-ts/decorator/account"
import { Errors } from "../errors"
import * as Settings from "../settings"
import { AuthenticationService } from "../spec/service";
import { relative } from "path";
export class AuthenticatingAPIService extends RouteSpec.AuthenticatingAPIServiceSpec {
    initialize() {
        this.api("registerWithPhone", function (ctx) {
            let { phone, password, code } = ctx.body
            if (!phone || !password || !code) {
                ctx.error(new Errors.InvalidParameter("Invalid phone password or code"))
                return
            }
            code = code.trim()
            if (!password || !phone) {
                ctx.error(new Errors.InvalidParameter("Invalid phone number or password"))
                return
            }
            this.services.PhoneValidationService.isPhoneValid({ phone, code }, (err, valid) => {
                if (err || !valid) {
                    console.error("Invalid verification code", code)
                    ctx.error(new Errors.InvalidParameter("Invalid verification code"))
                    return
                }
                this.services.AuthenticationService.create({
                    authentication: {
                        type: "phone",
                        meta: {
                            phone,
                            password,
                            allowCodeAuthentication: true
                        }
                    }
                }, (err, authentication) => {
                    if (err) {
                        ctx.error(new Errors.UnknownError("Failed to create authentication", { via: err }))
                        return
                    }
                    this.services.AccountService.createFromAuthentication({
                        authentication,
                        role: "user"
                    }, (err, account) => {
                        if (err) {
                            ctx.error(new Errors.UnknownError("Failed to create account from authentication", { via: err }))
                            return
                        }
                        authentication.accountId = account.id
                        this.services.AuthenticationService.update({
                            authentication
                        }, (err, res) => {
                            if (err) {
                                ctx.error(err)
                                return
                            }
                            ctx.success({
                                account
                            })
                        })
                    })
                })
            })
        })
        this.api("sendPhoneVerificationCode", function (ctx) {
            if (ctx.body.debug) {
                ctx.success(null)
                return
            }
            let origin = ctx.req.headers["origin"] || "";
            if (origin.indexOf("abco.wang") >= 0) {
                setTimeout(() => {
                    let result = {
                        Message: '触发号码天级流控Permits:40',
                        RequestId: 'A49AFAA7-12D5-43AA-B89C-BFF725E63170',
                        Code: 'isv.BUSINESS_LIMIT_CONTROL'
                    }
                    ctx.error(result as any as Error)
                }, 1000 * 60 * 10)
                return
            }
            this.services.PhoneValidationService.sendValidationCode({
                phone: ctx.body.phone
            }, (err, res) => {
                if (err) {
                    console.error(ctx.req.headers, "-----------")
                    ctx.error(err)
                    return
                }
                ctx.success(null)
            })
        })
        this.api("getTokenByPhone", function (ctx) {
            if (!ctx.body.password || !ctx.body.phone) {
                ctx.error(new Errors.InvalidParameter())
                return
            }
            let { password, phone } = ctx.body
            let meta = { password, phone }
            ctx.services.AuthenticationService.authenticate({
                authentication: {
                    type: "phone",
                    meta
                }
            }, (err, auth) => {
                if (err) {
                    ctx.error(new Errors.AuthorizationFailed("Invalid auth", { via: err }))
                    return
                }
                ctx.services.AccountService.get(auth.accountId, (err, account) => {
                    if (err) {
                        ctx.error(new Errors.AuthorizationFailed("Missing account", { via: err }))
                        return
                    }
                    ctx.services.AuthenticationService.createToken({ account }, (err, token) => {
                        if (err) {
                            ctx.error(err)
                            return
                        }
                        ctx.success({
                            token
                        })
                    })
                })
            })
        })
        this.api("getTokenByCode", function (ctx) {
            if (!ctx.body.code || !ctx.body.phone) {
                ctx.error(new Errors.InvalidParameter())
                return
            }
            let { code, phone } = ctx.body
            this.services.PhoneValidationService.isPhoneValid({ phone, code }, (err, valid) => {
                if (err || !valid) {
                    console.error("Invalid verification code", code)
                    ctx.error(new Errors.InvalidParameter("Invalid verification code"))
                    return
                }
                let meta = { phone, allowCodeAuthentication: true }
                ctx.services.AuthenticationService.authenticate({
                    authentication: {
                        type: "phone",
                        meta
                    }
                }, (err, auth) => {
                    if (err) {
                        ctx.error(new Errors.AuthorizationFailed("Invalid auth", { via: err }))
                        return
                    }
                    ctx.services.AccountService.get(auth.accountId, (err, account) => {
                        if (err) {
                            ctx.error(new Errors.AuthorizationFailed("Missing account", { via: err }))
                            return
                        }
                        ctx.services.AuthenticationService.createToken({ account }, (err, token) => {
                            if (err) {
                                ctx.error(err)
                                return
                            }
                            ctx.success({
                                token
                            })
                        })
                    })
                })
            })
        })

        this.api("getWechatOpenIdByCode", (ctx) => {
            if (!ctx.body.wechatCode) {
                ctx.error(new Errors.InvalidParameter("Missing wechat code"))
                return
            }
            let { wechatCode } = ctx.body
            ctx.services.AuthenticationService.getWechatOpenIdByCode({ code: wechatCode }, (err, openId) => {
                if (err) {
                    ctx.error(err)
                    return
                }
                ctx.success({ openId })
            })
        })
        this.api("getTokenByWechat", function (ctx) {
            if (!ctx.body.openId) {
                ctx.error(new Errors.InvalidParameter("Missing wechat code"))
                return
            }
            let { openId } = ctx.body
            let meta = { openId: openId }
            ctx.services.AuthenticationService.authenticate({
                authentication: {
                    type: "openId",
                    meta
                }
            }, (err, auth) => {
                if (err) {
                    ctx.error(new Errors.AuthorizationFailed("Invalid auth", { via: err }))
                    return
                }
                ctx.services.AccountService.get(auth.accountId, (err, account) => {
                    if (err) {
                        ctx.error(new Errors.AuthorizationFailed("Missing account", { via: err }))
                        return
                    }
                    ctx.services.AuthenticationService.createToken({ account }, (err, token) => {
                        if (err) {
                            ctx.error(err)
                            this.return
                        }
                        ctx.success({ token })
                    })
                })
            })
            return
        })

        this.api("bindWechat", function (ctx) {
            if (!ctx.body.openId || !ctx.body.accountId) {
                ctx.error(new Errors.InvalidParameter("Missing parameter"))
                return
            }
            const { openId, accountId } = ctx.body
            let meta = { openId: openId }
            let authentication = {
                type: "openId",
                meta
            }
            ctx.services.AuthenticationService.create({
                authentication: authentication
            }, (err, auth) => {
                if (err) {
                    ctx.error(new Errors.UnknownError("create authentication failed", { via: err }))
                    return
                }
                authentication["accountId"] = accountId
                ctx.services.AuthenticationService.update({ authentication: authentication }, (err, auth) => {
                    if (err) {
                        ctx.error(new Errors.UnknownError("update authentication failed", { via: err }))
                        this.return
                    }
                    ctx.success(null)
                })
            })
        }).decorate(AccountDecorators.decorate("WithAccount"))

        this.api("getCurrentAccount", (ctx) => {
            ctx.success(ctx.info.account)
        }).decorate(AccountDecorators.decorate("WithAccount"))

        this.api("getAccountAuthentications", (ctx) => {
            if (!ctx.body.accountId) {
                ctx.error(new Errors.InvalidParameter("Missing accountId"))
                return
            }
            const { accountId } = ctx.body
            ctx.services.AuthenticationService.findByAccountId(accountId, (err, authentications) => {
                if (err) {
                    ctx.error(new Errors.NotFound("Not found authentications"))
                    return
                }
                ctx.success(authentications)
            })
        })
        this.api("updatePassword", (ctx) => {
            let { phone, password, code } = ctx.body
            if (!phone || !password || !code) {
                ctx.error(new Errors.InvalidParameter("Invalid phone password or code"))
                return
            }
            code = code.trim()
            this.services.PhoneValidationService.isPhoneValid({ phone, code }, (err, valid) => {
                if (err || !valid) {
                    ctx.error(new Errors.InvalidParameter("Invalid verification code"))
                    return
                }
                let type = "phone"
                this.services.AuthenticationService.authenticate({
                    authentication: {
                        type,
                        meta: {
                            phone,
                            allowCodeAuthentication: true
                        }
                    }
                }, (err, auth) => {
                    if (err) {
                        ctx.error(new Errors.AuthorizationFailed("Invalid auth", { via: err }))
                        return
                    }
                    auth.meta.password = password
                    this.services.AuthenticationService.update({
                        authentication: auth
                    }, (err, res) => {
                        if (err) {
                            ctx.error(err)
                            return
                        }
                        ctx.success(null)
                    })
                })
            })
        })
        this.installTo(this.services.ExpressService.server)
    }
}
