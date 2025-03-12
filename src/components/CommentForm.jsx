import React, { useState, useContext, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import useAuth from "../context/AuthContext";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import styles from "../styles/comments.module.css";
import "../styles/quill.css"

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

export const CommentForm = ({ onSubmit, initialText = "",  spoilerId, isSpoiler, setIsSpoiler, onTextChange }) => {
  const { user } = useContext(useAuth);
  const text = initialText; 
  const setText = onTextChange; // Usa a função do Forum para sincronizar o estado
  const [focusedImage, setFocusedImage] = useState(null);
  const editorRef = useRef(null);
   const userPadrao = user?.perfil?.urlPerfil;

   useEffect(() => {
    onTextChange(initialText); // Atualiza o estado de texto com a `initialText`
  }, [initialText, onTextChange]);
  
  const uniqueSpoilerId = spoilerId || `spoiler-checkbox-${Math.random().toString(36).substring(7)}`;


  const handleSubmit = (e) => {
    e.preventDefault();
    const plainText = text.trim();
    if (plainText === "" || plainText === "<p><br></p>") return;
  
    onSubmit(plainText, isSpoiler);
  };
  

  const handleImageAlignment = (alignment) => {
    if (focusedImage) {
      focusedImage.style.float = "";
      focusedImage.className = "";
      if (alignment === "left") {
        focusedImage.classList.add(styles.floatLeft);
      } else if (alignment === "right") {
        focusedImage.classList.add(styles.floatRight);
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
    <form onSubmit={handleSubmit} className={styles.formComment}>
      <img
        src={userPadrao}
        alt="Foto de perfil"
        className={styles.profilePicture}
      />

      <div className={styles.boxComment}>
        <div className={styles.spoiler}>
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
          className="customQuill"
          modules={modules}
          ref={editorRef}
        />

        {focusedImage && (
          <div className={styles.imageAlignmentDropdown}>
            <button
              type="button"
              onClick={() => handleImageAlignment("left")}
              className={styles.alignLeftButton}
            >
              Alinhar à Esquerda
            </button>
            <button
              type="button"
              onClick={() => handleImageAlignment("right")}
              className={styles.alignRightButton}
            >
              Alinhar à Direita
            </button>
          </div>
        )}

        <button type="submit" className={styles.envyButton}> Enviar </button>
      </div>
    </form>
  );
};
