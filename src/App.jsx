import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Routes/private.routes';
import PublicRoute from './Routes/public.routes';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ResetPassword from './pages/ResetPassword';

import Home from './pages/Home';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import Perfil from './pages/Perfil';
import Catalogo from './pages/Catalogo';
import Livro from './pages/Livro';
import Forum from './pages/Forum';
import Configuracao from './pages/Configuracao';
import Resenha from './pages/Resenha';

import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar é exibida em todas as páginas */}
        <Navbar />

        <Routes>
          {/* Rotas públicas */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            <Route path='/reset-password' element={<ResetPassword />} />

          {/* Rotas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/perfil/:id' element={<Perfil />} />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='/livro/:id' element={<Livro />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/configuracao' element={<Configuracao />} />
            <Route path='/resenha' element={<Resenha />} />
          </Route>
        </Routes>

        {/* Footer é exibido em todas as páginas */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
