export declare class PlatformInformationProvider {
    deviceDetail: PlatformInformationProvider.DeviceDetail;
    private isMobileCheck;
    private _isMobile;
    private device;
    constructor();
    isWindows(): boolean;
    isOSX(): boolean;
    isVirtualKeyboard(): any;
    hasKeyboard(): boolean;
    isTouch(): any;
    isMobile(): any;
    isNative(): boolean;
    isLinux(): boolean;
    isMac(): boolean;
    isIOS(): any;
    isSafari(): boolean;
    isAndroid(): any;
    isVisible(): boolean;
    isEmbeded(): boolean;
    getDeviceDescription(): string;
}
export declare namespace PlatformInformationProvider {
    interface DeviceDetail {
        os: {
            name: string;
        };
        browser: {
            name: string;
        };
    }
    class Device {
        constructor();
        options: any[];
        header: any[];
        dataos: {
            name: string;
            value: string;
            version: string;
        }[];
        databrowser: {
            name: string;
            value: string;
            version: string;
        }[];
        init(): DeviceDetail;
        matchItem(string: any, data: any): {
            name: any;
            version: number;
        };
    }
}
export declare const Platform: PlatformInformationProvider;
