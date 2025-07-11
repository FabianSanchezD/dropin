import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProfileLayout from './layouts/ProfileLayout';
import Dashboard from './routes/Dashboard';
import ProfileDetails from './routes/ProfileDetails';
import ProfileStarter from './routes/ProfileStarter';
import ProfileUpdater from './routes/ProfileUpdater';
import MeetupPage from './routes/MeetupPage';
import MeetupCreation from './routes/MeetupCreation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
  <Route path='/' element={<MainLayout />}>
    <Route index element={ <Home /> }/> 
    <Route path='/about' element= {<About />} />
    <Route path='/login' element= {<Login />} />
    <Route path='/meetup/:id' element={<MeetupPage />} />
    <Route path='/meetup/create' element={<MeetupCreation />} />
    <Route path='*' element= {<NotFound />} />
  </Route>
 
    <Route path='/dashboard' element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
    </Route>

    <Route path='/profile' element={<ProfileLayout />}>
      <Route index element={ <ProfileDetails />} />
      <Route path='starter' element={ <ProfileStarter />} />
      <Route path='updater' element={ <ProfileUpdater />} />
    </Route>
    </> 
  )
);

const App = () => {
  return <RouterProvider router={router}/>
}

export default App