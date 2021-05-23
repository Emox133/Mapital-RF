import React from 'react'
import {Marker} from 'react-leaflet'
import {useGeometry} from './../context/GeometryContext'

const MarkerComponent = () => {
    const {markers} = useGeometry()

    const content = markers.map(marker => {
        return <Marker key={marker._id} position={marker.latLng} />
    })

    return content
}

export default MarkerComponent
