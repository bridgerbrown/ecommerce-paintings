import React, { useEffect, createContext, useState, useContext } from 'react'
import { getAuth, getIdToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseConfig } from "../firebase/firebase.config"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState("")

  const login = async (username) => {
    setUser(username)
  }
  
  const logout = (e) => {
    e.preventDefault()
    setUser(null)
  }

  return (
      <UserContext.Provider
      value={{
        login: login,
        logout: logout,
        user: user, 
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}