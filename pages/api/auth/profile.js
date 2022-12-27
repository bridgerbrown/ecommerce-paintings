import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { Router } from "next/router"
import { useEffect } from "react"
import Navbar from "../../../components/Navbar/Navbar"

const Profile = () => {
    const { status, data } = useSession()
    
    useEffect(() => {
        if(status === "unauthenticated") {
            Router.replace("/auth/signin")
        }
    }, [status])
    
    if (status === "authenticated")
    return (
        <div className="App">
            <Navbar />
            <div className="user-page">
                <div className="title-container">
                    <h4 className="page-title">User</h4>
                </div>  
                <div className="user-container">
                    <h3>{JSON.stringify(data.user, null, 1)}</h3>     
                </div>    
            </div>
        </div>
    )

    return <div><h1>loading...</h1></div>
} 

export default Profile