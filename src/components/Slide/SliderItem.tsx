// import React from 'react';

const SliderItem = (components) => (
  <>
    {components.map((Component, index) => (
      <div className="slider-item" data-index={index} key={index}>
        <Component />
      </div>
    ))}
  </>
);

export default SliderItem;
