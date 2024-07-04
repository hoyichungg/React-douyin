// import React from 'react'
// import { userCollect } from '../../../api/user';
import { Icon } from '@iconify/react'

import '../../styles/components/Pages/Home/IndicatorHome.scss';

const IndicatorHome = () => {
  // const { data, isLoading, error } = userCollect();
  // console.log(data);
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
      </div>
    </div>
  )
}

export default IndicatorHome;
