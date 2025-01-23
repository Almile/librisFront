import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import useBook from '../hooks/useBook'
import CommentSection from "../components/CommentSection"
import "../styles/comments.css"


const Livro = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {data, error, loading} = useBook(searchParams.get('q'));
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