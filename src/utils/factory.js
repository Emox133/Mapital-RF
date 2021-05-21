import axios from 'axios'

export const createMarker = (e, category, description) => {
    const {_latlng} = e.layer
    const latLng = [_latlng.lat, _latlng.lng]
    
    axios.post('http://localhost:8000/api/v1/markers', {
        latLng,
        category
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err.response)
    })
}