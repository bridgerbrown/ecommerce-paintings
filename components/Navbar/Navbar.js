import React from "react";
import Link from 'next/link'
import { useProductContext } from "../context/ProductContext";
import styles from '../Navbar/Navbar.module.css'
import { useRouter } from "next/router"

export default function Navbar() {
  const { numberOfItems } = useProductContext()
  const router = useRouter()

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
