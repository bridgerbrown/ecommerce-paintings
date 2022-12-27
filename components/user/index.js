import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { authData, updateProfile, getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { authInitialize } from '../../components/firebase/firebase.config'
import { useUserContext } from "../../components/context/UserContext"

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
        <div className="App">
            <Navbar userNav={} />
            <div className="user-page">
            <div className="title-container">
                <h4 className="page-title">User</h4>
            </div>  
            <div className="user-container">
                <h3>Username: <span>{}</span></h3>
                <div className="user-change">
                    <form onSubmit={loginForm}>
                        <label for="newname">Set new username:</label>
                        <input type="text" id="newname" name="newname" value={usernameField} onChange={handleChange} />
                        <input type="submit" value="Submit" id="submit" />
                        {error && (
                            <div className="has-text-danger">{error}</div>
                        )}
                    </form>
                </div>      
            </div>    
        </div>
        </div>
    </>
    ) 
}
