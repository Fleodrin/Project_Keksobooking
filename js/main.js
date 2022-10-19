const TYPE_OF_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const TIME_IN_OUT = [
  '12:00',
  '13:00',
  '14:00'
];
const HOUSE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const PHOTO_OF_HOUSE = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const SIMILAR_ADV = 10;

const getRandomNumber = (min, max) => {
  if (min < 0 || max < min) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomCoordinate = (a, b, signs = 1) => {
  if (a < 0 || b < 0 || signs <= 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return ((Math.random() * (upper - lower)) + lower).toFixed(signs);
};
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createAdvert = (index) => {
  const lat = getRandomCoordinate(35.65, 35.7, 5);
  const lng = getRandomCoordinate(139.7, 139.8, 5);
  return {
    author: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
    offer: {
      title: 'Апартаменты',
      address: `${lat}, ${lng}`,
      price: getRandomNumber(1, 100000),
      type: getRandomArrayElement(TYPE_OF_HOUSE),
      rooms: getRandomNumber(1, 15),
      guests: getRandomNumber(1, 30),
      checkin: getRandomArrayElement(TIME_IN_OUT),
      checkout: getRandomArrayElement(TIME_IN_OUT),
      features: getRandomArrayElement(HOUSE_FEATURES),
      description: 'Апартаменты для всех и каждого!',
      photos: getRandomArrayElement(PHOTO_OF_HOUSE),
    },
    location: {
      lat,
      lng,
    },
  };
};

const listAd = (count) => Array.from({length: count}, (element , index) => createAdvert(index + 1));

listAd(SIMILAR_ADV);
