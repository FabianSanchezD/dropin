import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initializeDashboard() {
      try {
        // First, get user data
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData?.user) {
          setUser(userData.user);
          
          // If user is authenticated, fetch meetups data
          try {
            console.log('User authenticated, fetching meetups...');
            console.log('User ID:', userData.user.id);
            
            const { data: fetchedData, error: fetchedError } = await supabase
              .from('meetups')
              .select('*');

            console.log('Raw Supabase response:', { data: fetchedData, error: fetchedError });

            if (fetchedError) {
              console.log('Error fetching meetups:', fetchedError);
              setError(fetchedError);
              
              // Try fetching as anonymous user to test RLS
              console.log('Trying to fetch as anonymous user...');
              const { data: anonData, error: anonError } = await supabase
                .from('meetups')
                .select('*')
                .limit(1);
              
              console.log('Anonymous fetch result:', { anonData, anonError });
            } else {
              setData(fetchedData);
              console.log('Successfully fetched data:', fetchedData);
              console.log('Number of meetups:', fetchedData?.length || 0);
            }
          } catch (err) {
            console.log('Meetups fetch error:', err);
            // Don't set error for meetups, just log it since the table might not exist yet
          }
        } else {
          // No user, redirect to login
          navigate('/login');
          return;
        }
      } catch (err) {
        console.log('Auth error:', err);
        navigate('/login');
        return;
      } finally {
        setLoading(false);
      }
    }

    initializeDashboard();
  }, [navigate]);

  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

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

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            Welcome back, <span className="text-blue-400">{userName}</span>! 👋
          </h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
                  <p className="text-gray-400 text-sm font-medium">Meetups Joined</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-1 gap-8">
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
                  {!data || data.length === 0 ? (
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
                  ) : (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true}
                        infinite={data.length > 3}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                      >
                        {data.map((meetup) => (
                          <div key={meetup.id} className="p-4 bg-white/10 rounded-lg ml-4">
                            <h4 className="text-white font-semibold">{meetup.title || 'Unnamed Meetup'}</h4>
                            <p className="text-gray-300 text-sm">{meetup.description || 'No description'}</p>
                            <p className="text-blue-400 text-xs mt-2">{meetup.start_time || 'No date set'}</p>
                            <div className='text-blue-400 text-sm flex items-center'><FaLocationDot className='text-blue-400 mr-1'/> {meetup.location}</div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  )}
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