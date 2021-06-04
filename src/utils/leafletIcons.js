import L from 'leaflet'
import IconLightBulb from './../assets/images/Rasvjeta.svg'
import IconTraffic from './../assets/images/Saobraćaj.svg'
import IconNoWatter from './../assets/images/Vodosnabdijevanje.svg'
import IconTrash from './../assets/images/Komunalni.svg'
import IconLOC from './../assets/images/location-alt.svg'

export const iconLightBulb = new L.Icon({
    iconUrl: IconLightBulb,
    iconRetinaUrl: IconLightBulb,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export const iconTraffic = new L.Icon({
    iconUrl: IconTraffic,
    iconRetinaUrl: IconTraffic,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(22, 22),
    className: 'leaflet-div-icon'
});

export const iconNoWatter = new L.Icon({
    iconUrl: IconNoWatter,
    iconRetinaUrl: IconNoWatter,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export const iconTrash = new L.Icon({
    iconUrl: IconTrash,
    iconRetinaUrl: IconTrash,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
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
    iconSize: new L.Point(30, 30),
    className: 'leaflet-icon-location'
});
