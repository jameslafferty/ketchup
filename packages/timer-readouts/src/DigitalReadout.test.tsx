import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { DigitalReadout } from './DigitalReadout';

expect.extend(toHaveNoViolations);

it('renders a Counter with the correct value', async () => {
  const { getByTestId } = render(<DigitalReadout currentCount={60000} />);
  const readout = getByTestId('DigitalReadout');
  expect(readout).toBeTruthy();
});

it('has no obvious a11y violations', async () => {
  const { getByTestId } = render(<DigitalReadout currentCount={60000} />);
  const readout = getByTestId('DigitalReadout');
  expect(await axe(readout.outerHTML)).toHaveNoViolations();
});
