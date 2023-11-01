import React from 'react';
import lostImage from "../images/backgroundLost.jpeg";

const NoMatch = () => {
  return (
    <div className="noMatch">
      <p>Are you lost in space?</p>
      <p>This page does not exist!</p>
      <img src={lostImage} alt="Lost in Space" />
    </div>
  )
}

export default NoMatch;
