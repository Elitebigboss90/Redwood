export declare class InteractiveGuide {
    readonly option: {
        node: HTMLElement;
    };
    mask: HTMLDivElement;
    constructor(option: {
        node: HTMLElement;
    });
    _callback: Function;
    relativeInteractAt(position: HTMLElement | {
        x: number;
        y: number;
    }, callback: Function): void;
    interactAt(position: HTMLElement | {
        x: number;
        y: number;
    }, callback: Function): void;
    pointAt(position: {
        x: number;
        y: number;
    }): void;
    show(): void;
    debounce: number;
    hide(): void;
    done(): void;
}
