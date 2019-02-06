export class Tracker {
    ns: {
        [K in keyof this["config"]]?: any
    } = {
        youmeng: Youmeng,
        miaozhen: Miaozhen,
        ga: GA
    } as any
    constructor(public config: {
        youmeng?: {
            id: string
        }
        baidu?: {
            id: string
        }
        miaozhen?: {
            id: string
        }
        ga?: {
            id: string
        }
    }) {
        for (let k in config) {
            this.ns[k].config(config[k])
        }
    }
    log(category: string, action?: string, label?: string, value?: string, nodeId?: string) {
        for (let name in this.config) {
            if (this.config[name] && this.ns[name]) {
                this.ns[name].log(category, action, label, value, nodeId)
            }
        }
    }
}

declare const _czc: any
export namespace Youmeng {
    export function log(category: string, action?: string, label?: string, value?: string) {
        window["_czc"] = window["_czc"] || []
        _czc.push(["_trackEvent", category, action, label, value]);
    }
    export function config(option: {
        id: string
    }) {
        window["_czc"] = window["_czc"] || []
        _czc.push(["_setAccount", option.id]);
        let cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://")
        let url = cnzz_protocol + window["unescape"]("s11.cnzz.com/z_stat.php%3Fid%3D" + option.id)
        let script = document.createElement("script")
        script.src = url
        script.type = "text/javascript"

        document.head.appendChild(script)
    }
}
export namespace Miaozhen {
    export function log(category: string, action?: string, label?: string, value?: string) {
        try {
            if (!window["stm_clicki"]) {
                console.error("Please add miaozhen init before use")
                return
            }
            window["stm_clicki"]('send', 'event', category, action, label, value);
        } catch (e) {
        }
    }
    export function config(option: {
        id: string
    }) {
        let src = ` (function(a, e, f, g, b, c, d) {a.ClickiTrackerName = b; a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)}; a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0]; c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)})(window, document, 'script', ('https:' == document.location.protocol ? 'https://stm-collect' : 'http://stm-cdn') + '.cn.miaozhen.com/clicki.min.js', 'stm_clicki'); stm_clicki('create', '${option.id}', 'auto'); stm_clicki('send', 'pageview');`
        let script = document.createElement("script")
        script.innerHTML = src
        script.type = "text/javascript"
        document.head.appendChild(script)
    }
}

export namespace GA {
    // https://developers.google.com/analytics/devguides/collection/gtagjs/events
    export function log(category: string, action?: string, label?: string, value?: string) {
        try {
            if (!window["gtag"]) {
                console.error("Please add GA init before use")
                return
            }
            gtag("event", `${category}-${action}`, {
                "event_category": category,
                "event_action": action,
                "event_value": value,
                "event_label": label
            })
        } catch (e) {
            console.error(e)
        }
    }
    // https://developers.google.com/analytics/devguides/collection/gtagjs/#tracking-snippet
    export function config(option: {
        id: string
    }) {

        let script = document.createElement("script")
        script.src = `https://www.googletagmanager.com/gtag/js?id=${option.id}`
        script.type = "text/javascript"
        script.async = true
        document.head.appendChild(script)

        window["dataLayer"] = window["dataLayer"] || []
        // expose gtag to window so it can be safely used by others
        window["gtag"] = gtag

        gtag('js', new Date());
        gtag('config', option.id);
    }
    function gtag(...any) {
        window["dataLayer"].push(arguments)
    }
}
