import React from 'react';
import { useNavigate , useLocation  } from "react-router-dom";
import { useFilterHandlers } from '../Filters/FiltersContext'

export const SearchBar: React.FC = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation ()
    const { onSearchValueChange}   = useFilterHandlers()
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onSearchValueChange(event.target.value)
        if (pathname !== '/adverts') {navigate('/adverts')}
    }
  return (
    <div className="flex items-center justify-center flex-1 mx-5">
    <input
      id="searchBar"
        className="pl-4 p-2 flex-1 rounded-full text-sm placeholder-gray-400 border focus:border-2 focus:border-stone-700 focus:outline-none"
        type="search"
        placeholder="Buscar en Todas las categorías"
        onChange={handleSearch}
    />
  </div>
  )
}
