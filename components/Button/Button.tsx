import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ color = 'primary', className = '', children, ...props }) => {
  return (
    <button
      className={`btn btn-${color} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
