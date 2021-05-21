import React, {useContext, useState} from 'react'
import * as factory from './../utils/factory'
import {ValidateIsEmpty} from './../utils/helpers'

const GeometryContext = React.createContext()

export const useGeometry = () => {
    return useContext(GeometryContext)
}

const GeometryContextProvider = ({children}) => {
    const [drawCreatedEvent, setDrawCreatedEvent] = useState()

    const createGeometry = (e, fn, fields) => {
        setDrawCreatedEvent(e)

        switch(e.layerType) {
            case 'circle': factory.createCircle(e)
            break;
    
            case 'polyline': factory.createPolyline(e)
            break;
    
            case 'polygon': factory.createPolygon(e)
            break;
    
            case 'rectangle': factory.createRectangle(e)
            break;

            case 'marker':                 
                // 0) Do other stuff
                const {name, email, category, description} = fields

                // 1) Open the dialog
                fn()

                // 2) Check if the fields are empty
                if(!ValidateIsEmpty(name, email, category, description)) return
            
                // 3) Send request to the server / create marker
                factory.createMarker(e)
            break;
    
            default: return e.layerType
        }
    }

    const value = {
        createGeometry,
        drawCreatedEvent
    }

    return (
        <GeometryContext.Provider value={value}>
            {children}
        </GeometryContext.Provider>
    )
}

export default GeometryContextProvider
