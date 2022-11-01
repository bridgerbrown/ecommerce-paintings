import React, { Component } from "react";
import { Navigate } from "react-router-dom"
import withContext from "../withContext"

class Login extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" })

    login = (e) => {
        e.preventDefault()
        const { username } = this.state
        if (!username) {
            return this.setState({ error: "Fill all fields!" })
        }
        this.props.context.login(username)
    }

    render() {
        return !this.props.context.user ? (
                <>
                    <div className="hero is-primary">
                    <div className="title-container">
                        <h4 className="page-title">Login</h4>
                    </div>  
                    </div>
                    <br />
                    <br />
                    <div className="login-form">
                        <form onSubmit={this.login}>
                            <div className="login">
                                <div className="field">
                                    <h2>Sign up</h2>
                                    <label className="label">Username: </label>
                                    <input
                                        className="input"
                                        type="username"
                                        name="username"
                                        onChange={this.handleChange}
                                    />
                                </div>                        
                            {this.state.error && (
                                <div className="has-text-danger">{this.state.error}</div>
                            )}
                            <div className="submit-button">
                                <button
                                    className="button is-primary is-outlined is-pulled-right"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
            </>
        ) : (
            <Navigate to="/products" />
        )
    }
}

export default withContext(Login)