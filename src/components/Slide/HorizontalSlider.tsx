import React, { useEffect } from 'react';
import { SlideType } from '../../utils/const_var';
import useSlider from '../../utils/hooks/useSlider';

import '../../styles/components/Slide/HorizontalSlider.scss';

const HorizontalSlider = ({ name, render }) => {
  const { state, wrapperEl, slideTouchStart, slideTouchMove, slideTouchEnd, slideReset } = useSlider(SlideType.HORIZONTAL);

  // useEffect(() => {
  //   console.log('state', state);

  // }, [])

  const touchStart = (e) => {
    slideTouchStart(e, wrapperEl.current, name);
  }

  const touchMove = (e) => {
    slideTouchMove(e, wrapperEl.current, name);
  }

  const touchEnd = (e) => {
    slideTouchEnd(e);
    slideReset(e, wrapperEl.current, name)
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
