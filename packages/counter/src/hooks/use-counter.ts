import { useEffect, useState } from 'react';
import { CounterFunction } from '../types/CounterFunction';

type CounterEvents = {
  onLimitReached?: (limit: 'UPPER' | 'LOWER') => void;
  onTick?: (counterValue: number) => void;
};

export function useCounter(doCount: CounterFunction, startCount: number, lowerLimit = 0, upperLimit = Infinity, isPaused = false, counterEvents: CounterEvents = {}) {

  const [currentCount, updateCurrentCount] = useState(startCount * 1000);

  const { onLimitReached = () => {}, onTick = () => {} } = counterEvents;

  useEffect(() => {
    let isUnMounted = false;
    const count = async () => {
      const nextCount = await doCount(currentCount);
      if (!isUnMounted && nextCount >= lowerLimit && nextCount <= upperLimit) {
        updateCurrentCount(() => {
          onTick(nextCount);
          if (nextCount === lowerLimit) {
            onLimitReached('LOWER');
          }
          if (nextCount === upperLimit) {
            onLimitReached('UPPER');
          }
          return nextCount;
        });
      }
    };
    if (!isPaused) {
      count();
    }
    return () => {
      isUnMounted = true;
    }
  }, [doCount, currentCount, isPaused, lowerLimit, onTick, onLimitReached, updateCurrentCount, upperLimit]);
  return currentCount;
}