interface Storage {
    get<T = unknown>(key: string): T | null;
    set<T = unknown>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
}

export const storage: Storage = {
    get<T = unknown>(key: string): T | null {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value) as T;
        } catch {
            return null;
        }
    },

    set<T = unknown>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    }
};
