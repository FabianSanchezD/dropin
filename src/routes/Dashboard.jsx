import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [userProfileName, setUserProfileName] = useState(null);
  const [userUpdated, setUserUpdated] = useState([]);

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
            const userId = userData.user.id;
            const currentTime = new Date();
            console.log('Current time:', currentTime);
            const userConfirmedAt = new Date(userData.user.confirmed_at);
            console.log('User confirmed at:', userConfirmedAt);
            const difference = currentTime - userConfirmedAt; // Fixed: current time minus confirmed time
            console.log('Time difference (ms):', difference);
            
            // If user was confirmed less than 45 seconds ago, redirect to profile setup
            if (difference < 45000) {
              console.log('New user detected, redirecting to profile setup');
              navigate('/profile/starter');
              return;
            }

            // Fetch user profile data
            const { data: fetchedUserData, error: fetchedUserError } = await supabase
              .from('users')
              .select('*')
              .eq('id', userId); // Fixed: use .eq() instead of .match()

              if (fetchedUserData && fetchedUserData.length > 0) {

                const NameOfTheUser = fetchedUserData[0].name
                console.log(fetchedUserData)
                const userInterests = fetchedUserData[0].interests || [];
                setUserUpdated(userInterests)
                console.log(userUpdated, "interests")
                console.log(NameOfTheUser, "username")
                setUserProfileName(NameOfTheUser); // Store the name in state
              } else {
                const NameOfTheUser = null
              }
            
            const { data: fetchedData, error: fetchedError } = await supabase
              .from('meetups')
              .select('*');

            if (fetchedError) {
              console.log('Error fetching meetups:', fetchedError);
              setError(fetchedError);
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
    <div className="pt-20 pb-24 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
            {userProfileName === null ? <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">Welcome! 👋
            <span className="text-blue-400 text-sm ml-2">Want your name here? Go to Profile and update your data!</span></h1>
            :
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">Welcome, <span className="text-blue-400">{userProfileName}</span>! 👋</h1>}

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
                  {(userUpdated.length === 0) ?
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-white font-semibold mb-2">Set up your interests!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Tell us about your courses and interests to get personalized meetup recommendations.
                    </p>
                    <button onClick={() => {navigate('/profile/updater')}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                      Add Interests
                    </button>
                  </div>
                  :
                  <div>
                    {/* Show personalized meetups based on user interests */}
                    {data && data.length > 0 ? (
                      (() => {
                        const personalizedMeetups = data.filter(meetup => {
                          // Filter meetups that match user interests and exclude inactive ones
                          if (meetup.status === 'inactive') return false;
                          const meetupCategories = meetup.categories || [];
                          return userUpdated.some(interest => 
                            meetupCategories.includes(interest) || 
                            meetup.title?.toLowerCase().includes(interest.toLowerCase()) ||
                            meetup.description?.toLowerCase().includes(interest.toLowerCase())
                          );
                        });

                        if (personalizedMeetups.length > 0) {
                          return (
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                              <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                ssr={true}
                                infinite={personalizedMeetups.length > 3}
                                autoPlay={false}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                              >
                                {personalizedMeetups.map((meetup) => (
                                  <div key={meetup.id} className="p-4 bg-white/10 rounded-lg ml-4 cursor-pointer hover:bg-white/15 transition-colors" onClick={() => navigate(`/meetup/${meetup.id}`)}>
                                    <h4 className="text-white font-semibold">{meetup.title || 'Unnamed Meetup'}</h4>
                                    <p className="text-gray-300 text-sm">{meetup.description || 'No description'}</p>
                                    <p className="text-gray-300 text-xs pt-1">Created by {meetup.created_by || 'Anonymous'}</p>
                                    <p className="text-blue-400 text-xs mt-2">
                                      {new Date(meetup.start_time).toLocaleDateString()} at {new Date(meetup.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                    <div className='text-blue-400 text-sm flex items-center'>
                                      <FaMapMarkerAlt className='text-blue-400 mr-1'/> 
                                      {meetup.location}
                                    </div>
                                  </div>
                                ))}
                              </Carousel>
                            </div>
                          );
                        } else {
                          return (
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center ">
                              <div className="text-4xl mb-4">🔍</div>
                              <h3 className="text-white font-semibold mb-2">No matching meetups found</h3>
                              <p className="text-gray-400 text-sm mb-4">
                                We couldn't find meetups matching your interests yet. Try creating one!
                              </p>
                              <button 
                                onClick={() => navigate('/meetup/create')}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                              >
                                Create Meetup
                              </button>
                            </div>
                          );
                        }
                      })()
                    ) : (
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-white font-semibold mb-2">No meetups available</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Be the first to create a meetup on campus!
                        </p>
                        <button 
                          onClick={() => navigate('/meetup/create')}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Create First Meetup
                        </button>
                      </div>
                    )}
                  </div>
                  }
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
                <div className="space-y-4">
                  {/* Check for active meetups using status */}
                  {data && data.length > 0 ? (
                    (() => {
                      const liveMeetups = data.filter(meetup => meetup.status === 'active');

                      if (liveMeetups.length > 0) {
                        return (
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <Carousel
                              swipeable={false}
                              draggable={false}
                              showDots={true}
                              responsive={responsive}
                              ssr={true}
                              infinite={liveMeetups.length > 3}
                              autoPlay={false}
                              keyBoardControl={true}
                              customTransition="all .5"
                              transitionDuration={500}
                              containerClass="carousel-container"
                              removeArrowOnDeviceType={["tablet", "mobile"]}
                              dotListClass="custom-dot-list-style"
                              itemClass="carousel-item-padding-40-px"
                            >
                              {liveMeetups.map((meetup) => (
                                <div key={meetup.id} className="p-4 bg-white/10 rounded-lg ml-4 cursor-pointer hover:bg-white/15 transition-colors" onClick={() => navigate(`/meetup/${meetup.id}`)}>
                                  <h4 className="text-white font-semibold">{meetup.title || 'Unnamed Meetup'}</h4>
                                  <p className="text-gray-300 text-sm">{meetup.description || 'No description'}</p>
                                  <p className="text-gray-300 text-xs pt-1">Created by {meetup.created_by || 'Anonymous'}</p>
                                  <p className="text-blue-400 text-xs mt-2">
                                    {new Date(meetup.start_time).toLocaleDateString()} at {new Date(meetup.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </p>
                                  <div className='text-blue-400 text-sm flex items-center'>
                                    <FaMapMarkerAlt className='text-blue-400 mr-1'/> 
                                    {meetup.location}
                                  </div>
                                </div>
                              ))}
                            </Carousel>
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-center py-8 bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                            <div className="text-4xl mb-4">📡</div>
                            <h3 className="text-white font-semibold mb-2 ">No live meetups right now</h3>
                            <p className="text-gray-400 text-sm mb-4">
                              Be the first to start a spontaneous meetup on campus!
                            </p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => navigate('/meetup/create')}>
                              Start Live Meetup
                            </button>
                          </div>
                        );
                      }
                    })()
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📡</div>
                      <h3 className="text-white font-semibold mb-2">No live meetups right now</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Be the first to start a spontaneous meetup on campus!
                      </p>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => navigate('/meetup/create')}>
                        Start Live Meetup
                      </button>
                    </div>
                  )}
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
                  {data && data.length > 0 ? (
                    (() => {
                      const upcomingMeetups = data.filter(meetup => 
                        meetup.status === 'scheduled' || meetup.status === 'soon'
                      ).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)); // Sort by start time

                      if (upcomingMeetups.length > 0) {
                        return (
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <Carousel
                              swipeable={false}
                              draggable={false}
                              showDots={true}
                              responsive={responsive}
                              ssr={true}
                              infinite={upcomingMeetups.length > 3}
                              autoPlay={false}
                              keyBoardControl={true}
                              customTransition="all .5"
                              transitionDuration={500}
                              containerClass="carousel-container"
                              removeArrowOnDeviceType={["tablet", "mobile"]}
                              dotListClass="custom-dot-list-style"
                              itemClass="carousel-item-padding-40-px"
                            >
                              {upcomingMeetups.map((meetup) => (
                                <div key={meetup.id} className="p-4 bg-white/10 rounded-lg ml-4 cursor-pointer hover:bg-white/15 transition-colors" onClick={() => navigate(`/meetup/${meetup.id}`)}>
                                  <h4 className="text-white font-semibold">{meetup.title || 'Unnamed Meetup'}</h4>
                                  <p className="text-gray-300 text-sm">{meetup.description || 'No description'}</p>
                                  <p className="text-gray-300 text-xs pt-1">Created by {meetup.created_by || 'Anonymous'}</p>
                                  <p className="text-blue-400 text-xs mt-2">
                                    {new Date(meetup.start_time).toLocaleDateString()} at {new Date(meetup.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </p>
                                  <div className='text-blue-400 text-sm flex items-center'>
                                    <FaMapMarkerAlt className='text-blue-400 mr-1'/> 
                                    {meetup.location}
                                  </div>
                                </div>
                              ))}
                            </Carousel>
                          </div>
                        );
                      } else {
                        return (
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-white font-semibold mb-2">No upcoming meetups</h3>
                            <p className="text-gray-400 text-sm mb-4">
                              Create a meetup or ask a friend to create one.
                            </p>
                            <button onClick={() => {navigate('/meetup/create')}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                              Create a meetup
                            </button>
                          </div>
                        );
                      }
                    })()
                  ) : (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                      <div className="text-4xl mb-4">📅</div>
                      <h3 className="text-white font-semibold mb-2">No upcoming meetups</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Create a meetup or join others' events to see them here.
                      </p>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => navigate('/meetups')}>
                        Browse Meetups
                      </button>
                    </div>
                  )}
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