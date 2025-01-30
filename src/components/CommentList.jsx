import React, { useState } from "react";
import { ReplyForm } from "./ReplyForm";
import { SpoilerProtection } from "./SpoilerProtection";
import styles from "../styles/comments.module.css";

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
        <ul className={styles.comments}>
            {comments.map((comment) => (
                <li
                    key={comment.id}
                    className={`${styles.commentList} ${comment.parentId ? styles.replyComment : ""} ${
                        comment.replies.length > 0 ? styles.hasChildren : ""
                    }`}
                >
                    <div className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <div className={styles.commentUser}>
                                <img
                                    src={comment.user.userImage}
                                    alt={`${comment.user.name} userImage`}
                                    className={styles.userImage}
                                />
                                <strong>{comment.user.name}</strong>
                                <span className={styles.commentDate}>{comment.date}</span>
                            </div>
                            <div className={styles.meta}>
                                {comment.rating !== null && (
                                    <div className={styles.commentRating}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <ion-icon
                                                key={star}
                                                name={star <= comment.rating ? "star" : "star-outline"}
                                                className={styles.commentStar}
                                            ></ion-icon>
                                        ))}
                                    </div>
                                )}
                                {comment.rating}
                            </div>
                        </div>
                        <div className={styles.inner}>
                            {comment.isSpoiler ? (
                                <SpoilerProtection
                                    isSpoilerVisible={spoilerVisibility[comment.id]}
                                    text={comment.text}
                                />
                            ) : (
                                <div
                                    className={`${styles.commentText} ${expandedComments[comment.id] ? styles.expanded : ""}`}
                                    dangerouslySetInnerHTML={{ __html: comment.text }}
                                />
                            )}
                            {!expandedComments[comment.id] && comment.text.length > 300 && (
                                <button
                                    className={styles.showMoreButton}
                                    onClick={() => toggleExpanded(comment.id)}
                                >
                                    Ver mais
                                </button>
                            )}
                            {expandedComments[comment.id] && comment.text.length > 300 && (
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
                                onClick={() => onToggleLike(comment.id)}
                            >
                                {comment.likedBy.includes("currentUser") ? (
                                    <ion-icon name="thumbs-up"></ion-icon>
                                ) : (
                                    <ion-icon name="thumbs-up-outline"></ion-icon>
                                )}
                                {comment.likes}
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
                            {comment.isSpoiler && (
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
