import React, {useEffect, useState} from 'react'
import {Marker} from 'react-leaflet'
import { iconLOC } from '../utils/leafletIcons'

const Navigator = () => {
    const [usersLocation, setUsersLocation] = useState([0, 0]) 
    console.log(usersLocation)

    const getUsersLocation = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            const {latitude, longitude} = location.coords
            setUsersLocation([latitude, longitude])
        }, (err) => console.log(err))    
    }

    useEffect(() => {
        getUsersLocation()
    }, [])

    return usersLocation ? <Marker position={usersLocation} icon={iconLOC} /> : null
}

export default Navigator
