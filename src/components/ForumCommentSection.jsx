import { useState, useContext, useEffect, useCallback } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import backendApi from "../services/backendApi";
import styles from "../styles/comments.module.css";
import useAuth from "../context/AuthContext";

const ForumCommentSection = ({ postId, showCommentForm, onCommentSubmit }) => {
  const { token, user } = useContext(useAuth);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const perfilId = parseInt(user?.perfil?.id, 10) || null;

  // Função de busca de comentários agora acessível globalmente
  const fetchComments = useCallback(async () => {
    try {
      const response = await backendApi.get(`/posts/${postId}/comentarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const normalizedComments = response.data.data.content.map((c) => ({
        ...c,
        perfisQueCurtiram: Array.isArray(c.perfisQueCurtiram) ? c.perfisQueCurtiram : [],
      }));
      setComments(normalizedComments);
    } catch (error) {
      console.error("Erro ao carregar comentários do post no fórum:", error.response ? error.response.data : error.message);
    }
  }, [postId, token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (text, isSpoiler, parentId = null) => {
    if (!perfilId) return;

    const newComment = { perfilId, texto: text, spoiler: isSpoiler };

    try {
      if (parentId) {
        await backendApi.post(`/posts/${postId}/comentarios/${parentId}/respostas`, newComment, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await backendApi.post(`/posts/${postId}/comentarios`, newComment, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchComments(); // Atualiza os comentários
      if (onCommentSubmit) onCommentSubmit();
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const toggleReplyMode = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, isReplying: !comment.isReplying } : comment
      )
    );
  };

  const toggleLike = async (id, parentId = null) => { 
    if (!perfilId) return;

    try {
        const url = parentId
            ? `/curtidas/comentario-forum/${id}/perfil/${perfilId}`
            : `/curtidas/post/${id}/perfil/${perfilId}`;

        console.log(`Toggle Like - ID: ${id}, Parent ID: ${parentId || "Nenhum (Comentário Principal)"}`);

        setComments((prevComments) => {
            return prevComments.map((c) => {
                if (c.id === id && !parentId) {
                    const hasLiked = c.perfisQueCurtiram.includes(perfilId);
                    return {
                        ...c,
                        quantidadeCurtidas: hasLiked ? c.quantidadeCurtidas - 1 : c.quantidadeCurtidas + 1,
                        perfisQueCurtiram: hasLiked
                            ? c.perfisQueCurtiram.filter((p) => p !== perfilId)
                            : [...c.perfisQueCurtiram, perfilId],
                    };
                }

                if (c.id === parentId) {  // Se for resposta, encontra dentro do comentário pai
                    return {
                        ...c,
                        respostas: c.respostas.map((r) => {
                            if (r.id === id) {
                                const hasLiked = r.perfisQueCurtiram.includes(perfilId);
                                return {
                                    ...r,
                                    quantidadeCurtidas: hasLiked ? r.quantidadeCurtidas - 1 : r.quantidadeCurtidas + 1,
                                    perfisQueCurtiram: hasLiked
                                        ? r.perfisQueCurtiram.filter((p) => p !== perfilId)
                                        : [...r.perfisQueCurtiram, perfilId],
                                };
                            }
                            return r;
                        }),
                    };
                }

                return c;
            });
        });

        const isLiked = parentId
            ? comments.some(
                  (c) => c.id === parentId && c.respostas.some((r) => r.id === id && r.perfisQueCurtiram.includes(perfilId))
              )
            : comments.some((c) => c.id === id && c.perfisQueCurtiram.includes(perfilId));

        if (isLiked) {
            console.log(`Removendo curtida de ${parentId ? "resposta" : "comentário"} com ID ${id}`);
            await backendApi.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            console.log(`Adicionando curtida a ${parentId ? "resposta" : "comentário"} com ID ${id}`);
            await backendApi.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
        }
    } catch (error) {
        console.error("Erro ao realizar a curtida:", error);
    }
};




  return (
    <div className={styles.commentSection}>
      {showCommentForm && (
        <div className={styles.createComment}>
          <CommentForm
            onSubmit={addComment}
            isSpoiler={isSpoiler}
            setIsSpoiler={setIsSpoiler}
            initialText={commentText}
            onTextChange={setCommentText}
          />
        </div>
      )}

      <CommentList
        comments={comments}
        onAddComment={addComment}
        onToggleReply={toggleReplyMode}
        onToggleLike={toggleLike}
      />
    </div>
  );
};

export default ForumCommentSection;
