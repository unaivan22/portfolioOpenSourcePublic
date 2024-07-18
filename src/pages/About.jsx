import React from 'react'
import Nav from './utils/Nav'
import Footer from './Footer'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div>
        <Nav />
      <div className='container'>
        <div className='mb-12 mt-24'>
            <h1 className='text-4xl font-bold my-4 opacity-50'>
                Hi I’m Dirga Gunawan, Principal Engineer at Google.
            </h1>
            <h1 className='text-sm font-base my-4 opacity-50'>
                Based on Mountain View, CA (Remote)
            </h1>
            <h1 className='text-lg font-light opacity-70 my-4'>
                My work as a principal engineer is mainly focused on AI/ML build and shape the core infrastructure to allow software engineers, ML engineers & data scientists to develop, train, evaluate, deploy, and operate Machine Learning models and pipelines
            </h1>
        </div>
        <div className='my-32'>
            <h1 className='text-2xl font-bold my-4 opacity-100'>
                My Experience
            </h1>
            <div className='flex items-center justify-between my-12 border-b border-stone-200 pb-4'>
                <div className='flex flex-col'>
                    <h1 className='lg:text-2xl text-lg'>Principal Engineer</h1>
                    <p className='opacity-50'>Google</p>
                </div>
                <p className='opacity-30'>2020-present</p>
            </div>
            <div className='flex items-center justify-between my-12 border-b border-stone-200 pb-4'>
                <div className='flex flex-col'>
                    <h1 className='lg:text-2xl text-lg'>Senior Engineer</h1>
                    <p className='opacity-50'>Airbnb</p>
                </div>
                <p className='opacity-30'>2019-2020</p>
            </div>
            <div className='flex items-center justify-between my-12 border-b border-stone-200 pb-4'>
                <div className='flex flex-col'>
                    <h1 className='lg:text-2xl text-lg'>Software Engineer</h1>
                    <p className='opacity-50'>Github</p>
                </div>
                <p className='opacity-30'>2014-2019</p>
            </div>
        </div>
        <div className='my-32 border-t border-stone-300 pt-6 pb-12'>
            <div className='flex items-center justify-between my-12 gap-x-8'>
                <p className='lg:text-3xl text-lg flex items-center gap-x-2'>I am thrilled to answer to your next project <ArrowRight /> </p>
                <a href='mailto:sdadasda@dasdasda.com' className='lg:text-3xl text-lg underline'>dirgagunawan@mailxx.com</a>
            </div>
        </div>
      </div>
      <div className='container mt-12 mx-auto mb-2 gap-y-4 flex flex-col py-12'>
          <Footer />
        </div>
    </div>
  )
}
