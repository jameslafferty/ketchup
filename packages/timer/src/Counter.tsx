import React, { useEffect, useReducer } from 'react';

interface CounterState {
  currentCount: number;
  isPaused: boolean;
}

type CounterAction =
  {
    type: 'pause';
    payload: null;
  } |
  {
    type: 'unpause';
    payload: null;
  } |
  {
    type: 'updateCount';
    payload: number;
  };

const reducer = (state: CounterState, action: CounterAction) => {
  const { type } = action;
  switch (type) {
    case 'pause': {
      return {
        ...state,
        isPaused: true,
      }
    }
    case 'unpause': {
      return {
        ...state,
        isPaused: false,
      };
    }
    case 'updateCount': {
      const { payload: currentCount } = action;
      if (state.isPaused || currentCount == null) {
        return state;
      }
      return {
        ...state,
        currentCount, 
      };
    }
    default: {
      return state;
    }
  }
};

export interface CounterProps {
  doCount: (start: number) => Promise<number>;
  isPaused?: boolean;
  startCount: number;
  upperLimit?: number;
}

export const Counter:React.FC<CounterProps> = (props) => {
  const { doCount, isPaused = false, startCount, upperLimit = 3600 } = props;
  const [state, dispatch] = useReducer(reducer, {
    currentCount: startCount,
    isPaused,
  });
  useEffect(() => {
    const update = async () => {
      const { isPaused, currentCount } = state;
      if (isPaused) {
        return;
      }
      const newCount = await doCount(currentCount);
      if (newCount !== currentCount &&
          newCount >= 0 &&
          newCount <= upperLimit) {
        dispatch({
          type: 'updateCount',
          payload: newCount,
        });
      }
    };
    update();
  }, [doCount, dispatch, state]);
  const { currentCount } = state;
  return (
    <div
      data-testid='timer'
    >
      <output>{currentCount}</output>
    </div>
  );
};
