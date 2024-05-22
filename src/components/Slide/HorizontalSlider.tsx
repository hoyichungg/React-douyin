// import React, { useState, useRef, useEffect } from 'react';

import useSlider from '../../hooks/useSlider';

import '../../styles/components/Slide/HorizontalSlider.scss';

const HorizontalSlider = ({ render }) => {
  const { wrapperEl, slideTouchStart } = useSlider();
  const touchStart = (e) => {
    slideTouchStart(e, wrapperEl.current);
  }

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        ref={wrapperEl}
        onPointerDown={touchStart}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="slider-item" key={index}>
            {render(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSlider;
