import React from 'react';
import SidebarHeader from './SidebarHeader';
import SideCard from './SideCard';

import { SideCardData } from '../../utils/const_var';

import '../../styles/components/Sidebar/Sidebar.scss'

const Sidebar = () => (
  <div className="sidebar">
    <SidebarHeader />
    {
      SideCardData.map((sideCard) => (
        <SideCard key={sideCard.title} title={sideCard.title} items={sideCard.items} />
      ))
    }
  </div>
);

export default Sidebar;
