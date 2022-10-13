//Source: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber(min, max) {
  if ((min <= 0) || (max <= min)) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(1, 5);

function getRandomCoordinate(min, max, signs) {
  if (min <= 0 || max <= min || signs <= 0) {
    return NaN;
  }
  return ((Math.random() * (max - min)) + min).toFixed(signs);
}

getRandomCoordinate(1, 2, 6);
