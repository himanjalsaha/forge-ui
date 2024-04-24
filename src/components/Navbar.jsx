import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Fill, RiCodeBoxFill, RiMenu2Fill } from 'react-icons/ri';
import TemporaryDrawer from './Sidenav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-neutral-800 py-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex flex-row items-center'>
        <img src="https://i.ibb.co/JrC4H0D/image-removebg-preview-2.png" alt=""  className='w-12 h-12'/>
        <Link to="/" className="text-white text-2xl font-bold">UI Forge</Link>
        </div>
        

        {/* Mobile Menu Icon */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <RiMenu2Fill className="text-3xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`lg:flex items-center lg:space-x-4 lg:mt-0 ${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'} `}>
          <li>
            <Link to="/" className="text-white hover:text-gray-300 flex items-center">
              <RiHome2Fill className="mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/ide" className="text-white hover:text-gray-300 flex items-center">
              <RiCodeBoxFill className="mr-1" /> IDE
            </Link>
          </li>
          {/* Add more navigation links as needed */}
          <TemporaryDrawer/>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
