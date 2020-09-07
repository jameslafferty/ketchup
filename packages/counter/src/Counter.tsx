import React from 'react';
import { CounterProvider, CounterProviderProps } from './CounterProvider';
import { DigitalReadout } from './DigitalReadout';
import { TimeIncrement } from './types/TimeIncrement';
import { countDown } from './utilities/countDown';

export interface CounterProps {
  precision?: TimeIncrement;
}

export const Counter: React.FC<CounterProviderProps & CounterProps> = (props) => {
  const {
    doCount: userCounter,
    isPaused = false,
    lowerLimit = 0,
    onLimitReached = () => {},
    onTick = () => {},
    precision = 'ms',
    startCount = 60,
    upperLimit = 360000,
  } = props;
  const doCount = userCounter ? userCounter : async (last: number ) => await countDown(last, precision);
  return (
    <div data-testid='Counter'>
      <CounterProvider
        doCount={doCount}
        isPaused={isPaused}
        lowerLimit={lowerLimit}
        onLimitReached={onLimitReached}
        onTick={onTick}
        startCount={startCount}
        upperLimit={upperLimit}
      >
        <DigitalReadout precision={precision} />
      </CounterProvider>
    </div>
  );
};
