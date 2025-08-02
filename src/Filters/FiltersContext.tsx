import React, { createContext, useContext, useMemo, useState } from 'react';
import { FilterValues, FilterHandlers, FilterContextProviderProps } from '@shared/index';

// Crear contextos para los valores y los manejadores
const FilterContext = createContext<FilterValues | null>(null);
const FilterContextHandlers = createContext<FilterHandlers | undefined>(undefined);

// Hook para usar los valores del filtro
export const useFilterValues = (): FilterValues => {
    const filterValues = useContext(FilterContext);
    if (!filterValues) {
      throw new Error('useFilterValues must be used within a FilterContextProvider');
    }
    return filterValues;
};
  
// Hook para usar los manejadores del filtro
export const useFilterHandlers = (): FilterHandlers => {
    const filterHandlers = useContext(FilterContextHandlers);
    if (!filterHandlers) {
      throw new Error('useFilterHandlers must be used within a FilterContextProvider');
    }
    return filterHandlers;
};

export const FilterContextProvider: React.FC<FilterContextProviderProps> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string>('');
  
    // Crear un objeto para los manejadores
    const filterHandlers = useMemo<FilterHandlers>(
      () => ({
        onSearchValueChange: setSearchValue,
        onSelectedTagChange: setSelectedTag,
      }),
      [],
    );
  
    // Crear un objeto para los valores del filtro
    const filterValues = useMemo<FilterValues>(
      () => ({
        searchValue,
        selectedTag,
      }),
      [searchValue, selectedTag],
    );
  
    return (
      <FilterContextHandlers.Provider value={filterHandlers}>
        <FilterContext.Provider value={filterValues}>
          {children}
        </FilterContext.Provider>
      </FilterContextHandlers.Provider>
    );
};