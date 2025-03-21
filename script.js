const searchParams = new URLSearchParams(window.location.search);
const tString = searchParams.get('t');
let unixTimeMs = parseInt(tString, 10);
const maybeParedDate = new Date(tString).getTime();
if (isFinite(maybeParedDate)) {
  unixTimeMs = maybeParedDate;
}

const elements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const getData = () => {
  const days = Math.floor((unixTimeMs - Date.now()) / 86400000);
  const hours = Math.floor((unixTimeMs - Date.now()) / 3600000) % 24;
  const minutes = Math.floor((unixTimeMs - Date.now()) / 60000) % 60;
  const seconds = Math.floor((unixTimeMs - Date.now()) / 1000) % 60;

  return { days, hours, minutes, seconds };
};


const render = () => {
  const data = getData();
  elements.days.textContent = data.days;
  elements.hours.textContent = data.hours;
  elements.minutes.textContent = data.minutes;
  elements.seconds.textContent = data.seconds;
};

render();

const msToNextSecond = 1000 - Date.now() % 1000;
setTimeout(() => {
  setInterval(render, 1000);
}, msToNextSecond);

