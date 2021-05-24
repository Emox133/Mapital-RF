import React from 'react'
import {Marker} from 'react-leaflet'
import {useGeometry} from './../context/GeometryContext'
import {iconIP, iconSN, iconOL} from './../utils/leafletIcons'

const MarkerComponent = () => {
    const {markers} = useGeometry()

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

        return <Marker key={marker._id} position={marker.latLng} icon={icon} />
    })

    return content
}

export default MarkerComponent
