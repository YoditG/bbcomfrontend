import React from 'react';
import { Grid, Paper, Typography,CardActionArea,Card,CardContent,Hidden,CardMedia, Link } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const SideCard = (props)=>{

    const useStyles = makeStyles({
        sideCard: {
            position: 'relative',
            //backgroundImage: `url(${background})`,
            //backgroundColor: '#aa0000',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '20px',
            color: 'white'
            
          },
          card: {
            display: 'flex',
            //backgroundImage: `url(${background})`,
            backgroundColor: 'rgb(13,44,41)',
            width: '100%',
            
          },
          cardDetails: {
            flex: 1,
            flexDirection: "column",
            margin: '10px',
          },
          linkStyles:{
              color: 'white',
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
                            <Link href="#" underline="none" className={classes.linkStyles}  >one event</Link> <br />
                            <Link href="#" underline="none" className={classes.linkStyles} >another event</Link> <br />
                            <Link href="#" underline="none" className={classes.linkStyles} >wow I am so busy...</Link>
                        </Typography>

                        <Typography variant="subtitle1" color="primary" >
                            <Link href="#" underline="none" className={classes.linkStyles} >All events...</Link>
                        </Typography>
                    </CardContent>
                </div>
            </Card>

            {/* <Typography>description</Typography> */}
        </Paper>
    )

}

export default SideCard