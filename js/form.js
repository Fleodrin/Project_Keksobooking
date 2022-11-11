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

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--invalid'
});

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

fieldType.addEventListener('change', () => pristine.validate(fieldPrice));

fieldGuestNumber.addEventListener('change', () => pristine.validate(fieldRoomNumber));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
