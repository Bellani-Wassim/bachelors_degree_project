import React from 'react';

function Button ({ children, type="primary", ...props }) {
  return (
    <button className={`button ${type === 'secondary' ? 'secondary-btn' : ''}`} {...props}>{children}</button>
  );
}

export default Button;