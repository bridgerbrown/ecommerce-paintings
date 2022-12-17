import React, { useEffect, createContext, useState, useContext } from 'react'
import { getAuth, getIdToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseConfig } from "../firebase/firebase.config.js"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userToken, setUserToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [formValue, setFormValue] = useState('')

  const auth = getAuth()

  function authChange(username) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.displayName = username
        console.log("signed in")
        console.log("User uid = " + user.uid)
      }
      else {
        console.log("signed out")
      }
    })
  }

  const login = async (username) => {
    signInAnonymously(auth)
    authChange(username)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user)
        setUserToken( userToken + token )
      }
    })
    setUser(username)
    setLoggedIn(true)
  }
  
  const logout = e => {
    e.preventDefault()
    setUser(null)
    setUserToken(null)
    setLoggedIn(false)
  }
  
  const handleChange = e => {
    setFormValue(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    setUser(formValue)
  }
  
  handleSubmit.bind()
  handleChange.bind()


    return (
        <UserContext.Provider
        value={{
          login: login,
          logout: logout,
          user: user,
          loggedIn: loggedIn,
          formValue: formValue,
          handleSubmit: handleSubmit,
          handleChange: handleChange
        }}
      >
        {children}
      </UserContext.Provider>
    )
}

export function useUserContext() {
  return useContext(UserContext)
}