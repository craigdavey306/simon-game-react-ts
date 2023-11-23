import { PropsWithChildren } from 'react';
import './Button.css';

type ButtonProps = {
  onClick: () => void;
} & PropsWithChildren;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div>
      <button className="generic-button" type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
