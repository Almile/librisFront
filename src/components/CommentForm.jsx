import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import userPadrao from '/user_padrao.svg'
Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ color: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
  imageResize: {
    modules: ["Resize", "DisplaySize"],
  },
  clipboard: {
    matchVisual: false,
  },
};

export const CommentForm = ({ onSubmit, initialText = "", spoilerId, isSpoiler, setIsSpoiler }) => {
  const [text, setText] = useState("");
  const [focusedImage, setFocusedImage] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);
  
  const uniqueSpoilerId = spoilerId || `spoiler-checkbox-${Math.random().toString(36).substring(7)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const plainText = text.trim();
    if (plainText === "" || plainText === "<p><br></p>") return;

    onSubmit(text, isSpoiler);
    setText("");
    setIsSpoiler(false);
  };

  const handleImageAlignment = (alignment) => {
    if (focusedImage) {
      focusedImage.style.float = "";
      focusedImage.className = "";
      if (alignment === "left") {
        focusedImage.classList.add("float-left");
      } else if (alignment === "right") {
        focusedImage.classList.add("float-right");
      }
    }
  };

  const handleEditorClick = (e) => {
    if (e.target.tagName === "IMG") {
      setFocusedImage(e.target); 
    } else {
      setFocusedImage(null);
    }
  };


  
  useEffect(() => {
    const editorElement = editorRef.current.getEditor().root;
    editorElement.addEventListener("click", handleEditorClick);

    return () => {
      editorElement.removeEventListener("click", handleEditorClick);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form-comment">
      <img
        src={userPadrao}
        alt="Foto de perfil"
        className="profile-picture"
      />

      <div className="box-comment">
        <div className="spoiler">
          <input
            id={uniqueSpoilerId} 
            type="checkbox"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
          />
          <label htmlFor={uniqueSpoilerId}>
            <ion-icon name="warning"></ion-icon>
            <span>Alerta de Spoiler</span>
          </label>
        </div>

        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          className="custom-quill"
          modules={modules}
          ref={editorRef} 
        />

        {focusedImage && (
          <div className="image-alignment-dropdown">
            <button
              type="button"
              onClick={() => handleImageAlignment("left")}
              className="align-left-button"
            >
              Alinhar à Esquerda
            </button>
            <button
              type="button"
              onClick={() => handleImageAlignment("right")}
              className="align-right-button"
            >
              Alinhar à Direita
            </button>
          </div>
        )}

        <button type="submit" className="envy-button">
          Enviar
        </button>
      </div>
    </form>
  );
};
