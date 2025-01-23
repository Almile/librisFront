import React, { useState } from "react";
import { ReplyForm } from "./ReplyForm";
import { SpoilerProtection } from "./SpoilerProtection";


export const CommentList = ({ comments, onAddComment, onToggleReply, onToggleLike }) => {
    const [spoilerVisibility, setSpoilerVisibility] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

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

    return (
        <ul className="comments">
            {comments.map((comment) => (
                <li
                    key={comment.id}
                    className={`comment-list ${comment.parentId ? "reply-comment" : ""} ${
                        comment.replies.length > 0 ? "has-children" : ""
                    }`}
                >
                    <div className="comment">
                        <div className="comment-header">
                            <div className="comment-user">
                                <img
                                    src={comment.user.userImage}
                                    alt={`${comment.user.name} userImage`}
                                    className="userImage"
                                />
                                <strong>{comment.user.name}</strong>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <div className="meta">
                                {comment.rating !== null && (
                                    <div className="comment-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <ion-icon
                                                key={star}
                                                name={star <= comment.rating ? "star" : "star-outline"}
                                                className="comment-star"
                                            ></ion-icon>
                                        ))}
                                    </div>
                                )}
                                {comment.rating}
                            </div>
                        </div>
                        <div className="inner">
                            {comment.isSpoiler ? (
                                <SpoilerProtection
                                    isSpoilerVisible={spoilerVisibility[comment.id]}
                                    text={comment.text}
                                />
                            ) : (
                                <div
                                    className={`comment-text ${expandedComments[comment.id] ? "expanded" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: comment.text }}
                                />
                            )}
                                 {!expandedComments[comment.id] && comment.text.length > 300 && (
                            <button
                                className="show-more-button"
                                onClick={() => toggleExpanded(comment.id)}
                            >
                                Ver mais
                            </button>
                        )}

                        {expandedComments[comment.id] && comment.text.length > 300 && (
                            <button
                                className="show-less-button"
                                onClick={() => toggleExpanded(comment.id)}
                            >
                                Ver menos
                            </button>
                        )}

                        </div>

                   
                        <div className="comment-actions">
                            <button
                                className="comment-button"
                                onClick={() => onToggleLike(comment.id)}
                            >
                                {comment.likedBy.includes("currentUser") ? (
                                    <ion-icon name="thumbs-up"></ion-icon>
                                ) : (
                                    <ion-icon name="thumbs-up-outline"></ion-icon>
                                )}
                                {comment.likes}
                            </button>
                            <button className="reply-button" onClick={() => onToggleReply(comment.id)}>
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
                            {comment.isSpoiler && (
                                <button
                                    className="spoiler-button"
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
                            <div className="reply-comment-editor">
                                <ReplyForm
                                    onSubmit={(text, isSpoiler) =>
                                        onAddComment(text, isSpoiler, comment.id)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    {comment.replies.length > 0 && (
                        <CommentList
                            comments={comment.replies}
                            onAddComment={onAddComment}
                            onToggleReply={onToggleReply}
                            onToggleLike={onToggleLike}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};