import React, {useState, Fragment} from 'react'
import {Circle} from 'react-leaflet'
import CircleDetails from './CircleDetails'
import {useGeometry} from './../context/GeometryContext'
import { useUsers } from '../context/UserContext'

const CircleComponent = () => {
    const [open, setOpen] = useState(false)
    const [selectedCircle, setSelectedCircle] = useState()
    const {circles} = useGeometry()
    const {user} = useUsers()

    const handleClose = () => {
        setOpen(false)
    }

    const content = circles.map(circle => {
        return (
            <Fragment key={circle._id}>
                <Circle center={circle.coordinates} radius={circle.radius} eventHandlers={{
                    click: (e) => {
                        setOpen(true)
                        setSelectedCircle(circle)
                    }
                }}  />
                <CircleDetails isOpen={open} onHandleClose={handleClose} selectedCircle={selectedCircle} />
            </Fragment>
        )
    })

    return user && user[0].role === 'admin' ? content : null
}

export default CircleComponent
