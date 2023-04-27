import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({onNavbarClick}) {
  return (
    <nav className="Navbar">
      <ul className="Navbar-items">
        <li className="Navbar-item">
          <Link onClick={onNavbarClick} to="/">Home</Link>
          </li>
        <li className="Navbar-item">
          <Link onClick={onNavbarClick} to="/max">Max</Link>
        </li>
        <li className="Navbar-item"><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;