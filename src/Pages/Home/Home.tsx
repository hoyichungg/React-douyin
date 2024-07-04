import React from 'react'
import HorizontalSlider from '../../components/Slide/HorizontalSlider';
import SliderItem from '../../components/Slide/SliderItem';
import Sidebar from '../../components/Sidebar/Sidebar';
import IndicatorHome from './IndicatorHome';

// import useStore from '../../utils/hooks/store/useStore';

const Home = () => {
  //const { maskDialog, toggleMaskDialog, users, addFriend } = useStore();
  const components = [Sidebar, IndicatorHome];

  return (
    <div>
      <HorizontalSlider name='first' render={SliderItem(components)} />
    </div>
  );
};

export default Home;
