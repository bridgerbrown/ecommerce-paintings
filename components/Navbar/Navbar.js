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
      <Image
        src={"/palette.jpg"}
        width={40}
        height={40}
        alt="paint palette icon"
      />
      <Link href="/">
        <b>eCommerce Paintings</b>
      </Link>
    </div>
    
    <div className={styles.navbarmenu}>
      
      <Link href="/" 
        className={
          router.pathname == "/" ? 
            `${styles.activenav} ${styles.startnavbaritem} ${styles.navbaritem}` : `${styles.startnavbaritem} ${styles.navbaritem} `}>
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
            <Image
              src="/user.png"
              width={25}
              height={25}
              className="usericon"
            />
          <Link href="/user" className={
            router.pathname == "/user" ? 
              `${styles.activenav} ${styles.navbaritemuser}` : `${styles.navbaritemuser}`}>
            User
          </Link>
          <Link href="/login" className={styles.navbaritem}>
            <a onClick={handleLogOut} className="logoutnav">
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
