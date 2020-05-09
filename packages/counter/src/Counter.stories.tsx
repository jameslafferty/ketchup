import React from 'react';
import { Counter } from './Counter';
import { select } from '@storybook/addon-knobs';

export default {
  title: 'Counter',
  component: Counter,
};

const timeout = (delayInMilliseconds: number) => new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));

const CounterFunctions: Record<string, (last: number) => Promise<number>> = {
  COUNT_DOWN_BY_SECONDS: async (last: number) => {
    await timeout(1000);
    return last -= 1;
  },
  COUNT_UP_BY_SECONDS: async (last: number) => {
    await timeout(1000);
    return last += 1;
  },
}

export const countdown = () => {
  const counter = select('counter functions', {
    'count down by seconds': 'COUNT_DOWN_BY_SECONDS',
    'count up by seconds': 'COUNT_UP_BY_SECONDS',
  }, 'COUNT_DOWN_BY_SECONDS');
  return (
    <Counter
      startCount={25}
      doCount={CounterFunctions[counter]}
    />
  );
};
