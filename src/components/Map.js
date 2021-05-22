import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import ToggleDrawing from './ToggleDrawing'

const Map = () => {
    return (
        <MapContainer center={[44.44929, 18.64978]} zoom={15} minZoom={13} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ToggleDrawing />
        </MapContainer>
    )
}

export default Map
