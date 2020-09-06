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

export const countdown = ({counter = 'COUNT_DOWN_BY_SECONDS', isPaused = false, lowerLimit = 0, precision = 'ms', startCount = 25, upperLimit = 360000 }) => {
  return (
    <Counter
      doCount={CounterFunctions[counter]}
      isPaused={isPaused}
      precision={precision  as 'ms' | 's' | 'm' | 'h' | undefined}
      startCount={startCount}
      upperLimit={upperLimit}
    />
  );
};

countdown.argTypes = {
  counter: {
    control: {
      type: 'select',
      options: [
        'COUNT_UP_BY_SECONDS',
        'COUNT_DOWN_BY_SECONDS',
      ],
      default: 'COUNT_DOWN_BY_SECONDS',
    },
  },
};
