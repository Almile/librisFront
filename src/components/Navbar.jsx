import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useState, useRef, useEffect } from 'react';
import '../styles/navbar.css';
import Notificacoes from './Notificacoes';
import logo from '/logotipo.svg';
import userPhoto from '/user_padrao.svg';

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);
    const savedTheme = localStorage.getItem('theme');

    const toggleTheme = () => {
        if (!isAuthenticated) return;
    
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.classList.toggle('dark-mode', newMode);
            document.body.classList.toggle('light-mode', !newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };
    
    useEffect(() => {
        const isPublicPage = !isAuthenticated;
    
        if (isPublicPage) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
            }
        }
    }, [location.pathname, isAuthenticated]); 

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const isLoginPage = location.pathname === '/login';

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }

        if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setIsNotificationsOpen(false);
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
        setIsNotificationsOpen(false);
    };



    return (
        <nav className={`navbar ${isLoginPage ? 'navbar-fixed' : 'navbar-relative'}`}>
            <div>
                <Link to={isAuthenticated ? "/homePage" : "/"} className="logo">
                    <img src={logo} alt="Logo Libris" />
                    <h1 className='libris'>LIBRIS</h1>
                </Link>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <ion-icon name="menu-outline"></ion-icon>
            </button>

            <div className={`navbar-auth ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
               {isAuthenticated ? (
    <>
        <Link
            to="/homePage"
            className={location.pathname === '/homePage' ? 'active-link' : ''}
            onClick={handleLinkClick}
        >
            Home
        </Link>
        <Link
            to="/catalogo"
            className={location.pathname === '/catalogo' ? 'active-link' : ''}
            onClick={handleLinkClick}
        >
            Catálogo
        </Link>
        <Link
            to="/forum"
            className={location.pathname === '/forum' ? 'active-link' : ''}
            onClick={handleLinkClick}
        >
            Fórum
        </Link>

        <div className="notifications-button" ref={notificationsRef}>
            <button className="notifications-button" onClick={toggleNotifications}>
                Notificações
            </button>

            {isNotificationsOpen && <Notificacoes />}
        </div>

        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img src={userPhoto} alt="Perfil" />
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu open">
                    <div className="dropdown-user" onClick={toggleDropdown}>
                        <img src={userPhoto} alt="Perfil" />
                        <div className="user-info">
                            <span>Nome do usuário</span>
                            <span>email@email.com</span>
                        </div>
                    </div>
                    <Link
                        to="/perfil"
                        className={location.pathname === '/perfil' ? 'active-link' : ''}
                        onClick={handleLinkClick}
                    >
                        Meu perfil
                    </Link>
                    <Link
                        to="/configuracao"
                        className={location.pathname === '/configuracao' ? 'active-link' : ''}
                        onClick={handleLinkClick}
                    >
                        Configurações
                    </Link>

                    <button onClick={toggleTheme} className="theme-toggle">
                        <span></span>
                        <span className="theme-icon">
                            {savedTheme === 'dark' ? (
                                <ion-icon name="sunny-outline"></ion-icon>
                            ) : (
                                <ion-icon name="moon-outline"></ion-icon>
                            )}
                        </span>
                    </button>

                    <button onClick={logout} className="dropdown-item">
                        Sair
                    </button>
                </div>
            )}
        </div>
    </>
) : (
    <>
        <a
            href="#sobre"
            className={location.hash === '#sobre' ? 'active-link' : ''}
            onClick={() => {
                scrollToSection('sobre');
                handleLinkClick();
            }}
        >
            Sobre
        </a>
        <a
            href="#servicos"
            className={location.hash === '#servicos' ? 'active-link' : ''}
            onClick={() => {
                scrollToSection('servicos');
                handleLinkClick();
            }}
        >
            Serviços
        </a>
        <a
            href="#contato"
            className={location.hash === '#contato' ? 'active-link' : ''}
            onClick={() => {
                scrollToSection('contato');
                handleLinkClick();
            }}
        >
            Contato
        </a>
        <Link
            to="/login"
            className={`login-button ${location.pathname === '/login' ? 'active-link' : ''}`}
            onClick={handleLinkClick}
        >
            Login
        </Link>
    </>
)}

            </div>
        </nav>
    );
}

export default Navbar;
