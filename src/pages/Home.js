import React from 'react'
import {Box, Button, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Hero from './../assets/images/map-home.svg'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    screen: {
        height: 'calc(100vh - 64px)',
        width: '100vw',
        overflow: 'hidden'
    },
    content__box: {
        textAlign: 'center',
        padding: '0 2rem',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '2rem'
        }
    },
    content__title: {
        fontSize: '3rem',
        fontFamily: 'Caveat, cursive',
        marginTop: '3rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '4rem'
        }
    },
    content__subtitle: {
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.3rem'
        }
    },
    landing__box: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '2rem',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    },
    landing__image: {
        height: 200,
        [theme.breakpoints.up('sm')]: {
            height: 250,
            marginRight: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            height: 400
        },
        [theme.breakpoints.up('lg')]: {
            height: 500
        }
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.screen}>
            <Grid item xs={12} md={6} className={classes.content__box}>
                <Box>
                    <Typography className={classes.content__title} variant="h2">
                        Hello from Mapital app
                    </Typography>
                    <Typography style={{color: '#666'}} variant="h6" className={classes.content__subtitle}>
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                        lorem ipsum dolor sir amet.
                    </Typography>
                    <Button component={Link} to="/map" style={{marginTop: '1rem', color: '#fff'}} variant="contained" color="primary">Get Started</Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} className={classes.landing__box}>
                <img src={Hero} alt="landing page" className={classes.landing__image} />
            </Grid>
        </Grid>
    )
}

export default Home
