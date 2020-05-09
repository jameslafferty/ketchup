import { act, render } from '@testing-library/react';
import React from 'react';
import { Counter } from './Counter';

it('renders a timer', async () => {
  const doCount = async (number: number) => number;
  const { getByTestId } = render(
  <Counter
    doCount={doCount}
    startCount={25}
  />
  );
  const timer = getByTestId('timer');
  expect(timer).toBeTruthy();
});
