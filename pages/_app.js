import '../styles/styles.css'
import React from 'react';
import { AuthUserContextProvider } from '../components/context/AuthUserContext';
import { ProductProvider } from '../components/context/ProductContext';

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