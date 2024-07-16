import React from 'react'
import SliderHorizontal from '../../components/Slide/SliderHorizontal';
import SliderItem from '../../components/Slide/SliderItem';
import Sidebar from '../../components/Sidebar/Sidebar';
import IndicatorHome from './IndicatorHome';

// import Test2 from '../../components/Test/Test2';
// import useStore from '../../utils/hooks/store/useStore';

const Home = () => {
  //const { maskDialog, toggleMaskDialog, users, addFriend } = useStore();
  const components = [Sidebar, IndicatorHome];

  return (
    <div>
      <SliderHorizontal name='first' render={SliderItem(components, 'first')} />
    </div>
  );
};

export default Home;
