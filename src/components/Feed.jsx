import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/feed.module.css";
import backendApi from "../services/backendApi";
import { useAuth } from "../context/AuthContext";


const PostCard = ({ id, userId, foto, nome, date, text, tags, book, isSpoiler, respostas, stats, onPostClick, onLikeClick }) => {
  const [spoilerVisibility, setSpoilerVisibility] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const navigate = useNavigate();  // Para navegação ao clicar no nome do usuário

  const toggleSpoiler = (id) => {
    setSpoilerVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpanded = (commentId) => {
    setExpandedComments((prev) => ({
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
          <img className={styles.avatar} src={foto} alt={nome} />
          <div className={styles.headerContent}>
            <p className={styles.topic}>
              <p onClick={() => navigate(`/perfil/${userId}`)}>{nome}</p> · <sub className={styles.tag}> {date} </sub>
            </p>
            <div className={styles.tags}>
              <span className={styles.bookSelected}> {book} </span>
              {tags ? (
                tags.split(",").map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag.trim()}
                  </span>
                ))
              ) : (
                <span className={styles.noTags}></span>
              )}
            </div>
            <div className={styles.inner}>
              {isSpoiler ? (
                <SpoilerProtection
                  isSpoilerVisible={spoilerVisibility[id]}
                  text={text}
                />
              ) : (
                <div
                  className={`${styles.commentText} ${expandedComments[id] ? styles.expanded : ""}`}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
              {!expandedComments[id] && text.length > 300 && (
                <button
                  className={styles.showMoreButton}
                  onClick={() => toggleExpanded(id)}
                >
                  Ver mais
                </button>
              )}
              {expandedComments[id] && text.length > 300 && (
                <button
                  className={styles.showLessButton}
                  onClick={() => toggleExpanded(id)}
                >
                  Ver menos
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={onLikeClick}
          >
            👍 {stats?.likes || 0} Likes
          </button>
          {/* Correção na exibição de respostas */}
          <span className={styles.actionButton}>
            💬 {respostas?.length || 0} Respostas
          </span>
          {isSpoiler && (
            <button
              className={styles.spoilerButton}
              onClick={() => toggleSpoiler(id)}
            >
              {spoilerVisibility[id] ? (
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

const Feed = ({ posts, userProfiles, onPostClick }) => {
  const { token, user } = useAuth();

  const perfilId = user?.perfil?.id;
  const [likedPosts, setLikedPosts] = useState({});

  
  const toggleLike = async (postId) => {
    const postIdNum = Number(postId);
    const perfilIdNum = Number(perfilId);
  
    if (isNaN(postIdNum) || isNaN(perfilIdNum) || !Number.isInteger(postIdNum) || !Number.isInteger(perfilIdNum)) {
      console.error("Erro: postId ou perfilId não são inteiros!", { postId, perfilId });
      return;
    }
  
    console.log("Curtindo post com ID:", postIdNum, "e perfil ID:", perfilIdNum); // Log para verificar os IDs
  
    try {
      const url = `/curtidas/comentario-forum/${postIdNum}/perfil/${perfilIdNum}`;
      const isLiked = likedPosts[postIdNum];
  
      setLikedPosts((prev) => ({
        ...prev,
        [postIdNum]: !isLiked,
      }));
  
      if (isLiked) {
        await backendApi.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await backendApi.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
    } catch (error) {
      console.error("Erro ao realizar a curtida:", error);
    }
  };


  return (
    <div className={styles.feed}>
      {posts.map((post) => {
        const authorProfile = userProfiles?.[post.nomePerfil] || {};

        return (
          <PostCard
            key={post.id}
            id={post.id}
            userId={authorProfile.id}
            foto={authorProfile.urlPerfil}
            nome={authorProfile.username || "Usuário desconhecido"}
            date={post.dataCriacao}
            text={post.texto}
            book={post.tituloLivro}
            isSpoiler={post.possuiSpoiler}
            tags={post.tags}
            respostas={post.comentarios || []}
            stats={{
              likes: likedPosts[post.id]
                ? (post.stats?.likes || 0) + 1
                : post.stats?.likes,

            }}
            onPostClick={() => onPostClick(post, authorProfile)}
            onLikeClick={() => toggleLike(post.id)} // Função para curtir
          />
        );
      })}
    </div>
  );
};

export default Feed;
