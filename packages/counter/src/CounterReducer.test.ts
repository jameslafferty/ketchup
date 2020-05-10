import { CounterReducer } from './CounterReducer';

const DEFAULT_STATE = {
  currentCount: 0,
  isPaused: false,
}

it('updates the current count when not paused', () => {
  const { currentCount } = CounterReducer(DEFAULT_STATE, { type: 'updateCount', payload: 10});
  expect(currentCount).toEqual(10);
});

it('does not update the current count when paused', () => {
  const { currentCount } = CounterReducer({ ...DEFAULT_STATE, isPaused: true }, { type: 'updateCount', payload: 10});
  expect(currentCount).toEqual(0);
});
