// import React, { useState, useRef, useEffect } from 'react';
import { SlideType } from '../../utils/const_var';
import useSlider from '../../utils/hooks/useSlider';

import '../../styles/components/Slide/HorizontalSlider.scss';

const HorizontalSlider = ({ name, render }) => {
  const { wrapperEl, slideTouchStart, slideTouchMove, slideTouchEnd } = useSlider(SlideType.HORIZONTAL);

  const touchStart = (e) => {
    slideTouchStart(e, wrapperEl.current, name);
  }

  const touchMove = (e) => {
    slideTouchMove(e, wrapperEl.current, name);
  }

  const touchEnd = (e) => {
    slideTouchEnd(e)
  }

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        ref={wrapperEl}
        onPointerDown={touchStart}
        onPointerMove={touchMove}
        onPointerUp={touchEnd}
      >
        {render}
      </div>
    </div>
  );
};

export default HorizontalSlider;
