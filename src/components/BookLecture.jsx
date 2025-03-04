import React, { useState } from "react";
import { StarRating } from "./StarRating";
import { useNavigate } from 'react-router-dom';
import Book from "./Book";
import { Star } from "lucide-react";
import style from "../styles/modalLecture.module.css";

const BookLecture = ({ bookId, onClose }) => {
    const [stage, setStage] = useState(false);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const ratingLecture = () => {
      if (rating === 0) return; // Impede de avançar sem avaliação
      setStage(true);
  };

  const navegarParaLivro = () => {
    console.log("Rating sendo passado:", rating);
    navigate(`/livro/${bookId}`, { state: { rating } });
    onClose();
    };


    const navegarParaResenha = () => {
        navigate(`/resenha`, { state: { rating } });
        onClose();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalLecture}>
            <h2 className={style.final}>Finalizar Leitura</h2>

                <span className={style.closeModal} onClick={onClose}>
                    ✖
                </span>
                <div  className={style.booksData}>
                <Book key={bookId} id={bookId} />
                <p>Data de término: <b>10/Janeiro/2025</b></p>
                </div>
                {!stage ? (
                    <div className={style.dataContent}>
                        <span className={style.textExplication}>
                            Dê uma nota para a leitura
                        </span>

                          <StarRating 
                            rating={rating} 
                            onRatingChange={(star) => setRating(star)} 
                            size={36}
                            required={true}
                          />

                        <button onClick={ratingLecture} className={style.actionButton}>Enviar nota</button>
                    </div>
                ) : (
                    <div>
                        <div className={style.starRating}>
                        <span>
                            {Array.from({ length: Math.ceil(rating || 0) }).map((_, index) => (
                                <Star size={28} key={index} fill='var(--destaque)' stroke="null" />
                            ))}
                            {Array.from({ length: 5 - Math.ceil(rating || 0) }).map((_, index) => (
                                <Star size={28} key={index + 10} fill='var(--texto-secundario)' stroke="null"/>
                            ))}
                        </span>
                        {rating}
                        </div>
                        <button onClick={navegarParaLivro} className={style.actionButton}>Envie um comentário sobre a obra</button>
                        <button onClick={navegarParaResenha} className={style.actionButton}>Crie uma  resenha  sobre a obra</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookLecture;
