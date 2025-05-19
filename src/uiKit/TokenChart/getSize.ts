import { TimeFrames } from './types';

// Size based on volume
export const getSize = ({
  selectedTimeframe,
  volume,
  totalVolume,
}: {
  selectedTimeframe: TimeFrames;
  volume: number;
  totalVolume: number;
}) => {
  let size = 1;
  if (selectedTimeframe === TimeFrames.single) {
    size = Math.max(4, Math.min(20, Math.log10(volume) * 2));
  } else {
    size = Math.max(
      4,
      Math.min(20, Math.log10(totalVolume) * 2), // TODO: ! cast
    );
  }
  return size;
};
