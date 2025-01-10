import React, { useState } from 'react';
import { StarRating } from "../components/StarRating";
import { CommentForm } from "../components/CommentForm";
import "../styles/resenha.css";
import userPhoto from '/user_padrao.svg';


const Resenha = () => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState(
    'Escreva suas impressões sobre o livro aqui...'
  );

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const saveReview = (text) => {
    setEditable(false);
    setReview(text);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <main className='content'>
      <div className="back">
        <button className="back-to-book">
          <span><ion-icon name="arrow-back-sharp"></ion-icon></span>
          <span>Nome do livro</span>
        </button>
        {/*
        <span className="rating">
          <span>O que achou da resenha: </span> <StarRating />
        </span>
        */}
        <button className="edit-review" onClick={toggleEditable}>
            {editable ? (
              <button className="button-edit">
                <ion-icon name="close-circle-outline"></ion-icon>
                <span>Cancelar</span>
              </button>
            ) : (
              <button className="button-edit">
                <ion-icon name="pencil-outline"></ion-icon>
                <span>Editar</span>
              </button>
            )}
          </button>
      </div>
      <input
            type="text"
            className="title-review"
            placeholder="Título da resenha"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!editable} 
          />
      <div className="resenha">
        <div className="review-details">
          <div className="autor">
            <img
              src={userPhoto}
              alt="Foto de perfil"
              className="autorImage"
            />
            <div>
              <p>Autor: Nome do Usuário</p>
              <span className="date-review">Data de publicação: DD/MM/AAAA</span>
            </div>
          </div>
          <div className="meta">
            <span>1000 reviews</span>
            {5 !== null && (
              <div className="comment-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <ion-icon
                    key={star}
                    name={star <= 4.5 ? "star" : "star-outline"}
                    className="comment-star"
                  ></ion-icon>
                ))}
              </div>
            )}
            {4.5}
          </div>
        </div>

        <button className='alert-spoiler-review'>Possui Spoiler</button>

        <div className="review">
          {editable ? (
            <CommentForm
              onSubmit={(text) => saveReview(text)}
              initialText={review}
            />
          ) : (
            <div
              className="inner-review"
              dangerouslySetInnerHTML={{ __html: review }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Resenha;
