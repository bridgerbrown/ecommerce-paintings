import React, { useEffect, createContext, useState, useContext } from 'react'
import { getAuth, getIdToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseConfig } from "../firebase/firebase.config"
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
  }
)

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
      <authUserContext.Provider value={auth}>
      {children}
    </authUserContext.Provider>
  )
}

export function useAuth() {
  return useContext(authUserContext)
}S