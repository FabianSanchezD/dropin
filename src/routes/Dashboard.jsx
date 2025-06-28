import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Welcome back, <span className="text-blue-400">{userName}</span>! 👋
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Ready to connect with your campus community today?
                  </p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                    + Create New Meetup
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Your Meetups</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="text-3xl">📅</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Connections Made</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="text-3xl">🤝</div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Events Joined</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personalized Meetups */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">✨</div>
                  <h2 className="text-xl font-bold text-white">Meetups for You</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-white font-semibold mb-2">Set up your interests!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Tell us about your courses and interests to get personalized meetup recommendations.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                      Add Interests
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Meetups */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">🔴</div>
                  <h2 className="text-xl font-bold text-white">Live Meetups</h2>
                  <div className="ml-auto">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📡</div>
                  <h3 className="text-white font-semibold mb-2">No live meetups right now</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Be the first to start a spontaneous meetup on campus!
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    Start Live Meetup
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Meetups */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">⏰</div>
                  <h2 className="text-xl font-bold text-white">Upcoming Meetups</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-white font-semibold mb-2">No upcoming meetups</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Schedule your first meetup or join others' events to see them here.
                    </p>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                      Browse Meetups
                    </button>
                  </div>
                </div>
              </div>

              {/* Almost Full Meetups */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">🔥</div>
                  <h2 className="text-xl font-bold text-white">Filling Up Fast</h2>
                </div>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-white font-semibold mb-2">No popular meetups yet</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Popular meetups that are almost full will appear here.
                  </p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    Explore All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">📊</div>
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              </div>
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="text-white font-semibold mb-2">Welcome to Drop-In!</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Your meetup activity and connections will show up here as you start using the platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                    Create Your First Meetup
                  </button>
                  <button className="border-2 border-blue-400 text-blue-400 font-semibold py-3 px-6 rounded-xl hover:bg-blue-400 hover:text-white transition-all duration-300">
                    Explore Campus Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;