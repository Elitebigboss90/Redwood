export declare class Inspector {
    constructor();
    inspect(obj: any, depth?: number, stack?: any[]): string;
    getValueAbbr(obj: any): any;
    private indent(str, indent?);
    indentStep: string;
    indentCount: number;
}
