import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function Navbar() {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const navbarStyle = {
        position: isLoginPage ? 'fixed' : 'relative',
    };
    return (
        <nav  className='navbar' style={navbarStyle}>
            {isAuthenticated ? (
                <>
                    <Link to="/homePage">HomePage</Link>
                    <Link to="/catalogo">Catalogo</Link>
                    <Link to="/forum">Fórum</Link>
                    <Link to="/notificacao">Notificações</Link>
                    <Link to="/configuracao">Configurações</Link>
                    <Link to="/perfil">Meu perfil</Link>
                </>
            ) : (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;