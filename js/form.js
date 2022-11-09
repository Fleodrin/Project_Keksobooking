const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--invalid'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const HOUSE_TYPE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
const fieldPrice = form.querySelector('#price');
const fieldType = form.querySelector('#type');

const validatePrice = (input) => parseInt(input, 10) >= HOUSE_TYPE[fieldType.value] && parseInt(input, 10) <= 100000;

const getPriceError = () => `Цена от ${HOUSE_TYPE[fieldType.value]} до 100000`;

pristine.addValidator(
  fieldPrice,
  validatePrice,
  getPriceError
);

fieldType.addEventListener('change', () => pristine.validate(fieldPrice));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const fieldRoomNumber = form.querySelector('#room_number');
const fieldGuestNumber = form.querySelector('#capacity');

const validateRoomNumber = () => (fieldRoomNumber.value === '100' && fieldGuestNumber.value === '0') ||
  (fieldRoomNumber.value >= fieldGuestNumber.value && fieldGuestNumber.value > '0' && fieldRoomNumber.value !== '100');

pristine.addValidator(
  fieldRoomNumber,
  validateRoomNumber,
  'Неверное количество комнат'
);

fieldGuestNumber.addEventListener('change', () => pristine.validate(fieldRoomNumber));
