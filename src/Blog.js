import React,{useState,useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import GitHubIcon from '@material-ui/icons/GitHub';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
import { login, logout } from "./utils/auth"
import Header from './Header'
import axios from 'axios'
import Login from './Login'
import HomePage from './HomePage'
import Cookies from "js-cookie";
import Cam from './Cam'
import CamComponent from './CamComponent'


import UserProfile from './UserProfile';
import UserContext from './contexts/UserContext'

import ProtectedRoute from "./ProtectedRoute"
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { useMediaQuery } from 'react-responsive'
import WebcamStreamCapture from './WebcamStreamCapture'



const {setAuthHeaders} =  require('./utils/auth')

require('dotenv').config()


export default function Blog() {
    
  const [credentials, setCredentials] = useState(null)

  const [user, setUser] = useState(null)
  const [baller,setBaller] = useState(null)
  const [team,setTeam] = useState(null)

  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  // --- screensizes for responsive designing -----
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
      query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const screenSize = {isDesktopOrLaptop,isBigScreen,isTabletOrMobile, isTabletOrMobileDevice,isPortrait,isRetina}
  //-----------------------------------------------------

  const handleSetCredentials = (e) => {
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }))
  }
  
  const handleLogin = async () => {
    const data = await login(credentials)
    console.log(data)
    await setUser(data.data.user)
    //setLoggedIn(true)
    data&& history.push(`/user/${data.data.user._id}/profile`)
    
  }

  const handleLogout = () => {
    logout()
    // const item = window.localStorage.removeItem('bbcom-userID')
    console.log('hallo')
    history.push('/login')
  }
  useEffect(()=>{
    const loadUser = async ()=>{
      const APP_NAME = 'bbcom'
      const token = Cookies.get(`${APP_NAME}-auth-token`,{path:'/'});
      if(token){
        const userID = window.localStorage.getItem('bbcom-userID')
        setAuthHeaders()
        const reload = await axios.get(`${process.env.REACT_APP_API}/users/${userID}/userData`)
        console.log('token:',token)
        setUser(reload.data.user)
        return await user
      }else{
        history.push('/')
      }
    }

    if(!user){
      loadUser()
    }
    },
  [])
  user && console.log(user)
  return (
    <>
      <React.Fragment  >
        <CssBaseline />
        <Container maxWidth="lg"  >

          <main >
          <Switch>
          <Route path="/login" >
                <Login onLogin={handleLogin} onSetCredentials={handleSetCredentials} />
              </Route>
          </Switch>

          <UserContext.Provider value={{ user, setUser,baller, setBaller, team, setTeam}}>
            <Switch>
              {user &&
                <ProtectedRoute path={`/user/${user._id}/captureVideo`} onLogout={handleLogout} >
                  {/* <WebcamStreamCapture screenSize={screenSize}/> */}
                  <CamComponent/>
                </ProtectedRoute>
              }

              {user &&
                <ProtectedRoute path={`/user/${user._id}/profile`} onLogout={handleLogout} >
                        <Header />
                        <UserProfile screenSize={screenSize} />
                </ProtectedRoute>}

                {user&&
                <ProtectedRoute path={`/user/${user._id}/landing`} onLogout={handleLogout} >
                  <Header />
          
                    
                </ProtectedRoute>}
                
              <Route path="/" exact>
                <HomePage />
              </Route>
            </Switch>
            </UserContext.Provider>
          </main>
        </Container>

      </React.Fragment>
    </>
  );
}
