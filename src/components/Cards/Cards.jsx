import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ cardData:{ confirmed, recovered, deaths, lastUpdate } }) =>{

    const easeOutCubic = (t, b, c, d) => {
		return c*((t=t/d-1)*t*t + 1) + b*t;
    };

    if(!lastUpdate){
        return 'Loading...'
    }

    const cards = (
        lastUpdate
            ? (<Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.infected) }>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={confirmed} useEasing={true} easingFn={ easeOutCubic } duration={1.5} separator="," />
                    </Typography>
                    <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                    <Typography variant="body2">Number of Active Cases of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.recovered) }>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={recovered} duration={1.5} separator="," />
                    </Typography>
                    <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                    <Typography variant="body2">Number of Recoveries From COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={ cx(styles.card, styles.deaths) }>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={deaths} duration={1.5} separator="," />
                    </Typography>
                    <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                    <Typography variant="body2">Number of Deaths From COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>) : null
    );

    return (
        <div className={styles.container}>
            { cards }
        </div>
    );
}

export default Cards;