import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/AuthUserContext'
import Navbar from '../components/Navbar/Navbar'

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <div className="App">
      <Navbar />
      <div className="user-page">
          <div className="title-container">
              <h4 className="page-title">User</h4>
          </div>  
          <div className="user-container">
              <h3>
              </h3>     
          </div>
          <button onClick={signOut}>Sign out</button>
      </div>
  </div>
  )
}

export default LoggedIn;