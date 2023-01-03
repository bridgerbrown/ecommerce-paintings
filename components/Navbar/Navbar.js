import React, { useEffect, useState }  from "react";
import Link from 'next/link'
import { useProductContext } from "../context/ProductContext";
import styles from '../Navbar/Navbar.module.css'
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthUserContext";
import Image from "next/image";

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
    { !user.email ? (
      <Link href="/signup" className={
        router.pathname == "/login" ? 
          `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
            Login
      </Link>
      ) : (
        <>
          <Link href="/profile" className={
            router.pathname == "/profile" ? 
              `${styles.activenav} ${styles.navbaritem}` : `${styles.navbaritem}`}>
            <Image
              src="/user.png"
              width={25}
              height={25}
              id="usericon"
            />
            User
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