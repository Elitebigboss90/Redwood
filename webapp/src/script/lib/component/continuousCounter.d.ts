export declare class ContinuousCounter {
    constructor(option?: {
        count?: number;
        during?: number;
    });
    readonly count: number;
    readonly during: number;
    events: Leaf.EventEmitter<{
        trigger: any;
    }>;
    trigger(): void;
    actions: {
        time: Date;
    }[];
    private timer;
}
