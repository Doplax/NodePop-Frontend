import { createContext, useContext, useMemo, useState } from 'react';

// Crear contextos para los valores y los manejadores
const FilterContext = createContext(null);
const FilterContextHandlers = createContext(undefined);


// Hook para usar los valores del filtro
export const useFilterValues = () => {
    const filterValues = useContext(FilterContext);
    return filterValues;
  };
  
  // Hook para usar los manejadores del filtro
  export const useFilterHandlers = () => {
    const filterHandlers = useContext(FilterContextHandlers);
    return filterHandlers;
  };
  

  export const FilterContextProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
  
    // Crear un objeto para los manejadores
    const filterHandlers = useMemo(
      () => ({
        onSearchValueChange: setSearchValue,
        onSelectedTagChange: setSelectedTag,
      }),
      [],
    );
  
    // Crear un objeto para los valores del filtro
    const filterValues = useMemo(
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
  