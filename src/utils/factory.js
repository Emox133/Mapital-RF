import axios from 'axios'

export const createMarker = (e, fn, category, description) => {
    const {_latlng} = e.layer
    const latLng = [_latlng.lat, _latlng.lng]
    
    axios.post('/markers', {
        latLng,
        category
    }).then(res => {
        // CLOSE DIALOG
        if(res.status === 201) fn()
    }).catch(err => {
        console.log(err.response)
    })
}

export const createCircle = (e) => {
    const {lat, lng} = e.layer._latlng
    const radius = e.layer._mRadius

    axios.post('/circles', {
        coordinates: [lat, lng],
        radius
    }).then(res => {
        if(res.status === 201) {
            alert('Uspješno ste kreirali krug.')
        }
    }).catch(err => {
        console.log(err.response)
    })
}

export const createPolyline = (e) => {
    const {_latlngs} = e.layer
    const latLngs = []
    _latlngs.map(el => latLngs.push([el.lat, el.lng]))
    
    axios.post('/polylines', {
        latLngs
    }).then(res => {
        if(res.status === 201) {
            alert('Uspješno ste kreirali polyline.')
        }
    }).catch(err => {
        console.log(err.response)
    })
}

export const createRectangle = (e) => {
    const {_northEast, _southWest} = e.layer._bounds

    axios.post('/rectangles', {
        northEast: [_northEast.lat, _northEast.lng],
        southWest: [_southWest.lat, _southWest.lng]
    }).then(res => {
        if(res.status === 201) {
            alert('Uspješno ste kreirali pravougaonik.')
        }
    }).catch(err => {
        console.log(err.response)
    })
}

export const createPolygon = (e) => {
    const {_latlngs} = e.layer
    const latLngs = []
    _latlngs[0].map(el => latLngs.push([el.lat, el.lng]))
    
    axios.post('/polygons', {
        latLngs
    }).then(res => {
        if(res.status === 201) {
            alert('Uspješno ste kreirali poligon.')
        }
    }).catch(err => {
        console.log(err.response)
    })
}