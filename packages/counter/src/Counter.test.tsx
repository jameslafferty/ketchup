import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { Counter } from './Counter';

expect.extend(toHaveNoViolations);

it('renders a Counter with the correct value', async () => {
  const doCount = async (number: number) => number;
  const { getByTestId } = render(
  <Counter
    doCount={doCount}
    startCount={25}
  />
  );
  const counter = getByTestId('Counter');
  expect(counter).toBeTruthy();
  expect(counter.textContent).toBe('00250');
});

it('has no obvious a11y violations', async () => {
  const { getByTestId } = render(<Counter />);
  const counter = getByTestId('Counter');
  expect(await axe(counter.outerHTML)).toHaveNoViolations();
});
