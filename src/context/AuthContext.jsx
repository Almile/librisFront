import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import backendApi from "../services/backendApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    // Função para buscar os dados do usuário pela API
    const fetchUserData = async (email) => {  
        try {
            const response = await backendApi.get(`/usuario/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            console.log("Dados do usuário:", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };
    

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token); // Decodifica o token JWT                
                // Busca os dados completos do usuário pela API
                fetchUserData(decodedUser.sub);

            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                setUser(null);
            }
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        const decodedUser = jwtDecode(newToken);
        setUser(decodedUser);

        // Após login, buscar os dados do usuário
        fetchUserData(decodedUser.email);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
