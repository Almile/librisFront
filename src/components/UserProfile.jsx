import React, { useState } from 'react';
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.css";
import userPhoto from '/user_padrao.svg';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageTarget, setImageTarget] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [profileImage, setProfileImage] = useState(userPhoto);

    const [editable, setEditable] = useState(false);
    const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in feugiat libero.');
  
    let cropper = null;

    const openModal = (target) => {
      console.log('Abrindo modal para:', target);
      setImageTarget(target);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      console.log('Fechando modal');
      setIsModalOpen(false);
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }
    };
  
    const handleFileChange = (event) => {
      console.log('Arquivo selecionado:', event.target.files[0]);
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log('Carregando imagem:', e.target.result);
          const imageElement = document.getElementById('image-preview');
          imageElement.src = e.target.result;
          imageElement.style.display = 'block';
    
          if (cropper) {
            cropper.destroy();
          }
    
          cropper = new Cropper(imageElement, {
            aspectRatio:null,
            viewMode: 1,
            movable: true,
            rotatable: true,
            scalable: true,
            dragMode: 'move',
          });
        };
    
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, envie uma imagem válida.');
      }
    };
    
  
    const saveImage = () => {
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas({
          width: 1440,
          height: 800,
        });
  
        const croppedData = croppedCanvas.toDataURL();
        console.log('Imagem cortada salva:', croppedData);
  
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
      <section className="perfil" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <button className="editar-background" onClick={() => openModal('background')}>
          <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
        </button>
        <div className="perfil-data">
            <div className="foto-perfil">
              <img src={profileImage} alt="Foto do Perfil" />
              <button className="editar-foto" onClick={() => openModal('perfil')}>
              <ion-icon name="camera-outline" className="cam-icon"></ion-icon>
              </button>
            </div>
         <div className="info-perfil">
            <h1>Nome do Usuário</h1>
            <div className="user-description">
              {editable ? (
                <div className='textarea-container'>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={120}
                    />
                    <sub>{description.length}/120 caracteres</sub>
                  </div>

              ) : (
                <textarea className='textarea' readOnly disabled value={description}/>
              )}
              <button className="edit-desc" onClick={editable ? saveDescription : toggleEditable}>
                {editable ? 'Salvar' : <ion-icon name="pencil-outline"></ion-icon>}
              </button>
            </div>
            <div className="estatisticas">
              <span>10 Seguindo</span> | <span>10 Seguidores</span>
            </div>
          </div>
      </div>

      {isModalOpen && (
        <div id="modal">
          <div id="modal-content">
            <h2>Editar Imagem</h2>
            <div id="image-preview-container">
              <img id="image-preview" alt="Pré-visualização" />
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <div className='buttons'>
              <button onClick={saveImage}>Salvar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      </section>
  );
};

export default UserProfile;
