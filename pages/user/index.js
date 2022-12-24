import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { getAuth, initializeAuth, signInAnonymously, updateProfile } from 'firebase/auth'
import { auth } from '../../components/firebase/firebase.config'

export default function User({ auth, userNameData }) {
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
            updateProfile(auth.currentUser, {
                displayName: usernameField 
              })
        }
    }

    return (
    <>
        <div className="App">
            <Navbar />
            <div className="user-page">
            <div className="title-container">
                <h4 className="page-title">User</h4>
            </div>  
            <div className="user-container">
                <h3>Username: <span>{userNameData}</span></h3>
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

export async function getServerSideProps() {
    signInAnonymously(auth)
    const userNameData = auth.currentUser.displayName
    return {
        props: {
            auth: auth,
            userNameData: userNameData
        }
    }
}