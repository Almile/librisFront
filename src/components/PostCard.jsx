import React from "react";
import styles from "../styles/feed.module.css";

const PostCard = ({ user, time, tags, text, image, stats, onPostClick }) => {
  
    const handleClick = (e) => {
      // Evita que cliques em botões acionem a abertura do post
      if (e.target.tagName !== "BUTTON") {
        onPostClick();
      }
    };
  
    return (
      <div className={styles.card} onClick={handleClick} >
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <img className={styles.avatar} src={user.avatar} alt={user.name} />
            <div className={styles.headerContent}>
              <p className={styles.topic}>{user.name} · {time}</p>
              <p className={styles.userHandle}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </p>
              <ion-icon name="chevron-down-outline"></ion-icon>
              <p className={styles.text}>{text}</p>
          {image && <img src={image} alt="Post content" className={styles.image} />}
          <div className={styles.actions}>
            <button className={styles.actionButton}>
              👍 {stats.likes} Likes
            </button>
            <button className={styles.actionButton}>
              💬 {stats.comments} Respostas
            </button>
          </div>
            </div>
          </div>
        
        </div>
      </div>
    );
  };

  export default PostCard;
