import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, Home, Phone, Info, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Utensils className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-600">FoodShare</span>
          </div>
          
          <div className="flex space-x-8">
            <NavLink to="/" icon={<Home />} text="Home" active={location.pathname === '/'} />
            <NavLink to="/donate" icon={<Utensils />} text="Donate" active={location.pathname === '/donate'} />
            <NavLink to="/donaters" icon={<Users />} text="Donaters" active={location.pathname === '/donaters'} />
            <NavLink to="/about" icon={<Info />} text="About" active={location.pathname === '/about'} />
            <NavLink to="/contact" icon={<Phone />} text="Contact" active={location.pathname === '/contact'} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active
        ? 'text-green-600 bg-green-50'
        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
    }`}
  >
    {React.cloneElement(icon, { className: 'h-4 w-4 mr-2' })}
    {text}
  </Link>
);

export default Navbar;