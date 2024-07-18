import { Button } from '@/components/ui/button'
import React from 'react'

export default function Nav() {
  return (
    <div className='sticky top-0 flex items-center justify-between container py-4 bg-white'>
        <a href='/' className='font-bold text-4xl'><span className='opacity-20'>Dir</span><span className='opacity-100'>ga</span></a>
        <a href='/about'>
            <Button className='rounded-full text-xl py-8 px-6' variant='outline'>Let's Talk</Button>
        </a>
    </div>
  )
}
