const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const storageKey = 'feedback-form-state';

form.addEventListener('input', event => {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }
});
window.addEventListener('load', () => {
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    const { email = '', message = '' } = JSON.parse(savedData);
    formData.email = email;
    formData.message = message;

    ['email', 'message'].forEach(key => {
      form.elements[key].value = formData[key];
    });
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem(storageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});
