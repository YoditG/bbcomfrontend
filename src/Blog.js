import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ThemeProvider,createMuiTheme} from '@material-ui/core';
import Header from './Header';
import axios from 'axios'
//import MainFeaturedPost from './MainFeaturedPost';
//import FeaturedPost from './FeaturedPost';
//import Main from './Main';
//import Sidebar from './Sidebar';

import background from './assets/img/bbcom_background.svg'
import UserProfile from './UserProfile';
import UserContext from './contexts/UserContext'
import logo from './assets/img/logo_ballin_small.svg'
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

const { userData, ballerData } = require('./assets/data/userData') 

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    //marginTop: theme.spacing(3),
  },
}));

const completeTheme = createMuiTheme({
    palette: {
      background: {
        backgroundImage: `url(${logo})`,
       
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
              //backgroundImage: `url(${logo})`,
              // opacity: 0.1,
              backgroundColor: 'rgb(255,255,255)',
              
              color: 'white',
              
             
          },
          
        }
      }
    },
    // overlay: {
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   right: 0,
    //   left: 0,
    //   backgroundColor: 'rgb(0,0,0,.8)',
    // },
  });
  

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
  const [user, setUser] = useState(null)
  // const [baller,setBaller] = useState(null)
  // const [posts,setPosts] = useState(null)
  // const [team,setTeam] = useState(null)

  
  useEffect(()=>{
    axios.get('http://localhost:3000/users/5fc76652191ef665161ad0b8/profile').then(res=>{
      console.log(res.data.team.age_group)
      const baller= res.data.baller;
      const userdata=res.data.user;
      const team = res.data.team;
      const posts = res.data.posts;
      const us={userdata,baller,team,posts}
      console.log(us)
      setUser(us)
    })
  },[])

  return (
    <>
    {user &&<UserContext.Provider value={{user,setUser}}>
    <React.Fragment  >
    <ThemeProvider theme={completeTheme}>
      <CssBaseline />
      <Container maxWidth="lg"  >
       <Header/>
        <main >
          
          <UserProfile/>

        </main>
      </Container>
      
      </ThemeProvider>
    </React.Fragment>
    </UserContext.Provider>}
    </>
  );
}