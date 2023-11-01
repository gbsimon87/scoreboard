import React from 'react'
import { Outlet } from 'react-router-dom';
import NavTop from '../Nav/NavTop';

function Layout() {
  return (
    <div>
      <NavTop />
      <Outlet />
    </div>
  );
}

export default Layout;
