const form = document.querySelector('form');
const baseUrl = 'http://localhost:3000/weather';
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

messageOne.textContent = '';
messageTwo.textContent = '';

const fetchWeather = async location => {
  if (!location) {
    return;
  }
  const url = `${baseUrl}/?address=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    messageTwo.textContent = data.error;
    return;
  }

  messageOne.textContent = data.location;
  messageTwo.textContent = data.forecastData;
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  messageTwo.textContent = 'loading...';
  const location = e.currentTarget[0].value;
  await fetchWeather(location);
  form.reset();
});
