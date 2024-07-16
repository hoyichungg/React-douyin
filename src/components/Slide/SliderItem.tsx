// import React from 'react';

const SliderItem = (Components, stratum) => (
  <>
    {Components.map((Component, index) => (
      <div className="slider-item" data-index={stratum === 'first' && index} key={index}>
        <Component />
      </div>
    ))}
  </>
);

export default SliderItem;
