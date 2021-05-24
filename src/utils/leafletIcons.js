import L from 'leaflet'
import IconIP from './../assets/images/Infrastrukturni Problem.svg'
import IconSN from './../assets/images/Saobraćajna Nezgoda.svg'
import IconOL from './../assets/images/Opasne Lokacije.svg'
import IconLOC from './../assets/images/location-alt.svg'

export const iconIP = new L.Icon({
    iconUrl: IconIP,
    iconRetinaUrl: IconIP,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
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
    iconSize: new L.Point(25, 25),
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

export const iconLOC = new L.Icon({
    iconUrl: IconLOC,
    iconRetinaUrl: IconLOC,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(38, 38),
    className: 'leaflet-icon-location'
});
