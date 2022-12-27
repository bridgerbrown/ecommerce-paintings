import '../styles/styles.css'
import React from 'react';
import { SessionProvider } from "next-auth/react"
import { ProductProvider } from '../components/context/ProductContext';

export default function App({ 
    Component, 
    pageProps: {
        session,
        ...pageProps
    } }) {
    return (  
      <div>
        <SessionProvider session={session}>
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
        </SessionProvider>
      </div>
      )
  }