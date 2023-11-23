import _ from 'lodash';
import { MAX_PATTERNS, NUM_BUTTONS } from '../constants';

export const generateGamePattern = (): number[] => {
  return Array(MAX_PATTERNS)
    .fill(0)
    .map(() => _.random(NUM_BUTTONS - 1));
};
