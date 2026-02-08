import React, { useContext, useState } from 'react';
import logo from "../assets/logo.png";
import { CiShoppingCart, CiUser, CiLight } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector, useDispatch } from 'react-redux';
import { Theme } from '../Contexts/ThemeContext';
import { MdDarkMode, MdMenu, MdClose } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { removeUser } from "../Utils/Store/userSlice";
import { emptyItem } from '../utils/Store/cartSlice';

const Header = () => {
  const { theme, handleTheme } = useContext(Theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((store) =>
    store.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      dispatch(emptyItem());
      navigate("/");
    });
  };

  return (
    <div className={`w-full border-b p-3 sm:p-4 md:px-8 sticky top-0 z-50
      ${theme === "dark"
        ? "bg-gradient-to-r from-gray-950 via-black to-gray-900 text-gray-100 border-gray-800 shadow-xl"
        : "bg-white shadow-md"}`}>

      {/* Top Row */}
      <div className="flex items-center justify-between">

        <img src={logo} alt="Logo"
          className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover' />

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl cursor-pointer hover:scale-110 transition"
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <NavItems {...{ theme, handleTheme, onlineStatus, cart, user, handleLogout }} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[500px] mt-3" : "max-h-0"}`}>
        <div className={`${theme === "dark"
          ? "bg-gray-900/95 backdrop-blur-lg border border-gray-700"
          : "bg-gray-100"} rounded-xl border shadow-lg`}>
          <NavItems mobile {...{ theme, handleTheme, onlineStatus, cart, user, handleLogout }} />
        </div>
      </div>
    </div>
  );
};

const NavItems = ({ theme, handleTheme, onlineStatus, cart, user, handleLogout, mobile }) => {

  const layout = mobile
    ? "flex flex-col items-center gap-4 p-5 text-lg"
    : "flex items-center gap-6 px-4";

  return (
    <ul className={`${layout} ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>

      {/* Theme Toggle */}
      {theme === "light" ? (
        <button onClick={handleTheme}><CiLight size={24} /></button>
      ) : (
        <button onClick={handleTheme}><MdDarkMode size={24} /></button>
      )}

      <div className="font-medium">{onlineStatus ? "✅ Online" : "🔴 Offline"}</div>

      <NavLink to="/browse"><li className="hover:text-green-500">Home</li></NavLink>
      <NavLink to="/browse/grocery"><li className="hover:text-green-500">Grocery</li></NavLink>
      <NavLink to="/browse/about"><li className="hover:text-green-500">About</li></NavLink>

      <NavLink to="/browse/cart">
        <button className="flex items-center gap-1 hover:text-green-500">
          <CiShoppingCart size={22} /> Cart({cart})
        </button>
      </NavLink>

      {/* Auth Button */}
      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 hover:text-red-400"
        >
          👋 {user.displayName}
        </button>
      ) : (
        <NavLink to="/">
          <button className="flex items-center gap-1 hover:text-green-500">
            <CiUser size={22} /> Sign In
          </button>
        </NavLink>
      )}
    </ul>
  );
};

export default Header;
