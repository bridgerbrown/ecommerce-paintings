import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"

const AuthUserContext = createContext({})

export const useAuth = () => useContext(AuthUserContext)

export const AuthUserContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                })
            } else {
                setUser({ email: null, uid: null })
            }
        })
        setLoading(false)

        return () => unsubscribe()
    }, [])

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };
    
      const logOut = async () => {
        setUser({ email: null, uid: null });
        await signOut(auth);
      };

    return (
        <AuthUserContext.Provider value={{ user, signUp, signOut, logIn, logOut }}>
            {loading ? null : children}
        </AuthUserContext.Provider>
    )
}