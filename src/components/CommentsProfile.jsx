import React from "react";

const CommentsProfile = ({ allComments = [], currentUser }) => {
    const userComments = allComments.filter(
        (comment) => comment.user.id === currentUser.id
    );

    return (
        <div className="profile-page">
            {userComments.length > 0 ? (
                <ul className="user-comments-list">
                    {userComments.map((comment) => (
                        <li key={comment.id} className="comment-user">
                            <div className="meta">
                                {comment.rating !== null && (
                                    <div className="comment-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <ion-icon
                                                key={star}
                                                name={
                                                    star <= comment.rating
                                                        ? "star"
                                                        : "star-outline"
                                                }
                                                className="comment-star"
                                            ></ion-icon>
                                        ))}
                                        
                                    </div>
                                )}
                                <span className="rating-value">{comment.rating}</span>
                            </div>

                            <h2>{comment.bookTitle || "Título Desconhecido"}</h2>

                            <p className="paragrafo-limitado">{comment.text}</p>
                            <div className="comment-data">
                                <span className="likes-count">
                                    {comment.likes} curtida{comment.likes !== 1 ? "s" : ""}
                                </span>
                                <sub>{comment.date}</sub>
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
