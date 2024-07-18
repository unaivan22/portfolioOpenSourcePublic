import { Github, Mail, Twitter } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='flex items-center justify-between'>
        <p className='text-muted-foreground font-light text-lg'>2024</p>
        <div className='flex gap-x-4 items-center'>
          <Link to='https://twitter.com/dinivannendra' target='_blank'><Twitter className='w-6 h-6 opacity-50 hover:opacity-100' /></Link>
          <Link to='https://github.com/unaivan22' target='_blank'><Github className='w-6 h-6 opacity-50 hover:opacity-100' /></Link>
          <Link to='https://dinivannendra.xyz/' target='_blank' className='underline font-light text-lg'>Dirga Gunawan</Link>
        </div>
    </div>
  )
}
