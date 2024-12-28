import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useState, useRef, useEffect } from 'react';
import '../styles/navbar.css';

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.classList.toggle('dark-mode', newMode);
            return newMode;
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const isLoginPage = location.pathname === '/login';

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (isMobileMenuOpen) return;

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isAuthenticated && !isMobileMenuOpen) {
            setIsDropdownOpen(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsDropdownOpen(true);
        }
    }, [isMobileMenuOpen]);

    const scrollToSection = (id) => {
        if (isLoginPage) {
            navigate('/');
            setTimeout(() => {
                const section = document.getElementById(id);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 200);
        } else {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    };

    return (
        <nav className={`navbar ${isLoginPage ? 'navbar-fixed' : 'navbar-relative'}`}>
            <div className="logo">
                <Link to={isAuthenticated ? "/homePage" : "/"}>LOGO</Link>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>

            <div className={`navbar-auth ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                {isAuthenticated ? (
                    <>
                        <Link to="/homePage" onClick={handleLinkClick}>Home</Link>
                        <Link to="/catalogo" onClick={handleLinkClick}>Catálogo</Link>
                        <Link to="/forum" onClick={handleLinkClick}>Fórum</Link>
                        <Link to="/notificacao" onClick={handleLinkClick}>Notificações</Link>

                        <div className="dropdown" ref={dropdownRef}>
                            <button className="dropdown-toggle" onClick={toggleDropdown}>
                                <img src="https://via.placeholder.com/60" alt="Perfil" />
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-menu open">
                                    <div className="dropdown-user" onClick={toggleDropdown}>
                                        <img src="https://via.placeholder.com/40" alt="Perfil" />
                                        <div className="user-info">
                                            <span>Nome do usuario</span>
                                            <span>email@email.com</span>
                                        </div>
                                    </div>
                                    <Link to="/perfil" className="dropdown-item" onClick={handleLinkClick}>Meu perfil</Link>
                                    <Link to="/configuracao" className="dropdown-item" onClick={handleLinkClick}>Configurações</Link>

                                    <button onClick={toggleTheme} className="theme-toggle">
                                        <span></span>
                                        <span className="theme-icon">
                                            {isDarkMode ? (
                                                <ion-icon name="moon-outline"></ion-icon>
                                            ) : (
                                                <ion-icon name="sunny-outline"></ion-icon>
                                            )}
                                        </span>
                                    </button>

                                    <button onClick={logout} className="dropdown-item">Sair</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <a href="#sobre" onClick={() => {scrollToSection('sobre'); handleLinkClick();}}>Sobre</a>
                        <a href="#servicos" onClick={() => {scrollToSection('servicos'); handleLinkClick();}}>Serviços</a>
                        <a href="#contato" onClick={() => {scrollToSection('contato'); handleLinkClick();}}>Contato</a>
                        <Link to="/login" className="login-button" onClick={handleLinkClick}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
