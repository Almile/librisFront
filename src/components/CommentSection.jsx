import React, { useState } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { StarRating } from "./StarRating";
import styles from "../styles/comments.module.css";

import userPhoto from '/user_padrao.svg';

const commentsData = [
  {
    id: 1,
    text: "Este é um comentário sem spoiler.",
    user: {
      name: "João Silva",
      userImage: userPhoto,
    },
    date: "2025-01-15",
    isSpoiler: false,
    likedBy: ["Maria Oliveira","Mariana"],
    likes: 2,
    rating: 4,
    parentId: null,
    isReplying: false,
    replies: [
      {
        id: 2,
        text: "Uma resposta ao comentário acima.",
        user: {
          name: "Maria Oliveira",
          userImage: userPhoto,
        },
        date: "2025-01-16",
        isSpoiler: false,
        likedBy: [],
        likes: 0,
        rating: null,
        parentId: 1,
        isReplying: false,
        replies: [],
      },
      {
        id: 3,
        text: "Com tag de Spoiler.",
        user: {
          name: "Mariana",
          userImage: userPhoto,
        },
        date: "2025-01-16",
        isSpoiler: true,
        likedBy: ["Maria Oliveira","Mariana","João Silva"],
        likes: 3,
        rating: null,
        parentId: 1,
        isReplying: false,
        replies: [],
      },
    ],
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(commentsData);
  const [currentId, setCurrentId] = useState(4);
  const [rating, setRating] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const addComment = (text, isSpoiler, parentId = null) => {
    if (rating === 0 && parentId === null) {
      alert("A nota é obrigatória!");
      return;
    }

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
        userImage: "/user_padrao.svg",
      },
      date: new Date().toLocaleString(),
      rating: parentId === null ? rating : null,
    };

    setCurrentId((prevId) => prevId + 1);
    if (parentId === null) {
      setComments([...comments, newComment]);
    } else {
      setComments((prevComments) =>
        addReplyToComments(prevComments, parentId, newComment)
      );
    }
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
      <h1>Comentários</h1>
      <div className={styles.createComment}>
        <span className={styles.rating}>
          Comente o que achou do livro: {" "}
          <StarRating 
            rating={rating} 
            onRatingChange={(star) => setRating(star)} 
            required={true}
          />
        </span>
        <CommentForm
          onSubmit={addComment}
          isSpoiler={isSpoiler}
          setIsSpoiler={setIsSpoiler}
        />
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
