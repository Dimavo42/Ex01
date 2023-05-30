import React from 'react';
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='bg-slate-300 px-8 py-4 text-lg text-stone-500 shadow-md'>
      <nav className='flex gap-4'>

        <NavLink
          className={({ isActive }) => (isActive && "text-stone-900 ") + "cursor-pointer hover:underline hover:text-stone-900"}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive && "text-stone-900 ") + "cursor-pointer hover:underline hover:text-stone-900"}
          to="/operations"
        >
          Operations
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive && "text-stone-900 ") + "cursor-pointer hover:underline hover:text-stone-900"}
          to="/favorites"
        >
          Favorites
        </NavLink>

      </nav>
    </div>
  );
};

export default Navbar;