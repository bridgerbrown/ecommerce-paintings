import React, { useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar" 
import { useRouter } from "next/router";
import { browserSessionPersistence, getAuth, initializeAuth, signInAnonymously, updateProfile } from 'firebase/auth'
import { auth } from '../../components/firebase/firebase.config'

export default function Login({ auth }) { 
    const [usernameField, setUsernameField] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

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
            router.push("/user")
            setUsername(usernameField)
        }
    }

    return (
        <>
        <div className="App">
            <Navbar />
            <div className="hero is-primary">
                <div className="title-container">
                    <h4 className="page-title">Login</h4>
                </div>  
            </div>
            <div className="login-container">
                <h2>Sign up</h2>
                <div className="login-form">
                    <form onSubmit={loginForm}>
                        <div className="login">
                            <div className="field">
                                <label className="label">Set a username: </label>
                                <input
                                    className="input"
                                    type="username"
                                    name="username"
                                    onChange={handleChange}
                                    id="newname"
                                />
                            </div>                        
                        {error && (
                            <div className="has-text-danger">{error}</div>
                        )}
                        <div className="submit-button">
                            <button
                                className="button"
                                id="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    signInAnonymously(auth)
    console.log(auth)
    console.log(auth.currentUser)
    return {
        props: {
            auth: auth,
        }
    }
}