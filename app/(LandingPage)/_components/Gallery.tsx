import React from 'react'
import Image from 'next/image'

const Gallery = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
        <div className='flex items-center'>
            <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]'>
                <Image fill src="/larry-2-dark.svg" alt="Documents" className=' object-contain dark:hidden' />
                <Image fill src="/larry-2-light.svg" alt="Documents" className=' object-contain hidden dark:block' />
            </div>
            <div className='relative h-[400px] w-[400px] hidden md:block'>
                <Image src="/larry-1-dark.svg"  fill className='object-contain dark:hidden' alt="reading" />
                <Image src="/larry-1-light.svg"  fill className='object-contain dark:block hidden' alt="reading" />
            </div>
        </div>
    </div>
  )
}

export default Gallery