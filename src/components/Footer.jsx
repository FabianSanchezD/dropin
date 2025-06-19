import React from 'react'
import { FiPlusCircle } from "react-icons/fi";


const Footer = () => {
  return (
    <>
    <footer className='bg-neutral-800 shadow-lg flex items-center justify-around py-4 px-32 fixed bottom-0 w-full'>
        <button className='flex items-center text-white font-semibold text-lg hover:text-gray-300 space-x-2'>
        <FiPlusCircle className="text-2xl" />
        <span className='text-2xl'>Create a Meetup</span>
      </button>
    </footer>
    </>
  )
}

export default Footer