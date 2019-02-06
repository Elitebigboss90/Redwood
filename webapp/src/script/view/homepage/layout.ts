import * as Settings from "../../settings"
export class Layout extends R.Homepage.Layout {
    constructor() {
        super()
        console.log(888)
        this.time()
        // this.VM.apkURL = Settings.apkURL
    }
    index = 0
    myFunction() {
        console.log(this.index)
        if (this.index == 0) {
            this.UI.actionArea.style.transitionProperty = "all";
            this.VM.direction = "two";
            this.index++
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.myFunction()
                console.log(777);
            }, 3000)
        }
        else if (this.index == 1) {
            this.VM.direction = "three";
            this.index++
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.myFunction()
                console.log(777);
            }, 1500)
        }
        else {
            this.UI.actionArea.style.transitionProperty = "none";
            this.VM.direction = "one";
            this.index = 0
        }
    }
    timer
    time() {
        this.timer = setInterval(() => {
            this.myFunction()
            console.log(777);
        }, 3000)
    }
}