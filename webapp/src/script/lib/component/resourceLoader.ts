// 1. audio can only be played on user interact in many OS.
// 2. on iOS audio will only preload after playing (and of course after user interact)
//    So we may mute the audio element and play it to make it preload(Based on Solution1)
// 3. in some situation, image even need to be append to DOM to make it actually load.


// We have generatly 2 solution
// 1. use XHR to ensure everything goes right (easier to implement, but potential memory issue)
// 2. use Element to load everything (hard way, but likely to use less resource)
// For who ever implement this, try your best

// Usage
// const rl = new ResourceLoader()
// let session = rl.createSession({baseUrl:Meta.cdnBase + "/resource/"})
// session.add("myImage","test.jpg")   // default to image
//    .add("myVideo","test.mp4","video")
//    .add(...)
//    .load((err)=>{})
// session.events.listenBy(sb, progress,()=>{
//    //updateUI
//})
//
// // after loaded
// this.UI.container.appendChild(rl.get("myImage"))

export namespace Resource {
    export type TypeMap = {
        image,
        video,
        audio
    }
    export type Type = keyof TypeMap
}
export type ResourceElement = HTMLImageElement | HTMLVideoElement | HTMLAudioElement
export type Resource = {
    name: string,
    uri: string,
    type: "image" | "video" | "audio",
    progress?: {
        loaded: number,
        total: number,
    },
    element?: ResourceElement
}

const ResourceElementMap: {
    [key in keyof Resource.TypeMap]: "img" | "video" | "audio"
} = {
        image: "img",
        video: "video",
        audio: "audio"
    }


interface ErrorCallback<E> { (err?: E): void; }
interface AsyncIterator<T, E> { (item: T, index: number, done: ErrorCallback<E>): void; }

export class ResourceLoader {
    constructor(option: {
        baseUrl?: string
    } = {}) {
        // 1. remember all session created
        // 2. feed them
        this.baseUrl = option.baseUrl
        window.addEventListener("mousedown", () => {
            this.sessions.forEach((session) => {
                session.userIsInteracting()
            })
        })
        window.addEventListener("touchstart", () => {
            this.sessions.forEach((session) => {
                session.userIsInteracting()
            })
        })
    }
    private sessions: ResourceLoaderSession[] = []
    public baseUrl: string
    createSession(option: {
        baseUrl?: string
    } = {}): ResourceLoaderSession {
        let baseUrl = option.baseUrl || this.baseUrl || ""
        let session = new XHRResourceLoaderSession({ baseUrl, loader: this })
        this.sessions.push(session)
        return session
    }
    get<T extends ResourceElement>(name: string): T {
        let el: T
        this.sessions.forEach((session) => {
            if (session.getResourceElement(name)) {
                el = session.getResourceElement(name) as any
            }
        })
        return el
    }
    revokeResources() {
        this.sessions.forEach((session) => {
            session.revokeResources()
        })
    }
}


