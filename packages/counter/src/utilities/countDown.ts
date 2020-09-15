import { TimeIncrement } from '@ketchupy/glue';
import { timeout } from './timeout';
import { msUnitsFromTimeIncrement } from './transforms/msUnitsFromTimeIncrement';

export const countDown = async (last: number, increment: TimeIncrement = 's') => {
  const intervalInMS = msUnitsFromTimeIncrement(increment);
  await timeout(intervalInMS);
  return last -= intervalInMS;
};
