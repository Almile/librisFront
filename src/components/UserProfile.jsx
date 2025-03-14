import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactQuill from "react-quill";
import useAuth from "../context/AuthContext";
import backendApi from "../services/backendApi";
import "react-quill/dist/quill.snow.css";
import User from "./User";

const UserProfile = ({ id, isOwner, setIsOwner}) => {
  const { token, user, setUser } = useContext(useAuth);
  const [perfilUser, setPerfilUser] = useState(null);
  const [seguidores, setSeguidores] = useState([]);
  const [seguindo, setSeguindo] = useState([]);

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const userId = user?.perfil?.id;

  useEffect(() => {
    const fetchUserPerfil = async () => {
      try {
        const response = await backendApi.get(`/perfil/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const responseFollow = await backendApi.get(`/relacionamentos/seguindo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Seguindo:", responseFollow.data);
  
        setSeguindo(responseFollow.data.data.content || []);
  
        const responseFollowers = await backendApi.get(`/relacionamentos/seguidores/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Seguidores:", responseFollowers.data);
  
        setSeguidores(responseFollowers.data.data.content || []);
  
        if (response.data && response.data.data) {
          setPerfilUser(response.data);
          setIsOwner(response.data.data.id === user?.perfil?.id);
        } else {
          console.error("Dados do usuário não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error.response?.data || error);
      }
    };
    fetchUserPerfil();
  }, [id,isFollowing, user, token]);
  

  const handleDescriptionChange = (description) => {
    setDescription(description || "");
    setPerfilUser((prevState) => ({
      ...prevState,
      resumoBio: description,
    }));
  };
  
  const handleProfileImageChange = (imageUrl) => {
    setProfileImage(imageUrl);
    setPerfilUser((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        urlPerfil: imageUrl,
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
    const cleanBio = description.replace(/<[^>]*>?/gm, "").trim();
  
    if (!cleanBio) {
      alert("A bio não pode estar vazia!");
      return;
    }
  
    let email = perfilUser?.data?.usuario?.email;
  
    const payload = {
      urlPerfil: profileImage,
      resumoBio: description,
      generosFavoritos: perfilUser?.data?.generosFavoritos,
      urlBackPerfil: backgroundImage,
      usuarioEmail: email,
    };
  
    try {
      const response = await backendApi.put(`/perfil/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data && response.data.success) {
        // Atualiza o estado local com os dados retornados do backend
        setPerfilUser((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            urlPerfil: profileImage,
            urlBackPerfil: backgroundImage,
            resumoBio: description,
          },
        }));
        if(isOwner){
        setUser((prev) => ({
          ...prev,
          perfil: {
            ...prev.perfil,
            urlPerfil: profileImage,
          },
        }));
        }
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (perfilUser?.data) {
      setBackgroundImage(perfilUser?.data?.urlBackPerfil || backgroundImage);
      setProfileImage(perfilUser?.data?.urlPerfil || profileImage);
      setDescription(perfilUser?.data?.resumoBio || description);
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

  console.log(seguidores)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers =
  activeTab === "seguidores"
    ? (seguidores)
    : (seguindo);

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

  useEffect(() => {
    if (backgroundImage || profileImage) {
      const timeout = setTimeout(() => {
        saveProfileChanges();
      }, 500); // Aguarda 500ms antes de salvar
  
      return () => clearTimeout(timeout); // Limpa o timeout caso o estado mude antes de 500ms
    }
  }, [backgroundImage, profileImage]); // Executa quando um dos dois valores mudar
  
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
          console.log("Imagem carregada:", imageUrl);
  
          if (target === "background") {
            setBackgroundImage(imageUrl);
            handleBackgroundImageChange(imageUrl)
          } else if (target === "perfil") {
            setProfileImage(imageUrl);
            handleProfileImageChange(imageUrl)
          }

        } else if (error) {
          console.error("Erro no upload:", error);
        }
      }
    );
  };  
  

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await backendApi.get(`/relacionamentos/esta-seguindo/${userId}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao verificar o seguimento:", error.response ? error.response.data : error.message);
      }
    };
    checkIfFollowing();
  }, [userId, id, token]);

  const handleFollow = async () => {
    console.log(isFollowing);

    if (isFollowing) {
      try {
        const deleteResponse = await backendApi.delete(`/relacionamentos/deixar-de-seguir/${userId}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(false);
        console.log(deleteResponse);
      } catch (error) {
        console.error("Erro ao deixar de seguir:", error.response ? error.response.data : error.message);
      }      
    } else {
      // Seguir
      try {
        const seguirResp = await backendApi.post(`/relacionamentos/seguir/${userId}/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(seguirResp);
        setIsFollowing(true);
      } catch (error) {
        console.error("Erro ao seguir o perfil:", error.response ? error.response.data : error.message);
      }
    }
  };
  if (userId === id) return null;

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
          <p
            className={activeTab === "seguidores" ? "active" : ""}
            onClick={() => setActiveTab("seguidores")}
          >
            Seguidores
          </p>
          <p
            className={activeTab === "seguindo" ? "active" : ""}
            onClick={() => setActiveTab("seguindo")}
          >
            Seguindo
          </p>
        </div>

          <input type="text" placeholder="Pesquisar usuário..." className="search-user" value={searchTerm} onChange={handleSearch} />

          <div className="follow-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <User nome={user.username} imagem={user.urlPerfil} key={user.id} id={user.id} />
              ))
            ) : (
              <p>Nenhum usuário encontrado.</p> // Caso não haja usuários para exibir
            )}
          </div>

        </div>
      )}

      {isOwner && (
        <button className="editar-background" onClick={() => handleCloudinaryUpload("background")}>
          <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
        </button>
      )}
      <div className="perfil-data">
      <div className="foto-perfil">
      {profileImage ? (
            <img src={profileImage} alt="Foto do Perfil" />
          ) : (
            <span>Imagem não carregada</span>
          )}
          {isOwner && (
            <button className="editar-foto" onClick={() => handleCloudinaryUpload("perfil")}>
              <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
            </button>
          )}
          {!isOwner && (
               <button className="buttonFollow" onClick={handleFollow}>
               {isFollowing ? "Deixar de Seguir" : "Seguir"}
             </button>
            )}
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
            {isOwner && (
              <button className="edit-desc" onClick={editable ? saveDescription : toggleEditable}>
                {editable ? (
                  <div className="char-counter">
                    {description.replace(/<[^>]+>/g, "").length} / 200 caracteres
                    <span><ion-icon name="save-outline"></ion-icon> Salvar</span>
                  </div>
                ) : (
                  <span className="circle"><ion-icon name="pencil-outline"></ion-icon></span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;