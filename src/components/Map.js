import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { MapContainer, TileLayer} from 'react-leaflet'
import ToggleDrawing from './ToggleDrawing'
import Marker from './Marker'
import Circle from './Circle'
import Navigator from './Navigator'
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { useGeometry } from '../context/GeometryContext'

const Map = () => {
    const northEastBounds = [44.49589310341624, 18.781642913818363]
    const southWestBounds = [44.40275975498712, 18.517971038818363]
    const bounds = [northEastBounds, southWestBounds]
    const history = useHistory()
    const {satelliteView, setSatelliteView} = useGeometry()
    const satelliteViewLocalStorage = localStorage.getItem('satellite-view')
    
    useEffect(() => {
        history.replace('/map')
    }, [history])

    useEffect(() => {
        if(satelliteViewLocalStorage) {
            setSatelliteView(satelliteView)
        }
    }, [satelliteViewLocalStorage, satelliteView, setSatelliteView])

    return (
        <MapContainer center={[44.44929, 18.64978]} zoom={16} minZoom={13} maxBounds={bounds}>
            {!satelliteView ?
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> : 
            <ReactLeafletGoogleLayer type={"hybrid"} minZoom={11} />}
            <ToggleDrawing />
            <Navigator />
            <Marker />
            <Circle />
        </MapContainer>
    )
}

export default Map

