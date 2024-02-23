import { Navbar, Button, TextInput, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from "react-icons/fa";
import { FaComments } from "react-icons/fa";

export default function Header() {
  const location = useLocation();

  return (
    <Navbar className="border-b-2">
      <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          DeliverEase
        </span>
      </Link>
      {/* Rest of the Navbar content */}
      <div className="flex md:order-2">
        <NavbarToggle />
        {/* Add more Navbar items here */}
        <Link to="/dashboard" className={`py-2 px-4 rounded hover:bg-gray-100 ${location.pathname === '/dashboard' ? 'bg-gray-200' : ''}`}>
          Dashboard
        </Link>
        <Link to="/about" className={`py-2 px-4 rounded hover:bg-gray-100 ${location.pathname === '/about' ? 'bg-gray-200' : ''}`}>
          About
        </Link>
        <Link to="/projects" className={`py-2 px-4 rounded hover:bg-gray-100 ${location.pathname === '/projects' ? 'bg-gray-200' : ''}`}>
          Projects
        </Link>
        <Button color="gray" size="xs" gradientDuoTone="purpleToBlue">
          <AiOutlineSearch />
        </Button>
        <Button color="gray" size="xs" gradientDuoTone="purpleToPink">
          <FaMoon />
        </Button>
      </div>
      {/* Flowbite mobile menu toggle */}
      <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
        {/* When using Flowbite Navbar, include your navigation items here */}
      </div>
    </Navbar>
  );
}
