import React, {useState} from 'react'
import {Circle} from 'react-leaflet'
import CircleDetails from './CircleDetails'
import {useGeometry} from './../context/GeometryContext'

const CircleComponent = () => {
    const [open, setOpen] = useState(false)
    const [selectedCircle, setSelectedCircle] = useState()
    const {circles} = useGeometry()

    const handleClose = () => {
        setOpen(false)
    }

    const content = circles.map(circle => {
        return <Circle key={circle._id} center={circle.coordinates} radius={circle.radius} eventHandlers={{
            click: (e) => {
                setOpen(true)
                setSelectedCircle(circle)
            }
        }}  />
    })

    return (
        <>
            {content}
            <CircleDetails isOpen={open} onHandleClose={handleClose} selectedCircle={selectedCircle} />
        </>
    )
}

export default CircleComponent
