import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './Routes/private.routes'
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
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path='/configuracao' element={<Configuracao />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/home' element={<Home />}/>
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/livro/:id' element={<Livro />} />  
            <Route path='/resenha' element={<Resenha />} />  
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer/> 
      </AuthProvider>
    </>
  )
}

export default App
