import { useEffect, useState } from 'react';
import { CounterFunction } from '../CounterFunction';

export function useCounter(doCount: CounterFunction, startCount: number, lowerLimit = 0, upperLimit = Infinity, isPaused = false) {

  const [currentCount, updateCurrentCount] = useState(startCount * 1000);

  useEffect(() => {
    let isUnMounted = false;
    const count = async () => {
      const nextCount = await doCount(currentCount);
      if (!isUnMounted && nextCount >= lowerLimit && nextCount <= upperLimit) {
        updateCurrentCount(nextCount);
      }
    };
    if (!isPaused) {
      count();
    }
    return () => {
      isUnMounted = true;
    }
  }, [doCount, currentCount, isPaused, lowerLimit, updateCurrentCount, upperLimit]);
  return currentCount;
}