import React from 'react'
import HorizontalSlider from '../../components/Slide/HorizontalSlider';
import SliderItem from '../../components/Slide/SliderItem';

const Home = () => {
  return (
    <div>
        <HorizontalSlider render={SliderItem} />
    </div>
  );
};

export default Home;
