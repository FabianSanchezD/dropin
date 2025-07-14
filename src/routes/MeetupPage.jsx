import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase-client'
import { FaMapMarkerAlt, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";

const MeetupPage = () => {
  const { id } = useParams(); // We get the ID from the URL
  const navigate = useNavigate();
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfileName, setUserProfileName] = useState(null);
  const [attending, setAttending] = useState(false);

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
    async function fetchMeetupData() {
      try {
        let userId; 
        // Get the user
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          setUser(userData.user);

          userId = userData.user.id; 
        } else {
          navigate('/login');
          return;
        }

        // Fetch meetup data
        const { data: meetupData, error: meetupError } = await supabase
          .from('meetups')
          .select('*')
          .eq('id', id)
          .single(); 

        // Fetch user profile data
        const { data: fetchedUserData, error: fetchedUserError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId); // Fixed: use .eq() instead of .match()

          try {
          setUserProfileName(fetchedUserData[0].name)
          } catch {
            setUserProfileName(null)
          }

          
        if (meetupError) {
          setError(meetupError);
        } else if (meetupData) {
          setMeetup(meetupData);
          
          // Check attendance afte meetup data is available
          try {
            if (meetupData.attendees && meetupData.attendees.includes(userProfileName)) {
              setAttending(true);
            } else {
              setAttending(false);
            }
          } catch {
            setAttending(false);
          }
        } else {
          setError({ message: 'Meetup not found' });
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeetupData()
  }, [id, navigate]);

  const joiningMeetup = async () => {
    try {
      if (meetup.attendees && meetup.attendees.includes(userProfileName)) {
      alert('You are already attending this meetup!');
      return;
    }

    // Check if meetup is full
    if (meetup.current_attendees >= meetup.max_attendees) {
      alert('Sorry, this meetup is full!');
      return;
    }

    // Update the meetup with new attendee
    const { data, error: meetupJoiningError } = await supabase
      .from('meetups')
      .update({ 
        current_attendees: meetup.current_attendees + 1,
        attendees: [...(meetup.attendees || []), userProfileName]
      })
      .eq('id', meetup.id)
      .select(); 

    if (meetupJoiningError) {
      alert('Failed to join meetup. Please try again.');
    } else {
      alert('Successfully joined the meetup!');
      
      // Update local state instead of reloading the page
      setMeetup(prev => ({
        ...prev,
        current_attendees: prev.current_attendees + 1,
        attendees: [...(prev.attendees || []), userProfileName]
      }));
    }
  } catch (err) {
    alert('An unexpected error occurred. Please try again.');
  }
};

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading meetup details...</p>
        </div>
      </div>
    );
  }

  if (error || !meetup) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-white mb-4">Oops... Meetup Not Found</h1>
          <p className="text-gray-300 mb-6">
            {error.message || 'The meetup you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 font-medium mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Main Meetup Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {meetup.title || 'Unnamed Meetup'}
                </h1>
                <p className="text-gray-300 text-lg">
                  {meetup.description || 'No description available'}
                </p>
              </div>
              <div className="ml-4">
                {(meetup.status === "active") ?
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
                : (meetup.status === "inactive") ? 
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                   Inactive
                </span> : (meetup.status === "soon") ?
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                   Soon
                </span> :
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                   Scheduled
                </span>}
              </div>
            </div>

            {/* Meetup Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-gray-300">{meetup.location || 'Location not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-400" />
                  <div>
                    <p className="text-white font-semibold">Start Date & Time</p>
                    <p className="text-gray-300">
                      {meetup.start_time ? new Date(meetup.start_time).toLocaleString() : 'Time not specified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-green-400" />
                  <div>
                    <p className="text-white font-semibold">Participants</p>
                    <p className="text-gray-300">{meetup.current_attendees || 0} / {meetup.max_attendees}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Duration</p>
                    <p className="text-gray-300">
                      {meetup.start_time && meetup.end_time ? (() => {
                        const startingDate = new Date(meetup.start_time);
                        const endingDate = new Date(meetup.end_time);
                        const diff = endingDate - startingDate; // Fixed: end - start
                        const diffHours = diff / (1000 * 60 * 60);
                        const finalDiff = Math.floor(diffHours);
                        return `${finalDiff} hours`;
                      })() : 'Duration not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button, joining a meetup*/}
            {(attending === true) ? 
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={joiningMeetup} className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300 flex-1">
                Joined 
              </button>
            </div>
            :
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={joiningMeetup} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex-1">
                Join Meetup
              </button>
            </div>}
            
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Organizer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-semibold">
                    {meetup.created_by ? meetup.created_by.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{meetup.created_by}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-5">Interest</h3>
                <p className="text-white font-medium">{interests[meetup.interest]}</p>
            </div>
          </div>

          {/* Attendees Section */}
          <div className="mt-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Attendees</h3>
              <div className="space-y-3">
                {meetup.attendees && meetup.attendees.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {meetup.attendees.map((attendant, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 font-semibold text-sm">
                            {attendant ? attendant.charAt(0).toUpperCase() : 'A'}
                          </span>
                        </div>
                        <p className="text-gray-300 font-medium">{attendant || 'Anonymous'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">👥</div>
                    <p className="text-gray-400">No attendees yet</p>
                    <p className="text-gray-500 text-sm mt-1">Be the first to join this meetup!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MeetupPage;