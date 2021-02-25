import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import {Button} from '@material-ui/core';
import './App.css'

import UserContext from './contexts/UserContext'


export default function MainFeaturedPost(props) {

  const {user,setUser,baller,setBaller,team,setTeam} = useContext(UserContext)
  

  const {screenSize}=props 
  const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      boxShadow: 'rgb(20,29,184)',
      position: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return 'relative'
        }else if(screenSize.isTabletOrMobile){
          return 'absolute'
        }
      },
      left: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '0%'
        }else if(screenSize.isTabletOrMobile){
          return '50%'
        }
      },
      transform:()=>{ if(screenSize.isDesktopOrLaptop){
        return 'translate(0%, 0%)'
      }else if(screenSize.isTabletOrMobile){
        return 'translate(-50%, 0%)'
      }
    },
      display: 'flex',
      justifyContent: 'center',
      height: ()=>{
                if(screenSize.isDesktopOrLaptop){
                  return '251px'
                }else if(screenSize.isTabletOrMobile){
                  return '350px'
                }
      },
      width: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '100%'
        }else if(screenSize.isTabletOrMobile){
          return '200px'
        }
      },
      align: "center",
      color: 'rgb(200,200,200)',
      marginBottom: theme.spacing(1),
      backgroundColor: 'rgb(0,0,0)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: '20px',
      borderTopLeftRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '200px'
        }else if(screenSize.isTabletOrMobile){
          return '140px'
        }
      },
      borderTopRightRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '20px'
        }else if(screenSize.isTabletOrMobile){
          return '140px'
        }
      },
      borderBottomLeftRadius: ()=>{
        if(screenSize.isDesktopOrLaptop){
          return '200px'
        }else if(screenSize.isTabletOrMobile){
          return '20px'
        }
      },
      
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    mainFeaturedPostContent: {
      width: '100%',
      padding: screenSize.isDesktopOrLaptop?theme.spacing(2):theme.spacing(1),
    },
    profilePic:{
      
      position: 'relative',
      
      borderRadius: '50%',

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

      overflow: 'hidden',
    },
    
    button:{

      backgroundColor: 'rgb(0,0,0)',
      color: 'rgb(200,200,200)',
      '&:hover': {
        textShadow: "0 0 3px rgb(200,200,200), 0 0 5px rgb(200,200,200,0.7)",
          
      },
      
    },

    title:{
      marginBottom: '10px',
      marginTop:screenSize.isTabletOrMobile?'-25%':'0',
      
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
      <Grid container style={{ width: '100%' }}  direction={screenSize.isTabletOrMobile?"col":"row"} >
        <Grid item className={classes.profilePicGrid}>
          <img id="profilePic" alt="" src={`http://localhost:3000/${user.profilePic}`} className={classes.profilePic}/>
        </Grid>
        <Grid item  xs={7}>
          <div className={classes.mainFeaturedPostContent} paragraph>
          <Typography variant={screenSize.isDesktopOrLaptop?"h4":"h6"} color="inherit" className={classes.title}>
            WELCOME {user.username.toUpperCase()} 
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
        <Grid item container xs={2} direction="column" justify="center"  spacing={2}>
          
            <Grid item>
            <Link variant="subtitle1" href="#" underline='none'>
              <Button className={classes.button} >edit profile</Button>
              </Link>
            </Grid>
          
          
            <Grid item >
            <Link variant="subtitle1" href="#" underline='none'>
              <Button className={classes.button} >messenger</Button>
              </Link>
            </Grid>
          
        </Grid>
      </Grid>}
    </Paper>
  );
}
