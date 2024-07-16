// import React from 'react'
// import { userCollect } from '../../../api/user';
import SliderHorizontal from '../../components/Slide/SliderHorizontal';
import SliderItem from '../../components/Slide/SliderItem';
// import Sidebar from '../../components/Sidebar/Sidebar';
import { Test0 } from '../../components/Test/Test0';
import { Test1 } from '../../components/Test/Test1';
import Test2 from '../../components/Test/Test2';

import { Icon } from '@iconify/react'

import '../../styles/components/Pages/Home/IndicatorHome.scss';

const IndicatorHome = () => {
  // const { data, isLoading, error } = userCollect();
  // console.log(data);
  const components = [Test0, Test1, Test2];
  return (
    <div className="indicator-home">
      <div className="toolbar">
        <Icon
          icon="tabler:menu-deep"
          className="search"
          // @click="$emit('showSlidebar')"
          style={{ transform: 'rotateY(180deg)' }}
        />
        <div className='tab-ctn'>
          <div className="tabs">
            <div className="tab">
              <span>熱點</span>
            </div>
            <div className="tab" >
              <span>長影片</span>
            </div>
            <div className="tab" >
              <span>關注</span>
              <img src="/images/icon/live.webp" className="tab2-img" />
            </div>
            <div className="tab" >
              <span>經驗</span>
            </div>
            <div className="tab">
              <span>推薦</span>
            </div>
          </div>
          <div className="indicator"></div>
        </div>
        <Icon
          // v-hide="loading"
          icon="ion:search"
          className="search"
        // @click="$router.push('/home/search')"
        />
      </div>

      <SliderHorizontal name='second' render={SliderItem(components, 'second')} />
    </div >
  )
}

export default IndicatorHome;
