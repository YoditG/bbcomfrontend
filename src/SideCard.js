import React from 'react';
import {  Paper, Typography,Card,CardContent, Link } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const SideCard = (props)=>{

    const useStyles = makeStyles({
        sideCard: {
            position: 'relative',
            backgroundColor: 'rgb(255,255,255,0.0)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white'
            
          },
          card: {
            display: 'flex',
            borderRadius: '20px',
            backgroundColor: 'rgb(0,0,0)',
            width: '100%',
            
          },
          cardDetails: {
            flex: 1,
            flexDirection: "column",
            margin: '10px',
          },
          linkStyles:{
              color: 'rgb(200,200,200)',
              '&:hover': {
                textShadow: "0 0 3px rgb(200,200,200), 0 0 5px rgb(200,200,200,0.7)",
            },
          }
    })

    const classes = useStyles()
    return (
        <Paper elevation={0} className={classes.sideCard}>

            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent >
                        <Typography component="h2" variant="h5">
                            <Link href="#" underline="none" className={classes.linkStyles} >{props.title}</Link>
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="#" underline="none" className={classes.linkStyles}  >The Basketball Tour..., 12/16/2020</Link> <br />
                            <Link href="#" underline="none" className={classes.linkStyles} >TSV Berghausen vs TB..., 01/10/2021</Link> <br />                        </Typography>

                        <Typography variant="subtitle1" color="primary" >
                            <Link href="#" underline="none" className={classes.linkStyles} >All events...</Link>
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Paper>
    )

}

export default SideCard