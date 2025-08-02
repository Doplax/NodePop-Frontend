export type StorageKey = string;
export type StorageValue = unknown;

export interface StorageInterface {
  get<T = unknown>(key: StorageKey): T | null;
  set<T = unknown>(key: StorageKey, value: T): void;
  remove(key: StorageKey): void;
  clear(): void;
}