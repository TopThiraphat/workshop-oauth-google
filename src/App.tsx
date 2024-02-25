import { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css'
import { gapi } from 'gapi-script';


export const App: React.FC<{}> = () => {

  const clientId: string = "<Client-Id>"
  const [profile, setProfile] = useState<any | undefined>(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scop: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, []);

  const onSuccess = (res: any) => {
    setProfile(res.profileObj)
    console.log("success", res)
  }
  const onFailure = (res: any) => {
    console.log("failure", res)
  }

  const logOut = () => {
    setProfile(null)
  }

  return (
    <>
      <h1>Google OAuth</h1>
      <div className="card">
        {profile ? (<>
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged In</h3>
          <p>Name : {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut} />
        </>) : (<>
          <GoogleLogin
            clientId={clientId}
            buttonText='Sign in with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </>)}
      </div>
    </>
  )
}

export default App
