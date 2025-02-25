import React,{ useContext, useState, useRef } from 'react';
import useAuth from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import User from "./User";

const UserProfile = (id) => {
  const { user } = useContext(useAuth);

  const [backgroundImage, setBackgroundImage] = useState( user?.perfil?.urlBackPerfil);
    
  const [profileImage, setProfileImage] = useState(user?.perfil?.urlPerfil);
  const [description, setDescription] = useState(user?.perfil?.resumoBio);

  const [editable, setEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("seguidores");
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
    setActiveTab("seguidores"); 
  };
  

  const quillRef = useRef(null); 
  const maxCharacters = 200; 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const seguidores = [
    { id: 1, name: "João", image: profileImage },
    { id: 2, name: "Mariana", image: profileImage },
    { id: 3, name: "Anna", image: profileImage },
  ];

  const seguindo = [
    { id: 1, name: "Ana", image: profileImage },
    { id: 2, name: "Maria", image: profileImage },
  ];

  const filteredUsers =
    activeTab === "seguidores"
      ? seguidores.filter((user) => user.name.toLowerCase().includes(searchTerm))
      : seguindo.filter((user) => user.name.toLowerCase().includes(searchTerm));

  const handleChange = (content, delta, source, editor) => {
    const currentLength = editor.getText().trim().length;

    if (currentLength > maxCharacters && source === "user") {
      const quill = quillRef.current.getEditor();
      quill.deleteText(maxCharacters, currentLength);
      return;
    }
    console.log(content);
    setDescription(content);
  };

    // Configuração de módulos do ReactQuill
    const modules = {
      toolbar: [
        [{ color: [] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["blockquote"],
        ["clean"],
      ],
    };

  const toggleEditable = () => setEditable(!editable);

  const saveDescription = () => {
    setEditable(false);
    alert("Alterações salvas com sucesso!");
  };



  // Função para abrir o Cloudinary
  const handleCloudinaryUpload = (target) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dkmbs6lyk",
        uploadPreset: "libris_preset",
        cropping: true,
        multiple: false,
        resourceType: "image",
        folder: "libris_images",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;

          if (target === "background") {
            setBackgroundImage(imageUrl);
          } else if (target === "perfil") {
            setProfileImage(imageUrl);
          }
        } else if (error) {
          console.error("Erro no upload:", error);
        }
      }
    );
  };

  return (
    <section
      className="perfil"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
  {isModalOpen && (
        <div id="follow">
           <button className="close-modal" onClick={closeModal}>
              <ion-icon name="close"></ion-icon>
            </button>
            <div className="header-menu">
              <p className={activeTab === "seguidores" ? "active" : ""} onClick={() => setActiveTab("seguidores")}> Seguidores </p>
              <p className={activeTab === "seguindo" ? "active" : ""} onClick={() => setActiveTab("seguindo")}> Seguindo </p>
            </div>
            <input type="text" placeholder="Pesquisar usuário..." className="search-user" value={searchTerm} onChange={handleSearch}/>
           
          <div className="follow-list">
            {filteredUsers.map((user) => (
              <User nome={user.name} imagem={user.image} />
            ))}
          </div>
        </div>
      )}



      <button
        className="editar-background"
        onClick={() => handleCloudinaryUpload("background")}
      >
        <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
      </button>
      <div className="perfil-data">
        <div className="foto-perfil">
          <img src={profileImage} alt="Foto do Perfil" />
          <button
            className="editar-foto"
            onClick={() => handleCloudinaryUpload("perfil")}
          >
            <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
          </button>
        </div>
        <div className="info-perfil">
          <div className="top-info-perfil">
            <h1>{user.data.username}</h1>
            <div className="estatisticas">
              <button onClick={() => openModal("seguindo")}>
                {seguindo.length} seguindo
              </button>
              <button onClick={() => openModal("seguidores")}>
                {seguidores.length} seguidores
              </button>
            </div>
          </div>
          <div className="user-description">
            {editable ? (
              <div className="textarea-container">
                <ReactQuill
                  ref={quillRef}
                  onChange={handleChange}
                  className="profile-quill"
                  value={description}
                  modules={modules}
                />
               
              </div>
            ) : (
              <div
                className="textarea"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            <button
              className="edit-desc"
              onClick={editable ? saveDescription : toggleEditable}
            >
              {editable ? (
                 <div className="char-counter">

                 {description.replace(/<[^>]+>/g, "").length} / {maxCharacters}{" "}
                 caracteres
                 
                 <span><ion-icon name="save-outline"></ion-icon> {" "} Salvar</span>

               </div>

              ) : (
                <span className="circle"><ion-icon name="pencil-outline"></ion-icon></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
