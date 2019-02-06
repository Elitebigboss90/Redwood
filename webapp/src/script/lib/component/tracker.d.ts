export declare class Tracker {
    config: {
        youmeng?: {
            id: string;
        };
        baidu?: {
            id: string;
        };
        miaozhen?: {
            id: string;
        };
        ga?: {
            id: string;
        };
    };
    ns: {
        [K in keyof this["config"]]?: any;
    };
    constructor(config: {
        youmeng?: {
            id: string;
        };
        baidu?: {
            id: string;
        };
        miaozhen?: {
            id: string;
        };
        ga?: {
            id: string;
        };
    });
    log(category: string, action?: string, label?: string, value?: string, nodeId?: string): void;
}
export declare namespace Youmeng {
    function log(category: string, action?: string, label?: string, value?: string): void;
    function config(option: {
        id: string;
    }): void;
}
export declare namespace Miaozhen {
    function log(category: string, action?: string, label?: string, value?: string): void;
    function config(option: {
        id: string;
    }): void;
}
export declare namespace GA {
    function log(category: string, action?: string, label?: string, value?: string): void;
    function config(option: {
        id: string;
    }): void;
}
