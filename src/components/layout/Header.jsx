import { useState } from "react";


const RenderNavLinks = () => {
  const navLinks = [
    { title: "Home", link: "/home" },
    { title: "Login", link: "/login" },
    { title: "About", link: "/About" },
  ];

  return (
    <>
      {navLinks.map((linkItem) => (
        <li key={linkItem.link} className="mb-1">
          <a className="flex justify-center md:p-4 py-2 font-bold hover:text-[#ffa700]" href={linkItem.link}>
            {linkItem.title}
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
    <header className="flex flex-col items-center justify-between w-full py-4 md:py-2 px-4 text-lg text-gray-700 shadow-md bg-white mb-10">
      <div className="flex flex-row w-full justify-between">
        {/* Logo */}
        <a
          className="flex justify-center items-center "
          href="https://doplax.dev/"
        >
          <h1>Wallapop</h1>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center">
          <ul className={`p-2 flex`}>
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
      <nav className={`transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
        <ul className={`p-2 ${isMenuOpen ? "flex flex-col" : "hidden"}`}>
          <RenderNavLinks />
        </ul>
      </nav>
    </header>
  );
};
