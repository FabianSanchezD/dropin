import React from 'react'

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <img src="/dropin-icon.png" alt="DropIn Logo" className="w-16 h-16" />
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DropIn
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A spontaneous meetup platform designed by students, for students. Making campus connections 
              easier, one drop-in at a time.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
              <div className="text-center">
                <div className="text-4xl mb-6">🎯</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  To help students connect and collaborate effortlessly, turning idle moments into 
                  meaningful interactions and building stronger campus communities.
                </p>
              </div>
            </div>
          </div>

          {/* Who It's For Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-6">👥</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Who It's For</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                University students looking for:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">📚</span>
                  <span>Study groups and academic collaboration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">☕</span>
                  <span>Coffee chats and casual conversations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">🎮</span>
                  <span>Casual hangouts and recreational activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">💡</span>
                  <span>Impromptu discussions and idea sharing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-6">⚡</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Why DropIn?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Instant Meetups</h3>
                    <p className="text-gray-300 text-sm">No planning needed, create and join in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Smart Discovery</h3>
                    <p className="text-gray-300 text-sm">Tag-based matching for shared interests and courses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Student-Focused</h3>
                    <p className="text-gray-300 text-sm">Lightweight design tailored for campus life</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Real Connections</h3>
                    <p className="text-gray-300 text-sm">Face-to-face interactions in a digital world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">💻</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Built With Care</h2>
                <p className="text-gray-300 leading-relaxed">
                  Created by students who understand the real challenges of campus life.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "React + Vite", icon: "⚛️" },
                  { name: "Supabase", icon: "🔋" },
                  { name: "Tailwind CSS", icon: "🎨" },
                  { name: "Passion", icon: "❤️" }
                ].map((tech, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl mb-2">{tech.icon}</div>
                    <div className="text-white text-sm font-semibold">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-3xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-white mb-4">Have Feedback?</h2>
              <p className="text-gray-300 mb-4">
                We'd love to hear from you! Your input helps us improve the platform.
              </p>
              <a 
                href="mailto:fabiansanchezd@outlook.com" 
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                fabiansanchezd@outlook.com
              </a>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <span className="text-red-400">❤️</span>
              <span>for the student community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About