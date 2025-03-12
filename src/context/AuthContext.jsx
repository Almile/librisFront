import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import backendApi from "../services/backendApi";
import GenreSelector from "../components/GenreSelector";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [showGenres, setShowGenres] = useState(false);
    const [genres, setGenres] = useState([]);

    const fetchUserData = async (email) => {
        if (!token) {
            console.error("Token ausente, não foi possível buscar os dados do usuário.");
            return;
        }
        try {
            const response = await backendApi.get(`/usuario/${email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Dados do usuário:", response.data);
            setUser(response.data);

            const username = response?.data?.data?.username;
            const emailUser = response?.data?.data?.email;

            if (!username) {
                console.error("Erro: username não encontrado na resposta do servidor.");
                return;
            }

            console.log("Username do usuário:", username);
            console.log("email do usuário:", emailUser);

            fetchPerfil(username, emailUser);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    const handleGenreSelection = (selectedGenres) => {
        const convertedGenres = selectedGenres.map(genre => genre).filter(Boolean);
        setGenres(convertedGenres);
        setShowGenres(false);
    };

    const fetchPerfil = async (username, email) => {
        if (!username || !email) {
            console.log("username",username,"email: ",email)
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
            console.warn("Perfil não encontrado. Exibindo seleção de gêneros...");
            setShowGenres(true);
        }
    };

    const createPerfil = async () => {
        if (!user || genres.length === 0) {
            console.error("Erro: Usuário não carregado ou sem gêneros selecionados.");
            return;
        }

        const username = user?.data?.username;
        const email = user?.data?.email;

        if (!username || !email) {
            console.error("Erro: Username ou email inválidos.");
            return;
        }

        const novoPerfil = {
            urlPerfil: "https://res.cloudinary.com/dkmbs6lyk/image/upload/v1737478455/libris_images/uab0wwjncncnvb4ul6nl.jpg",
            resumoBio: '<p>💕 Gosto de _</p><p>📚 Livro Favorito _</p><p><br></p>',
            generosFavoritos: genres, // Corrigido para manter um array plano
            urlBackPerfil: "https://res.cloudinary.com/dkmbs6lyk/image/upload/v1737480828/libris_images/hyxilej7wwvmhyiqmlog.jpg",
            usuarioEmail: email
        };

        try {
            const createResponse = await backendApi.post("/perfil", novoPerfil, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Perfil criado:", createResponse.data);
            setUser(prevUser => ({ ...prevUser, perfil: createResponse.data.data }));
        } catch (createError) {
            console.error("Erro ao criar perfil:", createError.response?.data || createError);
        }
    };

    useEffect(() => {
        if (user && genres.length > 0 && !user.perfil) {
            createPerfil();
        }
    }, [user, genres]); // Agora só roda quando ambos são definidos

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
        if (!newToken) {
            console.error("Erro: Token inválido.");
            return;
        }

        sessionStorage.setItem("token", newToken);
        setToken(newToken);
        
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    // Dentro do useEffect que já busca os dados do usuário
    useEffect(() => {
        if (user?.data?.username) {
            fetchPerfil(user.data.username);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ token, user, setUser , isAuthenticated: !!token, login, logout }}>
            {children}
            {showGenres && <GenreSelector onSave={handleGenreSelection} />}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
