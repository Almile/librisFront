import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommentSection from "../components/CommentSection";
import "../styles/comments.css"


const Livro = () => {
  const navigate = useNavigate();
  
  const navegarParaResenha = () => {
    navigate('/resenha');
  };
  return(
    <div className="content">
      <button onClick={navegarParaResenha}>Ir para Resenha</button>

      <CommentSection />
    </div>
  )
}

export default Livro;