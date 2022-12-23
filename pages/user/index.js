import React from "react"
import { useUserContext } from "../../components/context/UserContext"
import Navbar from "../../components/Navbar/Navbar"
import { getAuth, signInAnonymously, updateProfile, auth } from 'firebase/auth'

export default function User({ userNameData, userFirebaseId }) {
    const { login, user } = useUserContext()
    const [usernameField, setUsernameField] = useState()
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
            setUser(usernameField)
            // const auth = getAuth()
            // signInAnonymously(auth)
            // updateProfile(auth.currentUser, {
            //     displayName: { usernameField }
            //   })
        }
    }

    return user ? (
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
    ) :
    (
        <Link href="/user/login" />
    )
}

export async function getServerSideProps() {
    const { user } = useUserContext()
    const auth = getAuth()
    signInAnonymously(auth)
    updateProfile(auth.currentUser, {
        displayName: { user }
      })
    const userNameData = auth.currentUser.displayName
    const userFirebaseId = currentUser.uid
    return {
        props: {
            userNameData: userNameData,
            userFirebaseId: userFirebaseId,
        }
    }
}