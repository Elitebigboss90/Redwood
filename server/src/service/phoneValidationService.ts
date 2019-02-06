import * as crypto from "crypto"
import * as Leaf from "leaf-ts"
import * as ServiceSpec from "../spec/service"
import * as Settings from "../settings"
import { Errors } from "../errors"
import * as SMSClient from "@alicloud/sms-sdk"
export class PhoneValidationService extends ServiceSpec.PhoneValidationService {
    constructor(settings) {
        super(settings)
    }
    sendValidationCode(option: {
        phone: string,
        expires?: number
    }, callback: Callback) {
        let expires = option.expires || this.settings.phoneValidation.expires || 1000 * 60
        let { accessKeyId, secretAccessKey } = this.settings.phoneValidation.aliSMS
        let smsClient = new SMSClient({
            accessKeyId,
            secretAccessKey
        })
        let phone = option.phone
        let code = Math.random().toString().slice(-6)
        let id = this.createSessionId(phone)
        smsClient.sendSMS({
            PhoneNumbers: phone,
            SignName: this.settings.phoneValidation.aliSMS.SignName,
            TemplateCode: this.settings.phoneValidation.aliSMS.TemplateCode,
            TemplateParam: `{"code":${code}}`
        }).then((res) => {
            let { Code } = res
            if (Code === "OK") {
                this.services.TTLSessionStorage
                this.services.TTLSessionStorage.updateOrCreateTTLSession({
                    id,
                    data: {
                        code,
                        phone
                    },
                    ttl: expires
                }, (err, id) => {
                    callback(err)
                })
                return
            }
            callback(new Errors.UnknownError("failed to send sms"))
        }, (err) => {
            callback(new Errors.UnknownError("failed to send sms"))
            console.log("server sendValidationCode failed: ", err)
        })
    }
    isPhoneValid(option: {
        phone: string
        code: string
    }, callback: Callback<boolean>) {
        let id = this.createSessionId(option.phone)
        let mc = this.settings.phoneValidation.magicCode
        if (mc && mc === option.code) {
            callback(null, true)
            return
        }
        this.services.TTLSessionStorage.getTTLSessionDataById<{
            code: string
            phone: string
        }>({ id }, (err, data) => {
            if (data && data.code === option.code && data.phone === option.phone) {
                callback(null, true)
                return
            }
            callback(new Error("Invalid"), false)
        })
    }
    private createSessionId(phone: string) {
        return `phone-verification-${phone}`
    }
}
