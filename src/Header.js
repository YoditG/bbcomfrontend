import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {Link,Grid} from '@material-ui/core';
import landingPageIcon from './assets/img/logo_ballin_small_orange.png'
import UserContext from './contexts/UserContext'
import logo from './assets/img/landingPageIcon.svg'

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
    color: 'rgb(13,44,41)',
    marginBottom: '1%',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    borderLeft: '1px solid rgb(13,44,41)',
    //borderBottom: '1px solid rgb(13,44,41)'
  },
}));

export default function Header(props) {
  const classes = useStyles();
  //const { sections, title } = props;
  const {user,setUser} = useContext(UserContext)
  const sections = [
    {sec: user.userdata.username, url: '#'  },
    {sec: 'messenger', url: '#' },
    {sec: 'log out', url: '/' }
  ]

  

  return (
    <React.Fragment>
      {/* <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar> */}

      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      <Button style={{width: "5%"}}><img src={landingPageIcon} alt="landing page" style={{width: "80%"}} /></Button>
      
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.sec}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.sec}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

// Header.propTypes = {
//   sections: PropTypes.array,
//   title: PropTypes.string,
// };

{/* <IconButton>
          <SearchIcon />
        </IconButton> */}

        // setStyle(prevStyle => ({
        //   ...prevStyle,
        //   font: { ...prevStyle.font, align: event.target.value }