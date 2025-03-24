const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('t')) {
  window.location.href = '/edit';
}

const title = searchParams.get('title') || 'Countdown';
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
  seconds: document.getElementById('seconds'),
  title: document.getElementById('title'),
};

elements.title.textContent = title;
document.head.title = title;

const getData = () => {
  let date1 = unixTimeMs < Date.now() ? Date.now() : unixTimeMs;
  let date2 = unixTimeMs < Date.now() ? unixTimeMs : Date.now();

  const days = Math.floor((date1 - date2) / 86400000);
  const hours = Math.floor((date1 - date2) / 3600000) % 24;
  const minutes = Math.floor((date1 - date2) / 60000) % 60;
  const seconds = Math.floor((date1 - date2) / 1000) % 60;

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

