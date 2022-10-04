import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
// const dataForm = {};

const form = document.querySelector('.feedback-form ');
const input = document.querySelector('input[name = email]');
const textarea = document.querySelector('textarea[name = message]');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormInput(evt) {
  //   dataForm[evt.target.name] = evt.target.value;
  const dataForm = { email: input.value, message: textarea.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
  //   console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm(evt) {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedMessage) {
    console.log(savedMessage);
    input.value = '';
    textarea.value = '';
  } else {
    input.value = savedMessage.email;
    textarea.value = savedMessage.message;
  }
}
