import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

import Login from './components/Login'
import HomePage from './pages/HomePage'
import Perfil from './pages/Perfil'

import './styles/index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/homePage' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
