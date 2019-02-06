import { MobileConsole } from "./mobileConsole"
export class MotionManager {
    attach() {
        this.reset()
        window.addEventListener("devicemotion", this.handler)
    }
    detach() {
        this.reset()
        window.removeEventListener("devicemotion", this.handler)
    }
    events = new Leaf.EventEmitter<{
        x: number
        y: number
        z: number
        shake
    }>()

    private handler = (e: DeviceMotionEvent) => {
        let motion = {
            x: e.acceleration.x,
            y: e.acceleration.y,
            z: e.acceleration.z
        }
        this.events.emit("x", motion.x)
        this.events.emit("y", motion.y)
        this.events.emit("z", motion.z)
        this.check(motion)
    }
    private t: number = Date.now()
    private direction = 1
    private counter = 0
    private reset() {
        this.t = Date.now()
        this.direction = 1
        this.counter = 0
    }
    public shake = {
        axis: "x",
        stale: 300,
        sensitivity: 1,
        bounce: 3
    }
    private readonly sensitivityFactor = 6
    private check(motion: { x: number, y: number, z: number }) {
        let move = motion[this.shake.axis] * this.direction
        if (move > this.sensitivityFactor / this.shake.sensitivity) {
            console.log(motion)
            this.direction = -this.direction
            this.bounce()
        }
    }
    private bounce() {
        let interval = Date.now() - this.t
        if (interval > this.shake.stale) {
            this.counter = 1
        } else {
            this.counter += 1
        }
        this.t = Date.now()
        if (this.counter >= this.shake.bounce) {
            this.reset()
            this.events.emit("shake")
        }
    }
}

