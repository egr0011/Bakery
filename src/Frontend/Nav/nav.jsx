import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="relative flex items-center justify-between bg-red-600 text-white p-6 shadow-md">
        <div className="text-xl font-bold">Famous Bakery</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/cakes" className="hover:text-yellow-300">Cakes</Link></li>
          <li><Link to="/puffs" className="hover:text-yellow-300">Puffs</Link></li>
          <li><Link to="/sweets" className="hover:text-yellow-300">Sweets</Link></li>
          <li><Link to="/cookies" className="hover:text-yellow-300">Cookies</Link></li>
          <li><Link to="/snacks" className="hover:text-yellow-300">Snacks</Link></li>
          <li><Link to="/order" className="hover:text-yellow-300">Orders</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-yellow-300"
            aria-label="Open Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 000 1.414L7 13zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden flex flex-col space-y-1 ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-red-600 md:hidden overflow-hidden transition-all duration-500 ease-in-out z-20 ${
            isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 text-white">
            {[
              ["Home", "/"],
              ["Cakes", "/cakes"],
              ["Puffs", "/puffs"],
              ["Sweets", "/sweets"],
              ["Cookies", "/cookies"],
              ["Snacks", "/snacks"],
              ["Orders", "/order"],
            ].map(([label, path], index) => (
              <li
                key={label}
                className={`transform transition-all duration-300 delay-${index * 75} hover:text-yellow-300`}
              >
                <Link to={path} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sliding Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-xl transform transition-transform duration-300 z-40 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="font-bold text-lg">My Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-600 hover:text-red-600"
            aria-label="Close Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-600">Your cart is empty.</p>
          <div className="space-y-2">
            <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Checkout</button>
            <button className="w-full border border-gray-400 py-2 rounded hover:bg-gray-200 transition">View Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
