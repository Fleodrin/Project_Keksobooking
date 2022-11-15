import {BASIC_POSITION} from './map.js';
import {mainMarker, resetMap} from './map.js';

const HOUSE_TYPE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const form = document.querySelector('.ad-form');
const fieldPrice = form.querySelector('#price');
const fieldType = form.querySelector('#type');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldGuestNumber = form.querySelector('#capacity');
const slider = form.querySelector('.ad-form__slider');
const resetButton = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--invalid'
});

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setAddressValue = () => {
  addressField.value = `${BASIC_POSITION.lat} ${BASIC_POSITION.lng}`;
};

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (input) => Number(input) >= HOUSE_TYPE[fieldType.value] && Number(input) <= 100000;

const getPriceError = () => `Цена от ${HOUSE_TYPE[fieldType.value]} до 100000`;

const validateRoomNumber = () => {
  if (fieldRoomNumber.value === '100' && fieldGuestNumber.value === '0') {
    return true;
  } else if (fieldRoomNumber.value >= fieldGuestNumber.value && fieldGuestNumber.value > '0' && fieldRoomNumber.value !== '100') {
    return true;
  }
};

mainMarker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)} ${evt.target.getLatLng().lng.toFixed(5)}`;
});

setAddressValue();

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`
);

pristine.addValidator(
  fieldPrice,
  validatePrice,
  getPriceError
);

pristine.addValidator(
  fieldRoomNumber,
  validateRoomNumber,
  'Неверное количество комнат'
);

fieldType.addEventListener('change', () => {
  fieldPrice.placeholder = HOUSE_TYPE[fieldType.value];
  pristine.validate(fieldPrice);
});

slider.noUiSlider.on('update', () => {
  fieldPrice.value = slider.noUiSlider.get();
  pristine.validate(fieldPrice);
});

resetButton.addEventListener('click', () => {
  resetMap();
});

fieldGuestNumber.addEventListener('change', () => pristine.validate(fieldRoomNumber));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
