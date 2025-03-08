import React, { useEffect, useState, useContext } from "react";
import backendApi from "../services/backendApi";
import useAuth from "../context/AuthContext"; 
import styles from "../styles/comments.module.css";

const CommentsProfile = ({ currentUser }) => {
    console.log(currentUser)
    const { token } = useContext(useAuth);
    const [userComments, setUserComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser.usuario?.username) return;

        const fetchComments = async () => {
            try {
                const response = await backendApi.get(`comentarios/listar/usuario/${currentUser.usuario?.username}`,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setUserComments(response.data.data.content); 
                } else {
                    setError("Não foi possível carregar os comentários.");
                }
            } catch (err) {
                setError("Erro ao buscar comentários.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [currentUser]);

    if (loading) return <p>Carregando comentários...</p>;
    if (error) return <p className="error">{error}</p>;

    console.log("comments: ",userComments)

    
    return (
        <div className="profile-page">
            {userComments.length > 0 ? (
                <ul className="user-comments-list">
                    {userComments.map((comment) => (
                        <li key={comment.id} className="comment-user">
                            <div className="meta">
                                {comment.nota !== null && (
                                    <div className="comment-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <ion-icon
                                                key={star}
                                                name={
                                                    star <= comment.nota
                                                        ? "star"
                                                        : "star-outline"
                                                }
                                                className="comment-star"
                                            ></ion-icon>
                                        ))}
                                    </div>
                                )}
                                <span className="rating-value">{comment.nota}</span>
                            </div>

                            <h2>{comment.googleId || "Título Desconhecido"}</h2>

                            <p
                                className="paragrafo-limitado"
                                dangerouslySetInnerHTML={{ __html: comment.texto }}
                            ></p>

                            <div className="comment-data">
                                <span className="likes-count">
                                    {comment.quantidadeCurtidas} curtida
                                    {comment.quantidadeCurtidas !== 1 ? "s" : ""}
                                </span>
                                <sub>{comment.dataComentario}</sub>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Você ainda não fez nenhum comentário.</p>
            )}
        </div>
    );
};

export default CommentsProfile;
