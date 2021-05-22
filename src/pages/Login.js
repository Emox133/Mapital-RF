import React from 'react'
import {Grid, Typography, Paper, Box, TextField, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Logo from './../assets/images/map.svg'

const useStyles = makeStyles({
    gridContainer: {
        height: '100vh'
    },
    content: {
        height: '100%'
    },
    content__logo_box: {
        textAlign: 'center'
    },
    content__logo: {
        height: 170,
        width: 170
    },
    content__title: {
        fontFamily: 'Caveat, cursive',
        letterSpacing: '.1em'
    },
    formBox: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        width: '60%',
        marginTop: '.8rem'
    },
    form__input: {
        '&:not(:last-child)': {
            marginBottom: '1rem'
        }
    },
    form__btn: {
        width: '20%',
        margin: '0 auto',
        color: '#fff'
    }
})

const Login = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item sm={3}/>
            <Grid item sm={6}>
                <Paper elevation={1} className={classes.content}>
                    <Box className={classes.content__logo_box}>
                        <img src={Logo} alt="logo" className={classes.content__logo} />
                        <Typography variant="h2" color="primary" className={classes.content__title}>
                            Mapital
                        </Typography>
                    </Box>
                    <Box className={classes.formBox}>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField className={classes.form__input} id="outlined-basic" label="E-Mail" variant="outlined" />
                            <TextField className={classes.form__input} id="outlined-basic" label="Lozinka" variant="outlined" />

                            <Button className={classes.form__btn} variant="contained" color="primary">Submit</Button>
                        </form>
                    </Box>
                </Paper>
            </Grid>
            <Grid item sm={3} />
        </Grid>
    )
}

export default Login
