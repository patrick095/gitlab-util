export class LocalStorageUtil {
    constructor(private window: Window) {}

    public get<T>(key: string): T {
        const stringObject = this.window.localStorage.getItem(key);
        if (!stringObject) return null;
        return JSON.parse(atob(stringObject));
    }

    public store(key: string, data: any) {
        const parsedData = btoa(JSON.stringify(data));
        void this.window.localStorage.setItem(key, parsedData);
    }

    public remove(key: string) {
        void this.window.localStorage.removeItem(key);
    }

    public clear() {
        void this.window.localStorage.clear();
    }
}
