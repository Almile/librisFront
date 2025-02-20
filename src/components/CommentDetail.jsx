import React, { useState } from 'react';
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/feed.module.css";
import CommentSection from './CommentSection';



const CommentDetail = ({ id, user, date, tags, selectedBook, isSpoiler, text, image, stats, replies = [] }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState({});

  const toggleSpoiler = (commentId) => {
    setSpoilerVisibility((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const ReplyForm = () => {
    setShowCommentForm(true); // Exibe o formulário
  };

  const handleCommentSubmit = () => {
    setShowCommentForm(false); // Oculta apenas o formulário ao enviar um comentário
  };

  return (
    <div className={styles.commentDetail}>
      <div className={styles.cardPrincipal}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <img className={styles.avatar} src={user.userImage} alt={user.name} />
            <div className={styles.headerContent}>
              <p className={styles.topic}>{user.name} · <sub className={styles.tag}>{date}</sub></p>
              <div className={styles.tags}>
                <span className={styles.bookSelected}> {selectedBook} </span>
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))
                ) : (
                  <span className={styles.noTags}></span>
                )}
              </div>

              {isSpoiler ? (
                <SpoilerProtection
                  isSpoilerVisible={spoilerVisibility[id]}
                  text={text}
                />
              ) : (
                <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
              )}

              <div className={styles.actions}>
                <button className={styles.actionButton}>👍 Likes</button>
                <button className={styles.actionButton}>💬 Respostas</button>
                {isSpoiler && (
                  <button className={styles.spoilerButton} onClick={() => toggleSpoiler(id)}>
                    {spoilerVisibility[id] ? (
                      <span><ion-icon name="eye-off-outline"></ion-icon> Esconder Spoiler</span>
                    ) : (
                      <span><ion-icon name="eye-outline"></ion-icon> Visualizar Spoiler</span>
                    )}
                  </button>
                )}
                <button className={styles.actionButton} onClick={ReplyForm}>Responder</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Exibe a seção de comentários e oculta apenas o CommentForm */}
      <CommentSection 
        context="forum"
        showCommentForm={showCommentForm}
        onCommentSubmit={handleCommentSubmit} 
      />
    </div>
  );
};

export default CommentDetail;

