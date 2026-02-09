import { useState } from "react";
import { Button } from "@components/styledComponents/Button.tsx";
import { HambButton } from '@components/svg/HambButton';
import logo from "/images/logo.webp";
import textLogo from "/images/textLogo.png";
import { Link } from "react-router-dom";
import { AuthButton } from '@auth/AuthButton';
import { SearchBar } from '../../Filters/SearchBar';

interface RenderNavLinksProps {
  toggleMenu: (value: boolean) => void;
}

const RenderNavLinks = ({ toggleMenu }: RenderNavLinksProps) => {
  return (
    <>
      <li className="mb-1 flex justify-center md:px-1 py-2">
        <AuthButton toggleMenu={toggleMenu} />
      </li>
      <li className="mb-1 flex justify-center md:px-1 py-2">
        <Link to='/adverts/new'>
          <Button onClick={() => { toggleMenu(false) }} className="text-base" $variant='fullFill'>
            Subir Producto
          </Button>
        </Link>
      </li>
    </>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (value: boolean) => {
    setIsMenuOpen(value);
  };

  return (
    <header className="flex flex-col items-center justify-between w-full px-5 md:py-2  text-lg text-gray-700 shadow-sm bg-white mb-1">
      <div className="flex flex-row w-full justify-between">
        {/* Logo */}
        <Link className="flex justify-center items-center" to="/">
          <img className="h-10 m-2" src={logo} alt="logo" />
          <img className="hidden md:flex" src={textLogo} alt="text logo" />
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center">
          <ul className={`flex`}>
            <RenderNavLinks toggleMenu={toggleMenu} />
          </ul>
        </nav>

        {/* Toggle Button */}
        <button className="md:hidden" onClick={() => { toggleMenu(!isMenuOpen) }}>
          <HambButton />
        </button>
      </div>

      {/* Movile Menu */}
      <nav
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul className={`p-2 ${isMenuOpen ? "flex flex-col" : "hidden"}`}>
          <RenderNavLinks toggleMenu={toggleMenu} />
        </ul>
      </nav>
    </header>
  );
};
