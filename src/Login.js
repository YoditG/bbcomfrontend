import React from 'react';
import { Button ,form,TextField,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from './assets/img/theme_wolf/logo_final.png'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Login = ({onLogin, onSetCredentials}) =>{

    const useStyles = makeStyles({
        container:{
            position:'absolute',
            left: "50%",
            top: '50%',
            transform: 'translate(-50%,-50%)',
            //width: '50%'
            //height: '50%'
        },
        form:{
            border: 'solid rgb(0,0,0) 2px',
            
            width: '50%',
            height: '11rem',
            paddingTop: '2rem', 
            //marginTop: '-1rem',
            //paddingTop: '25px',
            color: 'rgb(255,255,255)',
            borderRadius: '7px',
            backgroundColor: 'rgb(0,0,0)',
        },

        logo:{
            width: '90%',
            marginLeft: '-5%',
            marginTop: '-5%'
             //marginBottom: '-3%',
             //paddingBottom: '3%'
        },
        title:{
            //paddingTop: '10%',
            //backgroundColor: 'rgb(20,29,184)',
        },
        button:{
            border: 'solid 4px rgb(0,0,0) ',
            borderRadius: '10px',
            backgroundColor: 'rgb(0,0,0)',
            color: 'rgb(255,0,0)',
            width: '100px',
            fontFamily: 'PT Serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
            '&:hover': {
                //color: 'rgb(5,153,251,0.7)',
                backgroundColor: 'rgb(0,0,31.0.0)'
            },
            //marginTop: '2rem',
        },
        forgotButton:{
            color: 'rgb(200,200,200)',
            textDecoratiofn: 'none',
            fontFamily: 'PT Serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
            '&:hover': {
                color: 'rgb(255,0,0)'
            },
            fontSize: '70%',
            marginTop: "-13%",
            marginLeft: "-59%"
        },
        input: {
            backgroundColor: 'rgb(0,0,0)',
            color: 'rgb(200,200,200)'
        },

        textfield:{
            width: '300px',
            height: '35px',
            fontSize: '20px',
            color: 'rgb(200,200,200)',
            //backgroundColor: 'rgb(0,0,0)', 
            borderRadius: '7px',
            
            //border: '2px solid white'

        }
        
    }) 
    const classes = useStyles()

    return (

        <Grid container direction="row" justify="center" align="center" className={classes.container}>
            <Grid item xs={6}>
                <img alt="logo" src={logo} className={classes.logo} />
            </Grid>
            <Grid item style={{ paddingTop: '12%' }} xs={6}>
                <Grid container direction="column" justify="center" align="center" spacing={2}>
                    <Grid item>
                        <div className={classes.title}>

                            <div className={classes.form} >
                                <input 
                                    name="username" 
                                    type="text" 
                                    placeholder="username" 
                                    className={classes.textfield} 
                                    onChange={e => onSetCredentials(e)}/> <br /><br />
                                <input 
                                    name="password" 
                                    type="password" 
                                    placeholder="password" 
                                    className={classes.textfield} 
                                    onChange={e => onSetCredentials(e)} /> <br /><br />
                                <Link style={{ textDecoration: "none" }} to="#">
                                    <Button className={classes.forgotButton}>Forgot password?</Button>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                    <Grid item >
                        <Grid container direction="row" justify="center" spacing={2}>
                            <Grid item>
                                {/* <Link style={{ textDecoration: "none" }}> */}
                                    <Button className={classes.button} onClick={() => onLogin()}>Login</Button>
                                {/* </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    <Button className={classes.button}> Register</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

       

    )
}

export default Login