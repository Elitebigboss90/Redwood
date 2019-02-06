export declare class WechatService extends Leaf.Service {
    readonly option: {
        debug?: boolean;
        delegated?: boolean;
        mock?: boolean;
    };
    states: any;
    readonly name: string;
    readonly wechatScriptPath: string;
    readonly apiBase: string;
    constructor(option?: {
        debug?: boolean;
        delegated?: boolean;
        mock?: boolean;
    });
    events: Leaf.EventEmitter<{
        ready: any;
    }>;
    initialize(done: any): void;
    isWechat(): boolean;
    private apiFactory;
    private getJSSignature;
    share(option: {
        title: string;
        link: string;
        image: string;
        description: string;
        type?: "music" | "video" | "link";
        mediaUrl?: string;
    }, callback: Function): void;
}
export interface WechatJSSDKConfig {
    debug: boolean;
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
    jsApiList: string[];
}
