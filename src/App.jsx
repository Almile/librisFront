import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Login from './components/Login'

import HomePage from './pages/HomePage'
import Perfil from './pages/Perfil'
import Catalogo from './pages/Catalogo'
import Busca from './pages/Busca'
import Livro from './pages/Livro'
import Forum from './pages/Forum'
import Configuracao from './pages/Configuracao'
import Notificacao from './pages/Notificacao'

import './styles/index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route path='/configuracao' element={<ProtectedRoute><Configuracao /></ProtectedRoute>} />
          <Route path='/forum' element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path='/homePage' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path='/catalogo' element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
          <Route path='/busca' element={<ProtectedRoute><Busca /></ProtectedRoute>} />
          <Route path='/notificacao' element={<ProtectedRoute><Notificacao /></ProtectedRoute>} />
          <Route path='/livro' element={<ProtectedRoute><Livro /></ProtectedRoute>} />  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
