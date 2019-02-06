export declare class SceneContext {
    container: HTMLElement;
    index: number;
    constructor(container?: HTMLElement);
    private current;
    load(scene: SceneBehavior): boolean;
}
export declare class SceneBehavior {
    readonly widget: {
        node: HTMLElement;
    };
    private context;
    static globalContext: SceneContext;
    zIndex: number;
    isShow: boolean;
    constructor(widget: {
        node: HTMLElement;
    }, context?: SceneContext);
    show(): void;
    events: Leaf.EventEmitter<{
        load: any;
        unload: any;
        show: any;
        hide: any;
    }>;
}
