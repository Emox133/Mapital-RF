import React, {useState} from 'react'
import DrawingPanel from './DrawingPanel'
import EditLocationIcon from '@material-ui/icons/EditLocation';
import {Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import AlertDialog from './AlertDialog'

const useStyles = makeStyles({
    boxRoot: {
        height: '33px',
        width: '33px',
        background: '#fff',
        position: 'absolute',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px',
        marginTop: '.3rem',
        fontSize: '2.2rem',
        border: '2px solid rgba(0,0,0,.3)',
        borderRadius: '3px',
        lineHeight: '30px',
        cursor: 'pointer'
    }
})

const ToggleDrawing = () => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    
    const toggleHandler = () => {
        const drawingPanel = document.querySelector('.leaflet-draw')
        drawingPanel.classList.toggle('hidden')
        
        setOpen(prevState => !prevState)
    }

    return (
        <>
            <Box className={classes.boxRoot} onClick={toggleHandler}>
                <EditLocationIcon />   
            </Box>
            <DrawingPanel isOpen={open} />
            <AlertDialog isOpen={open} type="success" width="45%">
                Zahvaljujemo Vam se na unapređenju Sigurnih Staza Živinice!
            </AlertDialog>
        </>
    )
};

export default ToggleDrawing