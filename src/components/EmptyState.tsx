import React from 'react'

export default function EmptyState() {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex items-center justify-center bg-zinc-100 dark:bg-primary-foreground'>
      <div className="text-center flex flex-col items-center">
        <h3 className='text-2xl mt-2 font-semibold text-zinc-900 dark:text-zinc-500'>Select a chat or start a new conversation</h3>
      </div>
    </div>
  )
}
