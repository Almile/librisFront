import React from 'react';

function CommentDetail({ comment, onClose }) {
  return (
    <div className={styles.commentDetail}>
      <button className={styles.backButton} onClick={onClose}>
        <ion-icon name="arrow-back-outline"></ion-icon> Voltar
      </button>
      <h3>{comment.author}</h3>
      <p>{comment.text}</p>
    </div>
  );
}

export default CommentDetail;
