import React from "react";
import Link from 'next/link'
import { useProductContext } from "./context/ProductContext";

export default function Navbar({ numberOfItems }) {

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
              <Link href="/" className={({ isActive }) => 
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

