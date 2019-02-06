export declare class MotionManager {
    attach(): void;
    detach(): void;
    events: Leaf.EventEmitter<{
        x: number;
        y: number;
        z: number;
        shake: any;
    }>;
    private handler;
    private t;
    private direction;
    private counter;
    private reset();
    shake: {
        axis: string;
        stale: number;
        sensitivity: number;
        bounce: number;
    };
    private readonly sensitivityFactor;
    private check(motion);
    private bounce();
}
