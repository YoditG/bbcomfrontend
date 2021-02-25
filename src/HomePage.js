import React from 'react'
import logo from './assets/img/theme_wolf/logo_final.png'
import { Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const HomePage = () =>{

    const useStyles = makeStyles({
        button:{
            border: 'solid 4px rgb(0,0,0) ',
            borderRadius: '10px',
            backgroundColor: 'rgb(0,0,0)',
            color: 'rgb(255,0,0)',
            width: '100px',
            fontFamily: 'PT Serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
        }
    }) 
    const classes = useStyles()

    return(
        
        <Grid container direction="column"  justify="center" align="center"  spacing={3}>
            <Grid item>
                <img src={logo} alt="logo" style={{width: '50%',marginBottom:'-8%'}}/>
            </Grid>
            <Grid item>
                <Grid container direction="row" justify="center" align="flex-end"  spacing={10}>
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
