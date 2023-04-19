import {
  validateRequired,
  addReentry,
  parseStartStack,
  parsePPDate
} from '../ExcelUtils';
import { TournamentScheduleType } from '../../features/events/models/EventsModel.d';
import moment from 'moment';

test('Validate Required', () => {
  const value = null;
  expect(() => validateRequired(value, 'label')).toThrowError(
    `At lease one field : "label" is empty. But this field is mandatory. Please review your file.`
  );
});

test('Add ReeEntry', () => {
  const line: TournamentScheduleType = {
    reEntry: '3',
    buyIn: '400',
    fee: '40',
    startStack: '20K',
    lateRegLevels: '12'
  };

  const reenTry = addReentry(line);

  expect(reenTry).toEqual({
    reEntryAllowed: true,
    reEntryDetails: {
      maxPerPlayer: 3,
      lastLevel: 12,
      cashAmount: '400',
      fee: '40',
      chipsAmount: 20000
    }
  });

  const noReentry = addReentry({ ...line, reEntry: '0' });

  expect(noReentry).toEqual({
    reEntryAllowed: false
  });
});

test('Add ReeEntry Unlimited', () => {
  const line: TournamentScheduleType = {
    reEntry: 'UNLIMITED',
    buyIn: '400',
    fee: '40',
    startStack: '20K',
    lateRegLevels: '12'
  };

  const reenTry = addReentry(line);

  expect(reenTry).toEqual({
    reEntryAllowed: true,
    reEntryDetails: {
      maxPerPlayer: 10000,
      lastLevel: 12,
      cashAmount: '400',
      fee: '40',
      chipsAmount: 20000
    }
  });
});

test('Parse Start Stack', () => {
  const startStack = parseStartStack('30K');

  expect(startStack).toEqual(30000);

  const startStackM = parseStartStack('10M');

  expect(startStackM).toEqual(10000000);
});

test('Parse Date Correct', () => {
  // Date is Correct
  const date = '2019-01-01';
  const startTime = '20:00';
  const startDate = '2018-12-01';
  const endDate = '2019-01-08';

  const dateFormat = parsePPDate(date, startTime, startDate, endDate);
  expect(dateFormat).toEqual('2019-01-01T20:00:00Z');
});

test('Parse Date InCorrect', () => {
  // Date is Correct
  const date = '2019-01-12';
  const startTime = '20:00';
  const startDate = '2018-12-01';
  const endDate = '2019-01-08';

  expect(() => parsePPDate(date, startTime, startDate, endDate)).toThrowError(
    `At least one tournament is out of the festival's date range "${moment(
      date
    ).format('DD MM YYYY')}". Please review your file.`
  );
});
