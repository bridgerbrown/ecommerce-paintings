import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useAuth } from './components/context/AuthUserContext'

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      router.push('/profile');
    })
    .catch(error => {
      setError(error.message)
    });
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
            <p>No account? <Link href="/signup">Create one</Link></p>
        </form>
    </div>
  )
}