import L from 'leaflet'
import IconIP from './../assets/images/Infrastrukturni Problem.svg'
import IconSN from './../assets/images/Saobraćajna Nezgoda.svg'
import IconOL from './../assets/images/Opasne Lokacije.svg'

export const iconIP = new L.Icon({
    iconUrl: IconIP,
    iconRetinaUrl: IconIP,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-div-icon'
});

export const iconSN = new L.Icon({
    iconUrl: IconSN,
    iconRetinaUrl: IconSN,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(28, 28),
    className: 'leaflet-div-icon'
});

export const iconOL = new L.Icon({
    iconUrl: IconOL,
    iconRetinaUrl: IconOL,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25),
    className: 'leaflet-div-icon'
});
