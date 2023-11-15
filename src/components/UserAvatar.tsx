import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@prisma/client';

const UserAvatar = ({user} : {user : User}) => {
  return (
    <div className="relative">
      <Avatar className="cursor-pointer ">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback className="bg-neutral-200 dark:bg-primary/10">
          {user.name ? user.name[0].toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <span className="absolute h-2 w-2 bg-green-500 ring-2 ring-white dark:ring-primary-foreground rounded-full top-0.5 right-0.5" />
    </div>
  );
}

export default UserAvatar
