import { StorageInterface, StorageKey } from '@shared/interfaces/Storage';

export const storage: StorageInterface = {
    get<T = any>(key: StorageKey): T | null {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value) as T;
        } catch (error) {
            console.error('Error parsing storage value:', error);
            return null;
        }
    },

    set<T = any>(key: StorageKey, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting storage value:', error);
        }
    },

    remove(key: StorageKey): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    }
};