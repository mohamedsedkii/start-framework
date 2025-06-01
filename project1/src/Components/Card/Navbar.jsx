import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed-top navbar-expand-lg myNav ${isScrolled ? 'shrink' : ''}`}>
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarSupportedContent">
          <div>
            <ul className="navbar-nav fs-2 fw-bold">
              <li className="nav-item">
                <Link className="active" aria-current="page" to="/start framework">START FRAMEWORK</Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item fw-bold">
              <NavLink className={({ isActive }) => isActive ? "nav-link customActive" : "nav-link"} to="/about">ABOUT</NavLink>
            </li>
            <li className="nav-item fw-bold">
              <NavLink className={({ isActive }) => isActive ? "nav-link customActive" : "nav-link"} to="/profolio">PROFOLIO</NavLink>
            </li>
            <li className="nav-item fw-bold">
              <NavLink className={({ isActive }) => isActive ? "nav-link customActive" : "nav-link"} to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
