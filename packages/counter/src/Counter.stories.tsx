import React from 'react';
import { Counter } from './Counter';
import { countDownBySeconds } from './utilities/countDownBySeconds';
import { countUpBySeconds } from './utilities/countUpBySeconds';

export default {
  title: 'An Airstream Full of Hamburgers',
  component: Counter,
};

const CounterFunctions: Record<string, undefined | ((last: number) => Promise<number>)> = {
  UNDEFINED: undefined,
  COUNT_DOWN_BY_SECONDS: countDownBySeconds,
  COUNT_UP_BY_SECONDS: countUpBySeconds,
}

export const dinerCounterTop = ({counter = 'COUNT_DOWN_BY_SECONDS', isPaused = false, lowerLimit = 0, precision = 'ms', startCount = 25, upperLimit = 360000 }) => {
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

dinerCounterTop.argTypes = {
  counter: {
    control: {
      type: 'select',
      options: [
        'UNDEFINED',
        'COUNT_UP_BY_SECONDS',
        'COUNT_DOWN_BY_SECONDS',
      ],
      default: 'UNDEFINED',
    },
  },
};

export const holdTheFries = () => <Counter />;
