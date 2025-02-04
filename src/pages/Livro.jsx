
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ReviewSection from "../components/ReviewSection";
import BookContent from '../components/BookContent'
import CommentSection from "../components/CommentSection"

const Livro = () => {
  const navigate = useNavigate();
  const params = useParams();

  const navegarParaResenha = () => {
    navigate('/resenha');
  };
  return(
    <div className="content">
      <BookContent id={params.id} />
      <button onClick={navegarParaResenha}>Ir para Resenha</button>
      <ReviewSection/>

      <CommentSection />
    </div>
  )
}

export default Livro;