import React, { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { StarRating } from "./StarRating";
import styles from "../styles/comments.module.css";

import userPhoto from '/user_padrao.svg';
import { h3 } from "motion/react-client";

const CommentSection = ({ context }) => {
  const [comments, setComments] = useState([]);
  const [currentId, setCurrentId] = useState(4);
  const [rating, setRating] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState(false);
const [Lido, setLido] = useState(false) ;
  const addComment = (text, isSpoiler, parentId = null) => {

    const newComment = {
      id: currentId,
      text,
      isSpoiler,
      parentId,
      likes: 0,
      likedBy: [],
      replies: [],
      isReplying: false,
      user: {
        name: "Nome_usuario",
        userImage: userPhoto,
      },
      date: new Date().toLocaleString(),
      rating: context === "book" && parentId === null ? rating : null,
    };

    setCurrentId((prevId) => prevId + 1);
    setComments((prevComments) =>
      parentId === null
        ? [...prevComments, newComment]
        : addReplyToComments(prevComments, parentId, newComment)
    );

    setRating(0);
  };

  const addReplyToComments = (commentsList, parentId, newReply) => {
    return commentsList.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
          isReplying: false,
        };
      } else {
        return {
          ...comment,
          replies: addReplyToComments(comment.replies, parentId, newReply),
        };
      }
    });
  };

  const toggleReplyMode = (id) => {
    setComments(comments.map((comment) => toggleReply(comment, id)));
  };

  const toggleReply = (comment, id) => {
    if (comment.id === id) {
      return {
        ...comment,
        isReplying: !comment.isReplying,
      };
    }
    return {
      ...comment,
      replies: comment.replies.map((reply) => toggleReply(reply, id)),
    };
  };

  const toggleLike = (id) => {
    const userId = "currentUser";
    setComments(comments.map((comment) => toggleCommentLike(comment, id, userId)));
  };

  const toggleCommentLike = (comment, id, userId) => {
    if (comment.id === id) {
      const alreadyLiked = comment.likedBy.includes(userId);
      return {
        ...comment,
        likes: alreadyLiked ? comment.likes - 1 : comment.likes + 1,
        likedBy: alreadyLiked
          ? comment.likedBy.filter((user) => user !== userId)
          : [...comment.likedBy, userId],
      };
    }
    return {
      ...comment,
      replies: comment.replies.map((reply) => toggleCommentLike(reply, id, userId)),
    };
  };

  return (
    <div className={styles.commentSection}>
      <h1>{context === "book" ? "Comentários" : ""}</h1>
      <div className={styles.createComment}>
        
      {context === "book" && (
  <>
    {Lido ? (
      <>
      <div className={styles.rating}>
      </div>
      <CommentForm
          onSubmit={addComment}
          isSpoiler={isSpoiler}
          setIsSpoiler={setIsSpoiler}
        />
      </>
    ) : (
      <p>Finalize a leitura para criar um comentário. <button onClick={setLido}>Marcar como lido</button></p>
    )}
  </>
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
