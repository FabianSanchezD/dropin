import React from 'react'

const About = () => {
  return (
    <div className="pt-24 px-8 min-h-screen bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About DropIn</h1>

        <p className="text-xl mb-6">
          <strong>DropIn</strong> is a spontaneous meetup platform for students. Whether you want to study, chat, or just hang out, Drop-In makes it easy to find people around campus quickly.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-6 text-lg">
          To help students connect and collaborate effortlessly, turning idle moments into meaningful interactions.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Who It's For?</h2>
        <p className="mb-6 text-lg">
          University students looking for study groups, coffee chats, casual hangs, or impromptu discussions with peers.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Why DropIn?</h2>
        <ul className="list-disc pl-6 mb-6 text-lg">
          <li>Instant meetups, no planning needed</li>
          <li>Tag-based discovery for shared interests/courses</li>
          <li>Lightweight and student-focused</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Made With 💻</h2>
        <p className="mb-6 text-lg">
          Built by students, for students. Using React, Supabase, and a passion for solving real campus problems.
        </p>

        <p className="text-center text-gray-400 text-sm mt-10">Have feedback? Reach out via email at <span className='text-blue-200'>fabiansanchezd@outlook.com</span></p>
      </div>
    </div>
  )
}

export default About