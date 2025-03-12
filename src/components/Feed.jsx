import React, { useState, useContext , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/feed.module.css";
import backendApi from "../services/backendApi";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ id, userId, foto, nome, date, text, tags, book, isSpoiler, respostas, stats, onPostClick, onLikeClick, isLikedInitial }) => {
  const [likes, setLikes] = useState(stats.likes);
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [commentCount, setCommentCount] = useState(respostas.length);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUpdatedPost = async () => {
      try {
        const response = await backendApi.get(`/posts/${id}`);
        setLikes(response.data.curtidas);
        setCommentCount(response.data.comentarios.length);
      } catch (error) {
        console.error("Erro ao atualizar post:", error);
      }
    };

    fetchUpdatedPost();
  }, [isLiked, respostas.length]); // Atualiza quando curtidas ou respostas mudam

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

  return (
    <div className={styles.card} onClick={(e) => e.target.tagName !== "BUTTON" && onPostClick()}>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <img className={styles.avatar} src={foto} alt={nome} />
          <div className={styles.headerContent}>
            <p className={styles.topic}>
              <p onClick={() => navigate(`/perfil/${userId}`)}>{nome}</p> · <sub className={styles.tag}>{date}</sub>
            </p>
            <div className={styles.tags}>
              <span className={styles.bookSelected}>{book}</span>
              {tags?.split(",").map((tag, index) => (
                <span key={index} className={styles.tag}>#{tag.trim()}</span>
              ))}
            </div>
            <div className={styles.inner}>
              {isSpoiler ? <SpoilerProtection text={text} /> : <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: text }} />}
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={handleLike}>
            👍 {likes} Likes
          </button>
          <span className={styles.actionButton}>💬 {commentCount} Respostas</span>
        </div>
      </div>
    </div>
  );
};

const Feed = ({ posts, userProfiles, onPostClick }) => {
  const { token, user } = useAuth();
  const perfilId = user?.perfil?.id;
  const [likedPosts, setLikedPosts] = useState({});
5
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

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }));

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
            stats={{ likes: post.curtidas }}
            isLikedInitial={!!likedPosts[post.id]} // Passa o estado inicial da curtida
            onLikeClick={() => toggleLike(post.id)}
            onPostClick={() => onPostClick(post, authorProfile)}
          />
        );
      })}
    </div>
  );
};


export default Feed;