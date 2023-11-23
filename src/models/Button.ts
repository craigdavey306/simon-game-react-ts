export type ButtonColor = 'green' | 'red' | 'yellow' | 'blue';

export interface GameButton {
  color: ButtonColor;
  tone: HTMLAudioElement;
  isPlaying: boolean;
}
