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


       const fetchComments = async () => {
          try {
              const responseComment = await backendApi.get(`/comentarios/listar/livro/${livroID}`, {
                  headers: { Authorization: `Bearer ${token}` },
              });
      
              const normalizedComments = responseComment.data.data.content.map((c) => ({
                  ...c,
                  perfisQueCurtiram: Array.isArray(c.perfisQueCurtiram) ? c.perfisQueCurtiram : [], 
              }));
      
              setComments(normalizedComments);
      
          } catch (error) {
              console.error("Erro ao carregar comentários:", error.response ? error.response.data : error.message);
          }
          console.log("COMENTS: ",comments)
      };
      
      // Chamar `fetchComments` sempre que `livroID` ou `token` mudar
      useEffect(() => {
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
              const newCommentReply = {
                  perfilId: perfilId,
                  texto: text,
              };
  
              await backendApi.post(
                  `/comentarios/${parentId}/respostas`, 
                  newCommentReply,
                  { headers: { Authorization: `Bearer ${token}` } }
              );
          } else {
              await backendApi.post("/comentarios", newComment, {
                  headers: { Authorization: `Bearer ${token}` },
              });
          }
  
          // 🚀 Recarregar os comentários após a adição
          fetchComments();
  
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
            ? `/curtidas/resposta/${id}/perfil/${perfilId}`
            : `/curtidas/comentario/${id}/perfil/${perfilId}`;

        console.log(`Toggle Like - ID: ${id}, Parent ID: ${parentId || "Nenhum (Comentário Principal)"}`);

        setComments((prevComments) => {
            return prevComments.map((c) => {
                if (c.id === id && !parentId) {  // Comentário principal
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