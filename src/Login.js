import React from 'react';
import { Button ,form,TextField,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from './assets/img/bbcom_orange_logo_title.png'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Login = ({onLogin, onSetCredentials}) =>{

    const useStyles = makeStyles({
        form:{
            border: 'solid #000 4px',
            width: 'fit-content',
            padding: '10px', 
            paddingTop: '25px',
            color: 'rgb(14,44,41)',
            borderRadius: '7px'
        },

        logo:{
             width: '40%',
        },
        title:{
            paddingTop: '10%',
          
        },
        button:{
            border: 'solid 1px rgb(247,95,16) ',
            color: 'rgb(247,95,16)',
            width: '100px'
        }
        
    }) 
    const classes = useStyles()

    return (

        <Grid container justify="center">
             <div className={classes.title}>
        {/* <h1 style={{color: 'rgb(247,95,16)'}}> Log In</h1> */}
             <img alt="logo" src={logo} className={classes.logo}/>
            <div className={classes.form} >
       
            <label for="username"> Username </label> <br/><br/>
            <input name="username" type="text" placeholder="username" style={{width: '500px',height: '50px',fontSize: 'larger'}} onChange={e => onSetCredentials(e)}/> <br/><br/>
            <label for="password"> Password </label> <br/><br/>
            <input name="password" type="password" placeholder="password" style={{width: '500px',height: '50px',fontSize: 'larger'}} onChange={e => onSetCredentials(e)}/> <br/><br/>

            <Link to="/user" style={{textDecoration:"none"}}><Button className={classes.button} onClick={() => onLogin()}>Login</Button></Link>
            </div>
        </div>
        </Grid>
    
       

    )
}

export default Login