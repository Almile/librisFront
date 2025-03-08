import React, { useState, useContext , useEffect} from "react";
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
  👍 {stats.likes} Likes
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
    if (!perfilId) return;
  
    const isLiked = likedPosts[postId];
  
    try {
      const url = `/curtidas/post/${postId}/perfil/${perfilId}`;
  
      if (isLiked) {
        await backendApi.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await backendApi.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
  
      // Atualiza diretamente os posts sem depender de `setPosts` (se `posts` for prop)
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }));
  
      // Atualiza as curtidas diretamente no post alterado
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, curtidas: isLiked ? Math.max(post.curtidas - 1, 0) : post.curtidas + 1 }
          : post
      );
  
      // Verifica se `setPosts` está disponível antes de chamar
      if (typeof setPosts === "function") {
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Erro ao curtir/descurtir post:", error);
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
            stats={{ likes: post.curtidas }} // Corrigido para garantir que seja um objeto `stats`
            onLikeClick={() => toggleLike(post.id)}
            onPostClick={() => onPostClick(post, authorProfile)}
          />

        );
      })}
    </div>
  );
};

export default Feed;
