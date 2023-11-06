import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const NavTop = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const { state, signout } = useGlobalContext();

  const handleSignOut = (event) => {
    event.preventDefault();
    signout(() => navigate("/"));
  }

  return (
    <div className='nav nav--top'>
      <div className='nav--top__left'>
        <Link to="/">PSN</Link>
      </div>
      <div className='nav--top__right'>
        {state?.user && location.pathname === "/" && (
          <Link onClick={(event) => handleSignOut(event)}>Log out</Link>
        )}
        {(!state?.user || location.pathname === "/") && (
          <button className="button button--create-game" onClick={() => navigate("/new-game")}>New Game</button>
        )}
      </div>
    </div>
  )
}

export default NavTop;
