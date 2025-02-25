import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import backendApi from "../services/backendApi";
import GenreSelector from '../components/GenreSelector';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [showGenres, setShowGenres] = useState(false); 
    const [genres, setGenres] = useState();


    const fetchUserData = async (email) => {  
        if (!token) {
            console.error("Token ausente, não foi possível buscar os dados do usuário.");
            return;
        }
        try {
            const response = await backendApi.get(`/usuario/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log("Dados do usuário:", response.data);
            setUser(response.data);
    
            const username = response.data?.data?.username;
    
            if (!username) {
                console.error("Erro: username não encontrado na resposta do servidor.");
                return;
            }
    
            console.log("Username do usuário:", username);
            fetchPerfil(username, email);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    const handleGenreSelection = (selectedGenres) => {
        setGenres(selectedGenres);
        setShowGenres(false);
    };

    const fetchPerfil = async (username, email) => {
        if (!username || !email) {
            console.error("Erro: username ou email inválido.");
            return;
        }
    
        try {
            const perfilResponse = await backendApi.get(`/perfil/buscar/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Perfil encontrado:", perfilResponse.data);
            setUser(prevUser => ({ ...prevUser, perfil: perfilResponse.data.data }));
    
        } catch (error) {
            console.warn("Perfil não encontrado. Criando novo perfil...");
    
            // Alterar showGenres para exibir o GenreSelector ao criar o perfil
            setShowGenres(true);
    
            const novoPerfil = {
                usuario: { email: email, username: username },
                urlPerfil: "https://res.cloudinary.com/dkmbs6lyk/image/upload/v1737478455/libris_images/uab0wwjncncnvb4ul6nl.jpg",
                resumoBio: '<p>💕 Gosto de _</p><p>📚 Livro Favorito _</p><p><br></p><blockquote><strong>" </strong><strong style="color: rgb(58, 58, 58);">Não perca a esperança. O amanhã é desconhecido. O conselho vem muitas vezes com o nascer do sol.</strong><strong>."',
                seguindo: 0,
                seguidores: 0,
                generosFavoritos: genres, // Gêneros selecionados serão passados aqui
                urlBackPerfil: "https://res.cloudinary.com/dkmbs6lyk/image/upload/v1737480828/libris_images/hyxilej7wwvmhyiqmlog.jpg",
            };
    
            try {
                const createResponse = await backendApi.post("/perfil", novoPerfil, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log("Perfil criado:", createResponse.data);
                setUser(prevUser => ({ ...prevUser, perfil: createResponse.data.data }));
    
            } catch (createError) {
                console.error("Erro ao criar perfil:", createError.response?.data || createError);
            }
        }
    };
    
    

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                if (decodedUser?.sub) {
                    fetchUserData(decodedUser.sub);
                } else {
                    console.error("Erro: Token não contém um email válido.");
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                setUser(null);
            }
        }
    }, [token]);
    

    const login = async (newToken) => {
        sessionStorage.setItem("token", newToken);
        const decodedUser = jwtDecode(newToken);
        setToken(newToken);
        setUser(decodedUser);

        // Buscar os dados do usuário
        await fetchUserData(decodedUser.sub);
      
    };
    
    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
            {children}
            {showGenres && (
                <GenreSelector onSave={handleGenreSelection} />
            )}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);