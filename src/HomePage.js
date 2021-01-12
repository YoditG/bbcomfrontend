import { Home } from '@material-ui/icons'
import React from 'react'
import logo from './assets/img/bbcom_homepage.svg.png'
import { Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import brownside from './assets/img/brown_sides.svg'


const HomePage = () =>{

    const useStyles = makeStyles({
        button:{
            border: 'solid 4px rgb(207,106,52) ',
            borderRadius: '10px',
            backgroundColor: 'rgb(207,106,52)',
            color: 'rgb(0,0,0)',
            width: '100px',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: 'rgb(255,255,255)',
            }
        }
    }) 
    const classes = useStyles()

    return(
        
        <Grid container direction="column"  justify="space-around" align="center" style={{paddingTop: '5%'}} spacing={3}>
            <Grid item>
                <img src={logo} alt="logo" style={{width: '30%',marginBottom:'30%'}}/>
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
