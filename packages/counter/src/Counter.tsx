import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { CounterReducer } from './CounterReducer';

const millisecondsToDisplayTime = (ms: number) => {
  const milliseconds = ms % 1000;
  const seconds = (Math.floor(ms / 1000) % 60).toFixed(0);
  const minutes = (Math.floor(ms / (1000 * 60)) % 60).toFixed(0);
  const hours = (Math.floor(ms / (1000 * 60 * 60))).toFixed(0);
  return {
    hours,
    milliseconds,
    minutes,
    seconds,
  }
};

const Clock = styled.div`
  display: flex;
`;

const DigitLabel = styled.label`
  box-sizing: border-box;
  display: block;
  padding: 0.25rem;
`;

type TimeIncrement = 'ms' | 's' | 'm' | 'h';

export interface CounterProps {
  doCount: (start: number) => Promise<number>;
  isPaused?: boolean;
  precision?: TimeIncrement;
  startCount: number;
  upperLimit?: number;
}

export const Counter: React.FC<CounterProps> = (props) => {
  const { doCount, isPaused = false, startCount, upperLimit = 360000 } = props;
  const [state, dispatch] = useReducer(CounterReducer, {
    currentCount: startCount * 1000,
    isPaused,
  });
  useEffect(() => {
    const update = async () => {
      const { isPaused, currentCount } = state;
      if (isPaused) {
        return currentCount;
      }
      return await doCount(currentCount);
    };
    update()
      .then((newCount) => {
        if (newCount !== currentCount &&
          newCount >= 0 &&
          newCount <= upperLimit) {
          dispatch({
            type: 'updateCount',
            payload: newCount,
          });
        }
      });
  }, [doCount, dispatch, state]);
  const { currentCount } = state;
  const { hours, milliseconds, minutes, seconds } = millisecondsToDisplayTime(currentCount);
  return (
    <Clock
      data-testid='timer'
    >
      <DigitLabel>
        <output>{hours}</output> h
      </DigitLabel>
      <DigitLabel>
        <output>{minutes}</output> m
      </DigitLabel>
      <DigitLabel>
        <output>{seconds}</output> s
      </DigitLabel>
      <DigitLabel>
        <output>{milliseconds}</output> ms
      </DigitLabel>
    </Clock>
  );
};
