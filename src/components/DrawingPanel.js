import React from 'react'
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

const DrawingPanel = () => {

    const createGeometry = (e) => {
        switch(e.layerType) {
            case 'circle': console.log('circle')
            break;

            case 'marker': console.log('marker')
            break;

            case 'polyline': console.log('polyline')
            break;

            case 'polygon': console.log('polygon')
            break;

            case 'rectangle': console.log('rectangle')
            break;

            default: return e.layerType
        }
    }

    const content = (
        <FeatureGroup>
             <EditControl
                position='topleft'
                onCreated={(e) => createGeometry(e)}
                draw={{
                    circlemarker: false
                }}
            />
        </FeatureGroup> 
    ) 

    return content
}

export default DrawingPanel