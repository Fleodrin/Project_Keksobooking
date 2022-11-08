import {listAd} from './data.js';

const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const map = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdElement = ((ad) => {
  const adElement = advertisementTemplate.cloneNode(true);
  adElement.querySelector('.popup__avatar').src = ad.author;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featuresContainer = adElement.querySelector('.popup__features');
  const feature = document.createElement('li');
  feature.classList.add('popup__feature', `popup__feature--${ad.offer.features}`);
  featuresContainer.appendChild(feature);

  if (ad.offer.description) {
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    adElement.querySelector('.popup__description').remove();
  }
  adElement.querySelector('.popup__photo').src = ad.offer.photos;

  return adElement;
});


const adRender = (ads = listAd()) => {
  const adsFragment = document.createDocumentFragment();
  map.innerHTML = '';

  ads.forEach((ad) => {
    adsFragment.appendChild(createAdElement(ad));
  });

  map.appendChild(adsFragment);
};

adRender();
