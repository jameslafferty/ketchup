import { timeout } from './timeout';

export const countDownBySeconds = async (last: number) => {
  await timeout(1000);
  return last -= 1000;
};
