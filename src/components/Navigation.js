import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <div className="head-nav">
    <Link to='/' className="head-links">Home</Link>
    <Link to={routes.ACCOUNT} className="head-links">Account</Link>
    <Link to="/" onClick={auth.doSignOut} className="head-links">Sign Out</Link>
  </div>

const NavigationNonAuth = () =>
  <div className="head-nav">
    <Link to='/' className="head-links">Home</Link>
    <Link to={routes.SIGN_IN} className="head-links">Sign In</Link>
    <Link to={routes.SIGN_UP} className="head-links">Sign Up</Link>
  </div>

export default Navigation;