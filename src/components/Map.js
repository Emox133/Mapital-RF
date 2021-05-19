import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {
    return (
        <MapContainer center={[44.44929, 18.64978]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[44.44929, 18.64978]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map