const form = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const formElements = form.children;
const filtersFormElements = filtersForm.children;

const toggleElements = (elements, bool) => {
  for (const element of elements) {
    element.disabled = bool;
  }
};

const disableForm = () => {
  form.classList.toggle('ad-form--disabled');
  toggleElements(formElements, true);

  filtersForm.classList.toggle('ad-form--disabled');
  toggleElements(filtersFormElements, true);
};

export const enableAdForm = () => {
  form.classList.toggle('ad-form--disabled');
  toggleElements(formElements, false);
};

export const enableForm = () => {
  filtersForm.classList.toggle('ad-form--disabled');
  toggleElements(formElements, false);

  form.classList.toggle('ad-form--disabled');
  toggleElements(filtersFormElements, false);
};

disableForm();
