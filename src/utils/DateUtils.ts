import { Moment } from 'moment';

export const isOutstideRange = (
  day: Moment,
  minDate?: Moment,
  maxDate?: Moment
) => {
  if (minDate && maxDate) {
    return !day.isBetween(minDate, maxDate);
  } else if (minDate) {
    return !day.isSameOrAfter(minDate);
  } else if (maxDate) {
    return !day.isSameOrBefore(maxDate);
  } else {
    return false;
  }
};
