import React, {useState} from "react"
import { useRouter } from "next/router";
import { useAuth } from "../components/context/AuthUserContext";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);
  
    const { createUserWithEmailAndPassword } = useAuth();
  
    const onSubmit = event => {
      setError(null)
      //check if passwords match. If they do, create user in Firebase
      // and redirect to your logged in page.
      if(passwordOne === passwordTwo)
        createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in Firebase")
          router.push("/profile");
        })
        .catch(error => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message)
        });
      else
        setError("Password do not match")
      event.preventDefault();
    }; 

    return (
        <div className="signInForm">
            <form onSubmit={onSubmit}>
            { error && <Alert color="danger">{error}</Alert>}
                <h1>Log In</h1>
                <label for="signUpEmail">Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    placeholder="Email" 
                />
                <button
                    type="submit"
                    value="Login" 
                >Submit</button>
            </form>
        </div>
    )
}

export default SignUp;

