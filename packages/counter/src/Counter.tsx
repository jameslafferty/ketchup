import React from 'react';
import { CounterProvider, CounterProviderProps } from './CounterProvider';
import { DigitalReadout } from './DigitalReadout';
import { TimeIncrement } from './types/TimeIncrement';
import { countDownBySeconds } from './utilities/countDownBySeconds';

export interface CounterProps {
  precision?: TimeIncrement;
}

export const Counter: React.FC<CounterProviderProps & CounterProps> = (props) => {
  const { doCount = countDownBySeconds, isPaused = false, lowerLimit = 0, onLimitReached = () => {}, onTick = () => {}, precision, startCount = 60000, upperLimit = 360000 } = props;
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
