import React from 'react'
import { supabase } from '../supabase-client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
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
    providers={['google', 'facebook', 'twitter']} />
    </div>
    </div>
  )
}

export default Login