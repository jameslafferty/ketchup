import React, { useState } from 'react';

import { Counter } from '@ketchupy/counter';

export const StopWatch: React.FC = () => {
  const [ isPaused, setIsPaused ] = useState(true);
  return (
    <div data-testid='StopWatch'>
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
      <Counter
        aria-live='polite'
        isPaused={isPaused}
        precision='s'
      />
    </div>
  );
};
