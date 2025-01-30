import React, { useState } from "react";
import { StarRating } from "./StarRating"
import { useNavigate } from 'react-router-dom';
import BookItem from "./BookItem";
import style from "../styles/modalLecture.module.css"
import StarList from "./StarList";


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

  const id = "GjgQCwAAQBAJ";
  
  return (
    <div> 
    {isModalOpen && (
      <div id="modal">
        <div className={style.modalLecture}>
        <div className={style.booksData}>
          <h2>Finalizar Leitura</h2>
          <BookItem key={id} id={id} />
        <p>Data de término:<b> 10/Janeiro/2025 </b></p>
        </div>

        {stage === false ? (
           
            <div>
                <div className={style.booksData}>

                <span className={style.textExplication}>
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
            <span className={style.closeModal} onClick={closeModal}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </span>
            <div className={style.booksData}>

              <div className={style.starRating}>
                <p>
                  <StarList average={rating} size={36} />
                </p>
                 <span>{rating} </span>
              </div>
            </div>    
            <button onClick={navegarParaLivro}>Envie um comentario sobre a obra</button> 
            <button onClick={navegarParaResenha}>Crie uma resenha sobre a obra</button>  
          </div>
        )} 
        </div>
    </div>
      )}
      </div>
  );
};
export default BookLecture;