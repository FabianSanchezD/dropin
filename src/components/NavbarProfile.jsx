import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase-client'

const NavbarProfile = () => {
  let navigate = useNavigate();

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate('/login');
  }

    return (
      <>
        <nav className='bg-neutral-900/95 backdrop-blur-sm shadow-lg border-b border-white/10 flex items-center justify-between py-4 px-8 lg:px-32 fixed top-0 left-0 w-full z-50'>
          <Link to='/' className="group">
            <div className='flex items-center gap-3'>
              <img src="/dropin-icon.png" alt="Logo" className='w-10 h-10 transition-transform duration-300 group-hover:scale-110' />
              <span className='font-bold text-white text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Drop-In
              </span>
            </div>
          </Link>
          
          <div className='flex items-center gap-6'>
            <Link 
              to='/' 
              className='text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group'
            >
              Home
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
            </Link>
            <Link 
              to='/dashboard' 
              className='bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white font-medium py-2 px-4 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all duration-300'
            >
              Dashboard
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
            </Link>
            <button 
              className='bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white font-medium py-2 px-4 rounded-lg border border-red-500/30 hover:border-red-500 transition-all duration-300' 
              onClick={() => signOutUser()}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </>
    );
}

export default NavbarProfile