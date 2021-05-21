import React, {useState} from 'react'
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import {ValidateIsEmpty} from './../utils/helpers'
import * as factory from './../utils/factory'
import FormMarker from './FormMarker'

const DrawingPanel = () => {
    const [open, setOpen] = useState(false)
    const [mapEvent, setMapEvent] = useState()
    const [fields, setFields] = useState({
        name: '',
        email: '',
        description: '',
        category: 'Infrastrukturni Problem'
    })
  
    const handleOpen = () => {
        setOpen(true)
    }

    const createGeometry = (e) => {
        setMapEvent(e)
        switch(e.layerType) {
            case 'circle': console.log('circle')
            break;
    
            case 'marker': {                
                // 0) Do other stuff
                const {name, email, category, description} = fields
    
                // 1) Open the dialog
                handleOpen()

                // 2) Check if the fields are empty
                if(!ValidateIsEmpty(name, email, category, description)) return

                // 3) Send request to the server / create marker
                factory.createMarker(e)

                // 4) Close the dialog and inform the user about request succession
            }
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
        <>
            <FeatureGroup>
                <EditControl
                    position='topleft'
                    onCreated={(e) => createGeometry(e)}
                    draw={{
                        circlemarker: false
                    }}
                    edit={{
                        edit: false
                    }}
                />
            </FeatureGroup> 
            <FormMarker setIsOpen={setOpen} open={open} fields={fields} setFields={setFields} mapEvent={mapEvent} />
        </>
    ) 

    return content
}

export default DrawingPanel