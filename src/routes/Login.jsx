import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase-client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

    useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) navigate('/dashboard')
    })

  // esto por si el usuario inicia sesion
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) navigate('/dashboard')
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="pt-20 p-8 min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className='bg-gray-200 p-10 h-lg w-lg rounded-lg shadow-lg'>
      <Auth    
      supabaseClient={supabase}
      appearance={{theme: ThemeSupa,      
      variables: {       
        default: {          
          colors: {            
            brand: 'black',            
            brandAccent: 'gray',          
          },        
        },      
      },    
    }}
    // hacer que sirvan los providers en supabase
    providers={['google', 'facebook', 'twitter']} />
    </div>
    </div>
  )
}

export default Login