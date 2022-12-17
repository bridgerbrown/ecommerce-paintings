import React from "react"
import { useUserContext } from "./context/UserContext"
import Navbar from "./Navbar";

export default function User({ user, handleChange, handleSubmit, formValue }) {
    return(
    <>
        <div className="App">
            <Navbar />
            <div className="user-page">
            <div className="title-container">
                <h4 className="page-title">User</h4>
            </div>  
            <div className="user-container">
                <h3>Username: <span>{user}</span></h3>
                <div className="user-change">
                    <form onSubmit={handleSubmit}>
                        <label for="newname">Set new username:</label>
                        <input type="text" id="newname" name="newname" value={formValue} onChange={handleChange} />
                        <input type="submit" value="Submit" id="submit" />
                    </form>
                </div>      
            </div>    
        </div>
        </div>
    </>
    )
}

export async function getStaticProps() {
    const { handleChange, handleSubmit, formValue, user } = useUserContext()
    return {
        props: {
            user: user,
            handleChange: handleChange,
            handleSubmit: handleSubmit,
            formValue: formValue,
        },
    };
}