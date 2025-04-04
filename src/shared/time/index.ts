import { DatePars } from './types.ts';

export const getDateParts = (date: Date): DatePars => {
  const diff = Math.abs(Date.now() - date.getTime());
  const days = Math.floor((diff) / 86400000);
  const hours = Math.floor((diff) / 3600000) % 24;
  const minutes = Math.floor((diff) / 60000) % 60;
  const seconds = Math.floor((diff) / 1000) % 60;
  return { days, hours, minutes, seconds };
};