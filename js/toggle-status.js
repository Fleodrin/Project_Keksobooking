const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const form = document.querySelector('.ad-form');
const formElements = form.children;

const formDisabled = () => {
  filtersForm.classList.toggle('ad-form--disabled');
  formElements.disabled = true;

  form.classList.toggle('ad-form--disabled');
  filtersFormElements.disabled = true;
};

const formActive = () => {
  filtersForm.classList.toggle('ad-form--disabled');
  formElements.disabled = false;

  form.classList.toggle('ad-form--disabled');
  filtersFormElements.disabled = false;
};

formDisabled();
formActive();
