import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { StopWatch } from './StopWatch';

expect.extend(toHaveNoViolations);

it('renders a Counter with the correct value', async () => {
  const { getByTestId } = render(
    <StopWatch />
  );
  const counter = getByTestId('StopWatch');
  expect(counter).toBeTruthy();
});

it('has no obvious a11y violations', async () => {
  const { getByRole } = render(<main><StopWatch /></main>);
  const counter = getByRole('main');
  expect(await axe(counter.outerHTML)).toHaveNoViolations();
});
