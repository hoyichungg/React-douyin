import React from 'react'
import { Icon } from '@iconify/react'

import '../../styles/components/Sidebar/SideCard.scss'

const SideCard = ({ title, items }) => {
  return (
    <div className="sideCard">
      <div className="header">
        <div className="left">{title}</div>
        <div className="right">
          <span>全部</span>
          <Icon icon="icon-park-outline:right" />
        </div>
      </div>
      <div className="content">
        {items.map((item, index) => (
          <div className="item" key={index} onClick={item.onClick}>
            {item.icon && <Icon icon={item.icon} />}
            {item.image && <img className="xcx" src={item.image} alt={item.label} />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideCard
