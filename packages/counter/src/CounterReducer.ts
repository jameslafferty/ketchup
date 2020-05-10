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

export const CounterReducer = (state: CounterState, action: CounterAction) => {
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
