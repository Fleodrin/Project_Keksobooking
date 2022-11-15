import {enableForm} from './toggle-status.js';
import {listAd} from './data.js';
import {createAdElement} from './element.js';

const BASIC_POSITION = {
  lat: 35.68172,
  lng: 139.75392,
};
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

export {BASIC_POSITION};

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView(BASIC_POSITION, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker(
  BASIC_POSITION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const resetMap = () => {
  mainMarker.setLatLng(BASIC_POSITION);
  map.setView(BASIC_POSITION, 12);
};

export {mainMarker, resetMap};

const createMarkers = (points = listAd()) => {
  points.forEach((point) => {
    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(createAdElement(point));
  });
};

createMarkers();
