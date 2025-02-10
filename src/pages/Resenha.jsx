import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewQuill } from "../components/ReviewQuill"
import styles from "../styles/resenha.module.css";
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
    <main className={styles.content}>
      <div className={styles.back}>
        <button className={styles.backToBook}>
          <span><ion-icon name="arrow-back-sharp"></ion-icon></span>
          <span>Nome do livro</span>
        </button>
        {/*
        <span className="rating">
          <span>O que achou da resenha: </span> <StarRating />
        </span>
        */}
        <button className={styles.editReview} onClick={toggleEditable}>
            {editable ? (
              <button className={styles.buttonEdit}>
                <ion-icon name="close-circle-outline"></ion-icon>
                <span>Cancelar</span>
              </button>
            ) : (
              <button className={styles.buttonEdit}>
                <ion-icon name="pencil-outline"></ion-icon>
                <span>Editar</span>
              </button>
            )}
          </button>
      </div>
      <input
            type="text"
            className={styles.titleReview}
            placeholder="Título da resenha"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!editable} 
          />
      <div className={styles.resenha}>
        <div className={styles.reviewDetails}>
          <div className={styles.autor}>
            <img
              src={userPhoto}
              alt="Foto de perfil"
              className={styles.autorImage}
            />
            <div>
              <p>Autor: Nome do Usuário</p>
              <span className={styles.dateReview}>Data de publicação: DD/MM/AAAA</span>
            </div>
          </div>
          <div className={styles.meta}>
            <span>1000 reviews</span>
            <div className={styles.rating}>
                <span>
                    {Array.from({ length: Math.ceil(4 || 0) }).map((_, index) => (
                        <Star size={20} key={index} fill='var(--destaque)' stroke="null" />
                    ))}
                    {Array.from({ length: 5 - Math.ceil(4 || 0) }).map((_, index) => (
                        <Star size={20} key={index + 10} fill='var(--texto-secundario)' stroke="null"/>
                    ))}
                </span>
            </div>
            {4.5}
          </div>
        </div>

        <button className={styles.alertSpoilerReview}>Possui Spoiler</button>

        <div className={styles.review}>
          {editable ? (
            <div className={styles.boxComment}>
            <ReviewQuill
              onSubmit={(text) => saveReview(text)}
              initialText={review}
            />
            </div>
          ) : (
            <div
              className={styles.innerReview}
              dangerouslySetInnerHTML={{ __html: review }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Resenha;
