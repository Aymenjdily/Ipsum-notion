import { Button } from '@/components/ui/button'
import React from 'react'

const SingleDocumentPage = () => {
  return (
    <div className='h-full flex-col gap-y-5 flex items-center justify-center'>
      <h1 className='text-2xl font-bold'>
        Takal likay 2arak
      </h1>
      <Button>
        Speak now
      </Button>
    </div>
  )
}

export default SingleDocumentPage