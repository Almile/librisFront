import React, { useState } from "react";
import { CommentForm } from "./CommentForm";

export const ReplyForm = ({ onSubmit }) => {
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [text, setText] = useState(""); // Estado para controlar o texto

  const handleReplySubmit = (text, isSpoiler) => {
    console.log("Texto e Spoiler na resposta", text, isSpoiler); 
    onSubmit(text, isSpoiler); 
  };

  return (
    <div>
      <CommentForm
        onSubmit={handleReplySubmit}
        initialText={text} // Passa o estado `text` para `CommentForm`
        spoilerId={`spoiler-checkbox-reply`}
        isSpoiler={isSpoiler}
        setIsSpoiler={setIsSpoiler}
        onTextChange={setText} // Passa a função setText para `CommentForm`
      />
    </div>
  );
};
