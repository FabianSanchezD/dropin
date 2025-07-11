import { supabase } from '../supabase-client'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const MeetupCreation = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({name: "", interests: [], campus: ""})
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
                  
                  setFormData({
                    name: existingUserData[0].name || "",
                    interests: existingUserData[0].interests || [],
                    campus: existingUserData[0].campus || ""
                  });
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
        
      </div>
    </div>
  )
}

export default MeetupCreation