import React, {useState} from 'react'
import {Box, Typography, Checkbox, FormGroup, FormControlLabel, Tooltip} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useGeometry } from '../context/GeometryContext'
import CancelIcon from '@material-ui/icons/Cancel';
import { useUsers } from '../context/UserContext';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles(theme => ({
    filterPanel: {
        width: '100vw',
        height: 'calc(100% + 64px - 1.6rem)',
        position: 'fixed',
        background: '#fff',
        zIndex: 30000,
        borderRadius: '.5rem',
        padding: '.5rem 1rem',
        top: 0,
        // display: 'none',
        [theme.breakpoints.up('sm')]: {
            width: 240,
            height: 400,
            top: '7.5rem',
            right: '1rem',
        }
    },
    filterPanel__cancel_box: {
        position: 'relative'
    },
    filterPanel__cancel_icon: {
        position: 'absolute',
        right: '-.5rem',
        top: '.5rem',
        cursor: 'pointer'
    },  
    filterPanel__input: {},
    filterPanel__title: {
        fontFamily: 'Caveat, cursive',
        fontSize: '2.5rem',
        textAlign: 'center',
        margin: '.8rem 0',
        letterSpacing: '.1em'
    }
}))

const FilterPanel = () => {
    const [open, setOpen] = useState(true)
    const {filteredFields, setFilteredFields} = useGeometry()
    const {user} = useUsers()
    const classes = useStyles()

    const handleToggle = () => {
        setOpen(prevState => !prevState)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setFilteredFields({
            ...filteredFields,
            [e.target.name]: e.target.checked
        })
    }

    return (
        <>
            {open &&
            <Box className={classes.filterPanel}>
                <Box className={classes.filterPanel__cancel_box}>
                    <CancelIcon color="secondary" className={classes.filterPanel__cancel_icon} onClick={handleClose} />
                </Box>
                <Typography variant="h5" color="secondary" className={classes.filterPanel__title}>Filteri</Typography>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox name="markers" checked={filteredFields.markers} onChange={handleChange} />}
                        label="Markeri"
                    />
                    {user && user[0].role === 'admin' &&
                        <FormControlLabel 
                            control={<Checkbox name="circles" checked={filteredFields.circles} onChange={handleChange} />}
                            label="Krugovi"
                        />
                    }
                </FormGroup>
            </Box>}
            <Box className="leaflet__icons" style={{right: '1rem'}} onClick={handleToggle}>
                <Tooltip title="Filteri">
                    <ListAltIcon style={{color: '#000'}} />
                </Tooltip>
            </Box>
        </>
    )
}

export default FilterPanel
