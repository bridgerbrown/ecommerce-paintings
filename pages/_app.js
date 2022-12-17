import '../styles/styles.css'
import React from 'react';
import { UserProvider } from '../components/context/UserContext';
import { ProductProvider } from '../components/context/ProductContext';

export default function App({ Component, pageProps }) {
    return (  
      <div>
        <ProductProvider>
            <Component {...pageProps} />
        </ProductProvider>
      </div>
      )
  }