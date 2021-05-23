import React from 'react'
import {Circle} from 'react-leaflet'
import {useGeometry} from './../context/GeometryContext'

const CircleComponent = () => {
    const {circles} = useGeometry()

    const content = circles.map(circle => {
        return <Circle key={circle._id} center={circle.coordinates} radius={circle.radius}  />
    })

    return content
}

export default CircleComponent
