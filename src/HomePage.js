import { Home } from '@material-ui/icons'
import React from 'react'
import logo from './assets/img/bbcom_homepage.svg.png'
import { Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const HomePage = () =>{

    const useStyles = makeStyles({
        button:{
            border: 'solid 1px rgb(247,95,16) ',
            color: 'rgb(247,95,16)',
            width: '100px'
        }
    }) 
    const classes = useStyles()

    return(
        <Grid container direction="column"  justify="center" align="center" style={{paddingTop: '5%'}} spacing={3}>
        <Grid item>
        <img src={logo} alt="logo" style={{width: '30%'}}/>
        </Grid>
        <Grid item>
            <Grid container direction="row" justify="center" align="center" style={{paddingTop: '15%'}} spacing={10}>
                <Grid item>
                <Link to="/login" style={{textDecoration:"none"}}><Button className={classes.button}> Login</Button></Link>
                </Grid>
                <Grid item>
                <Link to="/register" style={{textDecoration:"none"}}><Button className={classes.button}> Register</Button></Link>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    )
}

export default HomePage
