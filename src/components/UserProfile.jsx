import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactQuill from "react-quill";

import useAuth from "../context/AuthContext";
import backendApi from "../services/backendApi";
import "react-quill/dist/quill.snow.css";
import User from "./User";

const UserProfile = ({ id }) => {
  const { token } = useContext(useAuth);
  const [perfilUser, setPerfilUser] = useState(null);
  const [seguidores, setSeguidores] = useState([]);
  const [seguindo, setSeguindo] = useState([]);

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");

  const fetchUserData = async (id) => {
    try {
      const response = await backendApi.get(`/perfil/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Dados do perfil que mostra:", response.data);
      setPerfilUser(response.data);  // Armazena os dados de perfil

      // Atualiza os seguidores e seguindo
      
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };
  const handleDescriptionChange = (content) => {
    setDescription(content || ""); // Garante que não seja null
    setPerfilUser((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        resumoBio: content || "", // Garante um valor vazio válido
      },
    }));
  };
  
  
  const handleProfileImageChange = (imageUrl) => {
    setProfileImage(imageUrl);
    setPerfilUser((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        urlPerfil: imageUrl, // Atualiza a URL de perfil
      },
    }));
  };
  
  const handleBackgroundImageChange = (imageUrl) => {
    setBackgroundImage(imageUrl);
    setPerfilUser((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        urlBackPerfil: imageUrl,
      },
    }));
  };
  
  const saveProfileChanges = async () => {
    try {
      await backendApi.put(`/perfil/${id}`, perfilUser.data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações no backend:", error);
      alert("Erro ao salvar alterações no perfil.");
    }
  };

  
  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  useEffect(() => {
    if (perfilUser) {
      setBackgroundImage(perfilUser?.data?.urlBackPerfil);
      setProfileImage(perfilUser?.data?.urlPerfil);
      setDescription(perfilUser?.data?.resumoBio);
      setSeguidores(perfilUser?.data?.seguidores || []);
      setSeguindo(perfilUser?.data?.seguindo || []);
    }
  }, [perfilUser]);

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
    handleDescriptionChange(description);
    saveProfileChanges();
    alert("Alterações salvas com sucesso!");
  };

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
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
  
          // Atualiza a imagem localmente
          if (target === "background") {
            handleBackgroundImageChange(imageUrl);
          } else if (target === "perfil") {
            handleProfileImageChange(imageUrl);
          }
  
          // Agora, envie os dados atualizados para o backend
          await saveProfileChanges();
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
          <input type="text" placeholder="Pesquisar usuário..." className="search-user" value={searchTerm} onChange={handleSearch} />

          <div className="follow-list">
            {filteredUsers.map((user) => (
              <User nome={user.name} imagem={user.image} key={user.id} />
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
            <h1>{perfilUser?.data?.usuario?.username}</h1>
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
