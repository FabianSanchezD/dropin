import React from 'react'

const Home = () => {
  return (
    <div className="pt-20 p-8 min-h-screen bg-neutral-900">
      <div className="pt-12 flex justify-center">
          <div className='w-1/4 text-4xl font-bold text-white mb-4'>
            <h2>No plans? No problem. </h2>
            <h1 className='pt-3'>Just Drop-In.</h1>
            <p className='pt-7 text-2xl font-semibold'>Join Impromptu Meetings on the go: study, read, chat, connect and much more!</p>
          </div>
          <div className='w-1/4 text-4xl font-bold text-white mb-4'>
          {/* an image will go here */}
          <p>An image will go here!</p>
          </div>
      </div>

      <div className="flex justify-center">
        <button className='bg-gray-200 text-black font-semibold py-2 px-4 m-5 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300'>
        Create a Meetup
        </button>
      </div>

      <div className="w-full text-4xl font-bold text-white mb-4">
          <h1 className='flex justify-center pt-5'>How It Works:</h1>
          <div className='flex justify-center pt-5'>
          <div className='w-1/2 items-center text-center'>
            <ul className='text-3xl pt-5 font-semibold list-disc'>
              <li>
                Create a meetup
                {/* image could go here */}
              </li>
              <li>
                Share with your network or campus
                {/* image could go here */}
              </li>
              <li>
                Drop-In to meet new people and have fun (or study)!
                {/* image could go here */}
              </li>
            </ul>
          </div>
          </div>
      </div>

      <div className=" pt-8 w-full text-4xl font-bold text-white mb-4 flex justify-center items-center">
        <h1>Live/Upcoming Events</h1>
        {/* here there will be a feed of live meetups */}
      </div>

      <div className=" pt-8 w-full text-4xl font-bold text-white mb-4 flex justify-center items-center">
        <h1>Why use Drop-In?</h1>
        {/* here there will be a feed of live meetups */}
      </div>

      <div className=" pt-3 w-full text-4xl font-bold text-white mb-4 flex justify-center items-center">
        <div className='w-1/2 items-center text-center'>
            <ul className='text-3xl font-semibold list-disc'>
              <li>
                Meet classmates in your courses
                {/* image could go here */}
              </li>
              <li>
                Study or chill together
                {/* image could go here */}
              </li>
              <li>
                Don't waste time scheduling - just drop-in!
                {/* image could go here */}
              </li>
            </ul>
          </div>
      </div>

      <div className="flex justify-center">
        <button className='bg-gray-200 text-black font-semibold py-2 px-4 m-5 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300'>
        Log in to get started now!
        </button>
      </div>

    </div>
  )
}

export default Home