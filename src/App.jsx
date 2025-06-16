import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import MainLayout from './layouts/MainLayout';
import Dashboard from './routes/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={ <Home /> }/> 
    <Route path='/about' element= {<About />} />
    <Route path='/dashboard' element= {<Dashboard />} />
    <Route path='/login' element= {<Login />} />
    <Route path='*' element= {<NotFound />} />
  </Route>
  )
);

const App = () => {

  return <RouterProvider router={router}/>
}

export default App