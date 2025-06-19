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

  if (loading) return null; // or a spinner, do later


  // estaria bueno hacer que en el 1er signup pida nombre para luego ponerlo en el welcome message, tambien poner welcome back si es el 2do o mayor login
  return (
    <div>
      <div className='pt-20 p-8 min-h-screen bg-neutral-900 text-2xl font-bold text-white mb-4'>
        Welcome, {user.email}!
        <div className='pt-5'>
          Meetups related to your interests:
          <div>

          </div>
          Live meetups:
          <div>

          </div>
          Upcoming meetups:
          <div>

          </div>
          Meetups that are almost full:
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
