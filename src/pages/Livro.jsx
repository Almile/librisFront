import React from "react";
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


export default Livro;