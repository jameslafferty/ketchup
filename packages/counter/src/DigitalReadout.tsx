import React, { useContext } from 'react';
import styled from 'styled-components';
import { CounterContext } from './CounterContext';
import { TimeIncrement } from './types/TimeIncrement';

const Wrapper = styled.div`
  align-items: center;
  background-color: rgb(0,0,0);
  display: flex;
  justify-content: center;
  width: min-content;
`;

const DigitLabel = styled.label`
  align-items: center;
  box-sizing: border-box;
  color: rgb(255,255,255);
  display: flex;
  font-family: Courier;
  justify-content: center;
  padding: 0.25rem;
  &::before {
    display: block;
    content: ':';
    padding: 0;
  }
  &:first-child {
    &::before {
      display: block;
      content: ' ';
    }
  }
  output {
    display: block;
    padding: 0;
  }
`;

const millisecondsToDisplayTime = (milliseconds: number) => {
  const ms = `${milliseconds % 1000}`;
  const s = (Math.floor(milliseconds / 1000) % 60).toFixed(0);
  const m = (Math.floor(milliseconds / (1000 * 60)) % 60).toFixed(0);
  const h = (Math.floor(milliseconds / (1000 * 60 * 60))).toFixed(0);
  return {
    h,
    ms,
    m,
    s,
  }
};

const slots: TimeIncrement[] = ['h', 'm', 's', 'ms'];

const Digit = (value: string, key: string) => (
  <DigitLabel key={key}>
    <output>{value}</output>
  </DigitLabel>
);

export const DigitalReadout: React.FC<{ precision?: TimeIncrement }> = ({ precision = 'ms' }) => {
  const { currentCount } = useContext(CounterContext);
  const displayTime = millisecondsToDisplayTime(currentCount); 
  return (
    <Wrapper data-testid='DigitalReadout'>
      { slots.slice(0, slots.indexOf(precision) + 1).map((slot) => Digit(displayTime[slot], slot))}
    </Wrapper>
  );
};
