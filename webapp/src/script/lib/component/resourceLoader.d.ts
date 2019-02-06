export declare namespace Resource {
    type TypeMap = {
        image;
        video;
        audio;
    };
    type Type = keyof TypeMap;
}
export declare type ResourceElement = HTMLImageElement | HTMLVideoElement | HTMLAudioElement;
export declare type Resource = {
    name: string;
    uri: string;
    type: "image" | "video" | "audio";
    progress?: {
        loaded: number;
        total: number;
    };
    element?: ResourceElement;
};
export declare class ResourceLoader {
    constructor(option?: {
        baseUrl?: string;
    });
    private sessions;
    baseUrl: string;
    createSession(option?: {
        baseUrl?: string;
    }): ResourceLoaderSession;
    get<T extends ResourceElement>(name: string): T;
    revokeResources(): void;
}
export interface ResourceLoaderSession {
    readonly loader: ResourceLoader;
    events: Leaf.EventEmitter<{
        start;
        progress: {
            percentage: string;
            done: number;
            total: number;
        };
        finish;
        error: Error;
    }>;
    userIsInteracting(): any;
    revokeResources(): any;
    load(callback: (err?: Error) => void): any;
    add(name: string, uri: string, type?: "image" | "video" | "audio"): this;
    getResourceElement<T extends ResourceElement>(name: string): T;
}
export declare class XHRResourceLoaderSession implements ResourceLoaderSession {
    readonly loader: ResourceLoader;
    events: Leaf.EventEmitter<{
        start: any;
        progress: {
            percentage: string;
            done: number;
            total: number;
        };
        finish: any;
        error: Error;
    }>;
    baseUrl: string;
    finished: boolean;
    preloaded: boolean;
    private resources;
    constructor(option: {
        baseUrl: string;
        loader: ResourceLoader;
    });
    getResourceElement<T extends ResourceElement>(name: string): T;
    revokeResources(): void;
    userIsInteracting(): void;
    add(name: string, uri: string, type?: Resource.Type): this;
    load(callback: (err?: Error) => void): void;
    getProgressPrecentage(): string;
}
export declare class ElementResourceLoaderSession {
}
