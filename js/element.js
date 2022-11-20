const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

export const createAdElement = ((ad) => {
  const adElement = advertisementTemplate.cloneNode(true);
  const featuresContainer = adElement.querySelector('.popup__features');
  adElement.querySelector('.popup__photos').innerHTML = '';
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  const elementDescription = adElement.querySelector('.popup__description');
  const elementPhoto = adElement.querySelector('.popup__photos');

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
    elementDescription.textContent = ad.offer.description;
  } else {
    elementDescription.remove();
  }

  if (ad.offer.photos) {
    ad.offer.photos.forEach((photo) => {
      const photoTemplateElement = photoTemplate.cloneNode(true);
      photoTemplateElement.src = photo;
      elementPhoto.append(photoTemplateElement);
    });
  } else {
    elementPhoto.remove();
  }

  return adElement;
});
