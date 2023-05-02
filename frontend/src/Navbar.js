import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({onNavbarClick}) {
  return (
    <nav className="Navbar">
      <ul className="Navbar-items">
        <li className="Navbar-item">
          <Link onClick={onNavbarClick} to="/">Home</Link>
          </li>
        <li className="Navbar-item">
          <Link onClick={onNavbarClick} to="/max">Opeartions</Link>
        </li>
        <li className="Navbar-item">
          <Link onClick={onNavbarClick} to="/favorites">Favorites</Link>
          </li>
      </ul>
    </nav>
  );
}

