import React, {useEffect, useState} from 'react'
import {Marker} from 'react-leaflet'
import { iconLOC } from '../utils/leafletIcons'

const Navigator = () => {
    const [usersLocation, setUsersLocation] = useState([0, 0]) 

    const getUsersLocation = () => {
        if(navigator) {
            navigator.geolocation.getCurrentPosition((location) => {
                const {latitude, longitude} = location.coords
                setUsersLocation([latitude, longitude])
            }, (err) => console.log('Enable your location.'))    
        }
    }

    useEffect(() => {
        getUsersLocation()
    }, [])

    return usersLocation ? <Marker position={usersLocation} icon={iconLOC} /> : null
}

export default Navigator
