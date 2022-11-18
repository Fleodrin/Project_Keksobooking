const ALERT_TIME = 5000;

const alertContainer = document.createElement('div');

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const createAlert = (message) => {
  alertContainer.style.zIndex = '1';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'red';
  alertContainer.style.backgroundColor = '#f0f0ea';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const onSuccessClick = () => {
  successMessage.remove();
  successMessage.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onSuccessPush);
};

const onErrorClick = () => {
  errorMessage.remove();
  errorMessage.removeEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onErrorPush);
};

export const showSuccess = () => {
  document.body.append(successMessage);
  successMessage.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessPush);
};

export const showError = () => {
  document.body.append(errorMessage);
  errorMessage.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onErrorPush);
};

export const showAlert = (message) => {
  createAlert(message);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function onSuccessPush(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onSuccessClick();
  }
}

function onErrorPush(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onErrorClick();
  }
}
