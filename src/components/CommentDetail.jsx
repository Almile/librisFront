import React from 'react';

function CommentDetail({ comment, onClose }) {
  return (
    <div className={styles.commentDetail}>
      <button className={styles.backButton} onClick={onClose}>
        <ion-icon name="arrow-back-outline"></ion-icon> Voltar
      </button>

       <div className={styles.card} onClick={onPostClick}> {/* Chama a função ao clicar */}
            <div className={styles.cardContent}>
              <div className={styles.header}>
                <img className={styles.avatar} src={user.avatar} alt={user.name} />
                <div className={styles.headerContent}>
                  <p className={styles.topic}>{user.name} · {time}</p>
                  <p className={styles.userHandle}>{tags.join(" ")}</p>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
              </div>
              <p className={styles.text}>{text}</p>
              {image && <img src={image} alt="Post content" className={styles.image} />}
              <div className={styles.actions}>
                <button className={styles.actionButton}>
                  👍 {stats.likes}
                </button>
                <button className={styles.actionButton}>
                  💬 {stats.comments} {comment.author}
                </button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default CommentDetail;
