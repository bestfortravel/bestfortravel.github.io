import React from 'react';
import './Button.scss';

function Button({ color = 'primary', children, onClick, disabled }) {
  return (
    <button
      className={`btn btn-${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

      {/*
          <Button color="primary">Primary</Button>
          <Button color="primary" disabled='disabled'>Primary</Button>

          <Button color="secondary">Secondary</Button>
          <Button color="secondary" disabled='disabled'>Secondary</Button>
      */}