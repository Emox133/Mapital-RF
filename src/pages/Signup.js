import React, {useState} from 'react'
import {Grid, Typography, Box, TextField, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Logo from './../assets/images/map.svg'
import {useUsers} from './../context/UserContext'
import {useHistory} from 'react-router-dom'
import {ValidateIsEmpty} from './../utils/helpers'
import AlertDialog from '../components/AlertDialog'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        minHeight: 'calc(100vh - 64px)'
    },
    content: {
        height: '100%'
    },
    content__logo_box: {
        textAlign: 'center'
    },
    content__logo: {
        height: 150,
        width: 150,
        [theme.breakpoints.up('sm')]: {
            height: 170,
            width: 170
        }
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
        width: '60%'
    },
    form__input: {
        '&:not(:last-child)': {
            marginBottom: '.8rem'
        }
    },
    form__btn: {
        width: '20%',
        margin: '0 auto',
        color: '#fff'
    }
}))

const Signup = () => {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [alertOpen, setAlertOpen] = useState(false)
    const {signup, requestSucceeded, errors} = useUsers()
    const classes = useStyles()
    const history = useHistory()

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    let requestStatusMessage = errors ? 'Polje/a su u neispravnom formatu.' : 'Molimo vas ispunite neophodna polja.'
    
    const handleSubmit = (e) => {
        // 0) Do other stuff
        e.preventDefault()
        const {firstName, lastName, email, password, confirmPassword} = fields

        // 1) Field Validation
        if(!ValidateIsEmpty(firstName, lastName, email, password, confirmPassword)) {
            setAlertOpen(true)
                setTimeout(() => {
                    setAlertOpen(false)
                }, 3000)
            return
        }

        // 2) Sign up the user
        signup(fields, history)
    }

    return (
        <Grid container className={classes.gridContainer}>
            {alertOpen && (
                <AlertDialog type="error">
                    {requestStatusMessage}
                </AlertDialog>
            )}
            {requestSucceeded && (
                <AlertDialog type="success">
                    Uspješno ste napravili račun.
                </AlertDialog>
            )}
            <Grid item xs={false} sm={1} md={3}/>
            <Grid item xs={12} sm={10} md={6} style={{height: '80%'}}>
                <Box className={classes.content}>
                    <Box className={classes.content__logo_box}>
                        <img src={Logo} alt="logo" className={classes.content__logo} />
                        <Typography variant="h2" color="primary" className={classes.content__title}>
                            Mapital
                        </Typography>
                    </Box>
                    <Box className={classes.formBox}>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField type="text" className={classes.form__input} onChange={handleChange} name="firstName" id="firstName" label="Ime" variant="standard" />
                            <TextField type="text" className={classes.form__input} onChange={handleChange} name="lastName" id="lastName" label="Prezime" variant="standard" />
                            <TextField type="email" className={classes.form__input} onChange={handleChange} name="email" id="email" label="E-Mail" variant="standard" />
                            <TextField type="password" className={classes.form__input} onChange={handleChange} name="password" id="password" label="Lozinka" variant="standard" />
                            <TextField type="password" className={classes.form__input} onChange={handleChange} name="confirmPassword" id="confirmPassword" label="Potvrdite Lozinku" variant="standard" />

                            <Button className={classes.form__btn} variant="contained" color="primary" type="submit">Submit</Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={false} item sm={1} md={3} />
        </Grid>
    )
}

export default Signup
