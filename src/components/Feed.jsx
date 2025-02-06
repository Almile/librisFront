import React, {useState} from "react";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/feed.module.css";

const PostCard = ({key, user, date, text, tags, book,isSpoiler, stats, onPostClick }) => {
    const [spoilerVisibility, setSpoilerVisibility] = useState({});
  
    const toggleSpoiler = (commentId) => {
      setSpoilerVisibility((prev) => ({
          ...prev,
          [commentId]: !prev[commentId],
      }));
  };
  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      onPostClick();
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <img className={styles.avatar} src={user.userImage} alt={user.name} />
          <div className={styles.headerContent}>
            <p className={styles.topic}>
              {user.name} · <sub className={styles.tag}> {date} </sub>
            </p>
            <div className={styles.tags}>
            <span className={styles.bookSelected}> {book} </span>


              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))
              ) : (
                <span className={styles.noTags}></span>
              )}

            </div>
            {isSpoiler ? (
                <SpoilerProtection
                    isSpoilerVisible={spoilerVisibility[key]}
                    text={text}
                />
            ) : (
              <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
            )}
             
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionButton}>
            👍 {stats?.likes || 0} Likes
          </button>
          <span className={styles.actionButton}>
            💬 {stats?.comments || 0} Respostas
          </span>
           {isSpoiler && (
            <button
                className={styles.spoilerButton}
                onClick={() => toggleSpoiler(key)}
            >
                {spoilerVisibility[key] ? (
                    <span>
                        <ion-icon name="eye-off-outline"></ion-icon> Esconder Spoiler
                    </span>
                ) : (
                    <span>
                        <ion-icon name="eye-outline"></ion-icon> Visualizar Spoiler
                    </span>
                )}
            </button>
        )}
        </div>
      </div>
    </div>
  );
};


const Feed = ({ posts, onPostClick }) => {
  return (
    <div className={styles.feed}>
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          user={post.user} 
          date={post.date} 
          text={post.text} 
          book={post.selectedBook}
          isSpoiler={post.isSpoiler}
          tags={post.tags} 
          stats={{ likes: 0, comments: post.comments.length }}
          onPostClick={() => onPostClick(post)} 
        />
      ))}
    </div>
  );
};

export default Feed;
