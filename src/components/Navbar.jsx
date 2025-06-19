import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase-client'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate('/login');
  }

  if (location.pathname === '/dashboard') {
     return (
    <>
    <nav className='bg-neutral-800 shadow-lg flex items-center justify-around py-3 px-32 fixed top-0 left-0 w-full'>
        <Link to='/'>
            <span className='font-semibold font-sans text-lg flex items-center gap-3 text-black'>
                <img src="/dropin-icon.png" alt="Logo" className='w-10 h-10' />
                <span className='font-semibold text-white text-2xl'>Drop-In</span>
            </span>
        </Link>
        <div className='flex items-center gap-5 text-black font-sans font-semibold'>
            <Link to='/' className='text-white hover:text-gray-300'>Home</Link>
            <button className='text-white hover:text-gray-300' onClick={() => signOutUser()}>Sign Out</button>
            <Link to='/account' className='text-white hover:text-gray-300'>Account</Link>

        </div>
    </nav>
    </>
  );
  } else {
      return (
      <>
      <nav className='bg-neutral-800 shadow-lg flex items-center justify-around py-3 px-32 fixed top-0 left-0 w-full'>
          <Link to='/'>
              <span className='font-semibold font-sans text-lg flex items-center gap-3 text-black'>
                  <img src="/dropin-icon.png" alt="Logo" className='w-10 h-10' />
                  <span className='font-semibold text-white text-2xl'>Drop-In</span>
              </span>
          </Link>
          <div className='flex items-center gap-5 text-black font-sans font-semibold'>
              <Link to='/' className='text-white hover:text-gray-300'>Home</Link>
              <Link to='/about' className='text-white hover:text-gray-300'>About</Link>
              <Link to='/login' className='text-white hover:text-gray-300'>Login</Link>

          </div>
      </nav>
      </>
    )
    }
}

export default Navbar