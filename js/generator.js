import {listAd} from './data.js';

const similarListAd = document.querySelector('#map-canvas');

const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAdvertisements = listAd();

const similarAdvertisementsFragment = document.createDocumentFragment();

const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const advertisementCheck = (elementContent, result) => {
  if ((elementContent.textContent = result) === undefined) {
    return elementContent.remove();
  }

  elementContent.textContent = result;
};

similarAdvertisements.forEach((ad) => {
  const AdElement = advertisementTemplate.cloneNode(true);
  AdElement.querySelector('.popup__avatar').src = ad.author;
  AdElement.querySelector('.popup__title').textContent = ad.offer.title;
  AdElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  AdElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  AdElement.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  AdElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  AdElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featuresContainer = AdElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const featuresModifiers = `popup__feature--${ad.offer.features}`;

  featuresList.forEach((featuresListItem) => {
    const featuresModifier = featuresListItem.classList[1];

    if (!featuresModifiers.includes(featuresModifier)) {
      featuresListItem.remove();
    }
  });
  advertisementCheck(AdElement.querySelector('.popup__description'), ad.offer.description);
  AdElement.querySelector('.popup__photo').src = ad.offer.photos;

  similarAdvertisementsFragment.appendChild(AdElement);
});

similarListAd.appendChild(similarAdvertisementsFragment);
