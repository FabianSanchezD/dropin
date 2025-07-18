import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <footer className='bg-neutral-900/95 backdrop-blur-sm border-t border-white/10 flex items-center justify-center py-6 px-8 fixed bottom-0 w-full z-40'>
        <button onClick={() => {navigate('/meetup/create')}} className='group flex items-center text-white font-semibold text-lg hover:blue-800 space-x-3 bg-gradient-to-r from-blue-500/20 to-blue-400/20 hover:from-blue-500/30 hover:to-blue-600/30 px-8 py-4 rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg'>
          <FiPlusCircle className="text-2xl transition-transform duration-300 group-hover:rotate-90" />
          <span className='text-xl font-bold text-white bg-clip-text text-transparent '>
            Create a Meetup
          </span>
        </button>
      </footer>
    </>
  )
}

export default Footer