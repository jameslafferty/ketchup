import { TimeIncrement } from '../TimeIncrement';
import { timeout } from './timeout';
import { msUnitsFromTimeIncrement } from './transforms/msUnitsFromTimeIncrement';

export const countUp = async (last: number, increment: TimeIncrement = 's') => {
  const intervalInMS = msUnitsFromTimeIncrement(increment);
  await timeout(intervalInMS);
  return last += intervalInMS;
};
