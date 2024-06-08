// import React from 'react'
import { Icon } from '@iconify/react'

import '../../styles/components/Sidebar/SidebarHeader.scss'

const SidebarHeader = () => {
  return (
    <div className="header">
      <div className="left">下午好</div>
      <div className="right" >
        <Icon icon="iconamoon:scanner" />
        <span>掃一掃</span>
      </div>
    </div >
  )
}

export default SidebarHeader