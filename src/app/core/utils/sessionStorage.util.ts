export class SessionStorageUtil {
    constructor(private window: Window) {}

    public get<T>(key: string): T {
        const stringObject = this.window.sessionStorage.getItem(key);
        if (!stringObject) return null;
        return JSON.parse(atob(stringObject));
    }

    public store(key: string, data: any) {
        const parsedData = btoa(JSON.stringify(data));
        void this.window.sessionStorage.setItem(key, parsedData);
    }

    public remove(key: string) {
        void this.window.sessionStorage.removeItem(key);
    }

    public clear() {
        void this.window.sessionStorage.clear();
    }
}
