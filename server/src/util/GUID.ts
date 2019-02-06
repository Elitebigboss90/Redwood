class Guid {
    constructor() { }
    public generateGUID(): string {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    }
    private S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
}

export const guid = new Guid()