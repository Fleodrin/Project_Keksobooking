const ALERT_TIME = 5000;

const alertContainer = document.createElement('div');
alertContainer.classList.add('alert-message');

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');

let activeDialog = null;

const closeDialog = () => {
  activeDialog.remove();
  document.removeEventListener('keydown', onDialogKeydown);
  activeDialog = null;
};

const onDialogClick = () => {
  closeDialog();
};

export const showSuccess = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  successMessage.addEventListener('click', onDialogClick);
  document.addEventListener('keydown', onDialogKeydown);
  activeDialog = successMessage;
};

export const showError = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  errorMessage.addEventListener('click', onDialogClick);
  document.addEventListener('keydown', onDialogKeydown);
  activeDialog = errorMessage;
};

export const showAlert = (message) => {
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
};

function onDialogKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeDialog();
  }
}
