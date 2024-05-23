import React from 'react';

const SliderItem = (components) => (
  <>
    {components.map((Component, index) => (
      <div className="slider-item" key={index}>
        <Component />
      </div>
    ))}
  </>
);

export default SliderItem;
