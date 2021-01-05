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
//import MainFeaturedPost from './MainFeaturedPost';
//import FeaturedPost from './FeaturedPost';
//import Main from './Main';
//import Sidebar from './Sidebar';
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
const {setAuthHeaders} =  require('./utils/auth')

require('dotenv').config()
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

const { userData, ballerData } = require('./assets/data/userData') 


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    //marginTop: theme.spacing(3),
  },
}));

// const completeTheme = createMuiTheme({
//     // palette: {
//     //   background: {
//     //     backgroundImage: `url(${logo})`,
       
//     //   },
//     // },
//     overrides: {
//       MuiCssBaseline: {
//         "@global": {
//           body: {
//               //backgroundImage: `url(${logo})`,
//               // opacity: 0.1,
//               //backgroundColor: 'rgb(255,255,255)',
              
//               color: 'white',
              
             
//           },
          
//         }
//       }
//     },
//     // overlay: {
//     //   position: 'absolute',
//     //   top: 0,
//     //   bottom: 0,
//     //   right: 0,
//     //   left: 0,
//     //   backgroundColor: 'rgb(0,0,0,.8)',
//     // },
//   });
  

//const posts = [post1, post2, post3];

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
    // const {user,setUser} = useContext(UserContext)
      // console.log('this is the user:',data.data.user)
    // setUser(data.data.user)
    // if(data.data.baller){
    //   setBaller(data.data.baller)
    //   if(data.data.team){
    //     setTeam(data.data.team)
    //   }
    // }
    setLoggedIn(true)
    history.push('/user')
    
  }

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

const APP_NAME = 'bbcom'
const token = Cookies.get(`${APP_NAME}-auth-token`);
//console.log(token)
if(token){
  const userID = window.localStorage.getItem('bbcom-userID')
  const loadUser = async ()=>{
    //setAuthHeaders()
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://www.localhost:3001';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios.defaults.headers.common["Access-Control-Allow-Methods"] =  "GET, POST, PUT, DELETE"
    const reload = await axios.get(`http://localhost:3000/users/${userID}/userData`)
    //console.log(userID)
  }
  loadUser()
  
}
 
  

  return (
    <>
       {/* <UserDataContext.Provider value={{ userData, setUserData }}> */}
        <React.Fragment  >
          {/* <ThemeProvider theme={completeTheme}> */}
            <CssBaseline />
            <Container maxWidth="lg"  >

              <main >

                <Switch>
                  <Route path="/login" >
                    <Login onLogin={handleLogin} onSetCredentials={handleSetCredentials} />
                  </Route>
                  {loggedIn&&<TeamContext.Provider value={{ team, setTeam }}>
                    <BallerContext.Provider value={{ baller, setBaller }}>
                      <UserContext.Provider value={{ user, setUser }}>
                        <ProtectedRoute path='/user' onLogout={handleLogout} >
                        <Header/>
                        <UserProfile/>
                        </ProtectedRoute>
                      </UserContext.Provider>
                    </BallerContext.Provider>
                  </TeamContext.Provider>}
                  <Route path="/" exact>
                    <HomePage />
                  </Route>
                </Switch>
              </main>
            </Container>

          {/* </ThemeProvider> */}
        </React.Fragment>
      {/* </UserDataContext.Provider>} */}
    </>
  );
}


