import { TimeFrames } from './types';

export const getTimeFrameSeconds = (timeframe: TimeFrames) => {
  if (timeframe === TimeFrames.s1) {
    return 1;
  }

  if (timeframe === TimeFrames.s15) {
    return 15;
  }

  if (timeframe === TimeFrames.s30) {
    return 30;
  }

  return 1;
};
