import React, { useState } from "react";
import { StarRating } from "./StarRating"
import { useNavigate } from 'react-router-dom';

import "../styles/modalLecture.css"

const BookLecture = () => {
   const [isModalOpen, setIsModalOpen] = useState(true);
   const [stage, setStage] = useState(false);
  const [rating, setRating] = useState(0);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ratingLecture = () =>{
    setStage(true)
  }

  const navigate = useNavigate();

  const navegarParaLivro = () => {
    navigate('/livro');
  };

  const navegarParaResenha = () => {
    navigate('/resenha');
  };
  return (
    <div> 
    {isModalOpen && (
      <div id="modal">
        <div className="modal-lecture">

        <div className="books-data">
        <p>Data de término:<b> 10/Janeiro/2025 </b></p>
        </div>

        {stage === false ? (
           
            <div>
                <div className="books-data">

                <span className="text-explication">
                    Dê uma nota para a leitura
                </span>
                <StarRating 
                onRatingChange={(star) => setRating(star)}
                />

                </div>
                <button onClick={ratingLecture}>Enviar nota</button> 
            </div>    
                  
        ):(           
            <div>
            <span className="close-modal" onClick={closeModal}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </span>
            <div className="books-data">

            {rating !== null && (
              <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <ion-icon
                                key={star}
                                name={star <= rating ? "star" : "star-outline"}
                                className="comment-star"
                            ></ion-icon>
                        ))}
                 <input  type="text" value={rating}  min="0"  max="5"  step="0.1"  aria-label="Avaliação" />
            
              </div>
            )}
           

            </div>    
            <button onClick={navegarParaLivro}>Envie um <b> comentario </b> sobre a obra</button> 
            <button onClick={navegarParaResenha}>Crie uma <b> resenha </b> sobre a obra</button>  
          </div>
        )} 
        </div>
    </div>
      )}
      </div>
  );
};
export default BookLecture