"use client"
import useConversation from '@/hooks/useConversation';
import useRoutes from '@/hooks/useRoutes'
import React from 'react'
import MobileFooterItem from './MobileFooterItem';

export default function MobileFooter() {
  const routes = useRoutes();
  const {isOpen} = useConversation()

  if(isOpen){
    return null
  }
  return (
    <div className='fixed justify-between w-full bottom-0 z-40 items-center flex border-t-[1px] lg:hidden'>
      {
        routes.map((item)=>(
          <MobileFooterItem
            key={item.label}
            active={item.active}
            icon={item.icon}
            onClick={item.onClick}
            label={item.label}
            href={item.href}
          />
        ))
      }
    </div>
  )
}
