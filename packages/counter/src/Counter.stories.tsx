import { select } from '@storybook/addon-knobs';
import React from 'react';
import { Counter } from './Counter';
import { countDownBySeconds } from './utilities/countDownBySeconds';
import { countUpBySeconds } from './utilities/countUpBySeconds';

export default {
  title: 'Counter',
  component: Counter,
};

const CounterFunctions: Record<string, (last: number) => Promise<number>> = {
  COUNT_DOWN_BY_SECONDS: countDownBySeconds,
  COUNT_UP_BY_SECONDS: countUpBySeconds,
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
