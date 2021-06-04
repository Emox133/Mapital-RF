import React, { useEffect } from 'react'
import MapIcon from '@material-ui/icons/Map';
import {Tooltip, IconButton} from '@material-ui/core'
import { useGeometry } from '../context/GeometryContext';

const storedSatelliteView = JSON.parse(localStorage.getItem('satellite-view'))

const SatelliteView = () => {
    const {satelliteView, setSatelliteView} = useGeometry()

    const switchMapTheme = () => {
        setSatelliteView(prevState => !prevState)        
    }

    useEffect(() => {
        localStorage.setItem('satellite-view', satelliteView)
    }, [satelliteView])

    useEffect(() => {
        if(storedSatelliteView) {
            setSatelliteView(storedSatelliteView)
        }
    }, [setSatelliteView])

    return (
        <Tooltip title="Uključi/Isključi satelitski snimak">
            <IconButton style={{color: '#000'}} aria-label="delete" onClick={switchMapTheme}>
                <MapIcon />
            </IconButton>
        </Tooltip>
    )
}

export default SatelliteView
