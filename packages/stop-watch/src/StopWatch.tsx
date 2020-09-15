import React, { FormEvent, useState } from 'react';

import { Counter } from '@ketchupy/counter';

export const StopWatch: React.FC = () => {
  const [ isPaused, setIsPaused ] = useState(true);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <form
      data-testid='StopWatch'
      onSubmit={onSubmit}
    >
      <button
        disabled={!isPaused}
        onClick={() => setIsPaused(() => false)}
        type='button'
      >
        <span>Start</span>
      </button>
      <button
        disabled={isPaused}
        onClick={() => setIsPaused(() => true)}
        type='button'
      >
        <span>Pause</span>
      </button>
      <Counter isPaused={isPaused} />
    </form>
  );
};
