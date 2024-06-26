import React from 'react'

const PreviewLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='h-full dark:bg-[#1F1F1F]'>
        {children}
    </div>
  )
}

export default PreviewLayout