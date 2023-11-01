import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthStatus';

function NavTop() {
  const location = useLocation();
  let navigate = useNavigate();

  let auth = useAuth();

  const handleSignOut = (event) => {
    event.preventDefault();
    auth.signout(() => navigate("/"))
  }

  return (
    <div className='nav nav--top'>
      <div className='nav--top__left'>
        <Link to="/">PSN</Link>
      </div>
      <div className='nav--top__right'>
        {location.pathname === "/login" ? null : auth?.user ? null : <Link to="/login">Login</Link>}
        {auth?.user ? <Link onClick={(event) => handleSignOut(event)}>Log out</Link> : null}
        {auth?.user ? <Link to="/scoreboard">Scoreboard</Link> : null}
      </div>
    </div>
  )
}

export default NavTop;
