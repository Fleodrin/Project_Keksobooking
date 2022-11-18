const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const form = document.querySelector('.ad-form');
const formElements = form.children;

const disableForm = () => {
  form.classList.toggle('ad-form--disabled');
  for (const formElement of formElements) {
    formElement.disabled = true;
  }

  filtersForm.classList.toggle('ad-form--disabled');
  for (const filtersFormElement of filtersFormElements) {
    filtersFormElement.disabled = true;
  }
};

export const enableForm = () => {
  filtersForm.classList.toggle('ad-form--disabled');

  for (const formElement of formElements) {
    formElement.disabled = false;
  }

  form.classList.toggle('ad-form--disabled');

  for (const filtersFormElement of filtersFormElements) {
    filtersFormElement.disabled = false;
  }
};

disableForm();
