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
                <form onSubmit={props.context.handleSubmit}>
                    <label for="newname">Set new username:</label>
                    <input type="text" id="newname" name="newname" value={props.context.value} onChange={props.context.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>          
        </div>
    )
}

export default withContext(User)