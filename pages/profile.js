import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/AuthUserContext'
import Navbar from '../components/Navbar/Navbar'
import Image from 'next/image';

const LoggedIn = () => {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user)
      router.push('/signup')
  }, [user, loading])

  const handleLogOut = async () => {
    try {
      await logOut()
      router.push("login")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="App">
      <Navbar />
      <div className="user-page">
          <div className="title-container">
              <h4 className="page-title">User</h4>
          </div>  
          <div className="user-container">
              <div className='user-details-container'>
                <Image src="/gogh-user.jpg" 
                  width={150}
                  height={191}
                  className="user-img"
                />
                <div className='user-details'>
                  <h3>Email:</h3>
                  <p>{user.email}</p>   
                </div>  
                <button onClick={handleLogOut} className="log-out-btn">Log out</button>
              </div>
          </div>
      </div>
  </div>
  )
}

export default LoggedIn;