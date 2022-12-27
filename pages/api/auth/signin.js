import { signIn } from "next-auth/react"

const SignIn = (props) => {
    const [userInfo, setUserInfo] = useState({username: ''})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            username: userInfo.username,
            redirect: false,
        });

        console.log(res);
    }

    return (
        <div className="signInForm">
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input 
                    value={userInfo.username}
                    onChange={({target}) =>
                        setUserInfo({ ...userInfo, username: target.value})
                    }
                    type="username"
                    placeholder="Username"
                />
                <input 
                    type="submit"
                    value="Login" 
                />
            </form>
        </div>
    )
}

export default SignIn;