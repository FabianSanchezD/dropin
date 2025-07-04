import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const ProfileStarter = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({name: "", interests: [], campus: ""})

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        
        if (type === 'checkbox') {
            // Handle multiple interests
            setFormData((prevFormData) => {
                const currentInterests = prevFormData.interests || [];
                if (checked) {
                    return { ...prevFormData, interests: [...currentInterests, value] };
                } else {
                    return { ...prevFormData, interests: currentInterests.filter(interest => interest !== value) };
                }
            });
        } else {
            // Handle single values (radio buttons, text inputs)
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    console.log('User:', user);
    
    try {
      const { error } = await supabase
        .from('users')
        .insert({ 
          id: user.id, 
          name: formData.name,
          interests: formData.interests,
          campus: formData.campus
        });
      
      if (error) {
        console.error('Error inserting user data:', error);
      } else {
        console.log('User data saved successfully');
        // Navigate to dashboard after successful save
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  };

    useEffect(() => {
        async function initializeProfileStarter() {
          try {
            // First, get user data
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData?.user) {
              setUser(userData.user);
              console.log(userData, "usedata")
              // If user is authenticated, start form

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
    
        initializeProfileStarter();
      }, [navigate]);

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
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
            <img src="/dropin-icon.png" alt="DropIn Logo" className="w-14 h-14" />
            <h1 className="text-4xl font-bold text-white">Drop-In</h1>
          </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Before moving on...
              </h1>
              <p className="text-gray-300 text-lg">
                Help us personalize your Drop-In experience by telling us about yourself!
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-white font-semibold text-lg">
                  What's your name? 
                  <span className="text-blue-400 text-sm ml-2">(Also last name could be useful!)</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Example: Fabián Sánchez"
                />
              </div>

              {/* Interests Field */}
              <div className="space-y-4">
                <label className="block text-white font-semibold text-lg">
                  What topics interest you? 
                  <span className="text-blue-400 text-sm ml-2">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="cal"
                      checked={formData.interests.includes('cal')}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Cálculo y Álgebra Lineal</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="discrete"
                      checked={formData.interests.includes('discrete')}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Matemática Discreta</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="foc"
                      checked={formData.interests.includes('foc')}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Fundamentos de Organización de Computadores</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="introp"
                      checked={formData.interests.includes('introp')}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Introducción a la Programación</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="coffee"
                      checked={formData.interests.includes('coffee')}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Café</span>
                  </label>
                </div>
                <p className="text-gray-400 text-sm">Contact us to add more topics!</p>
              </div>

              {/* Campus Field */}
              <div className="space-y-4">
                <label className="block text-white font-semibold text-lg">
                  What campus are you on?
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="campus" 
                      value="teccar"
                      checked={formData.campus === 'teccar'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Tecnológico de Costa Rica Cartago</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="campus" 
                      value="ucrsj"
                      checked={formData.campus === 'ucrsj'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-400 focus:ring-2"
                    />
                    <span className="text-white">Universidad de Costa Rica San José</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Complete Setup & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStarter