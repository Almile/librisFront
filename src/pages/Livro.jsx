import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommentSection from "../components/CommentSection";
import "../styles/comments.css"
import BookContent from "../components/BookContent";
import "../styles/bookcontent.css"
import ReviewSection from "../components/ReviewSection";
import "../styles/reviewsection.css"
import "../styles/Livro.css"

function Livro() {
  return(
    <div className="content" class="pagLivro">
      <BookContent />
      <ReviewSection/>
      <CommentSection />
    </div>
  )
}

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