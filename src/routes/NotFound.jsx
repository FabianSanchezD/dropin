import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-white/10 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🚀</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Oops! <span className="text-blue-400">Lost in Space</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Looks like this page took an unexpected trip to another dimension. 
            Don't worry though - we'll help you get back to where the action is!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🏠 Back to Home
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-blue-400 text-blue-400 font-semibold py-4 px-8 rounded-xl hover:bg-blue-400 hover:text-white transition-all duration-300"
            >
              📖 Learn About Us
            </Link>
          </div>

          {/* Fun Facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-gray-300">
                Fun fact: 404 errors were named after a room number at CERN!
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-sm text-gray-300">
                While you're here, why not check out our amazing features?
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-sm text-gray-300">
                Drop-In makes campus connections easier than ever!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>
            Still having trouble? Contact us at{' '}
            <a 
              href="mailto:fabiansanchezd@outlook.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              fabiansanchezd@outlook.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound