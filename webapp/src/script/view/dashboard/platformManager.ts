import { FormFactory } from "../base/form";
import { App } from "../../app";


export class PlatformManager extends R.Dashboard.PlatformManager {
    editor = new PlatformEditor()
    constructor() {
        super()
        this.refresh()
        this.editor.events.listenBy(this, "confirm", () => {
            let info = this.editor.getValue()
            console.log(info)
            info.procurementFeeRate /= 100
            console.log("esfgse: " + info.procurementFeeRate)
            App.api.Platform.setInformation(info, (err, res) => {
                if (err) {
                    console.error(err)
                    alert("更新失败，请重试")
                    this.refresh()
                    return
                }
                alert("更新成功")
                this.refresh()
            })
        })
    }
    refresh() {
        App.api.Platform.getInformation({}, (err, res) => {
            console.log(err, res)
            res.procurementFeeRate *= 100 
            this.editor.setValue(res)
        })
    }
}



class Ed extends R.Dashboard.PlatformManager.Ed {
    onClickConfirm() {
        this.events.emit("confirm")
    }
}

const PlatformEditor = FormFactory.create<PlatformService.Information, typeof Ed>({
    fields: {
        customerServicePhoneNumber: "客服电话",
        procurementFeeRate: "代购费率",
    },
    types: {
        customerServicePhoneNumber: "text",
        procurementFeeRate: "number",
    },
    metas: {
        procurementFeeRate: {
            unit: "%"
        }
    }
}, Ed)