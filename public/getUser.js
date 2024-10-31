const messageForm = document.querySelector('form');
messageForm.addEventListener('submit', (e) => {
  const username = localStorage.getItem('username');
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'username';
  hiddenInput.value = username;
  messageForm.appendChild(hiddenInput);
});


