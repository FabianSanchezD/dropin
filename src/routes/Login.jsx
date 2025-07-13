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

    // This is for when the user signs in
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) navigate('/dashboard')
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/dropin-icon.png" alt="DropIn Logo" className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-white">Drop-In</h1>
          </div>
          <h2 className="text-xl text-gray-300 mb-2">Welcome back!</h2>
          <p className="text-gray-400">Sign in to start connecting with your campus community</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          <Auth    
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,      
              variables: {       
                default: {
                  colors: {            
                    brand: '#3b82f6',
                    brandAccent: '#2563eb',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'transparent',
                    defaultButtonBackgroundHover: '#374151',
                    defaultButtonBorder: '#6b7280',
                    defaultButtonText: '#f3f4f6',
                    dividerBackground: '#4b5563',
                    inputBackground: 'rgba(255, 255, 255, 0.1)',
                    inputBorder: 'rgba(255, 255, 255, 0.2)',
                    inputBorderHover: '#3b82f6',
                    inputBorderFocus: '#3b82f6',
                    inputText: '#f3f4f6',
                    inputPlaceholder: '#9ca3af',
                    inputLabelText: '#f3f4f6',
                    messageText: '#f3f4f6',
                    messageTextDanger: '#ef4444',
                    anchorTextColor: '#60a5fa',
                    anchorTextHoverColor: '#3b82f6',
                  },
                  space: {
                    spaceSmall: '4px',
                    spaceMedium: '8px',
                    spaceLarge: '16px',
                    labelBottomMargin: '8px',
                    anchorBottomMargin: '4px',
                    emailInputSpacing: '4px',
                    socialAuthSpacing: '4px',
                    buttonPadding: '10px 15px',
                    inputPadding: '10px 15px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },      
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              }
            }}
            redirectTo={window.location.origin + '/dashboard'}
            onlyThirdPartyProviders={false}
            providers={[]}
            magicLink={true}
            showLinks={true}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign up',
                  loading_button_label: 'Signing up ...',
                  link_text: "Don't have an account? Sign up",
                  confirmation_text: 'Check your email for the confirmation link'
                },
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in ...',
                  link_text: 'Already have an account? Sign in'
                }
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By signing up, you agree to connect with your campus community.</p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          background: transparent !important;
        }
        .auth-button {
          transition: all 0.2s ease !important;
        }
        .auth-button:hover {
          transform: translateY(-1px) !important;
        }
        .auth-input {
          backdrop-filter: blur(10px) !important;
        }
      `}</style>
    </div>
  )
}

export default Login