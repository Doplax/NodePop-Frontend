export type StorageKey = string;
export type StorageValue = any;

export interface StorageInterface {
  get<T = any>(key: StorageKey): T | null;
  set<T = any>(key: StorageKey, value: T): void;
  remove(key: StorageKey): void;
  clear(): void;
}