"use client"

import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const DocumentsPage = () => {
  const { user } = useUser()

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src="/larry-3-dark.svg" alt="empty" height={300} width={300} className='dark:hidden' />
      <Image src="/larry-3-light.svg" alt="empty" height={300} width={300} className='dark:block hidden' />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Ipsum
      </h2>
      <Button>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage