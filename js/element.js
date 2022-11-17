const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');

export const createAdElement = ((ad) => {
  const adElement = advertisementTemplate.cloneNode(true);
  const featuresContainer = adElement.querySelector('.popup__features');
  const photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  if (ad.offer.features) {
    ad.offer.features.forEach((i) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${i}`);
      featuresContainer.appendChild(feature);
    });
  } else {
    featuresContainer.remove();
  }

  if (ad.offer.description) {
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    adElement.querySelector('.popup__description').remove();
  }

  if (ad.offer.photos) {
    adElement.querySelector('.popup__photos').innerHTML = '';
    ad.offer.photos.forEach((photo) => {
      const photoTemplateElement = photoTemplate.cloneNode(true);
      photoTemplateElement.src = photo;
      adElement.querySelector('.popup__photos').append(photoTemplateElement);
    });
  } else {
    adElement.querySelector('.popup__photos').remove();
  }

  return adElement;
});
