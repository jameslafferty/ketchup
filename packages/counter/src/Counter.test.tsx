import { DigitalReadout } from '@ketchupy/timer-readouts';
import { act, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { Counter } from './Counter';
import { countDown } from './utilities/countDown';

expect.extend(toHaveNoViolations);

jest.mock('@ketchupy/timer-readouts', () => ({
  DigitalReadout: jest.fn(() => null),
}));

jest.mock('./utilities/countDown', () => ({
  countDown: jest.fn(a => a),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders a Counter with the correct value', async () => {

  const { getByTestId } = render(<Counter />);
  const counter = getByTestId('Counter');
  expect(counter).toBeTruthy();
  expect(countDown).toBeCalledTimes(1);
  expect(DigitalReadout).toBeCalledTimes(1);
});

it('has no obvious a11y violations', async () => {
  const { getByTestId } = render(<Counter />);
  const counter = getByTestId('Counter');
  expect(await axe(counter.outerHTML)).toHaveNoViolations();
});
