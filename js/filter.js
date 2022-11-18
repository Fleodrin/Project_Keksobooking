import {debounce} from './util.js';

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

const filterType = ({offer}) => fieldType.value === 'any' ||
  offer.type === fieldType.value;

const filterPrice = ({offer}) => fieldPrice.value === 'any' ||
  (PRICE[fieldPrice.value].min <= offer.price && PRICE[fieldPrice.value].max) >= offer.price;

const filterRoom = ({offer}) => fieldRoom.value === 'any' ||
  offer.rooms === +fieldRoom.value;

const filterGuest = ({offer}) => fieldGuest.value === 'any' ||
  offer.rooms === +fieldGuest.value;

const filterFeature = ({offer}) => {
  const checkedFilters = fieldFeatures.querySelectorAll('input:checked');
  if (offer.features) {
    return Array.from(checkedFilters).every((feature) =>
      offer.features.includes(feature.value));
  }

  return false;
};

const filterAds = (ad) =>
  filterType(ad) &&
  filterPrice(ad) &&
  filterRoom(ad) &&
  filterGuest(ad) &&
  filterFeature(ad);

export const filterForm = (points, cb) => {
  const onChangeFilters = (markers) => () => {
    const filteredListAds = markers.slice()
      .filter(filterAds);

    cb(filteredListAds);
  };

  filtersForm.addEventListener('change', debounce(onChangeFilters(points)));
};
