import React from 'react';
import './LandingBlock.css';
import image from '../assets/LandingImage.png';
import home from '../assets/home.png';
import tophome from '../assets/tophome.png';

const LandingBlock = () => {
  return (
    <div className="landing-block">
      <div className="content">
        <div className="text-wrapper">
          <div className="text">
            <img src={home}/> 
          </div>  
        </div>
        <div className="image">
          <img src={image} alt="Landing" />
        </div>
      </div>
      <div className="absolute-container">
        <img src={tophome}/>
        <p>It’s hard enough deciding to move, you don’t have to worry about where to move to. These are some of the most popular and best locations to move to based on a  number of factors.</p>
      </div>
    </div>
  );
};

export default LandingBlock;
