import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ nome, imagem }) => {    
  const navigate = useNavigate(); 

  return (
    <div className="follow-item">
      <img src={imagem} className="follow-image" alt="Foto do Perfil" />
      <span onClick={() => navigate("/perfil")}>{nome}</span>
    </div>
  );
};

export default User;
