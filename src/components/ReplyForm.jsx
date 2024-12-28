import React, { useState } from "react";
import { CommentForm } from "./CommentForm";

export const ReplyForm = ({ onSubmit }) => {
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleReplySubmit = (text, isSpoiler) => {
    console.log("Texto e Spoiler na resposta", text, isSpoiler); 
    onSubmit(text, isSpoiler); 
  };

  return (
    <div>
      <CommentForm
        onSubmit={handleReplySubmit}
        spoilerId={`spoiler-checkbox-reply`}
        isSpoiler={isSpoiler}
        setIsSpoiler={setIsSpoiler}
      />
    </div>
  );
};
