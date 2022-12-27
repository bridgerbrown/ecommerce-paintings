import React, { useEffect, useState} from "react";
import Navbar from "../components/Navbar/Navbar" 
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

export default function User() { 
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
            router.push("/user")
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
