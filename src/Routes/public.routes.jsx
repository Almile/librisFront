import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/home" />; // Redireciona para a home se já estiver autenticado
  }

  return children; // Retorna o componente caso não esteja autenticado
};

export default PublicRoute;
