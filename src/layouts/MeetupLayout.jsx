import { Outlet } from 'react-router-dom'
import NavbarMeetup from '../components/NavbarMeetup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return <>
    <NavbarMeetup />
    <Outlet />
    <ToastContainer />
  </>
}

export default MainLayout