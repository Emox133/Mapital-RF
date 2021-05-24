import React, {useState} from 'react'
import {Marker} from 'react-leaflet'
import {useGeometry} from './../context/GeometryContext'
import {iconIP, iconSN, iconOL} from './../utils/leafletIcons'
import MarkerDetails from './MarkerDetails'

const MarkerComponent = () => {
    const [open, setOpen] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState()
    const {markers} = useGeometry()

    const handleClose = () => {
        setOpen(false)
    }

    const content = markers.map(marker => {
        let icon

        switch(marker.category) {
            case 'Infrastrukturni Problem':
                icon = iconIP
            break;

            case 'Saobraćajna Nezgoda':
                icon = iconSN
            break;

            case 'Opasne Lokacije':                                                                                                                                                                                                                                                                                  
                icon = iconOL
            break;

            default: return marker.category;
        }

        return <Marker key={marker._id} position={marker.latLng} icon={icon} eventHandlers={{
            click: (e) => {
                setOpen(true)
                setSelectedMarker(marker)
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
