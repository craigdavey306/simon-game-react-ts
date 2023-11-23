import { ButtonColor, GameButton } from './models';

const COLORS = ['green', 'red', 'yellow', 'blue'] as ButtonColor[];

export const MAX_PATTERNS = 20;
export const NUM_BUTTONS = 4;
export const WRONG_BUTTON_PRESSED = new Audio('/sounds/wrong.mp3');
export const BUTTONS: GameButton[] = COLORS.map((color) => {
  return {
    color,
    tone: new Audio(`/sounds/${color}.mp3`),
    isPlaying: false,
  };
});
