const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const form = document.querySelector('.ad-form');
const formElements = form.children;

const disableForm = () => {
  filtersForm.classList.toggle('ad-form--disabled');
  for (const formElement of formElements) {
    formElement.disabled = true;
  }

  form.classList.toggle('ad-form--disabled');
  for (const filtersFormElement of filtersFormElements) {
    filtersFormElement.disabled = true;
  }
};

const enableForm = () => {
  filtersForm.classList.toggle('ad-form--disabled');

  for (const formElement of formElements) {
    formElement.disabled = false;
  }

  form.classList.toggle('ad-form--disabled');

  for (const filtersFormElement of filtersFormElements) {
    filtersFormElement.disabled = false;
  }
};

export {enableForm};

disableForm();
