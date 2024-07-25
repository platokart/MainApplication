// AnimationThankYou.js
import React from 'react';
import Lottie from 'react-lottie';
import './index.css'; 
import animation from '../../animation.json'; 

const AnimationThankYou = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="animation-container">
      <h1 className='animation-heading'>Thank You!</h1>
      <p className='animation-paragraph'>Thank you for your request! We are searching for an available consultant who best matches your needs.</p>
      <div className="animation-wrapper">
        <Lottie options={defaultOptions} />
      </div>
      <p className='animation-last'>Matching you with a <span className='consultant-color'>consultant...</span></p>
    </div>
  );
}

export default AnimationThankYou;
