import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const MeetupCreation = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null)
    const [formData, setFormData] = useState({
        title: "", 
        description: "", 
        start_time: null, 
        end_time: null, 
        max_attendees: 6, 
        location: "", 
        interest: "", 
        campus: ""
    })
    const [existingData, setExistingData] = useState(null);

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
        async function initializeMeetupCreation() {
          try {
            // First, get user data
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData?.user) {
              setUser(userData.user);
              console.log(userData, "usedata");
              
              // Fetch existing user profile data
              try {
                const { data: existingUserData, error: fetchError } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', userData.user.id);

                if (fetchError) {
                  console.error('Error fetching user profile:', fetchError);
                } else if (existingUserData && existingUserData.length > 0) {
                  console.log('Existing user data:', existingUserData[0]);
                  setExistingData(existingUserData[0]);

                } else {
                  console.log('No existing profile data found');
                }
              } catch (err) {
                console.error('Error fetching profile data:', err);
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
    
        initializeMeetupCreation();
      }, [navigate]);

      
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(formData)
    };

    const handleDateChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value ? new Date(value) : null
      }));
    };

    // function to determine status based on start_time
    const getMeetupStatus = (startTime, endTime) => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      // Calculate time difference in minutes
      const timeDiffMinutes = (start - now) / (1000 * 60);
      
      if (now > end) {
        return 'inactive'; // Meetup has ended
      } else if (now >= start && now <= end) {
        return 'active'; // Meetup is happening rn
      } else if (timeDiffMinutes <= 30 && timeDiffMinutes > 0) {
        return 'soon'; // Meetup starts within 30 minutes
      } else {
        return 'scheduled'; // Meetup is scheduled for future
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      console.log('meetup data:', user);
      
      try {
        if (!formData.start_time || !formData.end_time) {
          alert('Please select both start and end times for the meetup.');
          return;
        }

        if (new Date(formData.start_time) >= new Date(formData.end_time)) {
          alert('End time must be after start time.');
          return;
        }

        if (new Date(formData.start_time) < new Date()) {
          alert('Start time cannot be in the past.');
          return;
        } 

        const status = getMeetupStatus(formData.start_time, formData.end_time);
        
        const { data: insertedData, error } = await supabase
          .from('meetups')
          .insert({
          title: formData.title,
          description: formData.description,
          start_time: formData.start_time.toISOString(),
          end_time: formData.end_time.toISOString(),
          current_attendees: 1,
          max_attendees: parseInt(formData.max_attendees),
          location: formData.location,
          interest: formData.interest,
          campus: formData.campus,
          attendees: [existingData?.name || 'Anonymous'],
          created_by: existingData?.name || 'Anonymous',
          created_at: new Date().toISOString(),
          status: status
        })
        .select()
        
        if (error) {
          console.error('Error creating meetup:', error);
          alert('Error creating meetup. Please try again.');
        } else {
          console.log('Meetup created successfully:', insertedData);
          alert('Meetup created successfully!');
          // go to created meetup
          if (insertedData && insertedData.length > 0) {
            navigate(`/meetup/${insertedData[0].id}`);
          } else {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Error saving meetup:', err);
      }
    };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Wait a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="px-8 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-blue-400 hover:text-blue-300 font-medium mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Create New Meetup
            </h1>
            <p className="text-gray-300 text-lg">
              Organize a study session or a break with people from campus
            </p>
          </div>

          <form className="space-y-8">
            {/* Title Field */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-white font-semibold text-lg">
                Title
                <span className="text-blue-400 text-sm ml-2 font-normal">(Keep it friendly!)</span>
              </label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Example: Estudio de Cálculo para el 3er examen"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-3">
              <label htmlFor="description" className="block text-white font-semibold text-lg">
                Description
                <span className="text-blue-400 text-sm ml-2 font-normal">(Keep it friendly, too!)</span>
              </label>
              <textarea 
                id="description" 
                name="description" 
                rows="4"
                value={formData.description} 
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Example: Estudiaremos todo el temario para estar preparados para la prueba del lunes."
              />
            </div>

            {/* Location Field */}
            <div className="space-y-3">
              <label htmlFor="location" className="block text-white font-semibold text-lg">
                Location
              </label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Example: Cubículo 12, Librería José Figueres Ferrer"
              />
            </div>

            {/* Max Attendees Field */}
            <div className="space-y-3">
              <label htmlFor="max_attendees" className="block text-white font-semibold text-lg">
                Maximum Attendees
              </label>
              <input 
                type="number" 
                id="max_attendees" 
                name="max_attendees" 
                min="1"
                max="50"
                value={formData.max_attendees} 
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="5"
              />
            </div>

            {/* Start Date and Time */}
            <div className="space-y-3">
              <label className="block text-white font-semibold text-lg">
                Start Date and Time
              </label>
              <input 
                type="datetime-local"
                name="start_time"
                value={formData.start_time ? 
                  new Date(formData.start_time.getTime() - formData.start_time.getTimezoneOffset() * 60000)
                    .toISOString().slice(0, 16) : ''}
                onChange={(e) => handleDateChange('start_time', e.target.value)}
                min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* End Date and Time */}
            <div className="space-y-3">
              <label className="block text-white font-semibold text-lg">
                End Date and Time
              </label>
              <input 
                type="datetime-local"
                name="end_time"
                value={formData.end_time ? 
                  new Date(formData.end_time.getTime() - formData.end_time.getTimezoneOffset() * 60000)
                    .toISOString().slice(0, 16) : ''}
                onChange={(e) => handleDateChange('end_time', e.target.value)}
                min={formData.start_time ? 
                  new Date(formData.start_time.getTime() - formData.start_time.getTimezoneOffset() * 60000)
                    .toISOString().slice(0, 16) : 
                  new Date().toISOString().slice(0, 16)} // End time must be after start time
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Interest Field */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Subject/Interest
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="interest" 
                    value="cal"
                    checked={formData.interest === 'cal'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Cálculo y Álgebra Lineal</span>
                </label>
                
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="interest" 
                    value="coffee"
                    checked={formData.interest === 'coffee'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Break de Café</span>
                </label>

                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="interest" 
                    value="introp"
                    checked={formData.interest === 'introp'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Introducción a la Programación</span>
                </label>
                
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="interest" 
                    value="discrete"
                    checked={formData.interest === 'discrete'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Matemática Discreta</span>
                </label>
                
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group md:col-span-2">
                  <input 
                    type="radio" 
                    name="interest" 
                    value="foc"
                    checked={formData.interest === 'foc'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Fundamentos de Organización de Computadores</span>
                </label>
              </div>
            </div>

            {/* Campus Field */}
            <div className="space-y-4">
              <label className="block text-white font-semibold text-lg">
                Campus
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="campus" 
                    value="teccar"
                    checked={formData.campus === 'teccar'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Tecnológico de Costa Rica Cartago</span>
                </label>
                
                <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="campus" 
                    value="ucrsj"
                    checked={formData.campus === 'ucrsj'}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="text-white group-hover:text-blue-200 transition-colors">Universidad de Costa Rica San José</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-400 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Meetup
              </button>
              <button 
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 sm:flex-none border-2 border-gray-400 text-gray-300 hover:text-white hover:border-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MeetupCreation