import React, { useEffect, createContext, useState, useContext } from 'react'
import { getAuth, getIdToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseConfig } from "../firebase/firebase.config"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("User")

  const loginUsername = (usernameEntry) => {
    setUsername(usernameEntry)
  }

  return (
      <UserContext.Provider
      value={{
        setLoggedIn: setLoggedIn,
        loggedIn: loggedIn,
        loginUsername: loginUsername,
        username: username,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}