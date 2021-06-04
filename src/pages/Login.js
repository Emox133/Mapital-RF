import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Grid, Typography, Box, TextField, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useUsers} from './../context/UserContext'
import Logo from './../assets/images/map.svg'
import {ValidateIsEmpty} from './../utils/helpers'
import AlertDialog from './../components/AlertDialog'

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
}))

const Login = () => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [alertOpen, setAlertOpen] = useState(false)
    const history = useHistory()
    const classes = useStyles()
    const {login, requestSucceeded} = useUsers()
    
    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        // 0) Do other stuff
        e.preventDefault()
        const {email, password} = fields

        // 1) Check for empty fields
        if(!ValidateIsEmpty(email, password)) {
            setAlertOpen(true)
            setTimeout(() => {
                setAlertOpen(false)
            }, 3000)
            return
        }

        // 2) Log in the user
        login(fields, history)
    }

    return (
        <Grid container className={classes.gridContainer}>
            {alertOpen && ( 
                    <AlertDialog type="error">
                        Molimo vas unesite e-mail i lozinku.
                    </AlertDialog>
                )
            }
            {requestSucceeded && ( 
                    <AlertDialog type="success">
                        Uspješno ste se ulogovali.
                    </AlertDialog>
                )
            }
            <Grid item xs={false} sm={1} md={3}/>
            <Grid item xs={12} sm={10} md={6}>
                <Box className={classes.content}>
                    <Box className={classes.content__logo_box}>
                        <img src={Logo} alt="logo" className={classes.content__logo} />
                        <Typography variant="h2" color="primary" className={classes.content__title}>
                            Mapital
                        </Typography>
                    </Box>
                    <Box className={classes.formBox}>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField onChange={handleChange} type="email" name="email" className={classes.form__input} id="email-login-id" label="E-Mail" variant="standard" />
                            <TextField onChange={handleChange} type="password" name="password" className={classes.form__input} id="password-login-id" label="Lozinka" variant="standard" />

                            <Button type="submit" className={classes.form__btn} variant="contained" color="primary">Submit</Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={false} sm={1} md={3}/>
        </Grid>
    )
}

export default Login
