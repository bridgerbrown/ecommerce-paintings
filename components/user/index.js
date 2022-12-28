import React, { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import { authData, updateProfile, getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { authInitialize } from '../firebase/firebase.config'
import { useUserContext } from "../context/UserContext"

export default function User({}) {
    const [usernameField, setUsernameField] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setUsernameField(e.target.value)
        setError("")
    }

    const loginForm = (e) => {
        e.preventDefault()
        if (!usernameField) {
            return setError("Fill all fields!")
        } else {
            changeName(usernameField)
        }
    }

    return (
    <>

    </>
    ) 
}
