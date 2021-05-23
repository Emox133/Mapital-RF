import React from 'react'
import {Box, Button, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Hero from './../assets/images/map-home.svg'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
    screen: {
        height: 'calc(100vh - 64px)',
        width: '100vw',
        overflow: 'hidden'
    },
    content__box: {
        width: '50%',
        textAlign: 'center',
        paddingLeft: '2rem'
        // padding: '2rem'
    },
    content__title: {
        fontFamily: 'Caveat, cursive',
        marginTop: '3rem'
    },
    content__subtitle: {
        
    },
    landing__box: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    landing__image: {
        height: 500,
        marginRight: '2rem',
        marginBottom: '25rem'
    }
})

const Home = () => {
    const classes = useStyles()
    return (
        <Box className={classes.screen}>
            <Box className={classes.content__box}>
                <Box>
                    <Typography className={classes.content__title} variant="h2">
                        Hello from Mapital app
                    </Typography>
                    <Typography style={{color: '#666'}} variant="h6" className={classes.content_subtitle}>
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
            </Box>
            <Box className={classes.landing__box}>
                <img src={Hero} alt="landing page" className={classes.landing__image} />
            </Box>
        </Box>
    )
}

export default Home
