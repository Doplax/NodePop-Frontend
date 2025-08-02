export interface FilterValues {
  searchValue: string;
  selectedTag: string;
}

export interface FilterHandlers {
  onSearchValueChange: (value: string) => void;
  onSelectedTagChange: (tag: string) => void;
}

export interface FilterContextProviderProps {
  children: React.ReactNode;
}