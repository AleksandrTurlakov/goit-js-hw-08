import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const dataForm = {};

const form = document.querySelector('.feedback-form ');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormInput(evt) {
  dataForm[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Отправка формы');
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm(evt) {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    console.log(savedMessage);
    console.log(dataForm);

    dataForm.name = savedMessage.email;
    dataForm.message = savedMessage.message;
  }
}
