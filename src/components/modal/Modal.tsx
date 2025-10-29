import { X } from 'lucide-react'
import React from 'react'

const Modal = () => {
  return (
      <div className='h-screen w-full fixed top-0 left-0'>
          <div className='h-full w-full inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-30'></div>
          <div className='min-h-[500px] max-w-xl w-full bg-white relative'>
          <button className='text-red-500 text-base bg-gray-50 size-10 rounded-full absolute top-5 left-5 z-50'><X/></button>
      </div>
    </div>
  )
}

export default Modal
