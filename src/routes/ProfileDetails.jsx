import React from 'react'
import NavbarProfile from '../components/NavbarProfile';

const ProfileDetails = () => {
  const foundData = false;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      async function initializeProfileDetails() {
        try {
          // First, get user data
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData?.user) {
            setUser(userData.user);

            try {
              // Fetch user profile data
              const { data: fetchedUserData, error: fetchedUserError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId);
                foundData = true;

            } catch (err) {
              console.log('No user info found.')
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

  return (
    <NavbarProfile />
    

  )
}

export default ProfileDetails