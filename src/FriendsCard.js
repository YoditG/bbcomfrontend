import React from 'react';
import { Grid, Paper, Typography,CardActionArea,Card,CardContent,Hidden,CardMedia, Link } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const SideCard = (props)=>{

    const useStyles = makeStyles({
        sideCard: {
            position: 'relative',
            //backgroundImage: `url(${background})`,
            backgroundColor: 'rgb(255,255,255,0.0)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '20px',
            
          },
          card: {
            display: 'flex',
            borderRadius: '20px',
            //backgroundImage: `url(${background})`,
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
                //color: 'rgb(5,153,251,0.7)',
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
                            <Link href="#" underline="none" className={classes.linkStyles}>{props.title}</Link>
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary">
                            <Link href="#" underline="none" className={classes.linkStyles} >Grand Göran</Link> <br />
                            <Link href="#" underline="none" className={classes.linkStyles} >Mighty Martin</Link> <br />
                            <Link href="#" underline="none" className={classes.linkStyles} >Raphi Di Duckie</Link>
                        </Typography>

                        <Typography variant="subtitle1" color="primary" >
                            <Link href="#" underline="none" className={classes.linkStyles} >All friends...</Link>
                        </Typography>
                    </CardContent>
                </div>
            </Card>

            {/* <Typography>description</Typography> */}
        </Paper>
    )

}

export default SideCard