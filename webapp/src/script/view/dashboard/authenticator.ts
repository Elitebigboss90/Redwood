import { App } from "../../app"
import { PopupBehavior } from "../../lib/behavior/popupBehavior"
export class Authenticator extends R.Dashboard.Authenticator {
    asPopup = new PopupBehavior(this)
    constructor() {
        super()
        this.UI.passwordInput.onkeyup = (e) => {
            let theEvent = e || window.event as any;
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                this.login()
            }
        }
    }
    onClickLogin() {
        this.login()
    }
    login() {
        let option = {
            login: this.UI.loginInput.value.trim(),
            password: this.UI.passwordInput.value.trim()
        }
        App.api.Account.webLoginStandard(option, (err, res) => {
            console.log(res)
            if (res) {
                window.location.reload()
            } else {
                console.error(err)
                alert("账号或密码错误")
            }
        })
    }
}
