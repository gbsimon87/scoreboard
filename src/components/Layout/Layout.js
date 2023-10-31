import React from 'react'
import AuthStatus from '../../auth/AuthStatus';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/scoreboard">Scoreboard</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Layout;
