import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'

import LandingPage from './pages/LandingPage'
import Perfil from './pages/Perfil'
import Catalogo from './pages/Catalogo'
import Livro from './pages/Livro'
import Forum from './pages/Forum'
import Configuracao from './pages/Configuracao'
import Resenha from './pages/Resenha'

import './styles/index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />

          <Route path='/configuracao' element={<ProtectedRoute><Configuracao /></ProtectedRoute>} />
          <Route path='/forum' element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path='/catalogo' element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
          <Route path='/livro/:id' element={<ProtectedRoute><Livro /></ProtectedRoute>} />  
          <Route path='/resenha' element={<ProtectedRoute><Resenha /></ProtectedRoute>} />  

        </Routes>
      </BrowserRouter>

      <Footer/> 
    </>
  )
}

export default App
