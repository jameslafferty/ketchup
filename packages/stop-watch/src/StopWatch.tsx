import { Counter } from '@ketchupy/counter';
import React, { FormEvent, useCallback, useRef, useState } from 'react';


export const StopWatch: React.FC = () => {
  const [ isPaused, setIsPaused ] = useState(true);
  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);
  const pause = useCallback(() => setIsPaused(() => false), [setIsPaused]);
  const play = useCallback(() => setIsPaused(() => true), [setIsPaused]);
  return (
    <form
      data-testid='StopWatch'
      onSubmit={onSubmit}
    >
      <button
        disabled={!isPaused}
        onClick={pause}
        type='button'
      >
        <span>Start</span>
      </button>
      <button
        disabled={isPaused}
        onClick={play}
        type='button'
      >
        <span>Pause</span>
      </button>
      <Counter isPaused={isPaused} />
    </form>
  );
};
