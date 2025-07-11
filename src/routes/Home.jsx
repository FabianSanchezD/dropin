import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20"></div>
        <div className="relative px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    No plans? 
                    <span className="bg-gradient-to-r from-blue-700 to-blue-200 bg-clip-text text-transparent">
                      {" "}No problem.
                    </span>
                  </h2>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white">
                    Just <span className="text-blue-400">Drop-In</span>.
                  </h1>
                </div>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Join impromptu meetings on the go: study, read, chat, connect and much more!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="bg-gradient-to-r from-blue-800 to-blue-400 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    onClick={() => navigate('/login')}
                  >
                    Create a Meetup
                  </button>
                  <button 
                    className="border-2 border-blue-400 text-blue-400 font-semibold py-4 px-8 rounded-xl hover:bg-blue-400 hover:text-white transition-all duration-300"
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl mb-4">🚀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-16">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "✨",
                title: "Create a Meetup",
                description: "Set up your spontaneous meetup in seconds with our simple interface."
              },
              {
                step: "02",
                icon: "📢",
                title: "Let others know",
                description: "Let the whole campus about the meetup and what you'll do."
              },
              {
                step: "03",
                icon: "🤝",
                title: "Drop-In & Connect",
                description: "Meet new people, study together, or just hang out, the choice is yours!"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="text-right text-blue-400/50 font-bold text-sm mb-4">{item.step}</div>
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Events Section */}
      <div className="py-20 px-8 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Live & <span className="text-green-400">Upcoming</span> Events
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <div className="text-6xl mb-6">🎯</div>
            <p className="text-xl text-gray-300 mb-8">
              Events will appear here once you're logged in and the platform is active!
            </p>
            <button 
              className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
              onClick={() => navigate('/login')}
            >
              Join Now to See Events
            </button>
          </div>
        </div>
      </div>

      {/* Why Drop-In Section */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-16">
            Why use <span className="text-blue-400">Drop-In</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Meet Classmates",
                description: "Connect with students in your courses and build study groups effortlessly."
              },
              {
                icon: "☕",
                title: "Study or Chill",
                description: "Whether you need focus time or relaxation, find the perfect group atmosphere."
              },
              {
                icon: "⚡",
                title: "No Scheduling Hassle",
                description: "Skip the endless planning - just drop in when you're ready to connect."
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-800/20 to-blue-400/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to start connecting?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join students who are already making spontaneous meetups.
            </p>
            <button 
              className="bg-gradient-to-r from-blue-800 to-blue-400 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:from-blue-400 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home