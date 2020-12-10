import React, { useContext, useEffect } from 'react';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import { Grid, Paper, Typography,CardActionArea,Card,CardContent,Hidden,CardMedia, Link } from '@material-ui/core';
import { useStyles, sidebar } from './assets/styles/UserProfileStyle'
import { featuredPosts } from './assets/styles/Posts'
//import { userData, ballerData } from './assets/data/userData';
import {makeStyles} from '@material-ui/core/styles'
import background from './assets/img/bbcom_background.svg'
import profilePic from './assets/img/tiger.png'
import SideCard from './SideCard'
import FriendsCard from './FriendsCard.js'
import Footer from './Footer';
import UserContext from './contexts/UserContext'
import logo from "./assets/img/logo_ballin_small.svg"



const UserProfile = () => {
    const {user,setUser} = useContext(UserContext)
    const posts = user.posts
    
    

    const useStyles = makeStyles({
          
         
          cardMedia: {
            width: 160,
          },
          profilePic:{
            display: 'inline-block',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundImage: `url(${profilePic})`,
            // position: 'absolute',
            //  top: '50%',
            //  transform: 'translateY(-50%)',
          // transform: translateY(-50%);
            //border: 'solid 1px black',
           
          },
    })
    const classes = useStyles()

    return (
        <>
            {user&& <MainFeaturedPost />}
            <Grid container direction="row" spacing={2} justify="center" >

                <Grid item justify="center" xs={3}>
                    <Grid container direction="column" spacing={2} >
                        <Grid item>
                        <SideCard title="UPCOMING EVENTS"/>
                        </Grid>
                        <Grid item>
                        <SideCard title="GROUPS"/>
                        </Grid>
                        <Grid item>
                        <Footer title="Footer" description="Privacy  · Impressum/AGB/NetzDG  · Commercial  · Data Protection   · Cookies  ·   · BBcom © 2020" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container direction="column" spacing={2} align="center">
                        {posts&&  posts.map((post,index) => (
                            <Grid item xs={12}>
                                <FeaturedPost key={index} post={post} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
                <Grid item xs={3}>
                    <Grid contaienr direction="column" spacing={2} align="center">
                    <Grid item>
                    <FriendsCard title="MY FRIENDS"/>
                    </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>
    );

}

export default UserProfile;

//   <Grid container spacing={4} className={classes.mainGrid}>
//                         {/* <Main title="From the firehose" posts={posts} /> */}
//                         <Sidebar
//                             title={sidebar.title}
//                             description={sidebar.description}
//                             archives={sidebar.archives}
//                             social={sidebar.social}
//                         />
//                     </Grid>