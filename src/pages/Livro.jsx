import React from 'react';
import { useParams } from 'react-router-dom'
import ReviewSection from "../components/ReviewSection";
import BookContent from '../components/BookContent'
import CommentSection from "../components/CommentSection"
import style from "../styles/Livro.module.css"
const Livro = () => {
  const params = useParams();
  return(
    <div className={style.pagLivro}>
      <BookContent id={params.id} />
      <ReviewSection/>
      <CommentSection context="book" livroID={params.id}/>
    </div>
  )
}

export default Livro;