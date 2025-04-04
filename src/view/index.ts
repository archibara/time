import { getQueryParamsData } from '../shared/queryParams';
import { getDateParts } from '../shared/time';
import { scheduleNotification } from './notifications.ts';
import '../shared/styles.css';
import './styles.css';

const data = getQueryParamsData();

const elements = {
  days: document.getElementById('days') as HTMLSpanElement,
  hours: document.getElementById('hours') as HTMLSpanElement,
  minutes: document.getElementById('minutes') as HTMLSpanElement,
  seconds: document.getElementById('seconds') as HTMLSpanElement,
  title: document.getElementById('title') as HTMLHeadingElement,
};

elements.title.textContent = data.title;
document.head.title = data.title;

const render = () => {
  const { days, hours, minutes, seconds } = getDateParts(data.endDate);
  elements.days.textContent = days.toString();
  elements.hours.textContent = hours.toString();
  elements.minutes.textContent = minutes.toString();
  elements.seconds.textContent = seconds.toString();
};

render();
const msToNextSecond = 1000 - Date.now() % 1000;
setTimeout(() => {
  setInterval(render, 1000);
}, msToNextSecond);

scheduleNotification(data.endDate, data.title);


if(!window.location.search) {
  // navigate to /edit/ if no query params
  window.location.href = './edit';
}