import React from 'react'

const Home = () => {
  return (
    <div className="pt-20 p-8 min-h-screen bg-neutral-900">
      <div className="pt-20 p-8 min-h-screen bg-neutral-900 flex justify-center">
        <div className='w-1/3 text-4xl font-bold text-white mb-4'>
           <h2>No plans? No problem. </h2>
           <h1 className='pt-3'>Just Drop-In.</h1>
           <p className='pt-7 text-2xl'>Join Impromptu Meetings on the go: study, read, chat, connect and much more!</p>
        </div>
        <div className='w-1/3 text-4xl font-bold text-white mb-4'>
          {/* an image will go here */}
          <p>An image will go here!</p>
        </div>
      </div>
    </div>
  )
}

export default Home