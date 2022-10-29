import React from "react";
import withContext from "../withContext";

const User = props => {
    const { user } = props.context
    return(
        <div className="user-page">
            <div className="title-container">
                <h4 className="page-title">User</h4>
            </div>  
            <div className="user-container">
                <h2>User: <span>{user}</span></h2>
            </div>          
        </div>
    )
}

export default withContext(User)