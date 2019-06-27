import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = props => {
  const { isLoggedIn, openModal, user } = props;
  return (
    <div id="nav-bar">
      {isLoggedIn && (
        <div>
          <span>{user.email}</span>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <span>{`$${(Number(user.balance) / 100).toFixed(2)}`}</span>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Link to="/portfolio">Portfolio</Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Link to="/transactions/">Transactions</Link>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <Link to="/signup/">Sign Up</Link>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <Link to="/login/">Log In</Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Link to="/" onClick={openModal}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};
