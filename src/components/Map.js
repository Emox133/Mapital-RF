import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ToggleDrawing from './ToggleDrawing'
import AlertDialog from './AlertDialog'

const Map = () => {
    const [open, setOpen] = useState(false)

    return (
        <MapContainer center={[44.44929, 18.64978]} zoom={13}>
                <AlertDialog isOpen={open} type="info" width="45%" timer={12}>
                    Zahvaljujemo Vam se na unapređenju Sigurnih Staza Živinice! Obeležite lokaciju na mapi, koristeći alate za crtanje u gornjem desnom uglu, dodajte fotografiju i postavite kratak opis.
                </AlertDialog>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[44.44929, 18.64978]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ToggleDrawing isOpen={open} onSetOpen={setOpen}/>
        </MapContainer>
    )
}

export default Map
