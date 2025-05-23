import {getQueryParamsData} from '../shared/queryParams';
import {baseUrl} from '../shared/constants.ts';
import {getDateParts} from '../shared/time';
import {scheduleNotification} from './notifications.ts';
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
  const {days, hours, minutes, seconds} = getDateParts(data.endDate);
  elements.days.textContent = days.toString();
  elements.hours.textContent = hours.toString();
  elements.minutes.textContent = minutes.toString();
  elements.seconds.textContent = seconds.toString();
};

render();
const msToNextSecond = (1000 - Date.now()) % 1000;
setTimeout(
  () => {
    setInterval(
      render,
      1000
    );
  },
  msToNextSecond
);

scheduleNotification(
  data.endDate,
  data.title
);

/*
 * currently user is on view (index.html) page
 * let's redirect to edit page if no query params
 * add guard to prevent infinite loop if something goes wrong
 */
if (!window.location.search && !window.location.pathname.endsWith('/edit')) {
  window.location.href = baseUrl + '/edit';
}
