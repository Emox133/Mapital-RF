import React, {useState} from 'react'
import DrawingPanel from './DrawingPanel'
import EditLocationIcon from '@material-ui/icons/EditLocation';
import {Box, useMediaQuery} from '@material-ui/core'
import AlertDialog from './AlertDialog'
import MarkerCreationTutorial from './MarkerCreationTutorial'

const ToggleDrawing = () => {
    const [open, setOpen] = useState(false)
    const isActive = useMediaQuery('(max-width: 600px)')
    
    const toggleHandler = () => {
        const drawingPanel = document.querySelector('.leaflet-draw')
        drawingPanel.classList.toggle('hidden')
        
        setOpen(prevState => !prevState)
    }

    return (
        <>
            <Box className="leaflet__icons" onClick={toggleHandler}>
                <EditLocationIcon />   
            </Box>
            <Box className="leaflet__icons leaflet__icons--help">
                <MarkerCreationTutorial />
            </Box>
            <DrawingPanel isOpen={open} />
            <AlertDialog isOpen={open} type="success" width={isActive ? '70%' : '45%'}>
                Zahvaljujemo Vam se na unapređenju Sigurnih Staza Živinice!
            </AlertDialog>
        </>
    )
};

export default ToggleDrawing