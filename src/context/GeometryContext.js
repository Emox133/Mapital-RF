import React, {useContext, useState, useCallback} from 'react'
import axios from 'axios'
import * as factory from './../utils/factory'
import {ValidateIsEmpty} from './../utils/helpers'

const GeometryContext = React.createContext()

export const useGeometry = () => {
    return useContext(GeometryContext)
}

const GeometryContextProvider = ({children}) => {
    const [satelliteView, setSatelliteView] = useState(false)
    const [drawCreatedEvent, setDrawCreatedEvent] = useState()
    const [markers, setMarkers] = useState([])
    const [circles, setCircles] = useState([])
    const [mapView, setMapView] = useState([44.44929, 18.64978])
    const [geometryLoading, setGeometryLoading] = useState(false)
    const [filteredFields, setFilteredFields] = useState({
        markers: true,
        circles: true
    })

    const createGeometry = (e, fn, fields) => {
        setDrawCreatedEvent(e)

        switch(e.layerType) {
            case 'circle': {
                const {description} = fields

                fn()
                if(!ValidateIsEmpty(description)) return
                factory.createCircle(e, description)
            }
            break;
    
            case 'polyline': factory.createPolyline(e)
            break;
    
            case 'polygon': factory.createPolygon(e)
            break;
    
            case 'rectangle': factory.createRectangle(e)
            break;

            case 'marker':                 
                // 0) Do other stuff
                const {category, description} = fields

                // 1) Open the dialog
                fn()

                // 2) Check if the fields are empty
                if(!ValidateIsEmpty(category, description)) return
            
                // 3) Send request to the server / create marker
                createMarker(e)
            break;
    
            default: return e.layerType
        }
    }

    const createMarker = (e, setLoading, closeDialog, requestDidSucceed, data) => {
        const { _latlng } = e.layer
        const latLng = [_latlng.lat, _latlng.lng]
        data.append('latLng', latLng)
    
        axios({
            method: "post",
            url: "/markers",
            data,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(setLoading(true)).then(res => {
            // CLOSE DIALOG
            if (res.status === 201) {
                closeDialog()
                setLoading(false)
                requestDidSucceed()
                setMarkers(prevState => [
                    ...prevState,
                    res.data.newMarker
                ])
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    const fetchMarkers = useCallback(() => {
        setGeometryLoading(true)
        axios('/markers').then(res => {
            if(res.status === 200) {
                setGeometryLoading(false)
                setMarkers(res.data.markers)
            }
        }).catch(err => {
            console.log(err.response)
        })
    }, [])

    const fetchCircles = useCallback(() => {
        axios('/circles').then(res => {
            setCircles(res.data.circles)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const value = {
        satelliteView,
        setSatelliteView,
        createGeometry,
        createMarker,
        drawCreatedEvent,
        fetchMarkers,
        markers,
        fetchCircles,
        circles,
        mapView,
        setMapView,
        setGeometryLoading,
        geometryLoading,
        filteredFields,
        setFilteredFields
    }

    return (
        <GeometryContext.Provider value={value}>
            {children}
        </GeometryContext.Provider>
    )
}

export default GeometryContextProvider
