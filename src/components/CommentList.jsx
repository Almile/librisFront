import React, { useState, useEffect } from "react";
import { ReplyForm } from "./ReplyForm";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/comments.module.css";
import backendApi from "../services/backendApi"; // Ajuste conforme sua estrutura de API
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CommentList = ({ comments = [], onAddComment, onToggleReply, onToggleLike }) => {
    const { token } = useAuth();
    const navigate = useNavigate(); 

    if (!Array.isArray(comments)) {
        console.error("Erro: comments não é um array", comments);
        return null;
    }
    const [spoilerVisibility, setSpoilerVisibility] = useState({});
    const [expandedComments, setExpandedComments] = useState({});
    const [userProfiles, setUserProfiles] = useState({});

    
    useEffect(() => {
        const fetchUserProfiles = async () => {
            // Obtém os IDs únicos de perfis sem tentar acessar como array
            const uniqueProfileIds = [...new Set(comments.map((c) => c.perfilId || c.nomePerfil).filter(Boolean))];
    
            if (uniqueProfileIds.length === 0) return;
    
            try {
                const responses = await Promise.all(
                    uniqueProfileIds.map(async (id) => {
                        if (!userProfiles[id]) {
                            let response;
                            if (comments.some((c) => c.perfilId)) {
                                response = await backendApi.get(`/perfil/${id}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                console.log("CommentlList perfil id: ", id);
                            } else {
                                response = await backendApi.get(`/perfil/buscar/${id}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });

                            }
                            return { id, data: response.data.data };
                        }
                        return null;
                    })
                );
    
                const newProfiles = responses.reduce((acc, profile) => {
                    if (profile) acc[profile.id] = profile.data;
                    return acc;
                }, {});
    
                setUserProfiles((prev) => ({ ...prev, ...newProfiles }));
            } catch (error) {
                console.error("Erro ao buscar perfis dos usuários:", error.response?.data || error);
            }
        };
    
        fetchUserProfiles();
    }, [comments, token]);
    
    const toggleSpoiler = (commentId) => {
        setSpoilerVisibility((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const toggleExpanded = (commentId) => {
        setExpandedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleAddReply = (text, isSpoiler, parentId) => {
        onAddComment(text, isSpoiler, parentId);
    };

    return (
        <ul className={styles.comments}>
            {comments.map((comment) => {
            const profileId = String(comment.perfilId || comment.nomePerfil);
            const user = userProfiles[profileId] || { usuario: { username: "Carregando..." }};
                return (
                    <li key={comment.id} className={`${styles.commentList} ${comment.parentId ? styles.replyComment : ""}`}>
                        <div className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <div className={styles.commentUser}>
                                    <img
                                        src={user.urlPerfil}
                                        alt={`${user.username }`}
                                        className={styles.urlPerfil}
                                    />
                                    <strong onClick={() => navigate(`/perfil/${comment.perfilId}`)}>{user?.usuario?.username|| user.username}</strong>
                                    <span className={styles.commentDate}>{new Date(comment.dataComentario || comment.data|| comment.dataResposta).toLocaleDateString()}</span>
                                </div> 
                                <div className={styles.meta}>
                                    {comment.nota >= 0  || !comment.parentId  ? (
                                        <div className={styles.commentRating}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <ion-icon
                                                    key={star}
                                                    name={star <= comment.nota ? "star" : "star-outline"}
                                                    className={styles.commentStar}
                                                    aria-label={`${star <= comment.nota ? "Estrela preenchida" : "Estrela vazia"} ${star}`}
                                                ></ion-icon>
                                            ))}
                                        </div>
                                    ) : ("")}
                                </div>

                            </div>
                            <div className={styles.inner}>
                                {comment.spoiler ? (
                                    <SpoilerProtection
                                        isSpoilerVisible={spoilerVisibility[comment.id]}
                                        text={comment.texto}
                                    />
                                ) : (
                                    <div
                                        className={`${styles.commentText} ${expandedComments[comment.id] ? styles.expanded : ""}`}
                                        dangerouslySetInnerHTML={{ __html: comment.texto }}
                                    />
                                )}
                                {!expandedComments[comment.id] && comment.texto > 300 && (
                                    <button
                                        className={styles.showMoreButton}
                                        onClick={() => toggleExpanded(comment.id)}
                                    >
                                        Ver mais
                                    </button>
                                )}
                                {expandedComments[comment.id] && comment.texto > 300 && (
                                    <button
                                        className={styles.showLessButton}
                                        onClick={() => toggleExpanded(comment.id)}
                                    >
                                        Ver menos
                                    </button>
                                )}
                            </div>
                            <div className={styles.commentActions}>
                            <button
                                className={styles.commentButton}
                                onClick={() => comment.parentId ? onToggleLike(comment.id, comment.parentId) : onToggleLike(comment.id)}
                            >

                                    {comment.likedBy?.includes("currentUser") ? (
                                        <ion-icon name="thumbs-up"></ion-icon>
                                    ) : (
                                        <ion-icon name="thumbs-up-outline"></ion-icon>
                                    )}
                                    {comment.quantidadeCurtidas}
                                </button>
                                <button className={styles.replyButton} onClick={() => onToggleReply(comment.id)}>
                                    {comment.isReplying ? (
                                        <span>
                                            <ion-icon name="close-circle-outline"></ion-icon> Cancelar
                                        </span>
                                    ) : (
                                        <span>
                                            <ion-icon name="chatbubble-ellipses"></ion-icon> Responder
                                        </span>
                                    )}
                                </button>
                                {comment.spoiler && (
                                    <button
                                        className={styles.spoilerButton}
                                        onClick={() => toggleSpoiler(comment.id)}
                                    >
                                        {spoilerVisibility[comment.id] ? (
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
                            {comment.isReplying && (
                            <div className={styles.replyCommentEditor}>
                                <ReplyForm
                                onSubmit={(text, isSpoiler) => handleAddReply(text, isSpoiler, comment.id)}  // Passa o parentId
                                />
                            </div>
                            )}
                        </div>
                        {comment.respostas && comment.respostas.length > 0 && (
                            <CommentList
                                comments={comment.respostas}
                                onAddComment={onAddComment}
                                onToggleReply={onToggleReply}
                                onToggleLike={onToggleLike}
                            />
                            )}

                    </li>
                );
            })}
        </ul>
    );
};
