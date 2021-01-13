import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import profilePic from './assets/img/profile_pic.jpg'
import {Button} from '@material-ui/core';
import { FormatBold } from '@material-ui/icons';
import UserDataContext from './contexts/UserDataContext'
import background from './assets/img/bbcom_background.svg'
import './App.css'

import UserContext from './contexts/UserContext'
import BallerContext from './contexts/BallerContext'
import TeamContext from './contexts/TeamContext' 

export default function MainFeaturedPost(props) {

  const {user,setUser,baller,setBaller,team,setTeam} = useContext(UserContext)
  // const {baller,setBaller} = useContext(BallerContext)
  // const {team,setTeam} = useContext(TeamContext)
  
  //const { post } = props;
  //const {userData,setUserData} = useContext(UserDataContext)
  const posts = user.post;
 
 const {screenSize}=props 
  const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      height: ()=>{
                if(screenSize.isDesktopOrLaptop){
                  return '251px'
                }else if(screenSize.isTabletOrMobile){
                  return '300px'
                }
      },
      width: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '100%'
        }else if(screenSize.isTabletOrMobile){
          return '200px'
        }
},
      //backgroundColor: 'white',
      color: 'white', //theme.palette.common.white,
      marginBottom: theme.spacing(4),
      //backgroundImage: `url(${background})`,
      backgroundColor: 'rgb(52,91,137,0.4)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderTopLeftRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '200px'
        }else if(screenSize.isTabletOrMobile){
          return '140px'
        }
      },
      borderTopRightRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '0px'
        }else if(screenSize.isTabletOrMobile){
          return '140px'
        }
      },
      borderBottomLeftRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '200px'
        }else if(screenSize.isTabletOrMobile){
          return '0px'
        }
      },
      
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      
      //borderRadius: '20px',
    },
    mainFeaturedPostContent: {
      //position: 'relative',
      padding: screenSize.isDesktopOrLaptop?theme.spacing(3):theme.spacing(1),
      // [theme.breakpoints.up('md')]: {
      //   padding: theme.spacing(6),
      //   paddingRight: 0,
      // },
    },
    profilePic:{
      
      position: 'relative',
      
      borderRadius: '50%',
      
      // left: ()=>{
      //   if(screenSize.isDesktopOrLaptop){
      //     return '0px'
      //   }else if(screenSize.isTabletOrMobile){
      //     return '-90px'
      //   }
      // },
      
      width: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '251px'
        }else if(screenSize.isTabletOrMobile){
          return '200px'
        }
      },
      height: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '251px'
        }else if(screenSize.isTabletOrMobile){
          return '200px'
        }
      },

      // marginLeft: ()=>{
      //   if(screenSize.isDesktopOrLaptop){
      //     return 'auto'
      //   }else if(screenSize.isTabletOrMobile){
      //     return '50%'
      //   }
      // },
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
      fontSize: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '20px'
        }else if(screenSize.isTabletOrMobile){
          return '11px'
        }
      },
      maxWidth: '600px',
    }
  }));

  const classes = useStyles();
  

 

  return (
    <Paper className={classes.mainFeaturedPost} >
      {user && 
      <Grid container style={{ width: '100%' }} direction={screenSize.isTabletOrMobile?"col":"row"}  >
        <Grid item className={classes.profilePicGrid}>
          {/* <div className={classes.profilePic} id={profilePic} >
          </div> */}
          <img id="profilePic" src={`http://localhost:3000/${user.profilePic}`} className={classes.profilePic}/>
        </Grid>
        <Grid item md={5}>
           <div className={classes.mainFeaturedPostContent} paragraph>
          <Typography variant={screenSize.isDesktopOrLaptop?"h4":"h6"} color="inherit" style={{marginBottom: '10px'}}>
            WELCOME, {user.username.toUpperCase()}! 
            </Typography>
            <div  className={classes.profileInfoBody}>
            {user.role &&
            <Grid container direction="row" >
            <Grid item>
             {user.role[0]&& user.role[0].toUpperCase()}
             </Grid> 
             {user.role[1]&& <Grid item>
              {", "+user.role[1].toUpperCase()}
            </Grid>}
            {user.role[2]&& <Grid item>
              {", "+user.role[2].toUpperCase()}
            </Grid>}
            </Grid>}
            {team &&
            <Grid container direction="row"  >
            {team.club &&
               <Grid item>
               CLUB: {team.club+", "}
               </Grid>
               } 
               {team.age_group[0]&&
             <Grid item>
              {team.age_group[0]}
              </Grid>}
              {team.age_group[1] &&
              <Grid item>
              {team.age_group[1]}
              </Grid>}
              {team.age_group[2] &&
              <Grid item>
              {team.age_group[2]}
              </Grid>}
            </Grid>}
            {user.bio &&
              <Grid container direction="row" >
              <Grid item>
                BIO: {user.bio} 
            </Grid>
            </Grid>}
            </div>
          </div>
        </Grid>
        <Grid item container md={4} direction="column" justify="center" align="end" >
          {/* <Grid item  >
            <Link variant="subtitle1" href="#" underline='none'>
              <Button className={classes.button}>more info</Button>
            </Link>
          </Grid> */}
          <Link variant="subtitle1" href="#" underline='none'>
            <Grid>
              <Button className={classes.button}>edit profile</Button>
            </Grid>
          </Link>
          <Link variant="subtitle1" href="#" underline='none'>
            <Grid>
              <Button className={classes.button}>messenger</Button>
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