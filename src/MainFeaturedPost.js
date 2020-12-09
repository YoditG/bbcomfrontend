import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import profilePic from './assets/img/goran.jpg'
import {Button} from '@material-ui/core';
import { FormatBold } from '@material-ui/icons';
import UserContext from './contexts/UserContext'
import background from './assets/img/bbcom_background.svg'
import './App.css'

export default function MainFeaturedPost(props) {
  
  //const { post } = props;
  const {user,setUser} = useContext(UserContext)
  const posts = user.post;
 

  const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      height: '251px',
      backgroundColor: 'white',
      color: 'white', //theme.palette.common.white,
      marginBottom: theme.spacing(4),
      //backgroundImage: `url(${background})`,
      backgroundColor: 'rgb(13,44,41)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderTopLeftRadius: '200px',
      borderBottomLeftRadius: '200px',
      
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgb(13,44,41)',
      //borderRadius: '20px',
    },
    mainFeaturedPostContent: {
      //position: 'relative',
      padding: theme.spacing(3),
      // [theme.breakpoints.up('md')]: {
      //   padding: theme.spacing(6),
      //   paddingRight: 0,
      // },
    },
    profilePic:{
      
      position: 'relative',
      borderRadius: '50%',
      
      width: '250px',
      height: '250px',
      overflow: 'hidden',
      
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center center',
      // backgroundSize: 'cover',
      // backgroundImage: `url(${profilePic})`,
      // position: 'absolute',
      //  top: '50%',
      //  transform: 'translateY(-50%)',
    // transform: translateY(-50%);
      //border: 'solid 5px white',
     
    },
    button:{
      border: 'solid 2px white',
      width: '50%',
      color: 'white'
    },
    profilePicGrid: {
      width: '250px',
      height: '250px',
    },
    profileInfoBody:{
      fontSize: '20px',
      maxWidth: '600px',
    }
  }));

  const classes = useStyles();
  

 

  return (
    <Paper className={classes.mainFeaturedPost} >
      {user && 
      <Grid container style={{ width: '100%' }} direction="row"  >
        <Grid item className={classes.profilePicGrid}>
          {/* <div className={classes.profilePic} id={profilePic} >
          </div> */}
          <img id="profilePic" src={profilePic} className={classes.profilePic}/>
        </Grid>
        <Grid item md={5}>
           <div className={classes.mainFeaturedPostContent} paragraph>
          <Typography variant="h4" color="inherit" style={{marginBottom: '10px'}}>
            WELCOME, {user.userdata.username.toUpperCase()}! 
            </Typography>
            <div  className={classes.profileInfoBody}>
            {user.userdata.role &&
            <Grid container direction="row" >
            <Grid item>
             {user.userdata.role[0]&& user.userdata.role[0].toUpperCase()}
             </Grid> 
             {user.userdata.role[1]&& <Grid item>
              {", "+user.userdata.role[1].toUpperCase()}
            </Grid>}
            {user.userdata.role[2]&& <Grid item>
              {", "+user.userdata.role[2].toUpperCase()}
            </Grid>}
            </Grid>}
            {user.team &&
            <Grid container direction="row"  >
            {user.team.club &&
               <Grid item>
               CLUB: {user.team.club+", "}
               </Grid>
               } 
               {user.team.age_group[0]&&
             <Grid item>
              {user.team.age_group[0]}
              </Grid>}
              {user.team.age_group[1] &&
              <Grid item>
              {user.team.age_group[1]}
              </Grid>}
              {user.team.age_group[2] &&
              <Grid item>
              {user.team.age_group[2]}
              </Grid>}
            </Grid>}
            {user.userdata.bio &&
              <Grid container direction="row" >
              <Grid item>
                BIO: {user.userdata.bio} 
            </Grid>
            </Grid>}
            </div>
          </div>
        </Grid>
        <Grid item container md={4} direction="column" justify="center" align="end" >
          <Grid item  >
            <Link variant="subtitle1" href="#" underline='none'>
              <Button className={classes.button}>more info</Button>
            </Link>
          </Grid>
          <Link variant="subtitle1" href="#" underline='none'>
            <Grid>
              <Button className={classes.button}>friend request</Button>
            </Grid>
          </Link>
          <Link variant="subtitle1" href="#" underline='none'>
            <Grid>
              <Button className={classes.button}>send message</Button>
            </Grid>
          </Link>
        </Grid>
      </Grid>}
    </Paper>
  );
}

// MainFeaturedPost.propTypes = {
//   post: PropTypes.object,
// }; <Typography variant="h5" color="inherit" paragraph>