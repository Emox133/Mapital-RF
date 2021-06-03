import React, {useState, useEffect} from 'react'
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import FormMarker from './FormMarker'
import FormCircle from './FormCircle'
import {useGeometry} from './../context/GeometryContext'
import { useUsers } from '../context/UserContext';

const DrawingPanel = () => {
    const [open, setOpen] = useState(false)
    const {authenticated, user} = useUsers()
    const [fields, setFields] = useState({
        name: '',
        sender: '',
        description: '',
        category: '',
        photo: ''
    })

    const {drawCreatedEvent, createGeometry} = useGeometry()
  
    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        if((user && user[0].role === 'user') || (user && user.length === 0) || !authenticated) {
            const circle = document.querySelector('.leaflet-draw-draw-circle')
            circle.style.display = 'none'
        }
    }, [user, authenticated])

    const content = (
        <>
            <FeatureGroup>
                <EditControl
                    position='topleft'
                    onCreated={(e) => createGeometry(e, handleOpen, fields)}
                    draw={{
                        circlemarker: false,
                        circle: true,
                        polygon: false,
                        polyline: false,
                        rectangle: false
                    }}
                    edit={{
                        edit: false
                    }}
                />
            </FeatureGroup> 
            {drawCreatedEvent && drawCreatedEvent.layerType === 'marker' && <FormMarker setIsOpen={setOpen} open={open} fields={fields} setFields={setFields} mapEvent={drawCreatedEvent} />}
            {drawCreatedEvent && drawCreatedEvent.layerType === 'circle' && <FormCircle setIsOpen={setOpen} open={open} fields={fields} setFields={setFields} mapEvent={drawCreatedEvent} />}
        </>
    ) 

    return content
}

export default DrawingPanel