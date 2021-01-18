import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ThemeProvider,createMuiTheme} from '@material-ui/core';
import { login, logout } from "./utils/auth"
import Header from './Header'

import axios from 'axios'
import Login from './Login'
import HomePage from './HomePage'
import Cookies from "js-cookie";

import background from './assets/img/bbcom_background.svg'
import UserProfile from './UserProfile';
import UserDataContext from './contexts/UserDataContext'
import UserContext from './contexts/UserContext'
import TeamContext from './contexts/TeamContext'
import BallerContext from './contexts/BallerContext'
import logo from './assets/img/logo_ballin_small.svg'
import ProtectedRoute from "./ProtectedRoute"
import {
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";

import { useMediaQuery } from 'react-responsive'


const {setAuthHeaders} =  require('./utils/auth')

require('dotenv').config()

const { userData, ballerData } = require('./assets/data/userData') 

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    //marginTop: theme.spacing(3),
  },
}));

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  
  const classes = useStyles();
  const [userData, setUserData] = useState(null)
  
  const [credentials, setCredentials] = useState(null)

  const [user, setUser] = useState(null)
  const [baller,setBaller] = useState(null)
  // const [posts,setPosts] = useState(null)
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
    setUser(data.data.user)
    setLoggedIn(true)
    history.push('/user')
    
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
        const reload = await axios.get(`http://localhost:3000/users/${userID}/userData`)
        console.log('token:',token)
        setUser(reload.data.user)
        return await user
      }else{
        history.push('/login')
      }
    }

    if(!user){
      loadUser()
    }
  },[])

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
              {user &&
                <ProtectedRoute path='/user' onLogout={handleLogout} >
                  {/* <TeamContext.Provider value={{ team, setTeam }}>
                    <BallerContext.Provider value={{ baller, setBaller }}> */}
                      <UserContext.Provider value={{ user, setUser,baller, setBaller, team, setTeam}}>
                        <Header />
                        <UserProfile screenSize={screenSize} />
                      </UserContext.Provider>
                    {/* </BallerContext.Provider>
                  </TeamContext.Provider> */}
                </ProtectedRoute>}
              <Route path="/" exact>
                <HomePage />
              </Route>
            </Switch>
          </main>
        </Container>

      </React.Fragment>
    </>
  );
}
