import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'

interface UsersProps{
  users : User[]
}


const UserList:React.FC<UsersProps> = ({users}) => {
  return (
    <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 dark:border-gray-800 block w-full left-0'>
      <div className="px-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-zinc-850 dark:text-neutral-200 py-4">People</div>
        </div>
        <div className="flex flex-col space-y-2">
        {
          users && users.map((item)=>(
            <UserBox key={item.id} data={item} />
          ))
        }
        </div>
      </div>
    </aside>
  )
}

export default UserList
