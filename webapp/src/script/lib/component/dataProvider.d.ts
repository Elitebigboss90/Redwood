export declare type Callback<TData = any> = (err?: Error, data?: TData) => void;
export declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export declare class DataProvider<TVM, TData, TRequestOption> {
    widget: Leaf.Widget<any, TVM>;
    fetcher: (option: TRequestOption, callback: Callback<TData>) => void;
    constructor(option: {
        widget: Leaf.Widget<any, TVM>;
        fetcher: (option: TRequestOption, callback: Callback<TData>) => void;
    });
    events: Leaf.EventEmitter<{
        startLoading: any;
        endLoading: any;
        update: any;
        error: Error;
    }>;
    data: TData;
    refresh(option?: Partial<TRequestOption>): this;
    map(dataMap: {
        [K in keyof TVM]: keyof TData | ((TData) => any);
    }): this;
    fill(data: TData): void;
    private dataMap;
}
export declare type Constructor<T> = {
    new (...args: any[]): T;
};
export declare class ListDataProvider<TData, TItem extends Leaf.ListItem, TRequestOption, TVM = TItem["VM"]> {
    list: Leaf.List<TItem>;
    fetcher: (option: TRequestOption, callback: Callback<TData[]>) => void;
    Item: Constructor<TItem>;
    constructor(option: {
        list: Leaf.List<TItem>;
        fetcher: (option: TRequestOption, callback: Callback<TData[]>) => void;
        Item: Constructor<TItem>;
    });
    events: Leaf.EventEmitter<{
        startLoading: any;
        endLoading: any;
        update: any;
        error: Error;
    }>;
    refresh(option?: Partial<TRequestOption>): void;
    transform(transformer: (data: TData) => any): void;
    private transformer;
    map(dataMap: {
        [K in keyof TVM]: keyof TData | ((TData) => any);
    }): void;
    datas: TData[];
    fill(datas: TData[]): void;
    private dataMap;
}
export interface DataProviderLike {
    events: Leaf.EventEmitter<{
        update;
        error;
        startLoading;
        endLoading;
    }>;
    refresh(): any;
}
export declare class DataBehavior {
    constructor(...providers: (DataProvider<any, any, any> | ListDataProvider<any, any, any> | any)[]);
    providers: DataProviderLike[];
    attach(rp: DataProviderLike): void;
    refresh(): void;
    render(todo?: Function): this;
    loading(handler: (percentage: number) => void): this;
    error(todo: (err) => void): any;
    error(err: Error): any;
    private renderHandler;
    private loadingHandler;
    private errorHandler;
    private updateDebounceTimer;
    private update();
    private panic(error);
    private loadingCounter;
    private addLoading();
    private removeLoading();
    loadingDebounce: number;
    private loadingDebounceTimer;
    private withLoading();
}
