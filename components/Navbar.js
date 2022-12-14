import React from "react";
import { useUserContext } from './context/UserContext'

export default function Navbar() {
  const { loggedIn, user } = useUserContext()

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
              this.setState({ showMenu: !this.state.showMenu })
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
            <div className="navbar-menu">
              <NavLink to="/products" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Products
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}
                      id="cartnav">
                Cart ({ Object.keys(this.state.cart).length })
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                About
              </NavLink>
             {loggedIn ? (<NavLink to="/user" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                 <img src='../assets/user.png' alt='user icon' id='usericon'/>
                 {user}
              </NavLink>) : <div></div>}
              {!user ? (
                <NavLink to="/login" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")
                      }>
                  Login
                </NavLink>
              ) : (
                <NavLink to="/" onClick={this.logout} className={({ isActive }) => 
                      (isActive ? "navbar-item" : "navbar-item")}>
                  Logout
                </NavLink>
              )}
            </div>
          </nav>
    )
}