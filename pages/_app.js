import '../styles/styles.css'
import React from 'react';
import { AuthUserProvider } from '../components/context/AuthUserContext';
import { ProductProvider } from '../components/context/ProductContext';

export default function App({ 
    Component, 
    pageProps: {
        session,
        ...pageProps
    } }) {
    return (  
      <div>
        <AuthUserProvider>
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
        </AuthUserProvider>
      </div>
      )
  }