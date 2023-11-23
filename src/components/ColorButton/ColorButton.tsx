import React from 'react';
import { ButtonColor } from '../../models';
import './ColorButton.css';

type Props = {
  color: ButtonColor;
  disabled: boolean;
  isPlaying: boolean;
  onClick: () => void;
};

const ColorButton: React.FC<Props> = ({
  color,
  disabled,
  isPlaying,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${color}${disabled ? '-disabled' : ''} ${
        isPlaying ? 'played' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    ></button>
  );
};

export default ColorButton;
