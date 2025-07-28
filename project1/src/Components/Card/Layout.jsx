import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ theme, toggletheme }) {
  return (
    <div className={theme}>
      <Navbar theme={theme} toggletheme={toggletheme}/>
      <Outlet/>
    </div>
  );
}
