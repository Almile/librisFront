import { useState, useContext, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import backendApi from "../services/backendApi";
import styles from "../styles/comments.module.css";
import useAuth from "../context/AuthContext";

const CommentSection = ({ context, livroID, showCommentForm, onCommentSubmit }) => {
  const { token, user } = useContext(useAuth);
  const [commentText, setCommentText] = useState(""); 

  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(1);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const perfilId = parseInt(user?.perfil?.id, 10) || null;
  const [lido, setLido] = useState(user?.perfil?.livrosLidos?.includes(livroID) ?? false);

  // Carregar os comentários ao montar o componente
  useEffect(() => {
    const fetchComments = async () => {

      try {
        const responseComment = await backendApi.get(`/comentarios/listar/livro/${livroID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("comentarios procurados")
        setComments(responseComment.data.content || []);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchComments();
  }, [livroID, token]);
  
  

  // Função para salvar um comentário
  const addComment = async (text, isSpoiler, parentId = null) => {
    const newComment = {
      perfilId: perfilId,
      googleId: livroID,
      texto: text,
      nota: parseFloat(rating.toFixed(1)), // Garantindo que seja um Double válido
      quantidadeCurtidas: 0,
      respostas: [],
    };
    console.log("Enviando comentário:", {
      perfilId,
      livroId: livroID,
      texto: text,
      nota: rating,
    });
    
    try {
      const response = await backendApi.post("/comentarios", newComment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setComments((prevComments) =>
        parentId === null
          ? [...prevComments, response.data]
          : prevComments.map((comment) =>
              comment.id === parentId
                ? { ...comment, respostas: [...comment.respostas, response.data] }
                : comment
            )
      );
      console.log("Comentario adicionado")
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }

    setRating(0);
    if (onCommentSubmit) onCommentSubmit();
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

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              quantidadeCurtidas: comment.perfisQueCurtiram.includes(perfilId)
                ? comment.quantidadeCurtidas - 1
                : comment.quantidadeCurtidas + 1,
              perfisQueCurtiram: comment.perfisQueCurtiram.includes(perfilId)
                ? comment.perfisQueCurtiram.filter((user) => user !== perfilId)
                : [...comment.perfisQueCurtiram, perfilId],
            }
          : comment
      )
    );
  };

  return (
    <div className={styles.commentSection}>
      <h1>{context === "book" ? "Comentários" : ""}</h1>
      <div className={styles.createComment}>
        {context === "book" && (
          <>
            {lido ? (
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
                Finalize a leitura para criar um comentário.{" "}
                <button onClick={() => setLido(true)}>Marcar como lido</button>
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
