import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import ToggleDrawing from './ToggleDrawing'
import Marker from './Marker'
// import Circle from './Circle'

const Map = () => {
    return (
        <MapContainer center={[44.44929, 18.64978]} zoom={15} minZoom={13} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ToggleDrawing />
            <Marker />
            {/* <Circle /> */}
        </MapContainer>
    )
}

export default Map
