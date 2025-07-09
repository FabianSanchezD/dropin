import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile';

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let interests = {"cal":"Cálculo y Álgebra Lineal",
              "foc":"Fundamentos de Organización de Computadores",
              "coffee": "Break de Café",
              "introp":"Introducción a la Programación",
              "discrete":"Matemática Discreta"
              }

  let campus = {"teccar":"Tecnológico de Costa Rica Cartago",
                "ucrsj":"Universidad de Costa Rica San José"
  }

  useEffect(() => {
      async function initializeProfileDetails() {
        try {
          // First, get user data
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData?.user) {
            setUser(userData.user);
            const userId = userData.user.id;

            try {
              // Fetch user profile data
              const { data: fetchedUserData, error: fetchedUserError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId);

              if (fetchedUserError) {
                console.error('Error fetching user data:', fetchedUserError);
                setError(fetchedUserError);
              } else {
                console.log("User profile data:", fetchedUserData);
                setUserProfileData(fetchedUserData);
              }

            } catch (err) {
              console.log('No user info found.', err);
              setError(err);
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
  
      initializeProfileDetails();
    }, [navigate]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarProfile />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Profile Details
              </h1>
              <p className="text-gray-300 text-lg">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {error ? (
                <div className="text-center py-8">
                  <div className="text-red-400 mb-4">❌</div>
                  <h3 className="text-white font-semibold mb-2">Error loading profile</h3>
                  <p className="text-gray-400 text-sm">{error.message}</p>
                </div>
              ) : userProfileData && userProfileData.length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Your Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Name</label>
                      <p className="text-gray-300 bg-white/10 p-3 rounded-lg">
                        {userProfileData[0].name || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Campus</label>
                      <p className="text-gray-300 bg-white/10 p-3 rounded-lg">
                        {campus[userProfileData[0].campus] || 'Not set'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-2">Interests</label>
                      <div className="bg-white/10 p-3 rounded-lg">
                        {userProfileData[0].interests && userProfileData[0].interests.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {userProfileData[0].interests.map((interest, index) => (
                              <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                {interests[interest]}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400">No interests set</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 text-center">
                    <button 
                    onClick={() => navigate('/profile/updater')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👤</div>
                  <h3 className="text-white font-semibold mb-2">No profile data found</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    It looks like you haven't set up your profile yet.
                  </p>
                  <button 
                    onClick={() => navigate('/profile/starter')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Set Up Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileDetails