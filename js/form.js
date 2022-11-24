import {renderMarkers, resetMap} from './map.js';
import {sendData} from './api.js';
import {showSuccess, showError} from './dialog.js';
import {getLocalDataMax} from './data.js';
import {avatarPreview, photoPreviewContainer} from './photo.js';

export const BASIC_POSITION = {
  lat: 35.68172,
  lng: 139.75392,
};
const HOUSE_TYPE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const SLIDER_PRICE_START = 1000;
const SLIDER_PRICE_MAX = 100000;
const SLIDER_STEP = 100;

const form = document.querySelector('.ad-form');
export const filtersForm = document.querySelector('.map__filters');
const fieldAddress = form.querySelector('#address');
const fieldPrice = form.querySelector('#price');
const fieldType = form.querySelector('#type');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldGuestNumber = form.querySelector('#capacity');
const fieldTimein = form.querySelector('#timein');
const fieldTimeout = form.querySelector('#timeout');
const slider = form.querySelector('.ad-form__slider');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

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
    max: SLIDER_PRICE_MAX,
  },
  start: SLIDER_PRICE_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to(value) {
      return value.toFixed(0);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

export const setAddressValue = (lat, lng) => {
  fieldAddress.value = `${lat}, ${lng}`;
};

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (input) => Number(input) >= HOUSE_TYPE[fieldType.value] && Number(input) <= SLIDER_PRICE_MAX;

const getPriceError = () => `Цена от ${HOUSE_TYPE[fieldType.value]} до ${SLIDER_PRICE_MAX}`;

const validateRoomNumber = () => {
  if (fieldRoomNumber.value === '100' && fieldGuestNumber.value === '0') {
    return true;
  } else if (fieldRoomNumber.value >= fieldGuestNumber.value && fieldGuestNumber.value > '0' && fieldRoomNumber.value !== '100') {
    return true;
  }
};

const resetForm = () => {
  resetMap();
  form.reset();
  filtersForm.reset();
  renderMarkers(getLocalDataMax());
  setAddressValue(BASIC_POSITION.lat, BASIC_POSITION.lng);
  slider.noUiSlider.updateOptions({
    start: SLIDER_PRICE_START,
  });
  pristine.reset();
  fieldPrice.placeholder = HOUSE_TYPE[fieldType.value];
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreviewContainer.innerHTML = '';
};

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

fieldPrice.addEventListener('input', () => {
  slider.noUiSlider.set(fieldPrice.value);
});

slider.noUiSlider.on('slide', () => {
  fieldPrice.value = slider.noUiSlider.get();
  pristine.validate(fieldPrice);
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

fieldGuestNumber.addEventListener('change', () => pristine.validate(fieldRoomNumber));

fieldTimein.addEventListener('change', () => {
  fieldTimeout.value = fieldTimein.value;
});

fieldTimeout.addEventListener('change', () => {
  fieldTimein.value = fieldTimeout.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const sendSuccess = () => {
  resetForm();
  showSuccess();
  unblockSubmitButton();
};

const sendError = () => {
  showError();
  unblockSubmitButton();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(sendSuccess, sendError, new FormData(evt.target),
    );
  }
});

export class filtersFormElements {
}
