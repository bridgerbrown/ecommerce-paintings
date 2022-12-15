import React from "react";
import { useUserContext } from './context/UserContext'
import Link from 'next/link'
import { useProductContext } from "./context/ProductContext";

export default function Navbar({ loggedIn, user, logout, numberOfItems }) {

    return (
        <nav
          className='navbar container'
          role='navigation'
          aria-label='main navigation'
        >
        <div className='navbar-brand'>
          <b>eCommerce Paintings</b>
        </div>
            <div className="navbar-menu">
              <Link href="/products" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Products
              </Link>
              <Link href="/cart" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}
                      id="cartnav">
                Cart ({ numberOfItems })
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
  const { numberOfItems } = useProductContext()

  return {
      props: {
          numberOfItems: numberOfItems,
      },
      revalidate: 10,
  };
}

export async function getServerSideProps() {
  const { loggedIn, user, logout } = useUserContext()

  return {
    props: { 
      loggedIn: loggedIn, 
      user: user, 
      logout: logout
     },
  }
}