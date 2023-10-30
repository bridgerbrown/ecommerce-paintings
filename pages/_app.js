import '../styles/styles.css'
import React from 'react';
import { AuthUserContextProvider } from '../data/context/AuthUserContext';
import { ProductProvider } from '../data/context/ProductContext';

export default function App({ Component, pageProps }) {
    return (  
      <div>
        <AuthUserContextProvider>
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
        </AuthUserContextProvider>
      </div>
      )
  }
