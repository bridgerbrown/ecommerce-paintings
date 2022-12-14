import React, { useEffect, createContext, useState, useContext } from 'react'
import { getIdToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth, authChange } from './Firebase';

const UserContext = createContext()

export function UserProvider({ children }) {
        const [user, setUser] = useState(null)
        const [userToken, setUserToken] = useState()
        const [loggedIn, setLoggedIn] = useState(false)
        const [formValue, setFormValue] = useState('')

        // useEffect(() => {
        //   setUser(null)
        //   setLoggedIn(false)
        // }, [])

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