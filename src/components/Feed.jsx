import React from "react";
import styles from "../styles/feed.module.css";


const PostCard = ({ user, time, tags, text, image, stats, onPostClick }) => {
  return (
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
            💬 {stats.comments}
          </button>
        </div>
      </div>
    </div>
  );
};

const Feed = ({ onPostClick }) => {
  const posts = [
    {
      id: 1,
      user: { name: "Maria", avatar: "/user_padrao.svg" },
      time: "2h",
      tags: ["#livros", "#2024"],
      text: "Meus top 10 livros de 2024...",
      image: null,
      stats: { likes: "4", comments: "1" },
    },
  ];

  return (
    <div className={styles.feed}>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} onPostClick={() => onPostClick(post)} />
      ))}
    </div>
  );
};

export default Feed;
