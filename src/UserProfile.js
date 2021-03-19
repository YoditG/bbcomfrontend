import React, { useContext, useEffect,useState } from 'react';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import SideCard from './SideCard'
import FriendsCard from './FriendsCard.js'
import Footer from './Footer';
import UserContext from './contexts/UserContext'
import axios from 'axios';

const {setAuthHeaders} = require('./utils/auth')

const UserProfile = (props) => {
    const {user,setUser,baller,setBaller,team,setTeam} = useContext(UserContext)
    const {screenSize} = props
    
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const getPosts = async ()=>{
            setAuthHeaders()
            const userData = await axios.get(`${process.env.REACT_APP_API}/users/${user._id}/profile`)
            console.log(userData)
            setPosts(userData.data.posts)
            setBaller(userData.data.baller)
            setTeam(userData.data.team)
        }

        getPosts()
    },[])

    const useStyles = makeStyles({
        cardMedia: {
            width: 160,
        },
        gridSize:{
            height: ()=>{
                if(screenSize.isDesktopOrLaptop){
                    return '300px'
                }else if(screenSize.isTabletOrMobile){
                    return '350px'
                }
            },
        },
        
    })
    const classes = useStyles()

    return (
        <>
        <Grid container direction="col" style={{ width:'100%'}}>
            <Grid item style={{width: '100%', borderTopLeftRadius:"10%"}} className={classes.gridSize}>
                {user&& <MainFeaturedPost screenSize={screenSize}/>}
            </Grid>

            <Grid container direction="row" spacing={2} justify="center" style={{marginTop: '-3%'}} >
                {/* {screenSize.isDesktopOrLaptop&&<Grid item justify="center" xs={3}>
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
                </Grid>} */}

                <Grid item  xs={screenSize.isDesktopOrLaptop?8:12} >
                    <Grid container  align="space-between" justify="flex-start" spacing={2}>
                        {posts&&  posts.map((post,index) => (
                            <Grid item style={{ width: screenSize.isDesktopOrLaptop?"40%":"100%", height: "500px", border: "solid pink 1px"}}>
                                <FeaturedPost key={index} post={post} index={index} screenSize={screenSize}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
                {/* {screenSize.isDesktopOrLaptop&&<Grid item xs={3}>
                    <Grid contaienr direction="column" spacing={2} align="center">
                    <Grid item>
                    <FriendsCard title="MY FRIENDS"/>
                    </Grid>

                    </Grid>
                </Grid>} */}
            </Grid>
            </Grid>
        </>
    );

}

export default UserProfile;