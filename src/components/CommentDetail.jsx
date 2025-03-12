import React, { useState } from "react";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/feed.module.css";
import ForumCommentSection from './ForumCommentSection'; // Novo componente

const CommentDetail = ({ post, authorProfile }) => {
  const [postText, setPostText] = useState("");
  const [likes, setLikes] = useState(post.curtidas);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState({});

  const handleLike = async () => {
    setIsLiked(!isLiked); 
    setLikes(isLiked ? likes - 1 : likes + 1); 

    try {
      await onLikeClick();
    } catch (error) {
      console.error("Erro ao curtir/descurtir post:", error);
      setIsLiked(isLiked);
      setLikes(likes); 
    }
  };

  const toggleSpoiler = (commentId) => {
    setSpoilerVisibility((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const ReplyForm = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = () => {
    setShowCommentForm(false);
  };

  return (
    <div className={styles.commentDetail}>
      <div className={styles.cardPrincipal}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <img className={styles.avatar} src={authorProfile.urlPerfil} alt={authorProfile.username} />
            <div className={styles.headerContent}>
              <p className={styles.topic}>
                {authorProfile.username} · <sub className={styles.tag}>{post.dataCriacao}</sub>
              </p>
              <div className={styles.tags}>
                <span className={styles.bookSelected}>{post.tituloLivro}</span>
                {post.tags ? (
                  post.tags.split(",").map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag.trim()}
                    </span>
                  ))
                ) : (
                  <span className={styles.noTags}></span>
                )}
              </div>

              <div className={styles.inner}>
                {post.possuiSpoiler ? (
                  <SpoilerProtection
                    isSpoilerVisible={spoilerVisibility[post.id]}
                    text={post.texto}
                  />
                ) : (
                  <div
                    className={`${styles.commentText}`}
                    dangerouslySetInnerHTML={{ __html: post.texto }}
                  />
                )}
              </div>

              <div className={styles.actions}>
                {/* Corrigindo exibição de likes */}
                <button className={styles.actionButton} onClick={handleLike}>
                  👍 {likes} Likes
                </button>
                
                {/* Corrigindo exibição de respostas */}
                <button className={styles.actionButton}>
                  💬 {post.comentarios?.length || 0} Respostas
                </button>
                
                {post.possuiSpoiler && (
                  <button className={styles.spoilerButton} onClick={() => toggleSpoiler(post.id)}>
                    {spoilerVisibility[post.id] ? (
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

      <ForumCommentSection 
        postId={post.id}
        showCommentForm={showCommentForm}
        onCommentSubmit={handleCommentSubmit} 
      />
    </div>
  );
};

export default CommentDetail;
