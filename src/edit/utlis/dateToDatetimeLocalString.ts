/*
 * we can't just pass the Date input value to <input type='datetime-local'>
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
 * Example of valid value: 2023-10-01T12:00 and 12:00 is time in local timezone
 */
export const dateToDatetimeLocalString = (date: Date): string => {
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60000;
  const isoStringOfLocalDate = new Date(date.getTime() - timezoneOffsetInMs).toISOString();
  return isoStringOfLocalDate.slice(
    0,
    16
  );
};
