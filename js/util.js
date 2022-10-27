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

export {getRandomNumber, getRandomCoordinate, getRandomArrayElement};
