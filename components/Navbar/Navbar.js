import React, { useEffect, useState }  from "react";
import Link from 'next/link'
import { useProductContext } from "../context/ProductContext";
import styles from '../Navbar/Navbar.module.css'
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthUserContext";

export default function Navbar() {
  const { numberOfItems } = useProductContext()
  const router = useRouter()
  const { user, logOut } = useAuth()
  
  const handleLogOut = async () => {
    try {
      await logOut()
      router.push("login")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
  <nav
    className={styles.navbar}
    role='navigation'
    aria-label='main navigation'
  >
    <div className={styles.navbarbrand}>
      <Link href="/">
        <b>eCommerce Paintings</b>
      </Link>
    </div>
    
    <div className={styles.navbarmenu}>
      
      <Link href="/" 
        className={
          router.pathname == "/" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
        Products
      </Link>

      <Link href="/cart" className={
          router.pathname == "/cart" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}
            id="cartnav">
        Cart ({ numberOfItems })
      </Link>

      <Link href="/about" className={
          router.pathname == "/about" ? 
            `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
        About
      </Link>
    { !user.uid ? (
      <Link href="/signup" className={
        router.pathname == "/signup" ? 
          `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
            {/* {username === "User" ? "Login" : username} */}
            Login
      </Link>
      ) : (
        <>
          <Link href="/profile" className={
            router.pathname == "/profile" ? 
              `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
            Profile
          </Link>
          <Link href="/login" className={styles.navbaritem}>
            <a onClick={handleLogOut}>
              Logout
            </a>
          </Link>
        </>

      )
    }
    </div>
  </nav>
  )
}