// Manage the loading procedure(Spawning load workers, deciding implementation, etc...)
export interface ResourceLoaderSession {
    readonly loader: ResourceLoader
    events: Leaf.EventEmitter<{
        start
        progress: {
            percentage: string // like "36.5%"
            done: number
            total: number
        }
        finish
        error: Error
    }>
    // Now every thing can load
    userIsInteracting()
    revokeResources()
    load(callback: (err?: Error) => void)
    add(name: string, uri: string, type?: "image" | "video" | "audio"): this
    getResourceElement<T extends ResourceElement>(name: string): T
}
export class XHRResourceLoaderSession implements ResourceLoaderSession {
    readonly loader: ResourceLoader
    events = new Leaf.EventEmitter<{
        start
        progress: {
            percentage: string
            done: number
            total: number
        }
        finish
        error: Error
    }>()
    baseUrl: string
    finished: boolean = false
    preloaded: boolean = false
    private resources: Resource[] = []
    constructor(option: {
        baseUrl: string,
        loader: ResourceLoader
    }) {
        this.baseUrl = option.baseUrl || ""
        this.loader = option.loader
    }
    getResourceElement<T extends ResourceElement>(name: string): T {
        let resource = this.resources.filter((resource) => (resource.name == name))[0]
        let el: T
        if (resource) {
            el = (resource.element as T)
        }
        return el
    }
    revokeResources() {
        this.resources.forEach((resource) => {
            window.URL.revokeObjectURL(resource.uri)
        })
    }
    userIsInteracting() {
        if (this.finished && !this.preloaded) {
            console.log("interacting")
            this.resources.forEach((resource) => {
                if (resource.type == "video" || resource.type == "audio") {
                    let el = resource.element as HTMLMediaElement
                    el.setAttribute("playsinline", "")
                    el.setAttribute("webkit-playsinline", "true")
                    el.setAttribute("muted", "")
                    // for wechat android
                    el.setAttribute("x-webkit-airplay", "allow")
                    el.setAttribute("x5-video-player-type", "h5")
                    el.setAttribute("x5-video-player-fullscreen", "true")
                    el.setAttribute("x5-video-orientation", "portraint")
                    el.play()
                    el.pause()
                    el.removeAttribute("muted")
                    this.preloaded = true
                    console.log("muted")
                }
            })
        }
    }
    add(name: string, uri: string, type: Resource.Type = "image"): this {
        this.resources.push({ name, uri, type })
        return this
    }
    load(callback: (err?: Error) => void) {
        let completed = 0
        let session = this
        this.events.emit("start")
        console.log("load start")
        let percentage = 0
        Async.eachLimit(this.resources, 2, (resource: Resource, index, done) => {
            let xhr = new XMLHttpRequest()
            let url = `${this.baseUrl}${resource.uri}`
            xhr.open("get", url, true)
            xhr.responseType = "blob"
            // xhr.withCredentials = true

            xhr.onload = function () {
                if (this.status == 200) {
                    let blob = this.response
                    console.log(blob.type)
                    let el = document.createElement(ResourceElementMap[resource.type])
                    el.src = window.URL.createObjectURL(blob)
                    el.classList.add("resource")
                    el.classList.add(resource.type)
                    el.classList.add(resource.name)
                    resource.element = el
                    completed = completed + 1
                    done()
                    return
                }
                done(new Error(`failed to get resource: ${resource.name}`))
            }
            xhr.onprogress = function (e) {
                if (e.lengthComputable) {
                    let loaded = e.loaded
                    let total = e.total
                    resource.progress = {
                        loaded,
                        total
                    }
                    let percentage = session.getProgressPrecentage()
                    session.events.emit("progress", {
                        percentage,
                        done: completed,
                        total,
                    })
                }
            }
            xhr.onerror = function (e) {
                done(new Error(`failed to get resource: ${resource.name}`))
            }
            xhr.send()
        }, (err: Error) => {
            console.log("load done")
            if (err) {
                this.events.emit("error", err)
                callback(err)
                return
            }
            this.finished = true
            this.events.emit("finish")
            callback()
        })
    }
    getProgressPrecentage(): string {
        let perc = 0
        let length = this.resources.length
        this.resources.forEach((resource) => {
            let progress = resource.progress
            if (progress) {
                perc = perc + progress.loaded / progress.total / length
            }
        })
        perc = Math.floor(perc * 100) / 100
        return `${Math.ceil(perc * 100)}%`
    }
}
export class ElementResourceLoaderSession { }




class Async {
    static noop() {
        // No operation performed.
    }
    static once(fn) {
        return function () {
            if (fn === null) return
            let callFn = fn
            fn = null
            callFn.apply(this, arguments)
        }
    }
    static eachLimit<T, E>(coll: T[], limit: number, iterator: AsyncIterator<T, E>, callback: ErrorCallback<E>) {
        callback = Async.once(callback)
        let index = -1
        let done = false
        let running = 0
        let length = coll.length

        if (length === 0) {
            callback(null)
        }

        function iteratorCallback(err: E) {
            running = running - 1
            if (err) {
                callback(err)
                return
            }
            if (done && running <= 0) {
                callback(null)
                return
            }
            reload()
        }

        function reload() {
            while (running < limit && !done) {
                index = index + 1
                if (index >= length) {
                    done = true
                    if (running <= 0) {
                        callback(null)
                    }
                    return
                }
                running = running + 1
                iterator(coll[index], index, Async.once(iteratorCallback))
            }
        }

        reload()
    }

}
