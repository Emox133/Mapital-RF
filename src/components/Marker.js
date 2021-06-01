import React, {useState} from 'react'
import {Marker, useMap} from 'react-leaflet'
import {useGeometry} from './../context/GeometryContext'
import {iconLightBulb, iconTraffic, iconNoWatter, iconTrash} from './../utils/leafletIcons'
import MarkerDetails from './MarkerDetails'

const MarkerComponent = () => {
    const [open, setOpen] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState()
    const {markers, markerView, setMarkerView} = useGeometry()

    const map = useMap()
    map.setView(markerView)

    const handleClose = () => {
        setOpen(false)
    }

    const content = markers.map(marker => {
        let icon

        switch(marker.category) {
            case 'Rasvjeta':
                icon = iconLightBulb
            break;

            case 'Saobraćaj':
                icon = iconTraffic
            break;

            case 'Vodosnabdijevanje':                                                                                                                                                                                                                                                                                  
                icon = iconNoWatter
            break;

            case 'Komunalni':                                                                                                                                                                                                                                                                                  
                icon = iconTrash
            break;

            default: return marker.category;
        }

        return <Marker key={marker._id} position={marker.latLng} icon={icon} eventHandlers={{
            click: (e) => {
                setOpen(true)
                setSelectedMarker(marker)
                setMarkerView(marker.latLng)
            }
        }} />
    })

    return (
        <>
            {content}
            <MarkerDetails isOpen={open} onHandleClose={handleClose} selectedMarker={selectedMarker} />
        </>
    )
}

export default MarkerComponent
