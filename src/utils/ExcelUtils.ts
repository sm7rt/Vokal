import moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import { TournamentScheduleType } from '../features/events/models/EventsModel.d';

/**
 *
 * @param {*} date : Format => Friday, August 9, 2019
 * @param {*} startTime : Format 12:00
 */
export const parsePPDate = (
  date: string,
  startTime: string,
  startDate: string,
  endDate: string
) => {
  const dateFormatArray = moment(date);
  if (!dateFormatArray.isValid()) {
    throw new Error(
      'At least one date is invalid in the file imported. Please review your file.'
    );
  }
  if (
    !dateFormatArray.isBetween(
      moment(startDate, 'YYYY-MM-DD'),
      moment(endDate, 'YYYY-MM-DD')
        .hours(23)
        .minutes(59)
    )
  ) {
    throw new Error(
      `At least one tournament is out of the festival's date range "${dateFormatArray.format(
        'DD MM YYYY'
      )}". Please review your file.`
    );
  }
  return MomentTimeZone.tz(
    `${dateFormatArray.format('DD MM YYYY')} ${startTime}+0000`,
    'DD MM YYYY HH:mmZZ',
    'UTC'
  ).format();
};

/**
 * Replace Millions, K to number
 * @param {*} startStack : Format 1M, 1K
 */
export const parseStartStack = (startStack: string) => {
  if (startStack) {
    return (
      parseInt(startStack.replace('M', '000000').replace('K', '000'), 10) || 0
    );
  }
  return 0;
};

/**
 * Add Reentry Method
 */
export const addReentry = (line: TournamentScheduleType) => {
  if (line.reEntry) {
    let reentryNumber;
    if (line.reEntry === 'UNLIMITED') {
      reentryNumber = 10000;
    } else {
      reentryNumber = parseInt(line.reEntry, 10);
    }
    if (reentryNumber > 0) {
      return {
        reEntryAllowed: true,
        reEntryDetails: {
          maxPerPlayer: reentryNumber,
          lastLevel: parseInt(line.lateRegLevels) || 0,
          cashAmount: line.buyIn,
          fee: line.fee,
          chipsAmount: parseStartStack(line.startStack)
        }
      };
    }
  }
  return {
    reEntryAllowed: false
  };
};

/**
 * Validate Required
 */
export const validateRequired = (value: any, fieldName: string) => {
  if (!value) {
    throw new Error(
      `At lease one field : "${fieldName}" is empty. But this field is mandatory. Please review your file.`
    );
  }
  return value;
};
