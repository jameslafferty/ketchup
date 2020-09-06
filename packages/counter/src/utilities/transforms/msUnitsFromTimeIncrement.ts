import { TimeIncrement } from '../../TimeIncrement';

export const msUnitsFromTimeIncrement = (increment: TimeIncrement) => {
  switch (increment) {
    case 'ms': {
      return 1;
    }
    case 's': {
      return 1000;
    }
    case 'm': {
      return 60000;
    }
    case 'h': {
      return 3600000;
    }
  }
};