import React, { useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './styles.css';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageTarget, setImageTarget] = useState('');
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/60');
  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in feugiat libero.');

  let cropper = null;

  const openModal = (target) => {
    setImageTarget(target);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageElement = document.getElementById('image-preview');
        imageElement.src = e.target.result;
        imageElement.style.display = 'block';

        if (cropper) {
          cropper.destroy();
        }

        cropper = new Cropper(imageElement, {
          aspectRatio: imageTarget === 'background' ? 16 / 9 : 1,
          viewMode: 1,
          autoCropArea: 1,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
        });
      };

      reader.readAsDataURL(file);
    } else {
      alert('Por favor, envie uma imagem válida.');
    }
  };

  const saveImage = () => {
    if (cropper) {
      const croppedData = cropper.getCroppedCanvas().toDataURL();
      if (imageTarget === 'background') {
        setBackgroundImage(croppedData);
      } else if (imageTarget === 'perfil') {
        setProfileImage(croppedData);
      }
    }
    closeModal();
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const saveDescription = () => {
    setEditable(false);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <main>
      <section className="perfil" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <button className="editar-background" onClick={() => openModal('background')}>
          &#9998;
        </button>
        <div className="perfil-data">
          <div className="foto-perfil">
            <img src={profileImage} alt="Foto do Perfil" />
            <button className="editar-foto" onClick={() => openModal('perfil')}>
              &#9998;
            </button>
          </div>
          <div className="info-perfil">
            <h1>Nome do Usuário</h1>
            <div className="user-description">
              {editable ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <p>{description}</p>
              )}
              <button onClick={editable ? saveDescription : toggleEditable}>
                {editable ? 'Salvar' : '✎'}
              </button>
            </div>
            <div className="estatisticas">
              <span>10 Seguindo</span> | <span>10 Seguidores</span>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div id="modal">
          <div id="modal-content">
            <h2>Editar Imagem</h2>
            <div id="image-preview-container">
              <img id="image-preview" alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '400px', display: 'none' }} />
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <div style={{ marginTop: '10px' }}>
              <button onClick={saveImage}>Salvar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <section className="conteudo">
        <div className="top-comentarios">
          <h2>Top Comentários e Resenhas</h2>
        </div>
        <div className="heatmap">
          <h2>HeatMap</h2>
        </div>
        <div className="lendo">
          <h2>Lendo</h2>
          <button className="adicionar-leitura">Adicionar Leitura</button>
        </div>
        <section className="estante">
          <h2>Estante de Livros</h2>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
