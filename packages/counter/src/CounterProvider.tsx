import React from 'react';
import { CounterContext } from './CounterContext';
import { CounterFunction } from './CounterFunction';
import { useCounter } from './hooks/use-counter';
import { countDownBySeconds } from './utilities/countDownBySeconds';

export interface CounterProviderProps {
  doCount?: CounterFunction;
  isPaused?: boolean;
  lowerLimit?: number;
  startCount?: number;
  upperLimit?: number;
}

export const CounterProvider: React.FC<CounterProviderProps> = (props) => {
  const { children, doCount = countDownBySeconds, isPaused = false, lowerLimit = 0, startCount = 60000, upperLimit = 360000 } = props;
  const currentCount = useCounter(
    doCount,
    startCount,
    lowerLimit,
    upperLimit,
    isPaused
  );
  return (
    <CounterContext.Provider value={{ currentCount }}>
      {children}
    </CounterContext.Provider>
  );
};
