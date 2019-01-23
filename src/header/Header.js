import React from 'react'
import { Link } from 'react-router-dom'
import logo from './LogoMakr.png'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className='input-list' to="/change-password">Change Password</Link>
    <Link className='input-list' to="/sign-out">Sign Out</Link>
    <Link className='input-list' to="/trips">My Trips</Link>
    <Link className='input-list' to="/yelpsearch">Search Food Destinations</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className='input-list' to="/sign-up">Sign Up</Link>
    <Link className='input-list' to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link className='input-list' to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <img className="icon-img" src={logo} alt="icon" width="90" height="90"/>
    <h1>Will Travel For Food</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
