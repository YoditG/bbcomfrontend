import React from 'react'
import { Grid } from '@material-ui/core'
import Cam from './Cam'

const CamComponent = () => {
    return (
        <Grid container justify="center" >
            <Grid item xs={8} style={{ border: "solid 2px green" }}>
                <Grid container style={{ width: "40%" }} justify="center">
                    <Grid item>
                        <Cam />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CamComponent