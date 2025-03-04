import { useState, useContext, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import backendApi from "../services/backendApi";
import styles from "../styles/comments.module.css";
import useAuth from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { getLeituraByUser } from "../services/librisApiService";

const CommentSection = ({ context, livroID, showCommentForm, onCommentSubmit }) => {
  const location = useLocation();

  const { token, user } = useContext(useAuth);
  const [commentText, setCommentText] = useState(""); 
  const [comments, setComments] = useState([]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const perfilId = parseInt(user?.perfil?.id, 10) || null;
  const [category, setSelectedCategory] = useState(null);
   useEffect(() => {
          const fetchLeitura = async () => {
              try {
                  const response = await getLeituraByUser(user?.data?.username);
                  response.data.data.content.forEach(livro => {
                      if (livro.googleId == livroID) {
                          setSelectedCategory(livro.status);
                      }
                  });
              } catch(e) {
                  console.error(e);
              }
          }
          if (user?.data?.username) fetchLeitura();
      }, [location?.state?.rating, livroID, user])


      useEffect(() => {
        const fetchComments = async () => {
            try {
                const responseComment = await backendApi.get(`/comentarios/listar/livro/${livroID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const normalizedComments = responseComment.data.data.content.map((c) => ({
                    ...c,
                    perfisQueCurtiram: Array.isArray(c.perfisQueCurtiram) ? c.perfisQueCurtiram : [], // Garante que seja um array
                }));
    
                setComments(normalizedComments);
                
            } catch (error) {
                console.error("Erro ao carregar comentários:", error.response ? error.response.data : error.message);
            }
        };
    
        fetchComments();
    }, [livroID, token]);  
    
      
      const addComment = async (text, isSpoiler, parentId = null) => {
        const newComment = {
          perfilId: perfilId,
          googleId: livroID,
          texto: text,
          nota: location?.state?.rating,
          quantidadeCurtidas: 0,
          respostas: [],
          spoiler: isSpoiler
        };
        
        try {
          if (parentId) {
            // Enviar para o endpoint de respostas
            const newCommentReply = {
              perfilId: perfilId,
              texto: text,
            };
            
            const response = await backendApi.post(
              `/comentarios/${parentId}/respostas`, // Rota de respostas
              newCommentReply,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            
            // Atualiza o estado com a nova resposta no comentário pai
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.id === parentId
                  ? { ...comment, respostas: [...comment.respostas, response.data] }
                  : comment
              )
            );
          } else {
            // Enviar para o endpoint de comentários principais
            const response = await backendApi.post("/comentarios", newComment, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setComments((prevComments) => [...prevComments, response.data]);
          }
      
          if (onCommentSubmit) onCommentSubmit(); // Chama o callback para subir o estado de comentário
      
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

  const toggleLike = async (id) => {
    if (!perfilId) return;

    const comment = comments.find((c) => c.id === id);

    if (!comment) {
        console.error(`Erro: Comentário com ID ${id} não encontrado.`);
        return;
    }

    if (!Array.isArray(comment.perfisQueCurtiram)) {
        console.error(`Erro: 'perfisQueCurtiram' não é um array no comentário com ID ${id}.`, comment);
        return;
    }

    try {
        if (comment.perfisQueCurtiram.includes(perfilId)) {
            // Se o perfil já curtiu, descurte
            await backendApi.delete(`/curtidas/comentario/${id}/perfil/${perfilId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setComments((prevComments) =>
                prevComments.map((c) =>
                    c.id === id
                        ? {
                              ...c,
                              quantidadeCurtidas: c.quantidadeCurtidas - 1,
                              perfisQueCurtiram: c.perfisQueCurtiram.filter((user) => user !== perfilId),
                          }
                        : c
                )
            );
        } else {
            // Se o perfil não curtiu, curta
            await backendApi.post(`/curtidas/comentario/${id}/perfil/${perfilId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setComments((prevComments) =>
                prevComments.map((c) =>
                    c.id === id
                        ? {
                              ...c,
                              quantidadeCurtidas: c.quantidadeCurtidas + 1,
                              perfisQueCurtiram: [...c.perfisQueCurtiram, perfilId],
                          }
                        : c
                )
            );
        }
    } catch (error) {
        console.error("Erro ao realizar a curtida:", error);
    }
};


  
  return (
    <div className={styles.commentSection}>
      <h1>{context === "book" ? "Comentários" : ""}</h1>
      <div className={styles.createComment}>
        {context === "book" && (
          <>
            {category === "LIDO" ? (
              <>
                <div className={styles.rating}></div>
                <CommentForm
                  onSubmit={addComment}
                  isSpoiler={isSpoiler}
                  setIsSpoiler={setIsSpoiler}
                  initialText={commentText} 
                  onTextChange={setCommentText} 
                />

              </>
            ) : (
              <p>
                Finalize a leitura para criar um comentário.
              </p>
            )}
          </>
        )}
        {context === "forum" && showCommentForm && (
          <CommentForm
            onSubmit={addComment}
            isSpoiler={isSpoiler}
            setIsSpoiler={setIsSpoiler}
          />
        )}
      </div>
      <CommentList
        comments={comments}
        onAddComment={addComment}
        onToggleReply={toggleReplyMode}
        onToggleLike={toggleLike}
      />
    </div>
  );
};

export default CommentSection;
