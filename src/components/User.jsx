import React, { useState, useContext, useEffect } from "react";
import backendApi from "../services/backendApi";
import useAuth from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const User = ({ nome, imagem, id }) => {
  const { token, user } = useContext(useAuth);
  const [isFollowing, setIsFollowing] = useState(false);
  const userId = user?.perfil?.id;
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await backendApi.get(`/relacionamentos/esta-seguindo/${userId}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao verificar o seguimento:", error.response ? error.response.data : error.message);
      }
    };
    checkIfFollowing();
  }, [userId, id, token]);

  const handleFollow = async () => {
    console.log(isFollowing);

    if (isFollowing) {
      try {
        const deleteResponse = await backendApi.delete(`/relacionamentos/deixar-de-seguir/${userId}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(false);
        console.log(deleteResponse);
      } catch (error) {
        console.error("Erro ao deixar de seguir:", error.response ? error.response.data : error.message);
      }      
    } else {
      // Seguir
      try {
        const seguirResp = await backendApi.post(`/relacionamentos/seguir/${userId}/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(seguirResp);
        setIsFollowing(true);
      } catch (error) {
        console.error("Erro ao seguir o perfil:", error.response ? error.response.data : error.message);
      }
    }
  };
  if (userId === id) return null;

  return (
    <div className="follow-item">

    <div className="follow-item">
      <img src={imagem} className="follow-image" alt="Foto do Perfil" />
      <span onClick={() => navigate(`/perfil/${id}`)}>{nome}</span>
      </div>


    <button className="button-follow" onClick={handleFollow}>
      {isFollowing ? "Deixar de Seguir" : "Seguir"}
    </button>
    </div>
  );
};

export default User;