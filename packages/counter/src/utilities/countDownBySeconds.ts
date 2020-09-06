import { countDown } from './countDown';

export const countDownBySeconds = async (last: number) => await countDown(last, 's');
