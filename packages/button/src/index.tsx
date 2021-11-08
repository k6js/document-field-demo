import React from 'react';

const Button = ({ onClick, children, isSelected, isDisabled }) => (
  <button
    disabled={isDisabled}
    style={{
      border: 0,
      color: isSelected ? 'white' : 'black',
      padding: '12px 24px',
      margin: '12px',
      borderRadius: '3px',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
