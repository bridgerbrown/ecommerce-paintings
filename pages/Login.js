import React, { useState } from "react";
import { Navigate } from "react-router-dom"
import { useUserContext } from "../components/context/UserContext";

export default function User() { 
    const { login, user } = useUserContext
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")


    const handleChange = e => {
        setUsername({ [e.target.name]: e.target.value }) 
        setError("")
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        if (!username) {
            return setError( "Fill all fields!")
        }
        login(username)
    }

    return !user ? (
            <>
                <div className="hero is-primary">
                <div className="title-container">
                    <h4 className="page-title">Login</h4>
                </div>  
                </div>
                <div className="login-container">
                    <h2>Sign up</h2>
                    <div className="login-form">
                        <form onSubmit={loginSubmit}>
                            <div className="login">
                                <div className="field">
                                    <label className="label">Username: </label>
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
        </>
    ) : (
        <Navigate to="/products" />
    )
}