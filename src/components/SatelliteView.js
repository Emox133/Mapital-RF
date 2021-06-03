import React from 'react'
import MapIcon from '@material-ui/icons/Map';
import {Tooltip, IconButton} from '@material-ui/core'
import { useGeometry } from '../context/GeometryContext';

const SatelliteView = () => {
    const {satelliteView, setSatelliteView} = useGeometry()

    const switchMapTheme = () => {
        setSatelliteView(prevState => {
            return !prevState
        })
        localStorage.setItem('satellite-view', satelliteView)
    }

    return (
        <Tooltip title="Prebaci se na satelitski snimak">
            <IconButton style={{color: '#000'}} aria-label="delete" onClick={switchMapTheme}>
                <MapIcon />
            </IconButton>
        </Tooltip>
    )
}

export default SatelliteView
