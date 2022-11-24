import {debounce} from './util.js';
import {getLocalData, MAX_MARKERS_COUNT} from './data.js';
import {renderMarkers} from './map.js';

const PRICE = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

const filtersForm = document.querySelector('.map__filters');
const fieldType = filtersForm.querySelector('#housing-type');
const fieldPrice = filtersForm.querySelector('#housing-price');
const fieldRoom = filtersForm.querySelector('#housing-rooms');
const fieldGuest = filtersForm.querySelector('#housing-guests');
const fieldFeatures = filtersForm.querySelector('#housing-features');

const filterByType = ({offer}) => fieldType.value === 'any' ||
  offer.type === fieldType.value;

const filterByPrice = ({offer}) => fieldPrice.value === 'any' ||
  (PRICE[fieldPrice.value].min <= offer.price && PRICE[fieldPrice.value].max) >= offer.price;

const filterByRoom = ({offer}) => fieldRoom.value === 'any' ||
  offer.rooms === +fieldRoom.value;

const filterByGuest = ({offer}) => fieldGuest.value === 'any' ||
  offer.guests === +fieldGuest.value;

const filterByFeature = ({offer}) => {
  const checkedFilters = fieldFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFilters).every((feature) => {
    if (!checkedFilters) {
      return true;
    }
    if (!offer.features) {
      return false;
    }

    return offer.features.includes(feature.value);
  });
};

const filterAds = (ad) =>
  filterByType(ad) &&
  filterByPrice(ad) &&
  filterByRoom(ad) &&
  filterByGuest(ad) &&
  filterByFeature(ad);

const changeFilters = () => {
  const markers = getLocalData();
  const filteredListAds = [];

  for (const marker of markers) {
    if (filterAds(marker)) {
      filteredListAds.push(marker);
    }
    if (filteredListAds.length >= MAX_MARKERS_COUNT) {
      break;
    }
  }

  renderMarkers(filteredListAds);
};

const onChangeFilters = debounce(changeFilters);

filtersForm.addEventListener('change', onChangeFilters);
