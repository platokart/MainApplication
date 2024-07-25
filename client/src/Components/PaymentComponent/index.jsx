// ButtonComponent.js
import React from 'react';

const ButtonComponent = () => {
  const handleButtonClick = () => {
    // Path to the HTML file you want to open
    const htmlFilePath = 'public/payment.html';
    
    // Open the HTML file in a new tab
    window.open(htmlFilePath, '_blank');
  };

  return (
    <button onClick={handleButtonClick}>
      Open HTML File
    </button>
  );
};

export default ButtonComponent;
