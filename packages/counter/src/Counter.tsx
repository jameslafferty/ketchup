import { TimeIncrement } from '@ketchupy/glue';
import { DigitalReadout } from '@ketchupy/timer-readouts';
import React, { useContext } from 'react';
import { CounterContext } from './CounterContext';
import { CounterProvider, CounterProviderProps } from './CounterProvider';
import { countDown } from './utilities/countDown';

type Display =  React.FC<{ currentCount: number, precision?: TimeIncrement }>;

interface ReadoutProps {
  display?: Display;
  precision?: TimeIncrement;
}
const Readout: React.FC<ReadoutProps> = ({ display = DigitalReadout, precision }) => {
  const { currentCount } = useContext(CounterContext);
  return <>{display({currentCount, precision})}</>;
}

export interface CounterProps {
  display?: Display;
  precision?: TimeIncrement;
}

export const Counter: React.FC<CounterProviderProps & CounterProps> = (props) => {
  const {
    display,
    doCount: userCounter,
    isPaused = false,
    lowerLimit = 0,
    onLimitReached = () => { },
    onTick = () => { },
    precision = 'ms',
    startCount = 60,
    upperLimit = 360000,
  } = props;
  const doCount = userCounter ? userCounter : async (last: number) => await countDown(last, precision);

  return (
    <div data-testid='Counter'>
      <CounterProvider
        doCount={doCount}
        isPaused={isPaused}
        lowerLimit={lowerLimit}
        onLimitReached={onLimitReached}
        onTick={onTick}
        startCount={startCount}
        upperLimit={upperLimit}
      >
        <Readout
          display={display}
          precision={precision}
        />
      </CounterProvider>
    </div>
  );
};
