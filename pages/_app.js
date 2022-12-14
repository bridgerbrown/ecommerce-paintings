import './App.css';
import React, { Component } from 'react';
import { AppWrapper } from '../components/context/UserContext';

export default function App({ Component, pageProps}) {

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
    )
}
