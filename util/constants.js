import moment from 'moment';

export const POSITIONS = ['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK'];

export const START_OF_SEASON_DATE = '2021-02-10T00:00:00.000Z';

export const DEFAULT_GAME_START_DATE = moment(START_OF_SEASON_DATE)
  .add(2, 'days')
  .toISOString();
