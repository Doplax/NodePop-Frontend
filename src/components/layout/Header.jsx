import { useState } from "react";
import { Button } from "@components/styledComponents/Button.tsx";
import logo from "/images/logo.webp";
import textLogo from "/images/textLogo.png";

const RenderNavLinks = () => {
  const navLinks = [
    //{ title: "Adverts", link: "/adverts", },
    { title: "Inicia sesión ", link: "/login", variant: "default" },
    { title: "Subir Producto ", link: "/adverts/new", variant: "fullFill" },
  ];

  return (
    <>
      {navLinks.map((linkItem) => (
        <li key={linkItem.link} className="mb-1">
          <a
            className="flex justify-center md:px-1 py-2 font-bold hover:text-[#ffa700]"
            href={linkItem.link}
          >
            <Button className="text-base" $variant={linkItem.variant}>
              {linkItem.title}
            </Button>
          </a>
        </li>
      ))}
    </>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-col items-center justify-between w-full px-5 md:py-2  text-lg text-gray-700 shadow-sm bg-white mb-10">
      <div className="flex flex-row w-full justify-between">
        {/* Logo */}
        <a className="flex justify-center items-center" href="/">
          <img className="h-10 m-2" src={logo} alt="logo" />
          <img className="hidden md:flex" src={textLogo} alt="text logo" />
        </a>

        {/* Search Bar */}
        <div className="flex items-center justify-center flex-1 mx-5">
          <input
            className="pl-4 p-2 flex-1 rounded-full text-sm placeholder-gray-400 border focus:border-2 focus:border-stone-700 focus:outline-none"
            type="search"
            placeholder="Buscar en Todas las categorías"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center">
          <ul className={`flex`}>
            <RenderNavLinks />
          </ul>
        </nav>

        {/* Toggle Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Movile Menu */}
      <nav
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul className={`p-2 ${isMenuOpen ? "flex flex-col" : "hidden"}`}>
          <RenderNavLinks />
        </ul>
      </nav>
    </header>
  );
};
