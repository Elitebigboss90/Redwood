export declare class ListFocusBehavior<TItem extends Leaf.Widget & {
    onFocus?: Function;
    onBlur?: Function;
    onRefocus?: Function;
    onAttach?: Function;
    onDetach?: Function;
}, TFocusBy = TItem> {
    constructor(option: {
        list: Leaf.List<TItem> | (Leaf.List<TItem>[]);
        focus?: (item: TItem) => void;
        blur?: (item: TItem) => void;
        refocus?: (item: TItem) => void;
        match?: (item: TItem, target: TFocusBy) => boolean;
        attach?: (item: TItem) => void;
        detach?: (item: TItem) => void;
    });
    events: Leaf.EventEmitter<{
        focus: TItem;
        blur: TItem;
        refocus: TItem;
        missing: TItem | TFocusBy;
    }>;
    private focus;
    private blur;
    private refocus;
    private attach;
    private detach;
    private match;
    private lists;
    private isFocusing;
    private focusingCondition;
    focusAt(target?: TFocusBy | TItem): boolean;
    private recheckTimer;
    private refocusCheck();
    current: TItem;
    solve(todo: (events: this["events"]) => void): this;
}
