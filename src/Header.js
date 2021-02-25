import React,{useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link,Grid} from '@material-ui/core';
import landingPageIcon from './assets/img/theme_wolf/logo_button.png'
import UserContext from './contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
    color: 'rgb(200,200,200)',
    fontFamily: 'PT Serif',
    marginBottom: '1%',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,    
    borderLeft: '1px solid rgb(200,200,200)',
    '&:hover': {
      textShadow: "0 0 3px rgb(200,200,200), 0 0 5px rgb(200,200,200,0.7)",
  },
},
  searchbar:{
    lineHeight: "200%",
    borderRadius: "10px",
    border: "solid rgb(0,0,31,0.7) 1px",
    textarea:{
      backgroundColor: "rgb(200,200,200)",
    },
    outline: "none",
    marginLeft: "-16%"
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const {user,setUser} = useContext(UserContext)
  console.log(user)
  const sections = [
    {sec: user.username, url: `/user/${user._id}`  },
    {sec: 'messenger', url: '#' },
    {sec: 'log out', url: '/' }
  ]
  
  return (
    <React.Fragment>
      
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
    
        <Button style={{width: "6%"}} href={`/user/${user._id}`} >
          <img src={landingPageIcon} alt="landing page" style={{width: "80%"}} />
        </Button>
      <input type="text" placeholder= "search BBCOM" className={classes.searchbar} style={{backgroundColor: "rgb(200,200,200)"}}/>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.sec}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
            style={{textDecoration:"none"}}
          >
            {section.sec}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
