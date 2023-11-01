import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

function NavTop() {
  const location = useLocation();
  let navigate = useNavigate();

  const { state, signout } = useGlobalContext();

  const handleSignOut = (event) => {
    event.preventDefault();
    signout(() => navigate("/"))
  }

  return (
    <div className='nav nav--top'>
      <div className='nav--top__left'>
        <Link to="/">PSN</Link>
      </div>
      <div className='nav--top__right'>
        {location.pathname === "/login" ? null : state?.user ? null : <Link to="/login">Login</Link>}
        {state?.user ? <Link onClick={(event) => handleSignOut(event)}>Log out</Link> : null}
        {state?.user ? <Link to="/scoreboard">Scoreboard</Link> : null}
      </div>
    </div>
  )
}

export default NavTop;
