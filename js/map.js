import {enableForm} from './toggle-status.js';
import {getData} from './api.js';
import {createAdElement} from './element.js';
import {BASIC_POSITION, setAddressValue} from './form.js';
import {filterForm} from './filter.js';

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    setAddressValue(BASIC_POSITION.lat, BASIC_POSITION.lng);
  })
  .setView(BASIC_POSITION, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainMarker = L.marker(
  BASIC_POSITION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.on('moveend', (evt) => {
  setAddressValue(evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5));
});

mainMarker.addTo(map);

export const resetMap = () => {
  mainMarker.setLatLng(BASIC_POSITION);
  map.setView(BASIC_POSITION, 12);
};

const createMarker = (point) => L.marker(
  {
    lat: point.location.lat,
    lng: point.location.lng,
  },
  {
    icon: pinIcon,
  },
);

const createMarkers = ((points) => {
  markerGroup.clearLayers();
  points.slice(0, 10).forEach((point) => {
    createMarker(point)
      .addTo(markerGroup)
      .bindPopup(createAdElement(point));
  });
});

const renderMarkers = () => {
  getData((points) => {
    createMarkers(points);
    (filterForm(points, createMarkers));
  });
};

renderMarkers();
