import React from "react";
import { useUserContext } from './context/UserContext'
import Link from 'next/link'
import { useProductContext } from "./context/ProductContext";

export default function Navbar({ loggedIn, user, logout, cart }) {
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
              <Link href="/products" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Products
              </Link>
              <Link href="/cart" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}
                      id="cartnav">
                Cart ({ Object.keys(cart).length })
              </Link>
              <Link href="/about" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                About
              </Link>
             {loggedIn ? (<Link href="/user" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                 <img src='/user.png' alt='user icon' id='usericon'/>
                 {user}
              </Link>) : <div></div>}
              {!user ? (
                <Link href="/login" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")
                      }>
                  Login
                </Link>
              ) : (
                <Link to="/products" onClick={logout} className={({ isActive }) => 
                      (isActive ? "navbar-item" : "navbar-item")}>
                  Logout
                </Link>
              )}
            </div>
          </nav>
    )
}

export async function getStaticProps() {
  const { loggedIn, user, logout } = useUserContext()
  const { cart } = useProductContext()

  return {
      props: {
          cart: cart,
          loggedIn: loggedIn,
          user: user,
          logout: logout
      },
  };
}