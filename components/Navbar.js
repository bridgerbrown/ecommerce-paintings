import React from "react";
import { useUserContext } from './context/UserContext'
import Link from 'next/Link'
import { useProductContext } from "./context/ProductContext";

export default function Navbar() {
  const { loggedIn, user, logout } = useUserContext()
  const { cart } = useProductContext()

    return (
        <nav
          className='navbar container'
          role='navigation'
          aria-label='main navigation'
        >
        <div className='navbar-brand'>
          <b>eCommerce Paintings</b>
          <label
            role='button'
            class='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={e => {
              e.preventDefault()
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
            <div className="navbar-menu">
              <Link to="/products" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Products
              </Link>
              <Link to="/cart" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}
                      id="cartnav">
                Cart ({ Object.keys(cart).length })
              </Link>
              <Link to="/about" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                About
              </Link>
             {loggedIn ? (<Link to="/user" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                 <img src='../assets/user.png' alt='user icon' id='usericon'/>
                 {user}
              </Link>) : <div></div>}
              {!user ? (
                <Link to="/login" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")
                      }>
                  Login
                </Link>
              ) : (
                <Link to="/" onClick={logout} className={({ isActive }) => 
                      (isActive ? "navbar-item" : "navbar-item")}>
                  Logout
                </Link>
              )}
            </div>
          </nav>
    )
}